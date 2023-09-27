import { useState } from "react";
import "./FormValidation.jsx";

const FormValidation = (props) => {

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
     
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormValidation;