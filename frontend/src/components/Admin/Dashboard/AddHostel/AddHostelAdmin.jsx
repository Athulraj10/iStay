import React, { useState } from "react";
import "./AddHostelAdmin.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const AddHostelAdmin = () => {
  const [formData, setFormData] = useState({
    category: "", // Initial value for category
    name: "", // Initial value for name
    email: "", // Initial value for email
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
      } else {
        console.error("Form data submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    //   <Container style={{color:'white'}}>
    //   <Row className="photoAddContainer">
    //     <Col lg={12} className=" d-flex align-items-center justify-content-center">
    //       <Button className="primaryPhotoText">+ Primary Photo</Button>
    //     </Col>
    //   </Row>
    // </Container>
    <Container style={{ color: "white" }}>
      <Form onSubmit={handleSubmit}>
        <Row className="photoAddContainer">
          <Col
            lg={12}
            className="d-flex align-items-center justify-content-center"
          >
            <Button className="primaryPhotoText" type="submit">
              + Primary Photo
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg={2} className="">
            <Button
              className="primaryPhotoText"
              type="submit"
              style={{ height: "100px" }}
            >
              + Add Remaining Photo
            </Button>
          </Col>

          {/* ----------about hostel details */}
          <Col lg={4}>
            <Form.Group controlId="category">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Control
                className="m-1 form-input" // Add the form-input class here
                placeholder="Category Ex: Gents or Womens"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="name">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                className="m-1"
                type="text"
                placeholder="Enter Hostel Name"
                name="hostelName"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                className="m-1"
                placeholder="Enter Main Location"
                type="text"
                name="mainLocation"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                id="custom-input-bg" // Add the id here
                className="m-1"
                placeholder="Enter Anything About Hostel"
                type="text"
                name="about hostel"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddHostelAdmin;
