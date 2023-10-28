import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import { Col, Container, Button, Form, Row, FormGroup } from "react-bootstrap";
import { Avatar, useToast } from "@chakra-ui/react";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const toasty = useToast();

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

  const handleImage = async (pic) => {
    setImageLoading(true);
    if (pic === undefined) {
      toasty({
        title: "Please Select an Image !",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const userImage = new FormData();
      userImage.append("file", pic);
      userImage.append("upload_preset", "chat-app");
      // userImage.append("cloud_name","istayprocess");
      // console.log(userImage)
      fetch("https://api.cloudinary.com/v1_1/istayprocess/image/upload", {
        method: "POST",
        body: userImage,
      })
        .then((res) => res.json())
        .then((value) => {
          setImage(value.url.toString());
          setImageLoading(false);
          toast.success('Image uploaded')
        })
        .catch((error) => {
          console.error(error);
          setImageLoading(false);
        });
    } else {
      toasty({
        title: "Please Select an Image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setImageLoading(false);
      return;
    }
  };

  const handleSave = async () => {
    setIsEditable(false);
    const dataToUpdate = {
      name,
      email,
      mobile,
      image:image,
    };
    const response = await USERSAPI.put("users/profile", dataToUpdate, {
      params: { userId: userData[0]?._id },
    });
    console.log(response.data);
    if (response.data.updated) {
      setName(response.data.name);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
      setImage(response.data.image);
      toast.success(`${name} Profile Updated`);
    }
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo) {
      const fetchUserDetails = async () => {
        try {
          const response = await USERSAPI.get("/users/profile", {
            params: { userId: userInfo?._id },
          });
          if (response.data.userData) {
            setUserData(response?.data?.userData);
            setName(userData[0]?.name);
            setEmail(userData[0]?.email);
            setMobile(userData[0]?.mobile);
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
  }, [mobile]);
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "start" }}>
      <Container fluid className="m-5">
        <Row>
          <Col sm={12} className="content">
            <div>
              <h3 className="head text-white">
                My Profile
                <span style={{ marginLeft: "20px", alignItems: "center" }}>
                  <Avatar src={userData[0]?.pic} alt="User Avatar" />
                </span>
              </h3>

              <div className="formDiv">
                {userData ? (
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label className="fields text-white">
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        readOnly={!isEditable}
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
                        readOnly={!isEditable}
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
                        type="number"
                        readOnly={!isEditable}
                        name="mobile"
                        value={mobile}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicExperience"
                    >
                      <Form.Label className="fields text-white">
                        User Profile Picture
                      </Form.Label>
                      <input
                        type="file"
                        readOnly={!isEditable}
                        accept="image/*"
                        // value={mobile}
                        onChange={(e) => handleImage(e.target.files[0])}
                      />
                    </Form.Group>

                    {isEditable ? (
                      <>
                        <Button
                          className="m-2"
                          variant="primary"
                          onClick={handleSave}
                          // isLoading={imageLoading}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setIsEditable(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="text-white"
                        variant="info"
                        onClick={() => setIsEditable(true)}
                      >
                        Edit
                      </Button>
                    )}

                    {/* <Button variant="primary" onClick={handleSave}>
                      Save
                    </Button> */}
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
