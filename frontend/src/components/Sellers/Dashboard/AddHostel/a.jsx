import React, { useState } from "react";
import "./AddHostelAdmin.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";

const AddHostelAdmin = () => {
  const [formData, setFormData] = useState({
    files: [],
    category: "",
  });
  const [imageUrls, setImageUrls] = useState([]);
  
  const handleAdditionalImagesChange = (e) => {
    const files = e.target.files;
    const newFiles = Array.from(files);
    const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
    
    setFormData({
      ...formData,
      files: [...formData.files, ...newFiles],
    });
    
    setImageUrls([...imageUrls, ...newImageUrls]);
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
    formData.files.forEach(file => formDataToSend.append("files", file));
    formDataToSend.append("category", formData.category);

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
        </Row>

        {/* Display selected images */}
        {imageUrls.length > 0 && (
          <Row className="m-4">
            {imageUrls.map((url, index) => (
              <Col key={index} lg={3}>
                <img src={url} alt={`Image ${index}`} style={{ maxWidth: "100%" }} />
              </Col>
            ))}
          </Row>
        )}

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
