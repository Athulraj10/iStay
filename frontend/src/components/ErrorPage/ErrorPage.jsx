import React from "react";
import { useLocation } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const parts = path.split("/");
  const route = parts[parts.length - 1];
  return (
    <>
      <h1 style={{  fontSize: "40px", fontWeight: "500",textAlign:'center',padding:'20px',color:'red' }}>
        {path}
      </h1>
      <div className="loader-container">
        <div className="loader">
          <h1 style={{ color: "white", fontSize: "40px", fontWeight: "500" }}>
            Not Found
          </h1>
          <div className="box box0">
            <div></div>
          </div>
          <div className="box box1">
            <div></div>
          </div>
          <div className="box box2">
            <div></div>
          </div>
          <div className="box box3">
            <div></div>
          </div>
          <div className="box box4">
            <div></div>
          </div>
          <div className="box box5">
            <div></div>
          </div>
          <div className="box box6">
            <div></div>
          </div>
          <div className="box box7">
            <div></div>
          </div>
          <div className="ground">
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
