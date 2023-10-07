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
        <Row className="photoAddContainer m-5">
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
          <Col
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
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
                id="custom-input-bg"
                className="ms-3 m-2 form-input" // Add the form-input class here
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
                id="custom-input-bg"
                className="ms-3 m-2 form-input"
                type="text"
                placeholder="Enter Hostel Name"
                name="hostelName"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                id="custom-input-bg"
                className="ms-3 m-2 form-input"
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
                className="ms-3 m-2 form-input"
                placeholder="Enter Description"
                type="text"
                name="about hostel"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group controlId="category">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Control
                id="custom-input-bg"
                className="ms-3 m-2 form-input" // Add the form-input class here
                placeholder="Provide Full Details with Pincode"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="name">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                id="custom-input-bg"
                className="ms-3 m-2 form-input"
                type="text"
                placeholder="Provide Contact Number"
                name="hostelName"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                id="custom-input-bg"
                className="ms-3 m-2 form-input"
                placeholder="Map Link"
                type="text"
                name="mainLocation"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                id="custom-input-bg" // Add the id here
                className="ms-3 m-2 form-input"
                placeholder="Enter Anything Additional About Hostel"
                type="text"
                name="about hostel"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>


        <Row className="mt-5">
          <Col
            lg={3} >
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
                id="custom-input-bg"
                className="ms-3 m-2 form-input" // Add the form-input class here
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
                id="custom-input-bg"
                className="ms-3 m-2 form-input"
                type="text"
                placeholder="Enter Hostel Name"
                name="hostelName"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                id="custom-input-bg"
                className="ms-3 m-2 form-input"
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
                className="ms-3 m-2 form-input"
                placeholder="Enter Description"
                type="text"
                name="about hostel"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group controlId="category">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Control
                id="custom-input-bg"
                className="ms-3 m-2 form-input" // Add the form-input class here
                placeholder="Provide Full Details with Pincode"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="name">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                id="custom-input-bg"
                className="ms-3 m-2 form-input"
                type="text"
                placeholder="Provide Contact Number"
                name="hostelName"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                id="custom-input-bg"
                className="ms-3 m-2 form-input"
                placeholder="Map Link"
                type="text"
                name="mainLocation"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                id="custom-input-bg" // Add the id here
                className="ms-3 m-2 form-input"
                placeholder="Enter Anything Additional About Hostel"
                type="text"
                name="about hostel"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* <Row className="m-4">
          <Col lg={3}>
            <Form.Group controlId="category">
              <Form.Label className="mb-3 mt-2">
                <strong>Restrictions</strong>
              </Form.Label>
              <Form.Control
                id="custom-input-bg"
                className="form-input mb-3" // Add the form-input class here
                placeholder="Enter Any restrictions"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
                id="custom-input-bg"
                className="form-input  mb-3" // Add the form-input class here
                placeholder="Enter Guest Profile"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group controlId="category">
              <Form.Label className="ms-3 m-2 ">
                <strong>Price And Details</strong>
              </Form.Label>
              <Form.Control
               className="m-2 "
                id="custom-input-bg"
                placeholder="Enter Price"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
               className="m-2"
                id="custom-input-bg"
                placeholder="Any Extra Charge"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
               className="m-2"
                id="custom-input-bg"
                placeholder="Enter Total Bed"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
               className="m-2"
                id="custom-input-bg"
                placeholder="Enter bed Available"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group controlId="category">
            <Form.Label className="ms-3 m-3 ">
               
              </Form.Label>
              <Form.Control
               className="m-2 "
                id="custom-input-bg"
                placeholder="Enter WIFI available"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
               className="m-2"
                id="custom-input-bg"
                placeholder="Food Available"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
               className="m-2"
                id="custom-input-bg"
                placeholder="Parking Available"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
               className="m-2"
                id="custom-input-bg"
                placeholder="Drinking Water Available Yes Or No"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

          </Col>
        </Row> */}
      </Form>
    </Container>
  );
};

export default AddHostelAdmin;
