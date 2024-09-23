// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { getProtectedData } from '../Services/DataService'; 
import { isAuthenticated } from '../Services/authService';

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProtectedData();  // Fetch protected data
        setData(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      }
    };

    fetchData();  // Call the fetch function on component mount
  }, []);

  return (isAuthenticated && (
    <div>
      <h2>Home</h2>
      {error && <p>{error}</p>} 
        <pre>{JSON.stringify(data, null, 2)}</pre> 
        <p>Loading data...</p>
    </div>
  ));
};

export default Home;
