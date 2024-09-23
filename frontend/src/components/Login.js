// src/components/Login.js
import React, { useState } from 'react';
import { login } from '../Services/authService';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import '../styles/login.css';  // Import the CSS for styling

function Login() {
  const [identifier, setIdentifier] = useState('');  // Can be email or username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ identifier, password });
      localStorage.setItem('token', response.token);  // Store token
      localStorage.setItem('id', response.user.id);
      localStorage.setItem('username', response.user.username);
      navigate('/goals');  // Redirect to Home page after successful login
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username or Email:</label>
          <input 
            type="text" 
            value={identifier} 
            onChange={(e) => setIdentifier(e.target.value)} 
            required 
          /><br/>
          
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          /><br/>
          
          {error && <p className="error">{error}</p>}
          
          <button type="submit">Login</button><br/>
        </form>
        <p>Don't have an account? <a href="/register">Register here</a></p><br/>
      </div>
    </div>
  );
}

export default Login;
