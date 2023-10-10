import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { Container, Button, Card, ListGroup, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const SingleViewHostel = () => {
  const location = useLocation();
  const hostelId = location.state.hostelId;
  const [hostelData, setHostelData] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async (id) => {
      const response = await USERSAPI.post(
        "users/findAccommodation/singlePageView",
        { id: id }
      );
      try {
        if (response.data) {
          setHostelData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(hostelId);
  }, []);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      <Container style={{ color: "white", height: "100vh" }}>
        {hostelData.map((hostel, index) => (
          <Button
            key={index}
            className="m-3 p-5 btn-info"
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            {/* Left Side: Primary Image */}
            <div style={{ flex: 6 }}>
              <img
                src={`http://localhost:5000/images/${hostel.images[selectedImageIndex]}`}
                alt={`Image ${selectedImageIndex}`}
                className="event-image rounded-3"
                style={{ height: "400px", width: "100%" }}
              />
            </div>

            {/* Right Side: Hostel Details */}
            <div style={{ flex: 4, marginLeft: "20px" }}>
              <Card
                style={{
                  width: "100%",
                  minHeight: "380px",
                  background: "transparent",
                }}
              >
                <Row style={{ border: "1px solid gray" }}>
                  <Col>
                    <h5 style={{ margin: "20px", color: "#408B88" }}>
                      ₹ {hostel.price} Per
                    </h5>
                    <h5 style={{ margin: "20px", color: "gray" }}>
                      Extra Charge +{hostel.extraPrice}
                    </h5>
                    <h5 style={{ margin: "20px", color: "gray" }}>
                      Bed Available: {hostel.bedAvailableNow}
                    </h5>
                    <h5 style={{ margin: "20px", color: "#408B88" }}>
                      Category : {hostel.category}
                    </h5>
                  </Col>

                  <Col>
                    <h5 style={{ margin: "20px", color: "#408B88" }}>
                      {" "}
                      WiFI Available: {hostel.Wifi}
                    </h5>
                    <h5 style={{ margin: "20px", color: "#408B88" }}>
                      Food Available: {hostel.food}
                    </h5>
                    <h5 style={{ margin: "20px", color: "#408B88" }}>
                      Parking : {hostel.parking}
                    </h5>
                    <h5 style={{ margin: "10px", color: "#408B88" }}>
                      Drinking Water: {hostel.drinkingWater}
                    </h5>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <h6 style={{ margin: "19px", color: "#408B88" }}>
                      ✔ Book with ₹0 Payment
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      ✔ Free Cancellation
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      ✔ Best Choice
                    </h6>
                  </Col>
                  <Col>
                    <div
                      style={{
                        backgroundColor: "transparent",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid silver",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          padding: "5px",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          margin: "0",
                          color: "#0084FF",
                        }}
                      >
                        Very Good 4.1
                      </p>
                      <p
                        style={{
                          padding: "5px",
                          fontSize: "0.9rem",
                          color: "#777",
                          margin: "0",
                        }}
                      >
                        (31 Ratings)
                      </p>
                      <a
                        href="#"
                        style={{
                          padding: "5px",
                          textDecoration: "none",
                          fontSize: "1.2rem",
                          fontWeight: "900",
                          color: "#007bff",
                        }}
                      >
                        READ ALL REVIEWS
                      </a>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          </Button>
        ))}

        {/* Image Thumbnails */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "200px",
          }}
        >
          {hostelData.length > 0 &&
            hostelData[0].images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/images/${image}`}
                alt={`Image ${index}`}
                className={`m-1  thumbnail-image ${
                  selectedImageIndex === index ? "selected" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
        </div>
      </Container>

      {/* <div>
        <Col style={{ height: "625px", width: "100%", backgroundColor: "rgba(0, 0, 0, 0)" }}>
          <Card style={{ width: "100%", minHeight: "380px" }}>
            <Card.Body>
              <Card.Title className="text-capitalize text-primary">
                {hostelData[0].hostelName}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-danger text-capitalize">
                Location: {hostelData[0].mainLocation}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-danger text-capitalize">
                Category: {hostelData[0].category}
              </Card.Subtitle>
              <Card.Text>{hostelData[0].description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </div> */}

      {/* Hostel Details */}
    </div>
  );
};

export default SingleViewHostel;
