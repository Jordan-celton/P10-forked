import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../actions/authActions";
import "../styles/User.css";

const User = () => {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateUsername(newUsername)); //
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewUsername(username);
    setFirstName("");
    setLastName("");
  };

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

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
                value={firstName}
                onChange={(event) => handleInputChange(event, setFirstName)}
                className="edit-input"
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(event) => handleInputChange(event, setLastName)}
                className="edit-input"
                placeholder="Last Name"
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
