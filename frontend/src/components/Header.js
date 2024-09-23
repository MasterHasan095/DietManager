import React from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { logInStatus, logout } from "../Services/authService";

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.clear();
    logout()
    navigate("/login"); // Redirect to login page
  };

  const buttonDisplayCheck = () => {
    return logInStatus();
  }
  return (
    <header>
      <h1>Diet Manager</h1>
      {buttonDisplayCheck() && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
