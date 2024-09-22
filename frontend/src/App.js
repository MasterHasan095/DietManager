// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login if user is not logged in */}
        <Route 
          path="/" 
          element={<Navigate to="/login" />}  // Redirect base URL to login
        />
        <Route 
          path="/login" 
          element={<Login />}  // Public route
        />
        <Route 
          path="/register" 
          element={<Register />}  // Public route for register
        />
        {/* Home page is protected */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />  {/* Home is only accessible if user is authenticated */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
