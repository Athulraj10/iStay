import React, { useState } from "react";
import FormContainer from "./FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormValidation = ({ onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const validateForm = () => {
    let isValid = true;
    const hasNumber = /\d/;
    // Validate user name
    if (userName.trim() === "") {
      setUserNameError("User Name is required.");
      isValid = false;
    } else if (hasNumber.test(userName)) {
      setUserNameError("Number Not Allowed");
      isValid = false;
    } else if (userName.length < 3) {
      setUserNameError("Please Provide Full Name");
    } else {
      setUserNameError("");
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Invalid mobile number.");
      isValid = false;
    } else {
      setMobileError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form
    if (validateForm()) {
      console.log("Form submitted");
      onSubmit({
        userName,
        email,
        password,
        mobile,
      });
    } else {
      // Form is not valid, do not submit
    }
  };

  return (

    <FormContainer>
      <h1>Register New User</h1>
      <Form onSubmit={handleSubmit}>


        {/* User Name */}
        <Form.Group controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Form.Text className="text-danger">{userNameError}</Form.Text>
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <Form.Text className="text-danger">{emailError}</Form.Text>
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-danger">{passwordError}</Form.Text>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Form.Text className="text-danger">{confirmPasswordError}</Form.Text>
        </Form.Group>

        {/* Mobile Number */}
        <Form.Group controlId="mobile">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            />
          <Form.Text className="text-danger">{mobileError}</Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>

        <Row className="py-3">
          <Col>
            Already a customer? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default FormValidation;
