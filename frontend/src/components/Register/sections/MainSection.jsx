import backgroundImage from './bg.png'
import { Container,Row,Col } from "react-bootstrap";

const MainSection = () => {
    // const styleSteet = {
    //     width:'93%',
    //     height:"auto"
    // }
    const styleSteet = {
        color:'white',
        background:`url(${backgroundImage})`,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'93%',
        height:"auto"

    }
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-5" style={styleSteet}>
            {/* <Col className="" style={centerContainer}> */}
            <h1>dd</h1>
            <h1>dd</h1>
            <button>hei</button>
            </Col>
          {/* </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default MainSection;
