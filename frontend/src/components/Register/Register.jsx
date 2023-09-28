import RegisterValidation from "./RegistrationValidation";


const RegisterPage = () => {
  const handleSubmit = (formData) => {
    // Handle form submission, e.g., make an API request
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <RegisterValidation onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;

