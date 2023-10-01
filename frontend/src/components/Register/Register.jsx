import RegisterValidation from "./RegistrationValidation";
import BodySection from "./sections/BodySection";
import MainSection from "./sections/MainSection";
import Navbars from "./sections/Navbar";


const RegisterPage = () => {
  const handleSubmit = (formData) => {
    // Handle form submission, e.g., make an API request
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <RegisterValidation onSubmit={handleSubmit} />
      <Navbars/>
      <BodySection/>
      <MainSection/>
    </div>
  );
};

export default RegisterPage;

