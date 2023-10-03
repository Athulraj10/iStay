import React from "react";
import { Container,Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeaderLeftSection = () => {


  return (
    <div className="container">
    <div className="left-content">
      <h1 className="createAccount">Create a Seller Account</h1>
    </div>
    <div className="centered-content">
      <h6 className="loginDecription">You can share available Hostels your own</h6>
     <Link to='/sellers/register'>
     <button className="loginButton">Register</button>
     </Link>
    </div>
  </div>
    );
};

export default HeaderLeftSection;
