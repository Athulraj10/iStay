import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
// import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

const FindAccommadation = () => {
  const [hostelInfo, setHostelInfo] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await USERSAPI.post("users/findAccommodation");
        setHostelInfo(res.data.data); // Access the response data using res.data
      } catch (error) {
        toast.error(error);
      }
    };

    fetchdata();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      <Container style={{ color: "white" }}>
        <Row>
          <Col
            xs={12}
            md={12}
            style={{ height: "100px", backgroundColor: "transparent" }}
          >
            <div className="ms-5 me-5 d-flex justify-content-between align-items-center h-100">
              <input
                type="text"
                placeholder="Type here"
                style={{ width: "300px", height: "50px" }}
              />
              <Button
                style={{ color: "white", width: "200px", height: "70px" }}
              >
                Search
              </Button>
            </div>
          </Col>
        </Row>

        {hostelInfo.map((hostel, index) => (
          <Button className="m-3">
            <Row key={index} style={{ width: "100px !important;" }}>
              <Card style={{ width: "100%" }}>
              <div className="event-wrap">
              {hostel.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/images/${image}`}
                  alt={`Image ${index}`}
                  className="event-image"
                  style={{ height: "200px", width: "250px", margin: "10px" }}
                />
              ))}
            </div>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>

                                <Col>
              <h4 className="mb-2 text-primary">{hostel.hostelName}</h4>
              <h6 className="mb-2 text-danger">{hostel.mainLocation}</h6>
              <p className="mb-2 text-primary">{hostel.nearByLocation}</p>
              <Button className="mb-2">{hostel.category}</Button>
               <p className="mb-2 text-danger">Wifi: {hostel.Wifi}</p>
              <p className="mb-2 text-danger">Food: {hostel.food}</p>
              <h6 className="mb-2 text-danger">Parking: {hostel.parking}</h6>
              <p className="mb-2 text-primary">{hostel.description}</p>
              </Col>

              Additional Details
               <Col>
              <p className="mb-2 text-primary">
                Drinking Water: {hostel.drinkingWater}
              </p>
              <h6 className="mb-2 text-primary">Price: {hostel.price}</h6>
              <p className="mb-2 text-primary">
                Extra Price: {hostel.extraPrice}
              </p>
              <p className="mb-2 text-primary">
                Guest Profile: {hostel.guestProfile}
              </p>
            </Col>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Row>
          </Button>
        ))}
      </Container>
    </>
  );
};

export default FindAccommadation;
