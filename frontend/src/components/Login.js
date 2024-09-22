// Login.js
import React, { useState } from 'react';
import { login } from '../Services/authService';
import '../styles/login.css'; // Import the CSS for styling

function Login() {
  const [identifier, setIdentifier] = useState('');  // This can be either email or username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ identifier, password });
      localStorage.setItem('token', response.token);  // Store token
      window.location = '/';  // Redirect to dashboard after successful login
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
