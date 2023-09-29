import { Container, Row, Col } from "react-bootstrap";
import HeaderLeftSection from "./loginSections/HeaderLeftSection";
import HeaderRightSection from "./loginSections/HeaderRightSection";

const Login = () => {
  const rightSection = {
    background: "rgba(255, 255, 255, 0)",
    color: "white",
  };
  const leftSection = {
    background: "rgba(255, 255, 255, 0)",
    color: "white",
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        
        <Col xs={12} md={6} style={leftSection} className="card p-5">
          <HeaderLeftSection />
        </Col>

        <Col xs={12} md={5} style={rightSection} className="card p-5 m-5">
          <HeaderRightSection />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
