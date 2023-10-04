import { Container, Row, Col } from "react-bootstrap";
import HeaderLeftSection from "./EditSellerSections/HeaderLeftSection";
import HeaderRightSection from "./EditSellerSections/HeaderRightSection";
// import Navbars from "../Register/sections/Navbar";
// import BodySection from "../Register/sections/BodySection";
// import MainSection from "../Register/sections/MainSection";

const EditSeller = (data) => {
    console.log(data)
  const rightSection = {
    background: "rgba(255, 255, 255, 0.052)",
    color: "white",
  };

  const leftSection = {
    background: "rgba(255, 255, 255, 0)",
    color: rightSection.color,
  };

  return (
    <>
      <Container style={{height:'100vh'}}>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} style={leftSection} className="card p-5">
            <HeaderLeftSection />
          </Col>

          <Col xs={12} md={5} style={rightSection} className="card p-5 m-1">
            <HeaderRightSection />
          </Col>
        </Row>
      </Container>
      {/* <Navbars />
      <BodySection />
      <MainSection /> */}
    </>
  );
};

export default EditSeller;
