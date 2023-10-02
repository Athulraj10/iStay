import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../AxiosAPI/AxiosInstance";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate=useNavigate()

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
  
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      email
    }
    try {
      let res = await USERSAPI.post("users/forget", form);
      if (res.data) {
        navigate('/OTP',{state:email})
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <>
      <Container style={{height:'100vh'}}>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} style={leftSection} className="card p-5">
            <div className="container">
              <div className="left-content">
                <h1 className="createAccount">Forget Password</h1>
              </div>
              <div className="centered-content">
                <h6 className="m-3">We will sent an OTP to verify</h6>
                <h6 className="m-3">Please Don't share OTP To Anyone</h6>
              </div>
            </div>
          </Col>

          <Col xs={12} md={5} style={rightSection} className="card p-5 m-1">
            <h1>Reset Password</h1>
            <Form onSubmit={handleSubmit}>
              {/* User Email Entering Place and Stored in State SetEmail  */}
              <Form.Group className="my-2" controlId="email">
                <Form.Label  className="m-2" >Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  required
                  autoComplete="off"
                  value={email}
                  className="m-2"
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" className="m-2" variant="primary">
                Sent OTP
              </Button>

              {/* If user Already registered then Directed to register page  */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgetPassword;
