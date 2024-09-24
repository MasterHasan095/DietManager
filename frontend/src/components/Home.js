// src/components/Home.js
import React, { useEffect, useState } from "react";
import { getProtectedData } from "../Services/DataService";
import { isAuthenticated } from "../Services/authService";
import { Navigate } from "react-router-dom";  // Use Navigate for redirection
import Tracker from "./Tracker";
import RMeal from "./RMeal";
import Button from '@mui/material/Button'; // Import the Button component from Material-UI
import { useNavigate } from 'react-router-dom';

import "../styles/home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProtectedData(); // Fetch protected data
        setData(response);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      }
    };

    fetchData(); // Call the fetch function on component mount
  }, []);

  const addMeal = () => {
    console.log("Adding Meal");
    navigate("/addMeal"); // Use navigate instead of <Navigate />

  };

  // Check if the user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home">
      {/* Error handling and data display */}
      {/* {error && <p>{error}</p>} 
      <pre>{JSON.stringify(data, null, 2)}</pre> 
      <p>Loading data...</p> */}
      <Tracker />
      <RMeal />
      <Button variant="contained" onClick={addMeal} className="add-meal-button">
        Add Meal
      </Button>
    </div>
  );
};

export default Home;
