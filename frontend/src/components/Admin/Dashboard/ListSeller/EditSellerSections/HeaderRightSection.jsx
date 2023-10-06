import { Button, Form,Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../../AxiosAPI/AxiosInstance"

// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../../../slices/usersApiSlice";
// import { setCredentials } from "../../../slices/authSlice";

const HeaderRightSection = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const sellerData = location.state.sellerData;
  
  const [sellerId, setSellerId] = useState(sellerData._id);
  const [sellerName, setSellerName] = useState(sellerData.name || 'sellerName');
  const [email, setEmail] = useState(sellerData.email ||"email");
  const [mobile, setMobile] = useState(sellerData.mobile || "Number");
  const [locations, setLocations] = useState(sellerData.location || "Location");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        sellerName,email,mobile,locations,sellerId
      };
      let res = await USERSAPI.post("admin/listSeller/editSellerDetails", formData);
      if(res.data.sellerData){
        navigate('/admin/listSellers')
      }
    } catch (error) {
      return toast.error(error.response.data.message || error.response.data || error.response || error);
    }
  };

  return (
    <>

  <h1>Edit Seller Details</h1>
      <Container className="justify-content-center">
        <Form onSubmit={handleSubmit}>
          {/* User Password Entering Place and Stored in State */}
          <Form.Group className="my-2" controlId="password">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="String"
              placeholder="Enter Key"
              required
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
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
          value={locations}
          onChange={(e) => setLocations(e.target.value)}
        ></Form.Control>
      </Form.Group>


     {/* Center-aligned button */}
     <Button type="submit" className="mt-3" variant="primary">
            Edit Seller Details
          </Button>

          {/* If user Already registered then Directed to the register page */}
        </Form>
      </Container>
    </>
);
};


export default HeaderRightSection;
