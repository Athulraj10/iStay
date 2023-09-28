import React from "react";
import "tailwindcss/tailwind.css";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1>Register Page</h1>
        <hr className="mt-3" />
        <div className='mt-3'>
          <label for='username' className="block text-base mb-2">UserName</label>
          <input type="text" id="username" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="enter user name"/>
        </div>
      </div>
    </div>
  );
};

export default Register;
