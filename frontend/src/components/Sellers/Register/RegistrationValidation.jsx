import React, { useState } from "react";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LeftHeader from "./sections/LeftHeader";

const FormValidation = ({ onSubmit }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const validateForm = () => {
    let isValid = true;
    const hasNumber = /\d/;
    // Validate user name
    if (name.trim() === "") {
      setnameError("Seller Name is required.");
      isValid = false;
    } else if (hasNumber.test(name)) {
      setnameError("Number Not Allowed");
      isValid = false;
    } else if (name.length < 3) {
      setnameError("Please Provide Full Name");
    } else {
      setnameError("");
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
        name,
        email,
        password,
        mobile,
      });
    } else {
      // Form is not valid, do not submit
    }
  };
  const rightSection = {
    background: "rgba(255, 255, 255, 0.052)",
    color: "white",
  };
  const leftSection = {
    background: "rgba(255, 255, 255, 0)",
    color: rightSection.color,
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} style={leftSection} className="card p-5">
          <LeftHeader />
        </Col>

        <Col xs={12} md={5} style={rightSection} className="card p-5 ms-5">
          <h1>Register New Seller</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mt-2 mb-3">
              <Form.Label>Seller Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Seller Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <Form.Text className="text-danger">{nameError}</Form.Text>
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="email" className="mt-2 mb-3">
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
            <Form.Group controlId="password" className="mt-2 mb-3">
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
            <Form.Group controlId="confirmPassword" className="mt-2 mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Form.Text className="text-danger">
                {confirmPasswordError}
              </Form.Text>
            </Form.Group>

            {/* Mobile Number */}
            <Form.Group controlId="mobile" className="mt-2 ">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <Form.Text className="text-danger">{mobileError}</Form.Text>
            </Form.Group>

            <div className="mt-3 text-center">
              <Button type="submit" variant="primary">
                Register seller
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormValidation;
