import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function dashboardValues() {
  const style = {
    margin: "10px", // Adjust margin as needed
    padding: "20px", // Add padding for spacing
    height: "150px",
    backgroundColor: "#233956", // Change background color
    borderRadius: "8px", // Add rounded corners
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a shadow
    color: "white", // Text color
    textAlign: "center", // Center text
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        
        <Col xs lg="3" style={style}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="text-center" style={{color:'white'}}>Total Users</h3>
            <h3 style={{color:'white'}}>Value 2</h3>
            <h3 style={{color:'white'}}>Value 3</h3>
          </Link>
        </Col>

      </Row>
      <Row>
        <Col style={style}>1 of 3</Col>
        <Col style={style} md="auto">
          Variable width content
        </Col>
        <Col style={style} xs lg="2">
          3 of 3
        </Col>
      </Row>
    </Container>
  );
}

export default dashboardValues;
