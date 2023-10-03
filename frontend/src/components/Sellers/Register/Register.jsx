import { useNavigate } from "react-router-dom";
import RegisterValidation from "./RegistrationValidation";
import BodySection from "./sections/BodySection";
import MainSection from "./sections/MainSection";
import Navbars from "./sections/Navbar";
import { useEffect } from "react";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";

const RegisterPage = () => {
  const navigate = useNavigate();
  const sellerInfo = localStorage.getItem("sellerInfo");
 if(sellerInfo){
  useEffect(() => {
    if (sellerInfo) {
      navigate("/");
    }
  });
 }
  const handleSubmit = async (formData) => {
    try {
      let res = await USERSAPI.post("seller/register", formData);
      if (res.data) {
        localStorage.setItem("sellerInfo", JSON.stringify(res.data));
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
