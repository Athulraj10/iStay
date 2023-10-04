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
      console.log("formData",formData)
      let res = await USERSAPI.post("users/register",formData);
      if (res.data) {
        console.log(res)
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message)
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
