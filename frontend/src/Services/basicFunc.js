import axios from "axios";
import { getCurrentUserToken } from "./authService";
const API_URL = "http://localhost:8000"; // Replace with your actual backend URL

export const getUserId = () => {
  return localStorage.getItem("id"); // Retrieve token from local storage
};

export const getUsername = () => {
  return localStorage.getItem("username"); // Retrieve token from local storage
};

export const hasGoal = async () => {
    console.log("Reached");

    try {
        // Call the function to get the user token
        const token = getCurrentUserToken(); // Assuming this function returns the token

        // Make the GET request to the API
        const response = await axios.get(`${API_URL}/getGoal`, {
            params: {
                user_id: getUserId(), // Add the user_id as a query parameter
            },
            headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header with the token
                "Content-Type": "application/json", // Optional: specify content type
            },
        });

        console.log(response.data); // Log the response data
        console.log(response.data == "No Goals")
        
        return response.data != "No Goals"; // Return the data or process it

    } catch (error) {
        console.error("Error fetching goal:", error);
        // Handle error, maybe return a default value or show a message to the user
        throw error;
    }
};

