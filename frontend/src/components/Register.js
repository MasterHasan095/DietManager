// Register.js
import React, { useState } from 'react';
import { register } from '../Services/authService';
import '../styles/login.css'; // Import the CSS for styling

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register({ firstname, lastname, username, email, password });
      alert('Registration successful! Please login.');
      window.location = '/login';  // Redirect to login page
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input 
            type="text" 
            value={firstname} 
            onChange={(e) => setFirstname(e.target.value)} 
            required 
          /><br/>

          <label>Last Name:</label>
          <input 
            type="text" 
            value={lastname} 
            onChange={(e) => setLastname(e.target.value)} 
            required 
          /><br/>

          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          /><br/>

          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          /><br/>

          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          /><br/>

          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          /><br/>
          
          {error && <p className="error">{error}</p>}

          <button type="submit">Register</button><br/>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p><br/>
      </div>
    </div>
  );
}

export default Register;
