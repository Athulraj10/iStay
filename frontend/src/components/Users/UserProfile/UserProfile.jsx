import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import { Col, Container, Button, Form, Row } from "react-bootstrap";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [mobile, setMobile] = useState(userData?.mobile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    const dataToUpdate = {
      name,
      email,
      mobile,
    };
    const response = await USERSAPI.put("/profile", dataToUpdate);
    if (response) {
    }
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo) {
      const fetchUserDetails = async () => {
        try {
          const response = await USERSAPI.get("/users/profile", {
            params: { userId: userInfo._id },
          });
          console.log(response)
          if (response.data.userData) {
            setUserData(response.data.userData);
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
            if (error.response.data.redirect) {
              setTimeout(() => {
                navigate(`${error.response.data.redirect}`);
              }, 1000);
            }
          } else {
            toast.error("Please Login");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        }
      };
      fetchUserDetails();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "start" }}>
      <Container fluid className="m-5">
        <Row>
          <Col sm={12} className="content">
            <div>
              <h3 className="head text-white">My Profile</h3>
              <div className="formDiv">
                {userData ? (
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label className="fields text-white">
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="fields text-white">
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicExperience"
                    >
                      <Form.Label className="fields text-white">
                        Mobile Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={mobile}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSave}>
                      Save
                    </Button>
                  </Form>
                ) : (
                  // If userData is not available, show loading or default content
                  <p>Loading user data...</p> // You can replace this with any loading content
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        className="m-5"
        style={{ borderRadius: "20px", border: "1px solid silver" }}
      >
        <Row
          style={{
            backgroundColor: "#0f172a",
            height: "auto",
            width: "auto",
            borderRadius: "20px",
          }}
        >
          <Col sm={12} className="content">
            <div className="wallet-container">
              <h1 className="head text-center text-white p-3">
                My Wallet Balance
              </h1>
              <div className="wallet-balance">
                <h1 className="balance-amount p-1 text-white text-center">
                  {" "}
                  {/* Use text-center class */}
                  {userData[0]?.wallet?.balance || 0}
                </h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
