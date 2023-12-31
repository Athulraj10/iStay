import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import { Container, Button, Card, Row, Col } from "react-bootstrap";

const BookingComformation = () => {
  const location = useLocation();
  const [hostelData, setHostelData] = useState(null);
  const [bookedDetail, setBookedDetails] = useState(null);
  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get("userId");
  const hostelId = searchParams.get("hostel");

  useEffect(() => {
    const fetchData = async () => {
      const verificationLocalStorage = localStorage.getItem("bookingStarted");
      if (userId && hostelId && verificationLocalStorage) {
        try {
          localStorage.removeItem("bookingStarted");
          const response = await USERSAPI.get("/users/bookingConfirmation",{
            params: { userId, hostelId },
          });

          if (response.data.bookingCompleted) {
            const responseData = response.data.hostelData;
            const bookedDetails = response.data.bookedDetails;
            setHostelData(responseData);
            setBookedDetails(bookedDetails);
            toast.success("Booking Completed");
          } else {
            toast.error("Booking Not Completed");
          }
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error("Booking Already Completed Please Visit MyBookings");
      }
    };

    fetchData();
  }, [userId, hostelId]);

  return (
    <div>
      <Container style={{ color: "white", height: "90vh" }}>
        {hostelData ? (
          // hostelData.map((hostelData, index) => (
          <Button
            // key={index}
            className="m-3 p-5 btn-info"
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            {/* Left Side: Primary Image */}
            <div style={{ flex: 6 }}>
              <img
                src={`https://www.istay.site/images/${hostelData.images[0]}`}
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
                      <span style={{ color: "gray" }}>HostelName & Address</span>{" "}
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
                {/* <Row className="mt-4">
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
                </Row> */}
              </Card>
            </div>
          </Button>
        ) : (
          // ))
          <div>
            <h1 style={{ textAlign: "center",color:'gray',margin:'20px' }}>Booking Confirmed Go To MyBookings</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <div className="loader">
                <div className="box box0">
                  <div></div>
                </div>
                <div className="box box1">
                  <div></div>
                </div>
                <div className="box box2">
                  <div></div>
                </div>
                <div className="box box3">
                  <div></div>
                </div>
                <div className="box box4">
                  <div></div>
                </div>
                <div className="box box5">
                  <div></div>
                </div>
                <div className="box box6">
                  <div></div>
                </div>
                <div className="box box7">
                  <div></div>
                </div>
                <div className="ground">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default BookingComformation;
