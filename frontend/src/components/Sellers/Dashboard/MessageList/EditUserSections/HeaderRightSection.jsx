import { Button, Form,Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../../AxiosAPI/AxiosInstance"

// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../../../slices/usersApiSlice";
// import { setCredentials } from "../../../slices/authSlice";

const HeaderRightSection = () => {
  const locations = useLocation();
  const navigate = useNavigate();
  
  const userData = locations.state.userData;
  
  const [userId, setUserId] = useState(userData._id);
  const [userName, setUserName] = useState(userData.name || 'userName');
  const [email, setEmail] = useState(userData.email ||"email");
  const [mobile, setMobile] = useState(userData.mobile || "Number");
  const [location, setLocation] = useState(userData.location || "Location");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        userName,email,mobile,location,userId
      };
      let res = await USERSAPI.post("admin/listUsers/editUserDetails", formData);
      if (res.data) {
        navigate("/admin/listUsers");
        } 
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <>

  <h1>Edit User Details</h1>
      <Container className="justify-content-center">
        <Form onSubmit={handleSubmit}>
          {/* User Password Entering Place and Stored in State */}
          <Form.Group className="my-2" controlId="password">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="String"
              placeholder="Enter Key"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

      {/* User Password Entering Place and Stored in State  */}
      <Form.Group className="my-2" controlId="password">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>


      {/* User Password Entering Place and Stored in State  */}
      <Form.Group className="my-2" controlId="password">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          type="number"
          required
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        ></Form.Control>
      </Form.Group>



      {/* User Password Entering Place and Stored in State  */}
      <Form.Group className="my-2" controlId="password">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="String"
          placeholder="Enter Key"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        ></Form.Control>
      </Form.Group>


     {/* Center-aligned button */}
     <Button type="submit" className="mt-3" variant="primary">
            Edit User Details
          </Button>

          {/* If user Already registered then Directed to the register page */}
        </Form>
      </Container>
    </>
);
};


export default HeaderRightSection;
