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
  const userInfo = localStorage.getItem("userInfo");
 if(userInfo){
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  });
 }
  const handleSubmit = async (formData) => {
    try {
      let response = await USERSAPI.post("users/register",formData);
      if (response.data) {
         navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? 'An error occurred');
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
