import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";

function Dashboard() {
  const [totalUsers, settotalUsers] = useState([]);
  const [totalSeller, setTotalSeller] = useState([]);
  const [totalHostel, setTotalHostel] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await USERSAPI.post("admin/usersCount");
        const {userCount,sellerCount,hostelCount} = res.data // Access the data property
        setTotalSeller(sellerCount)
        setTotalHostel(hostelCount)
        settotalUsers(userCount)
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchData();
  },[]);

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
    <Container style={{height:'100vh'}}>
    <Row className="justify-content-md-center">
      
      <Col xs lg="3" style={style}>
        <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
          <h3 className="text-center" style={{color:'white'}}>Total Users</h3>
          <h4 style={{color:'white'}}>Total count : {totalUsers}</h4>
          <h4 style={{color:'white'}}>Blocked : 0</h4>
        </Link>
      </Col>
      <Col xs lg="3" style={style}>
        <Link to="/admin/listSellers" style={{ textDecoration: "none" }}>
          <h3 className="text-center" style={{color:'white'}}>Total Sellers</h3>
          <h4 style={{color:'white'}}>Total count : {totalSeller}</h4>
          <h4 style={{color:'white'}}>Blocked : 0</h4>
        </Link>
      </Col>
      <Col xs lg="3" style={style}>
        <Link to="/admin/listHostels" style={{ textDecoration: "none" }}>
          <h3 className="text-center" style={{color:'white'}}>Total Hostels</h3>
          <h4 style={{color:'white'}}>Total count : {totalHostel}</h4>
          <h4 style={{color:'white'}}>Blocked : 0</h4>
        </Link>
      </Col>

    </Row>
    <Row>
      <Col style={style}>additonal details</Col>
      <Col style={style} md="auto">
        Variable width content
      </Col>
      <Col style={style} xs lg="2">
        3rd values
      </Col>
    </Row>
  </Container>
);
}

//     <Container fluid>
//        <Row style={{height:'200px',backgroundColor:'#233d57'}}>
//         <Col className='p-3 m-3 text-white' style={{border:'3px solid white'}}xs><h3>Chart</h3></Col>
//         <Col className='p-3 m-3 text-white' style={{border:'3px solid white'}}xs><h3>Enquery</h3></Col>
//         <Col className='p-3 m-3 text-white'  xs={{ order: 1 }}  style={{border:'3px solid white'}} ><h3>Revenue</h3></Col>
//       </Row>
//       <Row style={{height:'450px',backgroundColor:'#1b2335'}}>
//       <Col className='p-3 m-3 text-white' style={{border:'3px solid white'}}  xs><h3>Listing Datas</h3></Col>
//       </Row>
//       <Row style={{height:'450px',backgroundColor:'#232a4a'}}>
//       <Col className='p-3 m-3' style={{border:'3px solid white'}}  xs>Listing data</Col>
//         <Col className='p-3 m-3'  xs={{ order: 12 }} style={{border:'3px solid white'}}>values</Col>
//         <Col className='p-3 m-3'  xs={{ order: 1 }}  style={{border:'3px solid white'}} >container</Col>    
//       </Row>
//     </Container>
//   );
// }

export default Dashboard;