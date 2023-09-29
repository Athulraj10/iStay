import { Container, Button, Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const HeaderRightSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sumbitHandler = () => {
    e.preventDefault();
    console.log("value submitted");
  };


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
