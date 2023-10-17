import React, { useState, useEffect } from "react";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
const FindAccommodation = () => {
  // Placeholder function for handling sort and filter options
  const handleSortFilter = async (option) => {
    let response;
    switch (option) {
      case "high-low":
        response = await USERSAPI.get("users/findAccommodation/high");
        setHostelInfo(response.data.data);
        break;
      case "low-high":
      response = await USERSAPI.get("users/findAccommodation/low");
      setHostelInfo(response.data.data);
        break;

      default:
        break;
    }
  };

  // Placeholder function for handling search
  const handleSearch = async (searchValue) => {
    try {
      const response = await USERSAPI.get("users/findAccommodation/search", {
        params: { search: searchValue },
      });
      setHostelInfo(response.data.data);
    } catch (error) {
      toast.error(error)
    }
  };
  const navigate = useNavigate();
  const [showBasic, setShowBasic] = useState(false);
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

  const handleClick = (hostel) => {
    if (hostel) {
      navigate("/findAccommodation/singlePageView", { state: { hostel } });
    }
  };

  return (
    <Container>
      <div>
        <Navbar style={{background:"white"}} className="rounded-2" expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Price" style={{ color: "blue" }}  id="basic-nav-dropdown">
                <NavDropdown.Item   onClick={() => handleSortFilter("low-high")}>
                  Low-High
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleSortFilter("high-low")}>
                  High-Low
                </NavDropdown.Item>
              </NavDropdown>
              {/* <NavDropdown title="Filter" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => handleSortFilter("filterOption1")}
                >
                  Wifi
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleSortFilter("filterOption2")}
                >
                  Food
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                style={{background:'dark'}}
                className="mr-sm-2 border-dark"
                onChange={(e) => handleSearch(e.target.value)}
              />

              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>

      {hostelInfo.map((hostel, index) => (
        <Button
          onClick={() => {
            handleClick(hostel);
          }}
          key={index}
          className="m-3 btn-info"
          style={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          {/* Left Side: Image */}
          <div className="event-wrap " style={{ flex: 1 }}>
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
          <div
            style={{
              flex: 2,
              display: "flex",
              background: "transparent",
              textAlign: "left",
            }}
          >
            {/* Left Partition */}
            <div style={{ flex: 1 }}>
              <Card
                style={{
                  margin: "20px",
                  background: "transparent",
                  borderLeft: "1px solid gray",
                  width: "100%",
                  height: "300px",
                }}
              >
                <Card.Body>
                  <Card.Title className="mb-2 text-primary font-weight-bold text-capitalize">
                    <h3>{hostel.hostelName}</h3>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-primary text-capitalize">
                    <h4>Category : {hostel.category}</h4>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-danger text-capitalize">
                    Location : {hostel.mainLocation} <br />
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
              <Card
                style={{
                  margin: "20px",
                  background: "transparent",
                  borderRight: "1px solid gray",
                  width: "auto",
                  height: "auto",
                }}
              >
                <Card.Body style={{ border: "1px solid gray" }}>
                  <Card.Title className="mb-3 text-primary font-weight-bold text-capitalize">
                    <h6>WIFI Avalable : {hostel.Wifi}</h6>
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize">
                    <h6>Food : {hostel.food}</h6>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize">
                    <h6>Parking : {hostel.parking}</h6>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize">
                    <h6>Drinking Water : {hostel.drinkingWater}</h6>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize">
                    <h6>Price : {hostel.price}</h6>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-3 text-primary text-capitalize">
                    <h6>Extra Price : {hostel.extraPrice}</h6>
                  </Card.Subtitle>
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
