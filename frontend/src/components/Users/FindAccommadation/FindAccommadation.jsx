import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FindAccommodation = () => {
  const navigate = useNavigate();
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

  const handleClick = (hostel) =>{
    if(hostel){
        navigate("/findAccommodation/singlePageView",{state:{hostel}})
      }
  }

  return (
    <Container>
      
      {hostelInfo.map((hostel, index) => (
        <Button
          onClick={()=>{handleClick(hostel)}}
          key={index}
          className="m-3 btn-info"
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
          <div style={{ flex: 2, display: "flex",background:'transparent',textAlign:'left' }}>
            {/* Left Partition */}
            <div style={{ flex: 1 }} >
              <Card style={{margin:'20px', background:'transparent', borderLeft:'1px solid gray', width: "100%",height:"300px" }}>
                <Card.Body>
                  <Card.Title className="mb-2 text-primary font-weight-bold text-capitalize"><h3>{hostel.hostelName}</h3></Card.Title>
                  <Card.Subtitle className="mb-2 text-primary text-capitalize"><h4>Category : {hostel.category}</h4></Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-danger text-capitalize">
                    Location : {hostel.mainLocation} <br/>
                     {hostel.nearByLocation}
                  </Card.Subtitle>
    
                  <Card.Text className="mb-2 text-primary">
                    {hostel.description}
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </div>

            {/* Right Partition */}
            <div style={{ flex: 1 }}>
              <Card style={{ margin:'20px',background:'transparent',borderRight:'1px solid gray',  width: "auto",height:"auto"  }}>
              <Card.Body style={{border:'1px solid gray'}}>
                  <Card.Title className="mb-3 text-primary font-weight-bold text-capitalize"><h6>WIFI Avalable : {hostel.Wifi}</h6></Card.Title>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize"><h6>Food : {hostel.food}</h6></Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize"><h6>Parking : {hostel.parking}</h6></Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize"><h6>Drinking Water : {hostel.drinkingWater}</h6></Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize"><h6>Price : {hostel.price}</h6></Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize"><h6>Extra Price : {hostel.extraPrice}</h6></Card.Subtitle>
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
