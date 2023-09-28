import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../Forms/FormContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <FormContainer>
      <h1>Login </h1>
      {/* Normally we are useing forms */}
      <Form onSubmit={sumbitHandler}>
        {/* for wraping our content into a group of items like Div Started */}
        <Form.Group className="my-2" controlId="email">
          {/* Normal like a label input box top Nameing Email Address */}
          <Form.Label>Email Address</Form.Label>
          {/* Controll is LIke a input box same as a HTMl */}
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
          {/* for wraping our content into a group Ended */}
        </Form.Group>

        {/* for wraping our content into a group of items like Div Started */}
        <Form.Group className="my-2" controlId="password">
          {/* Normal like a label input box top Nameing Email Address */}
          <Form.Label>Email Password</Form.Label>
          {/* Controll is LIke a input box same as a HTMl */}
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
          {/* for wraping our content into a group Ended */}
        </Form.Group>

        {/* creating a button for submit values */}
        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
