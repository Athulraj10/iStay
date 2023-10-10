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
      <Container style={{ color: "white" , height:'100vh' }}>
        {hostelData.map((hostel, index) => (
          <Button
            key={index}
            className="m-3 btn-danger"
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            {/* Left Side: Primary Image */}
            <div style={{ flex: 6 }}>
              <img
                src={`http://localhost:5000/images/${hostel.images[selectedImageIndex]}`}
                alt={`Image ${selectedImageIndex}`}
                className="event-image"
                style={{ height: "400px", width: "100%" }}
              />
            </div>

            {/* Right Side: Hostel Details */}
            <div style={{ flex: 4, marginLeft: "20px" }}>
              <Card style={{ width: "100%", minHeight: "380px" }}>
                <Card.Body>
                  <Card.Title className="text-capitalize text-primary">
                    {hostel.hostelName}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-danger text-capitalize">
                    Location : {hostel.mainLocation}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-danger text-capitalize">
                    Category : {hostel.category}
                  </Card.Subtitle>
                  <Card.Text>{hostel.description}</Card.Text>
                </Card.Body>

                <Row>
                  <Col>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item className="mb-2 text-primary text-capitalize">
                        Restrictions: {hostel.restrictions}
                      </ListGroup.Item>
                      <ListGroup.Item className="mb-2 text-primary text-capitalize">
                        Guest Profile : {hostel.guestProfile}
                      </ListGroup.Item>
                      <ListGroup.Item className="mb-2 text-primary text-capitalize">
                        Total Bed In Room : {hostel.totalBedInRoom}
                      </ListGroup.Item>
                      <ListGroup.Item className="mb-2 text-primary text-capitalize">
                        Total Bed Available : {hostel.bedAvailableNow}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item className="mb-2 text-primary text-capitalize">
                        WiFI Available : {hostel.Wifi}
                      </ListGroup.Item>
                      <ListGroup.Item className="mb-2 text-primary text-capitalize">
                        Food Available : {hostel.food}
                      </ListGroup.Item>
                      <ListGroup.Item className="mb-2 text-primary text-capitalize">
                        Parking Available : {hostel.parking}
                      </ListGroup.Item>
                      <ListGroup.Item className="mb-2 text-primary text-capitalize">
                        Drinking Water: {hostel.drinkingWater}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
            </div>
          </Button>
        ))}
{/* Image Thumbnails */}
<div style={{ display: "flex", justifyContent: "center", width:"100%",height:'200px' }}>
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
    </div>
  );
};
export default SingleViewHostel;
