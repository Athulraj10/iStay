import { Button, Form, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import Cookies from "js-cookie";

// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../../../slices/usersApiSlice";
// import { setCredentials } from "../../../slices/authSlice";

const HeaderRightSection = () => {
  const navigate = useNavigate();
  const adminInfo = localStorage.getItem("adminInfo");
  if (adminInfo) {
    useEffect(() => {
      if (adminInfo) {
        navigate("/admin/dashboard");
      }
    });
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: email,
        password: password,
      };
      let response = await USERSAPI.post("admin/login", formData);
      if (response.data) {
        localStorage.setItem("adminInfo", JSON.stringify(response.data));
        Cookies.set('admin_JWT_token',response.data.token)
        // window.location.reload(false)
        navigate("/admin/dashboard");
        return;  
      } 
      // else {
      //   return navigate("/admin");
      // }
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        return toast.error("Invalid email or password.");
      } else {
        return toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
    <div
      className="sellerSection"
      style={{ textAlign: "end", fontSize: "20px" }}
    >
      <Link
        to="/login"
        style={{
          padding: "5px",
          border: "1px solid silver",
          textDecoration: "none",
          color: "silver",
          borderRadius: "5px",
        }}
      >
        User Login
      </Link>
    </div>
    <h1>Admin Login</h1>
    <Form onSubmit={handleSubmit}>
      {/* User Email Entering Place and Stored in State SetEmail  */}
      <Form.Group className="my-2" controlId="email">
        <Form.Label>Unique ID</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter ID"
          required
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      {/* User Password Entering Place and Stored in State  */}
      <Form.Group className="my-2" controlId="password">
        <Form.Label>Key</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Key"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group>
        <Link to="/admin/forget">
          <Form.Label
            className="mt-1 mb-2"
            style={{ color: "red", cursor: "pointer" }}
          >
            Forget Key
          </Form.Label>
        </Link>
      </Form.Group>

      <Button type="submit" className="m-0" variant="primary">
        Sign In
      </Button>

      {/* If user Already registered then Directed to register page  */}
    </Form>
  </>
);
};


export default HeaderRightSection;
