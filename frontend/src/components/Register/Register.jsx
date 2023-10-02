import { useNavigate } from "react-router-dom";
import { USERSAPI } from "../AxiosAPI/AxiosInstance";
import RegisterValidation from "./RegistrationValidation";
import BodySection from "./sections/BodySection";
import MainSection from "./sections/MainSection";
import Navbars from "./sections/Navbar";
import { useEffect } from "react";


const RegisterPage = () => {
  const userInfo = localStorage.getItem('userInfo')
const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    // Handle form submission, e.g., make an API request
    console.log("Form data submitted:", formData);
    let res = await USERSAPI.post('users/register',formData)
    if(res.data){
      localStorage.setItem('userInfo',JSON.stringify(res.data));
      navigate('/')
    }
    console.log(res.data)
  };

  useEffect(()=>{
    if(userInfo){
      navigate("/")
    }
  })

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

