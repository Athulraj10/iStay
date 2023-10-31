import { Button, Container, Col, Form, Row } from "react-bootstrap";
import premiumLogo from "./premiumLogo.png";
const BodySection = () => {
  const rightSection = {
    background: "transparent",
    backgroundImage: `url(${premiumLogo})`,
    backgroundSize: "80% 100%",
    backgroundRepeat: "no-repeat",
    };
  const leftSection = {
    background: "rgba(255, 255, 255, 0)",
    color: "white",
  };
  return (
    <main>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} style={leftSection}   className="card p-5 mx-auto">
            <h5 style={{ color: "gray" }}>ANALYTICS</h5>
            <h2 style={{ fontWeight: "900", width: "350px", fontSize: "50px" }}>
              Premium Key Feature
            </h2>
            <p style={{ width: "350px", padding: "10px" }}>
              If you are a premium customer you will have a lot of benefits.Get
              chat option directly to the owner of the house
            </p>
            <button className="button">
              Get premium benefit
              <div className="hoverEffect">
                <div> </div>
              </div>
            </button>
          </Col>

          <Col
            xs={4}
            md={5}
            style={rightSection}
            className="card p-5 mx-auto"
          ></Col>
        </Row>
      </Container>
    </main>
  );
};

export default BodySection;
