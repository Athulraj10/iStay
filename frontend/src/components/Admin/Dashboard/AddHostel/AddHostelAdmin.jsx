import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AddHostelAdmin = () => {
  return (
    <div>
      <Container>
        <Row className="photoAddContainer">
          <Col
            lg={9}
            style={{
              height: "300px",
              backgroundColor: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h5 style={{ textAlign: "center" }}>Primary Photo</h5>
          </Col>
          <Col
            lg={3}
            style={{ height: "300px", backgroundColor: "green" }}
          ></Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddHostelAdmin;
