import React, { useState, useEffect } from "react";
import "./AddHostelSeller.css";
import { Container, Form, Row, Col, Button, Toast } from "react-bootstrap";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddHostelSeller = () => {

  const [sellerInfo, setSellerInfo] = useState(null);
  const [sellerIdStored,setsellerId] = useState("");
  useEffect(() => {
    const fetchsellerInfo = async () => {
      const storedsellerInfo = localStorage.getItem("sellerInfo");
      if (storedsellerInfo) {
        setSellerInfo(storedsellerInfo);
        const seller = JSON.parse(storedsellerInfo);
        setsellerId(seller._id)
      }else{
        navigate('/seller/login')
      }
    }; 
    // Call the asynchronous function
    fetchsellerInfo();
  }, []); // Empty dependency array to run once on mount

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sellerID:"",
    files: [], // Store the primary image here
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
  const [imageUrls, setImageUrls] = useState([]);

  const handleAdditionalImagesChange = (e) => {
    const files = e.target.files;
    const selectedFiles = Array.from(files).slice(0, 10);
    const newFiles = Array.from(files);
    const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));

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
    formDataToSend.append("sellerID",sellerIdStored);
    formData.files.forEach((file) => formDataToSend.append("files", file));
    formDataToSend.append("category", formData.category);
    formDataToSend.append("hostelName", formData.hostelName);
    formDataToSend.append("mainLocation", formData.mainLocation);
    formDataToSend.append("descriptions", formData.descriptions);
    formDataToSend.append("fullDetails", formData.fullDetails);
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("mapLink", formData.mapLink);
    formDataToSend.append(
      "additionalAboutHostel",
      formData.additionalAboutHostel
    );
    formDataToSend.append("nearByLocation", formData.nearByLocation);
    formDataToSend.append("restrictions", formData.restrictions);
    formDataToSend.append(
      "descriptionAboutHostel",
      formData.descriptionAboutHostel
    );
    formDataToSend.append("guestProfile", formData.guestProfile);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("extraPrice", formData.extraPrice);
    formDataToSend.append("totalBedInRoom", formData.totalBedInRoom);
    formDataToSend.append("bedAvailableNow", formData.bedAvailableNow);
    formDataToSend.append("Wifi", formData.Wifi);
    formDataToSend.append("food", formData.food);
    formDataToSend.append("parking", formData.parking);
    formDataToSend.append("drinkingWater", formData.drinkingWater);
    // ... append other fields
    console.log(formData);
    try {
      const response = await USERSAPI.post(
        "seller/listHostels/addhostelDetails",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        if (response.data.hostelAdded) {
          navigate("/seller/listHostels");
        } else {
          toast.error("Something went wrong in Adding hostel");
        }
      } else {
        toast.error("Form data submission failed");
      }
    } catch (error) {
      console.error(error);
      // Display the error message as a toast notification
      toast.error(error.response.data.message, {
        position: "top-right", // You can customize the position if needed
        autoClose: 5000, // How long the toast will be displayed (in milliseconds)
      });
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
              backgroundImage: `url(${imageUrls[0]})`,
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
          {/* Display selected images */}
          {imageUrls.length > 0 && (
            <div className="mb-4 d-flex flex-nowrap overflow-auto">
              {imageUrls.map((url, index) => (
                <div key={index} className="me-2">
                  <img
                    src={url}
                    alt={`Image ${index}`}
                    style={{ height: "200px", width: "200px" }}
                  />
                </div>
              ))}
            </div>
          )}
        </Row>

        <Row>
          <Col
            lg={3}
            className="d-flex align-items-center justify-content-center"
          >
            <Button
              className="primaryPhotoText "
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
              + Add Remaining Photos Max-10
            </Button>
          </Col>

          {/* ----------about hostel details */}
          <Col lg={4}>
            <Form.Group controlId="category">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Control
                // id="custom-input-bg"
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input className here
                required
                placeholder="Category Ex: Gents or Womens"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

                <input type="hidden" 
                value={sellerIdStored}
                onChange={()=>{}}
                />

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
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input className here
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
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input className here
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
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input className here
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
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input className here
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
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input className here
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
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input className here
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
                className="ms-3 m-2 form-input custom-input-bg" // Add the form-input className here
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

export default AddHostelSeller;
