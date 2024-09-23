// src/components/Goal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Goal.css"; // Import CSS for styling
import { getUserId } from "../Services/basicFunc";

const API_URL = "http://localhost:8000"; // Replace with your actual backend URL

const Goal = ({ user, setUser }) => {
  const [userId, setUserId] = useState(user?.id || ""); // Default to logged-in user's ID
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [sugar, setSugar] = useState("");
  const [currentGoal, setCurrentGoal] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Check for current goals when the component mounts
  useEffect(() => {
    const fetchGoal = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${API_URL}/getGoal`, {
            params: { userId: userId },
          });
          if (response.data.goal) {
            // If the user already has a goal, redirect to home
            navigate("/"); // Adjust to your home route
          } else {
            setCurrentGoal(null); // No goal exists
          }
        } catch (err) {
          setError(err.message || "Failed to fetch goals");
        }
      }
    };

    fetchGoal();
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      await axios.post(
        `${API_URL}/setGoal`,
        {
          user_id: getUserId(),
          protein,
          calories,
          sugar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
            "Content-Type": "application/json", // Optional: specify content type
          },
        }
      );
      alert("Goals set successfully!");
      navigate("/home")
    } catch (err) {
      setError(err.message || "Failed to set goals");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h2>Set Your Dietary Goals</h2>
      <form onSubmit={handleSubmit}>
        <div className="data-input">
          <div className="input-set">
            <label>Protein (grams):</label>
            <input
              className="circle-input"
              type="number"
              placeholder="Enter amount of protein"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              required
            />
          </div>
          <div className="input-set">
            <label>Calories:</label>
            <input
              className="circle-input"
              type="number"
              placeholder="Enter amount of calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </div>
          <div className="input-set">
            <label>Sugar (grams):</label>
            <input
              className="circle-input"
              type="number"
              placeholder="Enter amount of sugar"
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <p className="error">{error}</p>}

        <button type="submit">Set Goals</button>
      </form>

      {currentGoal && (
        <div>
          <h3>Current Goals:</h3>
          <p>User ID: {currentGoal.userId}</p>
          <p>Protein: {currentGoal.protein} grams</p>
          <p>Calories: {currentGoal.calories}</p>
          <p>Sugar: {currentGoal.sugar} grams</p>
        </div>
      )}
    </div>
  );
};

export default Goal;
