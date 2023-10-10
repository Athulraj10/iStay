import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";

const FindAccommodation = () => {
  const [hostelInfo, setHostelInfo] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await USERSAPI.post("users/findAccommodation");
        setHostelInfo(res.data.data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchdata();
  }, []);

  return (
    <Container>
      {hostelInfo.map((hostel, index) => (
        <Button
          key={index}
          className="m-3 btn-danger"
          style={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          {/* Left Side: Image */}
          <div className="event-wrap "  style={{ flex: 1 }}>
            {hostel.images.slice(0, 1).map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/images/${image}`}
                alt={`Image ${index}`}
                className="event-image rounded-4"
                style={{ height: "300px", width: "100%" }}
              />
            ))}
          </div>

          {/* Right Side: Card Content */}
          <div style={{ flex: 2, display: "flex",background:'transparent' }}>
            {/* Left Partition */}
            <div style={{ flex: 1 }} >
              <Card style={{margin:'20px', background:'transparent',  width: "100%",height:"300px" }}>
                <Card.Body>
                  <Card.Title>{hostel.hostelName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-white">
                    {hostel.mainLocation}
                  </Card.Subtitle>
                  <Card.Text>
                    {hostel.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            {/* Right Partition */}
            <div style={{ flex: 1 }}>
              <Card style={{ margin:'20px',  width: "auto",height:"300px"  }}>
                <Card.Body>
                 dfasdfkasdf;laksdjflks
                </Card.Body>
              </Card>
            </div>
          </div>
        </Button>
      ))}
    </Container>
  );
};

export default FindAccommodation;
