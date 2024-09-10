// components/User.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername, checkAuthStatus } from "../actions/authActions";
import "../styles/User.css";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { username, firstName, lastName, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateUsername(newUsername));
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewUsername(username);
    setNewFirstName(firstName);
    setNewLastName(lastName);
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!isEditing ? (
            <>{username}!</>
          ) : (
            <>
              <input
                type="text"
                value={newUsername}
                onChange={(event) => handleInputChange(event, setNewUsername)}
                className="edit-input"
                placeholder="Username"
              />
              <input
                type="text"
                value={newFirstName}
                onChange={(event) => handleInputChange(event, setNewFirstName)}
                className="edit-input"
                placeholder="First Name"
                disabled
              />
              <input
                type="text"
                value={newLastName}
                onChange={(event) => handleInputChange(event, setNewLastName)}
                className="edit-input"
                placeholder="Last Name"
                disabled
              />
            </>
          )}
        </h1>
        {!isEditing ? (
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        ) : (
          <div className="button-container">
            <button className="save-button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;
