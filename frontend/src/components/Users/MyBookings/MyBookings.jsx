import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import "./Style.css";

const MyBookings = () => {
  const [hostelData, setHostelData] = useState([]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);
    const fetchData = async () => {
      try {
        const response = await USERSAPI.get(
          `users/myBookings?token=${userInfo._id}`
        );
        if (response.data.allDetails) {
          setHostelData(response.data.allDetails);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container style={{ color: "white", height: "90vh" }}>
      {hostelData.length > 0 ? ( // Check if hostelData has data
        hostelData.map((hostel, index) => (
          <Button
            key={index}
            className="m-3 p-5 btn-info"
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 6 }}>
              {/* Update the image source */}
              <img
                src={`http://localhost:5000/images/${hostel.hostelDetails.images[0]}`}
                alt={`Image`}
                className="event-image rounded-3"
                style={{ height: "300px", width: "100%" }}
              />
            </div>

            {/* Right Side: Hostel Details */}
            <div style={{ flex: 4, marginLeft: "20px" }}>
              <Card
                style={{
                  width: "100%",
                  height: "300px",
                  minHeight: "300px",
                  background: "transparent",
                }}
              >
                <Row style={{ border: "1px solid gray" }}>
                  <Col>
                    {/* Display the total amount */}
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      ₹ {hostel.totalAmount} Per
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      Category: {hostel.hostelDetails.category}
                    </h6>
                    <h6 style={{ margin: "20px", color: "gray" }}>
                      Bed Available: {hostel.hostelDetails.bedAvailableNow}
                    </h6>
                  </Col>

                  <Col>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      <span style={{ color: "gray" }}>Address</span>{" "}
                      {hostel.hostelDetails.fullDetails}
                      <h6 style={{ color: "gray" }}>
                        {hostel.hostelDetails.mainLocation}
                      </h6>
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      <span style={{ color: "gray" }}>Booked</span>{" "}
                      {new Date(
                        hostel.hostelDetails.updatedAt
                      ).toLocaleDateString()}
                    </h6>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Button
                    style={{
                      width: "300px",
                      marginLeft: "30px",
                      marginTop: "10px",
                    }}
                    variant="primary"
                  >
                    Cancel Now
                  </Button>
                </Row>
              </Card>
            </div>
          </Button>
        ))
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "90vh",
            }}
          >
            <h1 style={{ textAlign: "center" }}>No Booking Found</h1>
            <div className="cssload-container">
              <ul className="cssload-flex-container">
                <li>
                  <span className="cssload-loading cssload-one"></span>
                  <span className="cssload-loading cssload-two"></span>
                  <span className="cssload-loading-center"></span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default MyBookings;
