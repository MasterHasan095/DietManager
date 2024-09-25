import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../Services/authService";
import { getUserId } from "../Services/basicFunc";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Corrected import
import { getCurrentUserToken } from "../Services/authService";

const AddRMeal = () => {
  const [mealData, setMealData] = useState({
    name: "",
    quantity: 0,
    protein: 0,
    calories: 0,
    sugar: 0,
    mealType: "", // Initialize as an empty string
  });

  const navigate = useNavigate(); // Corrected navigate hook usage
  const [mealTypes, setMealTypes] = useState([]);
  const token = getCurrentUserToken();
  const userId = getUserId();

  useEffect(() => {
    const getMealTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllTypes", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setMealTypes(response.data.mealTypes); // Update state with the fetched meal types
      } catch (error) {
        console.error("Failed to fetch meal types:", error);
      }
    };

    getMealTypes();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMealData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...mealData, user_id: userId }; // Attach the user_id to the meal data

    try {
      const response = await axios.post(
        "http://localhost:8000/addRMeal",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Recommended Meal added successfully:", response.data);
      navigate("/home"); // Navigate to the home page
    } catch (error) {
      console.error("Error adding Recommended meal:", error);
    }
  };

  return isAuthenticated() ? (
    <div>
      <h2>Add a Recommended Meal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={mealData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity: </label>
          <input
            type="number"
            name="quantity"
            value={mealData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Protein (g): </label>
          <input
            type="number"
            name="protein"
            value={mealData.protein}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Calories: </label>
          <input
            type="number"
            name="calories"
            value={mealData.calories}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sugar (g): </label>
          <input
            type="number"
            name="sugar"
            value={mealData.sugar}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Meal Type: </label>
          <select
            name="mealType"
            value={mealData.mealType}
            onChange={handleChange}
            required
          >
            <option value="">Select Meal Type</option>
            {mealTypes && mealTypes.length > 0 ? (
              mealTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))
            ) : (
              <option value="">No Meal Types Available</option>
            )}
          </select>
        </div>
        <button type="submit">Add Meal</button>
      </form>
    </div>
  ) : (
    <div>Unauthorized</div>
  );
};

export default AddRMeal;
