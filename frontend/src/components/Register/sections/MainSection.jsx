import { Container, Row, Col } from "react-bootstrap";

const MainSection = () => {
  const pContainer = {
    width: "500px",
    textTransform: "capitalize",
    textAlign: "center",
    height: "auto",
  };
  const headerSecondContainer = {
    width: "500px",
    textTransform: "capitalize",
    textAlign: "center",
    height: "auto",
  };
  const styleSteet = {
    color: "gray",
    background:
      "linear-gradient(to right,rgba(15, 23, 42, 1),rgba(23, 45, 100, 1))",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "93%",
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-5" style={styleSteet}>
            {/* <Col className="" style={centerContainer}> */}
            <p style={pContainer}>are you struggling for quarters?</p>
            <h1 style={headerSecondContainer}>
              be a part of the <br /> Istay
            </h1>
           

            <button class="button" style={{width:'200px',margin:'30px'}}> Get in touch</button>



          </Col>
          {/* </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default MainSection;
