import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-page">
      <h1>Sign In</h1>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
