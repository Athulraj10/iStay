// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import MainSectionImage from "./mainSection.png"; // Import the image
import image2 from "./image.jpg"; // Import the image
import premium from "./premium.png"; // Import the image
import { Row, Col, Container, Button } from "react-bootstrap";
import "./Header.css";

const MainSection = () => {
  const containerStyle = {
    height: "80vh",
    marginTop:'50px',
    background: "linear-gradient(to bottom, #0f172a, #30475e)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const textContainerStyle = {
    padding:"100px",
    textAlign: "center",
    background: "linear-gradient(to bottom, #0f172a, #30475e)",
  };
  return (
    <div>
      <Container fluid>
        <Row style={{ height: "80vh", backgroundColor: "#0f172a" }}>
          <Col className="p-2 m-2 mt-5" xs>
            <h1
              style={{
                fontSize: "80px",
                margin: "30px",
                textAlign: "center",
                color: "#cfd6e3",
              }}
            >
              Discover and collect rare with your needs
            </h1>
          </Col>
          <Col
            className="m-5 text-white rounded-3"
            xs={{ order: 12 }}
            style={{
              backgroundImage: `url(${MainSectionImage})`, // Use the imported image
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></Col>
        </Row>

        <Row>
          <Col
            xs={12}
            md={12}
            style={{ height: "100px", backgroundColor: "black" }}
          >
            <div className="ms-5 me-5 d-flex justify-content-between align-items-center h-100">
              <h5 style={{ color: "white" }}>Chat Option</h5>
              <h5 style={{ color: "white" }}>Video</h5>
              <h5 style={{ color: "white" }}>Audio</h5>
              <h5 style={{ color: "white" }}>Cart</h5>
              <h5 style={{ color: "white" }}>Digital Store</h5>
            </div>
          </Col>
        </Row>
        <Row style={{ height: "80vh", backgroundColor: "#0f172a" }}>
          <Col
            className="m-5 text-white rounded-4"
            xs={{ order: 12 }}
            style={{
              backgroundImage: `url(${image2})`, // Use the imported image
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></Col>
          <Col className="p-2 m-2 mt-5" xs>
            <h5
              style={{
                fontSize: "50px",
                margin: "30px",
                textAlign: "center",
                color: "#cfd6e3",
              }}
            >
              Built-in FOR YOUR NEED AND FULLFILL
            </h5>
            <h6
              style={{
                fontSize: "20px",
                margin: "30px",
                textAlign: "center",
                color: "#cfd6e3",
                textTransform: "lowerCase",
              }}
            >
              BASED ON YOUR NEEDS WE WILL PROVIDE A WIDE RANGE OF
              ACCOMMODATION.YOUR CITY IS YOUR ALL-IN-ONE SOLUTION
            </h6>
            <Button
              style={{
                height: "100px",
                width: "400px",
                marginLeft: "100px",
                marginTop: "50px",
                borderRadius: "20px",
              }}
            >
              View Our AVAILABLE STAYS
            </Button>
          </Col>
        </Row>

        <Row style={{ height: "100vh", backgroundColor: "#0f172a" }}>
          <Col className="p-2 m-2 mt-5" xs>
            <h5
              style={{
                fontSize: "50px",
                margin: "30px",
                textAlign: "center",
                color: "#cfd6e3",
              }}
            >
              Premium Key Feature
            </h5>
            <h6
              style={{
                fontSize: "20px",
                margin: "50px",
                textAlign: "center",
                color: "#cfd6e3",
                textTransform: "lowerCase",
              }}
            >
              If you are a premium customer you will have a lot of benefits.Get
              chat option directly to the owner of the house
            </h6>
            <Button
              style={{
                height: "100px",
                width: "400px",
                marginLeft: "100px",
                marginTop: "50px",
                borderRadius: "20px",
              }}
            >
              Get premium benefit
            </Button>
          </Col>

          <Col
            className="m-5 text-white rounded-4"
            xs={{ order: 6 }}
            style={{
              backgroundImage: `url(${premium})`, // Use the imported image
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "700px",
              width: "100%",
            }}
          ></Col>
        </Row>

        <Row style={containerStyle}>
          <Col xs={12} md={10} style={textContainerStyle}>
            <h1 style={{padding:"10px"}}>are you struggling for quarters?</h1>
            <h1 > be a part of the iStay</h1>
            <Button 
             style={{
                height: "100px",
                width: "400px",
                marginTop: "50px",
                borderRadius: "20px",
              }}
            variant="primary">Get started</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainSection;
