import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Welcome to the Diet Manager!</h2>
      <p>This is the main page after login or registration.</p>
      <p>
        If you already have an account, you can <Link to="/login">Log In</Link>.
      </p>
      <p>
        If you are new here, feel free to <Link to="/register">Register</Link>.
      </p>
    </div>
  );
}

export default Home;
