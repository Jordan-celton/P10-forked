// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("L'email et le mot de passe sont requis.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Échec de la connexion:", data); // Affichez les détails de l'échec de la connexion
        setError(data.message || "Identifiants incorrects");
        return;
      }

      setIsLoggedIn(true);
      localStorage.setItem("authToken", data.body.token); // Stocke le token
      navigate("/user"); // Redirection après connexion réussie
    } catch (error) {
      console.error("Erreur pendant la connexion:", error);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/"); // Redirection vers la page d'accueil
  };

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome back!</h1>
        <button onClick={handleSignOut}>Sign Out</button>
        {/* On utilise navigate directement pour redirection */}
        {/* <Navigate to="/user" /> */}
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
