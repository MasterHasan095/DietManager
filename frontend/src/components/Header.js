import React, { useState } from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logInStatus, logout } from "../Services/authService";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, IconButton } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // For controlling the dropdown menu

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/login"); // Redirect to login page
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu at the icon's position
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleAddRecommendedMeal = () => {
    // Logic for adding recommended meal
    handleMenuClose();
    console.log("Add Recommended Meal clicked");
    navigate("/addRMeal")

  };

  const handleEditGoal = () => {
    // Logic for editing goal
    handleMenuClose();
    console.log("Edit Goal clicked");
    navigate("/editGoal")
  };

  return (
    <header>
      <h1 onClick={()=>{navigate("/home")}}>Diet Manager</h1>
      {isAuthenticated() && (
        <div style={{ display: "flex" }}>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleAddRecommendedMeal}>Add Recommended Meal</MenuItem>
            <MenuItem onClick={handleEditGoal}>Edit Goal</MenuItem>
          </Menu>
        </div>
      )}
    </header>
  );
};

export default Header;
