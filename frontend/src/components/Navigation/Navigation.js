// src/components/Navigation/Nav.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import "../Navigation/Navigation.css";
import argentBankLogo from "./argentBankLogo.webp";

const Nav = () => {
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    dispatch(logout());
    navigate("/"); // Redirection vers la page d'accueil après déconnexion
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <div>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {username}
            </Link>
            <a className="main-nav-item" href="/" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
