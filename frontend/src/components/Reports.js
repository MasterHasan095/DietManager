import React, { useEffect, useState } from "react";
import { getCurrentUserToken, isAuthenticated } from "../Services/authService";
import { getUserId } from "../Services/basicFunc";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/reports.css"; // Import the CSS file

const Reports = () => {
  const API_URL = "http://localhost:8000"; // Replace with your actual backend URL
  const token = getCurrentUserToken();
  const userId = getUserId();

  const [nutsForDay, setNutsForDay] = useState({
    protein: 0,
    calories: 0,
    sugar: 0,
  });

  const [nutsForWeek, setNutsForWeek] = useState({
    protein: 0,
    calories: 0,
    sugar: 0,
  });

  const [nutsForMonth, setNutsForMonth] = useState({
    protein: 0,
    calories: 0,
    sugar: 0,
  });

  const [goals, setGoals] = useState({
    protein: 0,
    calories: 0,
    sugar: 0,
  });

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${API_URL}/getGoal`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
          "Content-Type": "application/json", // Optional: specify content type
        },
        params: {
          user_id: userId, // Add user_id as a query parameter
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      return [];
    }
  };

  const fetchMealsForToday = async () => {
    try {
      const response = await axios.get(`${API_URL}/getMealsForToday`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          user_id: userId,
        },
      });
      return response.data.meals;
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      return [];
    }
  };

  const fetchMealsByWeek = async () => {
    try {
      const response = await axios.get(`${API_URL}/getMealsByWeek`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          user_id: userId,
        },
      });
      return response.data.meals;
    } catch (error) {
      console.error("Failed to fetch meals by week:", error);
      return [];
    }
  };

  const fetchMealsByMonth = async () => {
    try {
      const response = await axios.get(`${API_URL}/getMealsByMonth`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          user_id: userId,
        },
      });
      return response.data.meals;
    } catch (error) {
      console.error("Failed to fetch meals by month:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch meals for today
      const fetchedMealsForToday = await fetchMealsForToday();
      if (fetchedMealsForToday.length > 0) {
        let protein = 0;
        let calories = 0;
        let sugar = 0;

        fetchedMealsForToday.forEach((meal) => {
          protein += Number(meal.protein) || 0;
          calories += Number(meal.calories) || 0;
          sugar += Number(meal.sugar) || 0;
        });

        setNutsForDay({
          protein,
          calories,
          sugar,
        });
      }

      // Fetch meals for the week
      const fetchedMealsForWeek = await fetchMealsByWeek();
      if (fetchedMealsForWeek.length > 0) {
        let protein = 0;
        let calories = 0;
        let sugar = 0;

        fetchedMealsForWeek.forEach((meal) => {
          protein += Number(meal.protein) || 0;
          calories += Number(meal.calories) || 0;
          sugar += Number(meal.sugar) || 0;
        });

        setNutsForWeek({
          protein,
          calories,
          sugar,
        });
      }

      // Fetch meals for the month
      const fetchedMealsForMonth = await fetchMealsByMonth();
      if (fetchedMealsForMonth.length > 0) {
        let protein = 0;
        let calories = 0;
        let sugar = 0;

        fetchedMealsForMonth.forEach((meal) => {
          protein += Number(meal.protein) || 0;
          calories += Number(meal.calories) || 0;
          sugar += Number(meal.sugar) || 0;
        });

        setNutsForMonth({
          protein,
          calories,
          sugar,
        });
      }

      // Fetch goals
      const fetchedGoals = await fetchGoals();
      if (fetchedGoals.goal) {
        setGoals({
          protein: Number(fetchedGoals.goal.protein) || 0,
          calories: Number(fetchedGoals.goal.calories) || 0,
          sugar: Number(fetchedGoals.goal.sugar) || 0,
        });
      }
    };

    fetchData();
  }, [userId]);

  // Prepare data for individual nutrients
  const prepareData = (actual, goal) => [
    { name: "Actual", value: actual },
    { name: "Goal", value: goal },
  ];

  return isAuthenticated ? (
    <div className="reports-container">
      <div className="chart-row">
        <div className="chart-container">
          <h3>Daily Protein</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForDay.protein, goals.protein)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Daily Calories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForDay.calories, goals.calories)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Daily Sugar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForDay.sugar, goals.sugar)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-container">
          <h3>Average Weekly Protein</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForWeek.protein, goals.protein)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Average Weekly Calories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForWeek.calories, goals.calories)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Average Weekly Sugar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForWeek.sugar, goals.sugar)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-container">
          <h3>Average Monthly Protein</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForMonth.protein, goals.protein)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Average Monthly Calories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForMonth.calories, goals.calories)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Average Monthly Sugar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepareData(nutsForMonth.sugar, goals.sugar)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  ) : (
    <div>Not authorized</div>
  );
};

export default Reports;
