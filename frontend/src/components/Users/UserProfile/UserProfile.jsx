import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData,setUserData]=useState()

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);

    const fetchUserDetails = async () => {
      try {
        const response = await USERSAPI.get("/users/profile");
        if (response.data.userDetails) {
          setUserData(response.data.userDetails)
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
              // if no token this will work
              navigate(`${error.response.data.redirect}`);
            }, 3000);
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
  }, []);

   console.log(userData)
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <div className="bg-blue-300">
        <div className="container mx-auto py-5">
          <div className="flex justify-center items-center h-full">
            <div className="lg:w-9/12 xl:w-full">
              <div
                className="bg-black rounded-t text-white flex flex-row"
                style={{ height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 flex flex-col"
                  style={{ width: "150px" }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Profile Image"
                    className="mt-4 mb-2 rounded-lg"
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <button className="bg-white text-dark py-1 px-4 mt-2 hover:bg-gray-200 focus:outline-none">
                    Edit Profile
                  </button>
                </div>
                <div className="ms-3 mt-5">
                  <h5 className="text-xl">Athul raj</h5>
                  <p>Kerala</p>
                </div>
              </div>
              <div className="p-4 bg-gray-100">
                <div className="flex justify-end text-center py-1">
                  <div>
                    <p className="mb-1 text-xl">253</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 text-xl">1026</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xl">478</p>
                  </div>
                </div>
              </div>
              <div className="text-black p-4">
                <div className="mb-5">
                  <p className="text-xl font-normal mb-1">About</p>
                  <div className="p-4 bg-gray-100">
                    <p className="italic mb-1">Web Developer</p>
                    <p className="italic mb-1">Lives in New York</p>
                    <p className="italic mb-0">Photographer</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xl font-normal mb-0">Recent photos</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Place your recent photos here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
