import { Button, Form, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../../slices/usersApiSlice";
import { setCredentials } from "../../../slices/authSlice";

import { toast } from 'react-toastify';


const HeaderRightSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sumbitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await login({email,password}).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/')
    } catch (err) {
      toast.error(err ?.data ?.message || err.error)
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={sumbitHandler}>
        {/* User Email Entering Place and Stored in State SetEmail  */}
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
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
