import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../Forms/FormContainer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <FormContainer>
      <h1>sign in </h1>
      {/* Normally we are useing forms */}
      <Form onSubmit={sumbitHandler}>
        {/* for wraping our content into a group of items like Div Started */}
        <Form.Group className="my-2" controlId="email">
          {/* Normal like a label input box top Nameing Email Address */}
          <Form.Label>Email Address</Form.Label>
          {/* Controll is LIke a input box same as a HTMl */}
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            >
          </Form.Control>
        {/* for wraping our content into a group Ended */}
        </Form.Group>

      </Form>
    </FormContainer>
  );
};

export default Register;
