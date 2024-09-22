import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Replace with your actual backend URL

// Register new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;  // Return registered user data
  } catch (error) {
    throw error.response.data;  // Throw error to be handled in the component
  }
};

// Login user with either username or email
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;  // Return token and user data
  } catch (error) {
    throw error.response.data;  // Throw error to be handled in the component
  }
};

// Optionally, you can add other authentication-related functions

// Logout user (clear token)
export const logout = () => {
  localStorage.removeItem('token');  // Remove token from local storage
};

// Get the current user's token
export const getCurrentUserToken = () => {
  return localStorage.getItem('token');  // Retrieve token from local storage
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');  // Check if token exists in local storage
};
