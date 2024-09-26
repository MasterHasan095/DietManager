import React, { useEffect, useState } from "react";
import "../styles/RMeal.css";
import { CircularProgress } from "@mui/material";
import { getCurrentUserToken } from "../Services/authService";
import { getUserId } from "../Services/basicFunc";
import axios from "axios";

const RMeal = () => {
  const [isLoading, setIsLoading] = useState(false);
const [rmealValue, setRMealValue] = useState({
    name: "",
    protein: 0,
    calories: 0,
    sugar: 0
});

const [rmeals, setRMeals] = useState([]);

const API_URL = "http://localhost:8000"; // Replace with your actual backend URL
const token = getCurrentUserToken(); // Define your token here or fetch it from auth service

  useEffect(()=>{
    const fetchRMeals = async () => {
        try{
            const user_id = getUserId();
            const response = await axios.get(`${API_URL}/getRMeals`, {
                headers: {
                  Authorization: `Bearer ${token}`, // Set the Authorization header
                  "Content-Type": "application/json", // Optional: specify content type
                },
                params: {
                  user_id, // Add user_id as a query parameter
                },
              });
            console.log(response.data.Rmeals);
            return response.data.Rmeals
        }catch(error){
            console.error("Failed to fetch meals:", error);
            return [];
        }
    }

    fetchRMeals();


  }, [])
  return isLoading ? (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div className="RMeal">
      <p>This is a meal</p>
    </div>
  );
};

export default RMeal;
