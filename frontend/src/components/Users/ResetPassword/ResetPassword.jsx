import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from 'react'
import { useLocation } from 'react-router-dom'
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rightSection = {
    margin:'40px',
    background: "rgba(255, 255, 255, 0.052)",
    color: "white",
    height:'70vh'
  };

  const leftSection = {
    background: "rgba(255, 255, 255, 0)",
    color: rightSection.color,
    height:rightSection.height
  };

  
  const [userId, setUserId] = useState(location.state.userId);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
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
    return isValid;
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm()
    const form = {
      userId,password
    }
    try {
      let res = await USERSAPI.post("users/resetPassword", form);
      if (res.data) {
       return navigate('/login')
      }else{
        console.log('error')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // If the error response contains a message, display it
        toast.error(error.response.data.message);
      } else {
        // If there's no specific error message, display a generic error message
        toast.error('An error occurred. Please try again.');
      }
    }
  }

  return (
    <>
      <Container style={{height:'100vh'}}>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} style={leftSection} className="card p-5">
            <div className="container">
              <div className="left-content">
                <h1 className="createAccount">Reset Password</h1>
              </div>
              <div className="centered-content">
                <h6 className="m-3">Enter the New Password</h6>
                <h6 className="m-3">Please Conform Your Password</h6>
              </div>
            </div>
          </Col>

          <Col xs={12} md={5} style={rightSection} className="card p-5 m-1">
            <h1>Reset Password</h1>
            <Form onSubmit={handleSubmit}>

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

            <div className="mt-3 text-center">
              <Button type="submit" variant="primary">
                Register
              </Button>
            </div>
          </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ResetPassword;