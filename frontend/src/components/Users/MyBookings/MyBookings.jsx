import React, { useEffect, useState } from "react";
import { Container,Row,Col,Button } from "react-bootstrap";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";

const MyBookings = () => {
  const [hostelData,setHostelData]=useState(null)

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(storedUserInfo);
    const fetchData = async () => {
      try {
        const response = await USERSAPI.get(`users/myBookings?token=${userInfo._id}`);
        // Process the response data
        // ...
      } catch (error) {
        // Handle errors
        // ...
      }
    }
  
    fetchData();
  }, []);
  
  
  return (
    <div>
      <Container style={{ color: "white", height: "90vh" }}>
        {hostelData ? (
          hostelData.map((hostelData, index) => (
            <Button
              key={index}
              className="m-3 p-5 btn-info"
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <div style={{ flex: 6 }}>
                <img
                  src={`http://localhost:5000/images/${hostelData.images[0]}`}
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
                      <h6 style={{ margin: "20px", color: "#408B88" }}>
                        ₹ {bookedDetail ? bookedDetail.totalAmount : null} Per
                      </h6>
                      <h6 style={{ margin: "20px", color: "#408B88" }}>
                        Category : {hostelData.category}
                      </h6>
                      <h6 style={{ margin: "20px", color: "gray" }}>
                        Bed Available: {hostelData.bedAvailableNow}
                      </h6>
                    </Col>

                    <Col>
                      <h6 style={{ margin: "20px", color: "#408B88" }}>
                        <span style={{ color: "gray" }}>Address</span>{" "}
                        {hostelData.fullDetails}
                        <h6 style={{ color: "gray" }}>
                          {hostelData.mainLocation}
                        </h6>
                      </h6>
                      <h6 style={{ margin: "20px", color: "#408B88" }}>
                        <span style={{ color: "gray" }}>Booked</span>{" "}
                        {new Date(hostelData.updatedAt).toLocaleDateString()}
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
          <p>Loading hostel data...</p>
        )}
      </Container>
    </div>
  );
};

export default MyBookings;
