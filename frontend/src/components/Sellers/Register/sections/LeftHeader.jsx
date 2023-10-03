import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom';

const LeftHeader = () => {
    return (
      <div className="container">
        <div className="left-content">
          <h1 className="createAccount">Please login to explore more</h1>
        </div>
        <div className="centered-content">
          <h6 className="loginDecription">Login using Email and Password</h6>
         <Link to='/seller/login'>
         <button className="loginButton">Login</button>
         </Link>
        </div>
      </div>
    );
  };
  

export default LeftHeader;