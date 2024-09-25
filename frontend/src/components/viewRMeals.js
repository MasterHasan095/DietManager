import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../Services/authService";
import {
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from "@mui/material";
import { getCurrentUserToken } from "../Services/authService";
import { getUserId } from "../Services/basicFunc";
import axios from "axios";

const ViewRMeals = () => {
  const [RMeals, setRMeals] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const API_URL = "http://localhost:8000"; // Replace with your actual backend URL
  const token = getCurrentUserToken();
  const userId = getUserId();

  useEffect(() => {
    const fetchRMeals = async () => {
      try {
        const response = await axios.get(`${API_URL}/getRMeals`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
            "Content-Type": "application/json",
          },
          params: {
            user_id: userId, // Send user_id as a query parameter if needed
          },
        });
        setRMeals(response.data.Rmeals); // Update state with the fetched meals
      } catch (error) {
        console.error("Failed to fetch recommended meals:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchRMeals();
  }, [token, userId, API_URL]);

  return isAuthenticated() ? (
    isLoading ? (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    ) : RMeals.length > 0 ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Protein</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Sugar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {RMeals.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.mealType}</TableCell>
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
    <div>Unauthorized</div>
  );
};

export default ViewRMeals;
