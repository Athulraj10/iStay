import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {
  return (
    <Container fluid>
      
       <Row style={{height:'200px',backgroundColor:'#233d57'}}>
        <Col className='p-3 m-3 text-white' style={{border:'3px solid white'}}xs><h3>Chart</h3></Col>
        <Col className='p-3 m-3 text-white' style={{border:'3px solid white'}}xs><h3>Enquery</h3></Col>
        <Col className='p-3 m-3 text-white'  xs={{ order: 1 }}  style={{border:'3px solid white'}} ><h3>Revenue</h3></Col>
      </Row>
      <Row style={{height:'450px',backgroundColor:'#1b2335'}}>
      <Col className='p-3 m-3 text-white' style={{border:'3px solid white'}}  xs><h3>Listing Datas</h3></Col>
      </Row>
      <Row style={{height:'450px',backgroundColor:'#232a4a'}}>
      <Col className='p-3 m-3' style={{border:'3px solid white'}}  xs>Listing data</Col>
        <Col className='p-3 m-3'  xs={{ order: 12 }} style={{border:'3px solid white'}}>values</Col>
        <Col className='p-3 m-3'  xs={{ order: 1 }}  style={{border:'3px solid white'}} >container</Col>    
      </Row>
    </Container>
  );
}

export default Dashboard;