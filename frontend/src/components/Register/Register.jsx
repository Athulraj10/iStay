import React from "react";
import FormValidation from "../Forms/FormValidation";


const RegisterPage = () => {
  const handleSubmit = (formData) => {
    // Handle form submission, e.g., make an API request
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <FormValidation onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;

