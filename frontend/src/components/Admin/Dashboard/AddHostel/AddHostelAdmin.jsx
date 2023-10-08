import React, { useState } from "react";
import "./AddHostelAdmin.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import axios from "axios";

const AddHostelAdmin = () => {
  const [formData, setFormData] = useState({
    primaryImage: "",
    file: "", 
    category: "",
    hostelName: "",
    mainLocation: "",
    descriptions: "",
    fullDetails: "",
    contactNumber: "",
    mapLink: "",
    additionalAboutHostel: "",
    nearByLocation: "",
    restrictions: "",
    descriptionAboutHostel: "",
    guestProfile: "",
    price: "",
    extraPrice: "",
    totalBedInRoom: "",
    bedAvailableNow: "",
    Wifi: "",
    food: "",
    parking: "",
    drinkingWater: "",
  });

  const [primaryImage, setPrimaryImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleAdditionalImagesChange = (e) => {
    const files = e.target.files;
    const primaryImage = files[0];
    const additionalImages = Array.from(files);
  
    setPrimaryImage(primaryImage);
    const primaryImageUrl = URL.createObjectURL(primaryImage);
    setImageUrl(primaryImageUrl);
  
    // Create a new FormData object
    const formDataObject = new FormData();
  
    // Append the primary image as "file"
    formDataObject.append("file", primaryImage);
  
    // Append additional images (if any) with the same field name
    additionalImages.forEach((image) => {
      formDataObject.append("additionalImages", image); // Change "file" to "additionalImages"
    });
  
    // Update the state with the FormData object
    setFormData(formDataObject);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
     
  //     const formData = new FormData();
  //     formData.append('file',file)
  //     console.log(formData)

  //     const response = await USERSAPI.post(
  //       "admin/listHostels/addhostelDetails",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Form data submitted successfully");
  //     } else {
  //       console.error("Form data submission failed");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await USERSAPI.post(
        "admin/listHostels/addhostelDetails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure to set the correct content type
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
          {/* Your other form fields */}
          <Col
            lg={12}
            className="d-flex align-items-center justify-content-center"
            style={{
              backgroundImage: `url(${imageUrl})`, // Set the background image using inline style
              backgroundSize: "cover", // You can adjust background size as needed
              backgroundPosition: "center", // You can adjust background position as needed
            }}
          >
            <Button className="primaryPhotoText primaryPhotoButton">
              Primary Image will Show here
            </Button>
          </Col>
        </Row>
        {/* <input type="file" name="image" onChange={(e)=>setFile(e.target.files[0])} /> */}
        {/* <Button type="button">Upload</Button> */}
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
                name="file" // Make sure this matches what your backend expects
                onChange={handleAdditionalImagesChange}
                multiple
                accept="image/*"
              />
              + Add Remaining Photos
            </Button>
          </Col>

          {/* ----------about hostel details */}
          <Col lg={4}>
            <Form.Group controlId="category">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"

                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input class here
                required
                placeholder="Category Ex: Gents or Womens"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="hostelName">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                type="text"
                required
                placeholder="Enter Hostel Name"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="mainLocation">
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                required
                placeholder="Enter Main Location"
                type="text"
                name="mainLocation"
                value={formData.mainLocation}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                required
                placeholder="Enter Descriptions"
                type="text"
                name="descriptions"
                value={formData.descriptions}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group controlId="fullDetails">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input class here
                required
                placeholder="Provide Full Details with Pincode"
                type="text"
                name="fullDetails"
                value={formData.fullDetails}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="contactNumber">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                type="text"
                required
                placeholder="Provide Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="mapLink">
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                required
                placeholder="Map Link"
                type="text"
                name="mapLink"
                value={formData.mapLink}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="additionalAboutHostel">
              <Form.Control
                // id="custom-input-bg" // Add the id here
                className="ms-3 m-2 form-input custom-input-bg"
                required
                placeholder="Enter Anything Additional About Hostel"
                type="text"
                name="additionalAboutHostel"
                value={formData.additionalAboutHostel}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={3}>
            <Form.Group controlId="nearByLocation">
              {/* <Form.Label className="ms-3" >Near By Location</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input class here
                required
                placeholder="Enter Famous Shop or anything"
                type="text"
                name="nearByLocation"
                value={formData.nearByLocation}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="restrictions">
              {/* <Form.Label className="ms-3" >Restrictions</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input class here
                required
                placeholder="Enter Any Restrictions"
                type="text"
                name="restrictions"
                value={formData.restrictions}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="descriptionAboutHostel">
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input class here
                required
                placeholder="Descriptions About Hostel"
                type="text"
                name="descriptionAboutHostel"
                value={formData.descriptionAboutHostel}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="guestProfile">
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input class here
                required
                placeholder="Guest Profile"
                type="text"
                name="guestProfile"
                value={formData.guestProfile}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {/* ----------about hostel details */}
          <Col lg={4}>
            <Form.Group controlId="price">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input class here
                required
                placeholder="Enter Price"
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="extraPrice">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                type="text"
                required
                placeholder="Any Extra Charges"
                name="extraPrice"
                value={formData.extraPrice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="totalBedInRoom">
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                required
                placeholder="Total Bed In Room"
                type="text"
                name="totalBedInRoom"
                value={formData.totalBedInRoom}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="bedAvailableNow">
              <Form.Control
                // id="custom-input-bg" // Add the id here
                className="ms-3 m-2 form-input custom-input-bg"
                required
                placeholder="Bed Available Now"
                type="text"
                name="bedAvailableNow"
                value={formData.bedAvailableNow}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group controlId="Wifi">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input class here
                required
                placeholder="WIFI Availble or Not"
                type="text"
                name="Wifi"
                value={formData.Wifi}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="food">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                type="text"
                required
                placeholder="Food Availble"
                name="food"
                value={formData.food}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="parking">
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg"
                required
                placeholder="Parking Available or Not"
                type="text"
                name="parking"
                value={formData.parking}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="drinkingWater">
              <Form.Control
                // id="custom-input-bg" // Add the id here
                className="ms-3 m-2 form-input custom-input-bg"
                required
                placeholder="Drinking Water Available"
                type="text"
                name="drinkingWater"
                value={formData.drinkingWater}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
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
