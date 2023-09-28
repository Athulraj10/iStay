import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom';

const RegisterHeaderLeft = () => {
    return (
      <div className="container">
        <div className="left-content">
          <h1 className="createAccount">Create an account</h1>
        </div>
        <div className="centered-content">
          <h6 className="loginDecription">Login using YourName and Password</h6>
         <Link to='/login'>
         <button className="loginButton">Login</button>
         </Link>
        </div>
      </div>
    );
  };
  

export default RegisterHeaderLeft
// const RegisterHeaderLeft = () => {
//     return (
//       <div className="container">
//         <div className="centered-content">
//           <h1 className="createAccount">Create an account</h1>
//           <h6 className="loginDescription">Login using YourName and Password</h6>
//           <button className="loginButton">Login</button>
//         </div>
//       </div>
//     );
//   };
  