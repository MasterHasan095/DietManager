import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Services/authService"; // Import auth service
import { hasGoal } from "../Services/basicFunc";

const ProtectedRoute = ({ children }) => {
  const [goalCheck, setGoalCheck] = useState(null); // null for the initial state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Run this effect on component mount to check if the user has a goal
    const fetchGoal = async () => {
      try {
        const goalExists = await hasGoal(); // Wait for the promise to resolve
        setGoalCheck(goalExists); // Set the goalCheck state
      } catch (error) {
        console.error("Error getting goal:", error);
        setGoalCheck(false); // Handle error, assuming no goal
      } finally {
        setLoading(false); // Set loading to false once the async operation is done
      }
    };

    fetchGoal();
  }, []); // Empty dependency array to run the effect only once on mount

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // Show loading state while waiting for the promise to resolve
  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading spinner or message
  }

  // Check if the user has a goal after loading completes
  if (goalCheck) {
    return <Navigate to="/home" />;
  } else {
    // return <Navigate to="/goals" />;
    return children;
  }
};

export default ProtectedRoute;
