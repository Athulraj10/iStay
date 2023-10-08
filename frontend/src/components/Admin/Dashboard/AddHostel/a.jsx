import React, { useState } from "react";
import "./AddHostelAdmin.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";

const AddHostelAdmin = () => {
  const [formData, setFormData] = useState({
    file: null, // Store the primary image here
    category: "",
    hostelName: "",
    // ... other fields
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleAdditionalImagesChange = (e) => {
    const files = e.target.files;
    const primaryImage = files[0];

    setFormData({
      ...formData,
      file: primaryImage, // Store the primary image in the file field
    });

    const primaryImageUrl = URL.createObjectURL(primaryImage);
    setImageUrl(primaryImageUrl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file);

    // Append other form fields to formDataToSend
    formDataToSend.append("category", formData.category);
    formDataToSend.append("hostelName", formData.hostelName);
    // ... append other fields

    try {
      const response = await USERSAPI.post(
        "admin/listHostels/addhostelDetails",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.ok) {
        console.log("Form data submitted successfully");
      } else {
        console.error("Form data submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container style={{ color: "white" }}>
      <Form onSubmit={handleSubmit}>
        <Row className="photoAddContainer m-5">
          <Col
            lg={12}
            className="d-flex align-items-center justify-content-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Button className="primaryPhotoText primaryPhotoButton">
              Primary Image will Show here
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
              <input
                type="file"
                name="file"
                onChange={handleAdditionalImagesChange}
                multiple
                accept="image/*"
              />
              + Add Remaining Photos
            </Button>
          </Col>
          {/* ... other form fields */}
        </Row>
        <Row className="m-4">
          <Col
            lg={12}
            className="d-flex align-items-center justify-content-center"
          >
            <Button className="primaryPhotoText myCustomButton" type="submit">
              Submit Data
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddHostelAdmin;
