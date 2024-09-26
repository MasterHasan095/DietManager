// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Goal from "./components/Goal";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Meal from "./components/Meal";
import AddRMeal from "./components/AddRMeal";
import EditGoal from "./components/EditGoal";
import ViewRMeals from "./components/ViewRMeals";
import Reports from "./components/Reports";


function App() {
  const [user, setUser] = useState(null); // State to hold logged-in user info
  const [goal, setGoal] = useState(null); // State to hold logged-in user info
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <Goal user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route path="/addMeal" element={<Meal />} />
          <Route path="/addRMeal" element={<AddRMeal />} />
          <Route path="/editGoal" element={<EditGoal />} />
          <Route path="/viewRMeals" element={<ViewRMeals />} />
          <Route path="/reports" element={<Reports />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
