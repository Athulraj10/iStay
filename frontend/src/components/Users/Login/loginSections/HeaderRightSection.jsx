import { Button, Form, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";

// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../../../slices/usersApiSlice";
// import { setCredentials } from "../../../slices/authSlice";
// const navigate = useNavigate();

const HeaderRightSection = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    useEffect(() => {
      if (userInfo) {
        navigate("/");
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
      let res = await USERSAPI.post("users/login", formData);
      if (res.data) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        return navigate("/");
      } else {
        return navigate("/login");
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {/* User Email Entering Place and Stored in State SetEmail  */}
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* User Password Entering Place and Stored in State  */}
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Link to="/forget">
            <Form.Label
              className="mt-1 mb-2"
              style={{ color: "red", cursor: "pointer" }}
            >
              Forget Password
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
