import { Button, Form, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";

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
    e.preventDefault()
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
      }
     catch (error) {
     return toast.error(error.response.data.message);
    }
  };

  //   const handleSubmit = async () => {
  //     try {
  //       let res = await USERSAPI.post("users/register", formData);
  //       if (res.data) {
  //         localStorage.setItem("userInfo", JSON.stringify(res.data));
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };
  // };
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [login, { isLoading }] = useLoginMutation();

  // const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate, userInfo]);

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
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>

        {/* If user Already registered then Directed to register page  */}
      </Form>
    </>
  );
};

export default HeaderRightSection;
