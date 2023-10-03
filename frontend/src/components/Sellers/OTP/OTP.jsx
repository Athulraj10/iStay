import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useLocation } from 'react-router-dom';

const OTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const userEnterEmail = location.state.email;
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
  
  const [email, setEmail] = useState(location.state.email);
  const [enteredOTP, setOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      email,enteredOTP
    }
    try {
      let res = await USERSAPI.post("seller/verifyOTP", form);
      if (res.data) {
        const userId = res.data.user;
       return  navigate('/resetPassword',{state:{userId}})
      }else{
        console.log('error')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // If the error response contains a message, display it
        console.log(error)
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
                <h1 className="createAccount">OTP Verfication</h1>
              </div>
              <div className="centered-content">
                <h6 className="m-3">Enter the OTP you received in Email</h6>
                <h6 className="m-3">Please Don't share OTP To Anyone</h6>
              </div>
            </div>
          </Col>

          <Col xs={12} md={5} style={rightSection} className="card p-5 m-1">
            <h1>Verify OTP</h1>
            <Form onSubmit={handleSubmit}>
              {/* User Email Entering Place and Stored in State SetEmail  */}
              <Form.Group className="my-2" controlId="email">
                <Form.Label  className="m-2" >Enter OTP</Form.Label>
                <Form.Control
                  type="OTP"
                  placeholder="Enter OTP"
                  required
                  autoComplete="off"
                  value={enteredOTP}
                  className="m-2"
                  onChange={(e) => setOTP(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" className="m-2" variant="primary">
                Verify OTP
              </Button>

              {/* If user Already registered then Directed to register page  */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default OTP;