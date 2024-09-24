import React, { useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../Services/authService";
import { getUserId } from "../Services/basicFunc"; // Assume this returns the authenticated user's ID
import { getCurrentUserToken } from "../Services/authService"; // Assume this returns the current user token
import "../styles/meal.css"; // Add your styling here

const Meal = () => {
  const [mealData, setMealData] = useState({
    name: "",
    quantity: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    calories: 0,
    sugar: 0
  });

  const token = getCurrentUserToken(); // Get the token for authorization

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = getUserId(); // Fetch the user ID
    const dataToSend = { ...mealData, user_id }; // Attach the user_id to the meal data

    try {
      const response = await axios.post("http://localhost:8000/addMeal", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Meal added successfully:", response.data);
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  return (
    isAuthenticated() && (
      <div className="meal-form">
        <h2>Add a Meal</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input type="text" name="name" value={mealData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Quantity: </label>
            <input type="number" name="quantity" value={mealData.quantity} onChange={handleChange} required />
          </div>
          <div>
            <label>Protein (g): </label>
            <input type="number" name="protein" value={mealData.protein} onChange={handleChange} required />
          </div>
          <div>
            <label>Carbohydrates (g): </label>
            <input type="number" name="carbohydrates" value={mealData.carbohydrates} onChange={handleChange} required />
          </div>
          <div>
            <label>Fats (g): </label>
            <input type="number" name="fats" value={mealData.fats} onChange={handleChange} required />
          </div>
          <div>
            <label>Calories: </label>
            <input type="number" name="calories" value={mealData.calories} onChange={handleChange} required />
          </div>
          <div>
            <label>Sugar (g): </label>
            <input type="number" name="sugar" value={mealData.sugar} onChange={handleChange} required />
          </div>
          <button type="submit">Add Meal</button>
        </form>
      </div>
    )
  );
};

export default Meal;
