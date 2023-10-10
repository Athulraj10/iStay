import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { Container, Button, Card, ListGroup, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "./style.css";

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
                  <Button
                    style={{
                      width: "300px",
                      marginLeft: "100px",
                      marginTop: "10px",
                    }}
                    variant="primary"
                  >
                    Book Now
                  </Button>
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
                className={`m-3  thumbnail-image ${
                  selectedImageIndex === index ? "selected" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
        </div>
      </Container>
      {/* Hostel Details */}

      <Row style={{marginTop:'80px'}}>
        <Col md={12}>
          <div
            className="btn-info"
            style={{
              margin: "100px",
              marginTop: "0",
              height: "50vh",
              background: "#10172e",
            }}
          >
            {hostelData.length > 0 ? (
              <Card
                style={{
                  width: "100%",
                  minHeight: "380px",
                  background: "transparent",
                  border: "1px solid #0db3d7",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <h4
                  style={{
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "#0084FF",
                  }}
                >
                  {hostelData[0].hostelName}
                </h4>
                <Button
                  style={{
                    width: "150px",
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "#fff",
                  }}
                >
                  Category {hostelData[0].category}
                </Button>
                <h5
                  style={{
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "#fff",
                  }}
                >
                  {hostelData[0].mainLocation}
                </h5>
                <h5
                  style={{
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "gray",
                  }}
                >
                  {hostelData[0].fullDetails}
                </h5>
                <h5
                  style={{
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "gray",
                  }}
                >
                  {hostelData[0].description}
                </h5>
                {/* <h5 style={{ marginBottom:'13px',textTransform:'capitalize',color:'gray'}}>{hostelData[0].additionalAboutHostel}</h5> */}
                <h5
                  style={{
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "gray",
                  }}
                >
                  Restrictions : {hostelData[0].restrictions}
                </h5>
                <h5
                  style={{
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "gray",
                  }}
                >
                  Guest Profile : {hostelData[0].guestProfile}
                </h5>
                <h5
                  style={{
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "gray",
                  }}
                >
                  Total Bed In Room : {hostelData[0].totalBedInRoom}
                </h5>
                <h5
                  style={{
                    marginBottom: "13px",
                    textTransform: "capitalize",
                    color: "gray",
                  }}
                >
                  Bed Available Now : {hostelData[0].bedAvailableNow}
                </h5>
              </Card>
            ) : (
              <p>Loading hostel data...</p>
            )}
          </div>
        </Col>
      </Row>
      <Row style={{ marginLeft: "100px", marginTop: "20px" }}>
        <Col md={2}>
          <Card>
            <Card.Body>
              <strong>MainLOcation</strong>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Body>
              <strong>Review</strong>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Body>
              <strong>Rules</strong>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Body>
              <strong>Contact Details</strong>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Body>
              <strong>Similar Property</strong>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ------------Loop total review */}
      <Row style={{ margin: "100px", marginTop: "30px" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>User Review</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Review</Button>
          </Card.Body>
        </Card>
      </Row>

      <Row className="justify-content-center" style={{border:'1px solid gray'}}>
        <Card style={{ background: "transparent", color: "white"}}>
          <Card.Body className="text-center" style={{border:'1px solid gray'}}>4.1 Very Good</Card.Body>
          <Card.Body className="text-center" style={{border:'1px solid gray'}}>Total Review Details</Card.Body>
        </Card>
      </Row>
    </div>
  );
};

export default SingleViewHostel;
