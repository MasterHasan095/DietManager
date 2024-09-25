import React, { useState, useEffect } from "react";
import "../styles/tracker.css";
import axios from "axios";
import { getUserId } from "../Services/basicFunc";
import { getCurrentUserToken } from "../Services/authService";

const Tracker = () => {
  const [trackerValue, setTrackerValue] = useState({
    name: "",
    ogValue: 0,
    goalValue: 0,
  });
  const [goal, setGoal] = useState({
    protein: 0,
    calories: 0,
    sugar: 0,
  });
  const [meals, setMeals] = useState([]);
  const [values, setValues] = useState([
    {
      name: "",
      ogValue: 0,
      goalValue: 0,
    },
  ]);
  const API_URL = "http://localhost:8000"; // Replace with your actual backend URL
  const token = getCurrentUserToken(); // Define your token here or fetch it from auth service

  // Async function to fetch meals
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

      return response.data; // Assuming response data is an array
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      return [];
    }
  };

  const fetchGoals = async () => {
    try {
      const user_id = getUserId();
      const response = await axios.get(`${API_URL}/getGoal`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
          "Content-Type": "application/json", // Optional: specify content type
        },
        params: {
          user_id, // Add user_id as a query parameter
        },
      });
      return response.data; // Assuming response data is an array
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      return [];
    }
  };

  useEffect(() => {
    // Fetch meals on component mount
    const fetchData = async () => {
      const fetchedMeals = await fetchMeals();
      if (fetchedMeals.meals.length > 0) {
        let protein = 0;
        let calories = 0;
        let sugar = 0;

        for (let meal of fetchedMeals.meals) {
          // Ensure values are numbers and add them
          protein += Number(meal.protein) || 0;
          calories += Number(meal.calories) || 0;
          sugar += Number(meal.sugar) || 0;
        }

        setValues([
          { name: "Protein", ogValue: protein, goalValue: 0 },
          { name: "Calories", ogValue: calories, goalValue: 0 },
          { name: "Sugar", ogValue: sugar, goalValue: 0 },
        ]);
        console.log(values)
        setMeals(fetchedMeals.meals); // Update the state with the fetched values
      }

      const fetchedGoals = await fetchGoals();
      if (fetchedGoals.goal) {
        const proteinGoal = Number(fetchedGoals.goal.protein) || 0;
        const caloriesGoal = Number(fetchedGoals.goal.calories) || 0;
        const sugarGoal = Number(fetchedGoals.goal.sugar) || 0;

        setGoal({
          protein: Number(fetchedGoals.goal.protein) || 0,
          calories: Number(fetchedGoals.goal.calories) || 0,
          sugar: Number(fetchedGoals.goal.sugar) || 0,
        });

        setValues((prevValues) => [
          { ...prevValues[0], goalValue: proteinGoal }, // Update the first entry (protein)
          { ...prevValues[1], goalValue: caloriesGoal }, // Update the second entry (calories)
          { ...prevValues[2], goalValue: sugarGoal }, // Update the third entry (sugar)
        ]);

      }
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Run only once on mount

  useEffect(() => {
    let index = 0;

    if (values.length > 0) {
      // Set up the interval to cycle through the values
      const interval = setInterval(() => {
        index = (index + 1) % values.length; // Cycle through the values
        console.log(values)
        setTrackerValue(values[index]); // Update tracker value
      }, 2000);

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    } else {
      console.log("Values array is empty, not setting up interval");
    }
  }, [values]); // Re-run effect whenever `values` changes

  return (
    <div className="trackerholder">
      <div>{trackerValue.name}</div>
      <div>Og : {trackerValue.ogValue}</div>
      <div>Goal : {trackerValue.goalValue}</div>
    </div>
  );
};

export default Tracker;
