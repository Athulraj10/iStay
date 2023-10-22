import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo) {
      const fetchUserDetails = async () => {
        try {
          const response = await USERSAPI.get("/users/profile",{params:{userId:userInfo._id}});
          if (response.data.userData) {
            setUserData(response.data.userData);
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
            if (error.response.data.redirect) {
              setTimeout(() => {
                navigate(`${error.response.data.redirect}`);
              }, 1000);
            }
          } else {
            toast.error("Please Login");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        }
      };
      fetchUserDetails();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
     
     </div>
  );

}
