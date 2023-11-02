import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import {
  Container,
  Form,
  Button,
  Card,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from "react-bootstrap";
import "./style.css";
// import StarRating from "../MyBookings/StarRating";
import { FaStar } from "react-icons/fa";
import { ProgressChakra } from "../../loadingState/ProgressChakra";
const SingleViewHostel = () => {
  // const [rating, setRating] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userInfoLocalstorage = JSON.parse(localStorage.getItem("userInfo"));
    const location = useLocation();
    const navigate = useNavigate();
    const hostel = location.state.hostel;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");
    const [walletBalance, setWalletBalance] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [added, setAdded] = useState(false);
    const [hostelData, setHostelData] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [userInfo, setUserInfo] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [clickedImage, setClickedImage] = useState(null);
    const [showModalForEnquery, setShowModalForEnquiry] = useState(false);
    const [formData, setFormData] = useState({
      userId: "",
      hostelId: "",
      hostelReview: "",
      files: [],
    });
    const [formDataEnquery, setformDataEnquery] = useState({
      message: "",
    });



  const handleShowModal = () => {
    if (userInfoLocalstorage) {
      setShowModalForEnquiry(true);
    } else {
      return toast.error("Please Login for Enquery");
    }
  };
  const handleCloseModal = () => {
    setShowModalForEnquiry(false);
  };

  const handlePayment = async () => {
    try {
      if (selectedPaymentMethod === "stripe") {
        localStorage.setItem("bookingStarted", userInfo._id);
        const stripe = await loadStripe(
          "pk_test_51O1TtASDbPUS3oyQDNpHh5XMGfwO8v93QDIBAthCvHn8dXX962vKX9euL8yYSbISjZ8Ve4kJsawFzOiaxvb9Giz500urN4xHeu"
        );
        const body = {
          userId: userInfo._id,
          hostel: hostel,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        // const response = await fetch(
        //   "https://hexashop.shop/api/users/bookingHostel",
        //   {
        //     method: "POST",
        //     headers: headers,
        //     body: JSON.stringify(body),
        //   }
        // );
        const response = await fetch(
          USERSAPI + "bookingHostel", // Use USERSAPI as the base URL
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );
        
        const session = await response.json();
        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          toast.error(result.error);
        }
      } else if (selectedPaymentMethod == "wallet") {
        if(!userInfoLocalstorage){
          return toast.error('Please Login')
        }
        let hostelTotalPrice = hostel.price + hostel.extraPrice;
        if (walletBalance < hostelTotalPrice) {
          return toast.error("Insufficient Wallet Amount");
        } else if (walletBalance >= hostelTotalPrice) {
          localStorage.setItem("bookingStarted", userInfo._id);
          const userId = userInfo._id;
          const hostelId = hostel._id;
          return navigate(
            `/bookingConfirmation?userId=${userId}&hostel=${hostelId}`
          );
          // }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Login for Booking");
    }
  };

  const handleEnquery = async (hostelId, sellerId) => {
    const requestData = {
      formData: formDataEnquery,
      hostelId: hostelId,
      sellerId: sellerId,
    };
    const response = await USERSAPI.post("/users/enquery", requestData);
    if (response.data.updated) {
      toast.success(response.data.message);
      setShowModalForEnquiry(false);
      setformDataEnquery("");
    }
  };

  const handleAddPhoto = (e) => {
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

  const addReview = async (e) => {
    e.preventDefault();
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);
    const formDataToSend = new FormData();
    formDataToSend.append("userId", userInfo._id);
    formDataToSend.append("hostelId", formData.hostelId);
    formDataToSend.append("description", formData.hostelReview);

    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });
    try {
      const response = await USERSAPI.post("users/addreview", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        if (response.data.review) {
          setFormData({
            sellerId: "",
            hostelId: "",
            hostelReview: "",
            files: [],
          });
          setShowModal(false);
          setAdded(true);
          toast.success(response.data.message);
        } else {
          toast.error("Something went wrong in Hostel Review");
        }
      } else {
        toast.error("Form data submission failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const scrollToReviews = () => {
    const element = document.getElementById("reviewsContainer");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openModal = () => {
    if(!userInfoLocalstorage){
      toast.error('Please Login')
    }else{
      setShowModal(true);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, []);

  useEffect(() => {
    const fetchData = async (id) => {
      setIsLoading(true)
      const response = await USERSAPI.post(
        "users/findAccommodation/singlePageView",
        { id: id, user_id: userInfoLocalstorage?._id }
      );
      try {
        if (response.data) {
          setHostelData(response.data.data);
          setReviews(response.data.review);
          setWalletBalance(response.data.userWallet);
          setFormData({
            ...formData,
            hostelId: response.data.data[0]._id,
          });
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(hostel._id);
  }, [added]);

  <style>
    {`
    .placeholder-white::placeholder {
      color: white;
    }
  `}
  </style>;
  return isLoading?(
    <ProgressChakra/>
  ):(
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
            src={`https://www.hexashop.shop/images/${hostel.images[selectedImageIndex]}`}
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
                <h5 style={{ margin: "20px",color : hostel.bedAvailableNow < 0 ? "red" : "gray" }}>
                  Bed Available: {hostel.bedAvailableNow < 0 ? "No bed Available": hostel.bedAvailableNow}
                </h5>
                <h5 style={{ margin: "20px", color: "#408B88" }}>
                  Category : {hostel.category}
                </h5>
              </Col>

              <Col>
                <h5 style={{ margin: "20px", color: "#408B88" }}>
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
                  <div className="star-rating">
                    {[...Array(5)].map((_, index) => {
                      const currentRating = index + 1;
                      return (
                        <label key={currentRating}>
                          <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            className="hidden-radio"
                          />
                          <FaStar
                            className="star"
                            color={
                              currentRating <= hostel.rating / 5
                                ? "gold"
                                : "white"
                            }
                            size={15}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <p
                    style={{
                      padding: "5px",
                      fontSize: "0.9rem",
                      color: "#777",
                      margin: "0",
                    }}
                  >
                    See all Reviews {Math.round(hostel.rating / 5)}
                  </p>
                  <span
                    style={{
                      padding: "5px",
                      textDecoration: "none",
                      fontSize: "1.2rem",
                      fontWeight: "900",
                      color: "#007bff",
                      cursor: "pointer",
                    }}
                    onClick={scrollToReviews}
                  >
                    READ ALL REVIEWS
                  </span>
                </div>
              </Col>
            </Row>
            <Button
              onClick={() => handleShowModal()}
              style={{
                maxWidth: "420px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                textAlign: "center",
                color: "white",
              }}
              variant="info"
            >
              Have Any Enquiry....?
            </Button>

            <Row>
              <Col style={{ display: "flex" }}>
                <Button
                  onClick={handlePayment}
                  style={{
                    minWidth: "200px",
                    padding: "10px",
                    margin: "10px 10px 0 0",
                  }}
                  variant="primary"
                >
                  Wallet Balance 
                  <span style={{ marginLeft: "10px" }}>
                  ₹ {walletBalance ? walletBalance : 0}
                  </span>
                </Button>

                    {hostel.bedAvailableNow > 1 ? ( <div
                  className="booking-form"
                  style={{
                    border: "1px solid #0fb6db",
                    color: "white",
                    margin: "10px 10px 0 0",
                    borderRadius: "10px",
                  }}
                >
                  <div className="payment-options">
                    <label className="payment-option">
                      <input
                        type="radio"
                        value="stripe"
                        checked={selectedPaymentMethod === "stripe"}
                        onChange={() => setSelectedPaymentMethod("stripe")}
                      />
                      Pay with Stripe
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        value="wallet"
                        checked={selectedPaymentMethod === "wallet"}
                        onChange={() => setSelectedPaymentMethod("wallet")}
                      />
                      Pay with Wallet Balance
                    </label>
                  </div>
                  <Button
                    className="book-button"
                    onClick={handlePayment}
                    isLoading={selectedPaymentMethod === "wallet"}
                    // Start spinner when wallet payment is selected
                    spinner={<Spinner />}
                  >
                    Book Now
                  </Button>
                </div>
                ):(
                //   <div
                //   className="booking-form"
                //   style={{
                //     border: "1px solid #0fb6db",
                //     color: "white",
                //     width:'210px',
                //     margin: "10px 10px 0 0",
                //     borderRadius: "10px",
                //   }}
                // >
                  
                  <Button
                    style={{padding:"30px",marginTop:'10px',
                    border: "1px solid red",
                    color: "white",
                    width:'210px',
                    margin: "10px 10px 0 0",
                    borderRadius: "10px"}}
                  >
                    No Room Available
                  </Button>
                //  </div>
                )}
               
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
            src={`https://www.hexashop.shop/images/${image}`}
            alt={`Image ${index}`}
            className={`m-3  thumbnail-image ${
              selectedImageIndex === index ? "selected" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
    </div>
  </Container>
  <Container>
    {/* Hostel Details */}

    <Row style={{ marginTop: "200px" }}>
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

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <input
            type="file"
            accept="image/*"
            // multiple
            onChange={handleAddPhoto}
          />
          <textarea
            value={formData.hostelReview}
            onChange={(e) =>
              setFormData({ ...formData, hostelReview: e.target.value })
            }
            placeholder="Enter your review description"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={addReview}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>

    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
        <Button onClick={openModal}>Add review</Button>
    </div>

    <div id="reviewsContainer" style={{ display: "flex" }}>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div
            style={{
              display: "flex",
              background: "white",
              marginLeft: "100px",
              borderRadius: "10px",
            }}
          >
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px",
                height: "110px",
              }}
            >
              <div>
                {review.images && review.images.length > 0
                  ? review.images.map((image, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={`https://www.hexashop.shop/image/${image}`}
                        alt={`Image`}
                        className="event-image rounded-3"
                        style={{
                          height: "100px",
                          width: "100px",
                          margin: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => setClickedImage(image)}
                      />
                    ))
                  : null}
              </div>
              <div style={{ flex: 1, width: "200px", maxWidth: "300" }}>
                {review.content.substring(0, 100)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              marginLeft: "100px",
              textAlign: "center",
              color: "white",
            }}
          >
            No reviews available
          </h1>
        </div>
      )}
    </div>

    {/* Display full-size image in a modal */}
    {clickedImage && (
      <div
        className="modal"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.7)",
        }}
        onClick={() => setClickedImage(null)}
      >
        <img
          src={`https://www.hexashop.shop/image/${clickedImage}`}
          alt="Full Size Image"
          style={{ maxHeight: "40%", maxWidth: "50%", height: "300px" }}
        />
      </div>
    )}
  </Container>

  <Modal
    style={{
      background: "rgba(255, 255, 255s, 0.1)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(5px)",
      color: "white",
    }}
    show={showModalForEnquery}
    onHide={handleCloseModal}
  >
    <Modal.Header
      style={{
        backgroundColor: "#0d1427",
        background: "rgba(255, 255, 255s, 1)",
      }}
    >
      <Modal.Title className="text-white">Enquiry Form</Modal.Title>
    </Modal.Header>
    <Modal.Body
      style={{
        backgroundColor: "#0d1427",
        background: "rgba(255, 255, 255s, 0.1)",
      }}
    >
      <form>
        <div className="mb-3">
          <span style={{ color: "gray" }}>Readonly</span>
          <input
            type="text"
            placeholder="Enter Name"
            style={{
              backgroundColor: "#0d1527",
              background: "rgba(255, 255, 255s, 0.9)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              color: "white",
              "::placeholder": {
                color: "white",
              },
            }}
            required="true"
            className="form-control placeholder-white"
            name="UserName"
            value={userInfo.name}
            readOnly
          />
        </div>
        <div className="mb-3">
          <span style={{ color: "gray" }}>Readonly</span>
          <input
            style={{
              backgroundColor: "#0d1527",
              background: "rgba(255, 255, 255s, 0.9)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              color: "white",
            }}
            placeholder="Contact Number"
            className="form-control"
            name="phone"
            value={userInfo.email}
          />
        </div>

        <div className="mb-3">
          <label>Message</label>
          <textarea
            required
            style={{
              backgroundColor: "#0d1527",
              background: "rgba(255, 255, 255s, 0.9)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              color: "white",
            }}
            value={formDataEnquery.message}
            name="message"
            className="form-control"
            rows="4"
            onChange={(e) =>
              setformDataEnquery({
                ...formDataEnquery,
                message: e.target.value,
              })
            }
            placeholder="Enter Message"
          ></textarea>
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer
      style={{
        backgroundColor: "#0d1527",
        background: "rgba(255, 255, 255s, 0.9)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Button variant="danger" onClick={handleCloseModal}>
        Close
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          handleEnquery(hostel._id, hostel.seller);
        }}
      >
        Submit Enquiry
      </Button>
    </Modal.Footer>
  </Modal>
</div>
  )
};

export default SingleViewHostel;
