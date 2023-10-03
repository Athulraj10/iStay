import React from "react";
import { Link } from "react-router-dom";

const HeaderLeftSection = () => {
  return (
    <div className="container">
      <div className="left-content">
        <h1 className="createAccount">Create an account</h1>
      </div>
      <div className="centered-content">
        <h6 className="loginDecription">New User Free To log</h6>
        <Link to="/register">
          <button className="loginButton">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderLeftSection;
