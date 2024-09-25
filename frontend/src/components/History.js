import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../Services/authService";
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  Table,
  CircularProgress,
} from "@mui/material";
import { getCurrentUserToken } from "../Services/authService";
import { getUserId } from "../Services/basicFunc";
import axios from "axios";

const History = () => {
  const [meals, setMeals] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const API_URL = "http://localhost:8000"; // Replace with your actual backend URL
  const token = getCurrentUserToken();

  const fetchMeals = async () => {
    try {
      const user_id = getUserId();
      const response = await axios.get(`${API_URL}/getMealsForToday`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
          "Content-Type": "application/json", // Optional: specify content type
        },
        params: {
          user_id, // Add user_id as a query parameter
        },
      });

      console.log(response)
      // Ensure response data is an array
      return Array.isArray(response.data.meals) ? response.data.meals : [];
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      return []; // Return an empty array in case of error
    }
  };

  useEffect(() => {
    const getMeals = async () => {
      setIsLoading(true); // Start loading
      const fetchedMeals = await fetchMeals();
      setMeals(fetchedMeals); // Update the state with fetched meals
      setIsLoading(false); // Stop loading after data is fetched
    };

    getMeals();
  }, []); // Empty array means this effect runs once on mount

  return isAuthenticated() ? (
    isLoading ? (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    ) : meals.length > 0 ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Meals</TableCell>
              <TableCell>Protein</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Sugar</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {meals.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.protein}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.sugar}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <div>No meals found</div> // Handle the case where meals array is empty
    )
  ) : (
    <div>Not authorized</div>
  );
};

export default History;
