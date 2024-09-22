import React, { useState } from 'react';
import { login } from '../Services/authService';

function Login() {
  const [identifier, setIdentifier] = useState('');  // This can be either email or username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login({ identifier, password });
//       localStorage.setItem('token', response.data.token);  // Store token
//       window.location = '/';  // Redirect to dashboard after successful login
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username or Email:</label>
        <input 
          type="text" 
          value={identifier} 
          onChange={(e) => setIdentifier(e.target.value)} 
          required 
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;
