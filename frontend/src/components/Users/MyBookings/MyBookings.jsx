import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import "./Style.css";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();
  const [hostelData, setHostelData] = useState([]);
  const [hostelDataLoaded, setHostelDataLoaded] = useState(false);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to perform this action?")) {
      const response = await USERSAPI.patch(
        `/users/myBookings/cancelBooking/${id}`
      );
      if (response.data.is_modified) {
        toast.success(response.data.message);
        setHostelDataLoaded(!hostelDataLoaded)
      } else {
        toast.error(response.data.message);
      }
    } else {
      // User clicked "Cancel" in the confirmation dialog
      // You can choose to do nothing or provide feedback to the user.
    }
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);
    const fetchData = async () => {
      if (userInfo) {
        try {
          const response = await USERSAPI.get(
            `users/myBookings?token=${userInfo._id}`
          );
          if (response.data.allDetails) {
            setHostelData(response.data.allDetails);
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
            if (error.response.data.redirect) {
              setTimeout(() => {
                navigate(`${error.response.data.redirect}`);
              }, 1000);
            }
          } else {
            toast.error("Please Login");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        }
      }
    };
    fetchData();
  }, [hostelDataLoaded]);

  return (
    <Container style={{ color: "white", minHeight: "100vh", height: "auto" }}>
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
                style={{ height: "300px", width: "500px" }}
              />
            </div>

            {/* Right Side: Hostel Details */}
            <div style={{ flex: 4, marginLeft: "20px" }}>
              <Card
                style={{
                  width: "100%",
                  height: "auto",
                  minHeight: "300px",
                  background: "transparent",
                }}
              >
                <Row style={{ border: "1px solid gray" }}>
                  <Col>
                    {/* Display the total amount */}

                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      <h6 style={{ color: "gray" }}>HostelName & Address</h6>
                      {hostel.hostelDetails.fullDetails}
                      <h6 style={{ color: "gray" }}>
                        {hostel.hostelDetails.mainLocation}
                      </h6>
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      Category: {hostel.hostelDetails.category}
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      Total Price ₹{hostel.totalAmount}
                    </h6>
                    {/* <h6 style={{ margin: "20px", color: "gray" }}>
                      Bed Available: {hostel.hostelDetails.bedAvailableNow}
                    </h6> */}
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                      }}
                    >
                      WIFI: {hostel.hostelDetails.Wifi}
                    </h6>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                      }}
                    >
                      Restrictions: {hostel.hostelDetails.restrictions}
                    </h6>
                    {/* <h6 style={{ margin: "20px", color: "gray",textTransform:'capitalize' }}>
                      Food: {hostel.hostelDetails.food}
                    </h6> */}
                  </Col>

                  <Col>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                      }}
                    >
                      OnwerName: {hostel.sellerDetails.name}
                    </h6>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                      }}
                    >
                      OnwerName: {hostel.sellerDetails.email}
                    </h6>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                      }}
                    >
                      Onwer Number: {hostel.sellerDetails.mobile}
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      <span style={{ color: "gray" }}>Booked : </span>
                      {hostel.hostelDetails.updatedAt.split("T")[0]}
                    </h6>
                  </Col>
                </Row>
                <Row className="mt-4">
                  {hostel.cancelled ? (
                    <Button
                      style={{
                        width: "300px",
                        marginLeft: "30px",
                        marginTop: "10px",
                      }}
                      variant="danger"
                    >
                      Cancelled
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleCancel(hostel._id)}
                      style={{
                        width: "300px",
                        marginLeft: "30px",
                        marginTop: "10px",
                      }}
                      variant="primary"
                    >
                      Cancel Now
                    </Button>
                  )}
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
