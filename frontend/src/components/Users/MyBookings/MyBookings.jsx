import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendar } from "react-icons/fa";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const MyBookings = () => {
  const navigate = useNavigate();
  const [hostelData, setHostelData] = useState([]);
  const [hostelDataLoaded, setHostelDataLoaded] = useState(false);
  const [rating, setRating] = useState(0);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue) => {
    // Add hover effect here if needed
  };

  const handleStarLeave = () => {
    // Remove hover effect here if needed
  };
  const handleCancel = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to perform this action? If Yes No Message Allowed"
      )
    ) {
      const response = await USERSAPI.patch(
        `/users/myBookings/cancelBooking/${id}`
      );
      if (response.data.is_modified) {
        toast.success(response.data.message);
        setHostelDataLoaded(!hostelDataLoaded);
      } else {
        toast.error(response.data.message);
      }
    } else {
      // User clicked "Cancel" in the confirmation dialog
      // You can choose to do nothing or provide feedback to the user.
    }
  };

  const handleMessage = (seller_id, booking_id) => {
    try {
      if (seller_id && booking_id) {
        navigate(`/chats?seller_id=${seller_id}&booking_id=${booking_id}`);
      }
    } catch (error) {
      toast.error(error);
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
        hostelData.map((booking, index) => (
          <Button
            key={index}
            className="m-3 p-5 btn-info"
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 6 }}>
              {/* Update the image source */}
              <img
                src={`https://www.istay.site/images/${booking.hostelDetails.images[0]}`}
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
                      {booking.hostelDetails.fullDetails}
                      <h6 style={{ color: "gray" }}>
                        {booking.hostelDetails.mainLocation}
                      </h6>
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      Category: {booking.hostelDetails.category}
                    </h6>
                    <h6 style={{ margin: "20px", color: "#408B88" }}>
                      Total Price ₹{booking.totalAmount}
                    </h6>
                    {/* <h6 style={{ margin: "20px", color: "gray" }}>
                      Bed Available: {booking.hostelDetails.bedAvailableNow}
                    </h6> */}
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                      }}
                    >
                      WIFI: {booking.hostelDetails.Wifi}
                    </h6>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                      }}
                    >
                      Restrictions: {booking.hostelDetails.restrictions}
                    </h6>
                    {/* <h6 style={{ margin: "20px", color: "gray",textTransform:'capitalize' }}>
                      Food: {booking.hostelDetails.food}
                    </h6> */}
                  </Col>

                  <Col>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="seller-name-and-icon"
                    >
                      <FaUserCircle />
                      <span style={{ marginLeft: "5px" }}>
                        {booking.sellerDetails.name}
                      </span>
                    </h6>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="seller-name-and-icon"
                    >
                      <FaEnvelope />
                      <span style={{ marginLeft: "5px" }}>
                        {booking.sellerDetails.email}
                        {booking.hostelDetails.status}
                      </span>
                    </h6>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="seller-name-and-icon"
                    >
                      <FaPhone />
                      <span style={{ marginLeft: "5px" }}>
                        {booking.sellerDetails.mobile}
                      </span>
                    </h6>
                    <h6
                      style={{
                        margin: "20px",
                        color: "gray",
                        textTransform: "capitalize",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="seller-name-and-icon"
                    >
                      <FaCalendar />
                      <span style={{ marginLeft: "5px" }}>
                        {booking.hostelDetails.updatedAt.split("T")[0]}
                      </span>
                    </h6>
                    <Col style={{ color: "white" }}>
                      <h5 style={{ color: "gray" }}>Rate the Items</h5>
                      <StarRating bookingId={booking._id} />
                    </Col>
                  </Col>
                </Row>
                <Row className="mt-4">
                  {booking.cancelled === true ||
                  booking.status === "expired" ? (
                    <Button
                      style={{
                        width: "200px",
                        marginLeft: "30px",
                        marginTop: "10px",
                      }}
                      variant="danger"
                    >
                      {booking.cancelled === true ? 'cancelled' : booking.status == "expired" ? 'expired' : "active"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleCancel(booking._id)}
                      style={{
                        width: "230px",
                        marginLeft: "30px",
                        marginTop: "10px",
                      }}
                      variant="primary"
                    >
                      Cancel Now
                    </Button>
                  )}
                  {booking.cancelled == true || booking.status == "expired" ? (
                    <Button
                      style={{
                        width: "200px",
                        marginLeft: "30px",
                        marginTop: "10px",
                      }}
                      variant="danger"
                    >
                      Message Not Allowed
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        handleMessage(booking.sellerDetails._id, booking._id)
                      }
                      style={{
                        width: "200px",
                        marginLeft: "30px",
                        marginTop: "10px",
                      }}
                      variant="primary"
                    >
                      Message Now
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
