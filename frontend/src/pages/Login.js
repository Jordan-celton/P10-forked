// Login.js
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (username && password) {
      setIsLoggedIn(true);
      navigate("/user");
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate("/"); // Redirection vers la page de connexion
  };

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome back, {username}!</h1>
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
        <Navigate to="/user" />
      </div>
    );
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
