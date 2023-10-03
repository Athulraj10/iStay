import React from "react";
import { Container,Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeaderLeftSection = () => {


  return (
    <div className="container">
    <div className="left-content">
      <h1 className="createAccount">Hey Admin !</h1>
    </div>
    <div className="centered-content">
      <h6 className="loginDecription">Here some Additional Information</h6>
    </div>
  </div>
    );
};

export default HeaderLeftSection;
