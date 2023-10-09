import React from 'react'
import { Container,Row,Col,Button} from 'react-bootstrap'

const FindAccommadation = () => {
  return (

    <>
    
    <Container fluid style={{color:'white'}}>
    <Row>
          <Col
            xs={12}
            md={12}
            style={{ height: "100px", backgroundColor: "transparent" }}
          >
            <div className="ms-5 me-5 d-flex justify-content-between align-items-center h-100">
              <Button style={{ color: "white" , width:'200px',height:'70px'}}>Search Area property</Button>
              <Button style={{ color: "white" , width:'200px',height:'70px' }}>Review</Button>
              <Button style={{ color: "white" , width:'200px',height:'70px' }}>Filer</Button>
              <Button style={{ color: "white" , width:'200px',height:'70px' }}>Search</Button>
            </div>
          </Col>
        </Row>
    
        <Row>
      {hostels.map((hostel, index) => (
        <Col key={index}>
          <Col style={{ height: '400px', width: '700px', backgroundColor: 'green', marginLeft: '50px' }}>
            {hostel.something} {/* Replace with the actual property from your data */}
          </Col>
          <Col>
            <h4 className="mb-2">Hostel Name: {hostel.hostelName}</h4>
            <h6 className="mb-2">Hostel Name: {hostel.hostelName}</h6>
            <Button className="mb-2">Hostel Name: {hostel.hostelName}</Button>
            <p className="mb-2">Hostel Name: {hostel.hostelName}</p>
            <p className="mb-2">Hostel Name: {hostel.hostelName}</p>
            <p className="mb-2">Hostel Name: {hostel.hostelName}</p>
            <h6 className="mb-2">Hostel Name: {hostel.hostelName}</h6>
            <p className="mb-2">Hostel Name: {hostel.hostelName}</p>
          </Col>
          <Col>
            <p className="mb-2">Hostel Name: {hostel.hostelName}</p>
            <h6 className="mb-2">Hostel Name: {hostel.hostelName}</h6>
            <p className="mb-2">Hostel Name: {hostel.hostelName}</p>
            <p className="mb-2">Hostel Name: {hostel.hostelName}</p>
          </Col>
        </Col>
      ))}
    </Row>
    </Container>
    </>
  )
}

export default FindAccommadation