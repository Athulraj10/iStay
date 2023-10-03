import { useNavigate } from "react-router-dom";
import RegisterValidation from "./RegistrationValidation";
import BodySection from "./sections/BodySection";
import MainSection from "./sections/MainSection";
import Navbars from "./sections/Navbar";
import { useEffect } from "react";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const sellerInfo = localStorage.getItem("sellerInfo");
 if(sellerInfo){
  useEffect(() => {
    if (sellerInfo) {
      navigate("/seller/dashboard");
    }
  });
 }
 const handleSubmit = async (formData) => {
  try {
    console.log(formData);
    let res = await USERSAPI.post("/seller/register", formData);
    if (res.data) {
      // Store seller info in localStorage
      localStorage.setItem("sellerInfo", JSON.stringify(res.data));
      // Redirect to the login page
      navigate("/seller/login");
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message || error.response || 'Something Went Wrong'); // This will display an error message if registration fails
  }
};



 

  return (
    <div>
      <RegisterValidation onSubmit={handleSubmit} />
      <Navbars />
      <BodySection />
      <MainSection />
    </div>
  );
};

export default RegisterPage;
