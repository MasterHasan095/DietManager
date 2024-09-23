// src/components/Home.js
import React, { useEffect, useState } from "react";
import { getProtectedData } from "../Services/DataService";
import { isAuthenticated } from "../Services/authService";
import Tracker from "./Tracker";
import RMeal from "./RMeal";
import Button from '@mui/material/Button'; // Import the Button component from Material-UI

import "../styles/home.css"
const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

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
    console.log("adding Meal")
  }

  return (
    isAuthenticated && (<>
      <div className="home">
        {/* {error && <p>{error}</p>} 
        <pre>{JSON.stringify(data, null, 2)}</pre> 
        <p>Loading data...</p> */}
        <Tracker />
        <RMeal />

      </div>
      <Button variant="contained" onClick={addMeal} className="add-meal-button">Add Meal</Button>
      </>
    )
  );
};

export default Home;
