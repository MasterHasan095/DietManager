// import axios from 'axios';
// import { getCurrentUserToken } from './authService';  // Import token management functions

// const API_URL = 'http://localhost:8000';  // Backend API URL

// // Function to create an authenticated Axios instance
// const getAuthenticatedAxiosInstance = () => {
//   const token = getCurrentUserToken();  // Get token from local storage
//   return axios.create({
//     baseURL: API_URL,
//     headers: {
//       Authorization: `Bearer ${token}`,  // Set Authorization header with JWT
//     },
//   });
// };

// // Example: Get protected data from the server
// export const getProtectedData = async () => {
//   try {
//     const axiosInstance = getAuthenticatedAxiosInstance();  // Use token for request
//     const response = await axiosInstance.get('/protected-data');
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error.message;
//   }
// };

// // Example: Post data to a protected route
// export const postProtectedData = async (data) => {
//   try {
//     const axiosInstance = getAuthenticatedAxiosInstance();
//     const response = await axiosInstance.post('/protected-data', data);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error.message;
//   }
// };
