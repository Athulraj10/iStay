import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import Chart from "chart.js/auto";
import React from "react";


function dashboardValues() {
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

  const chartRef = React.createRef();

  // Sample data for the chart
  const data = {
    labels: ["Item 1", "Item 2", "Item 2", "Item 2", "Item 3", "Item 4"],
    datasets: [
      {
        label: "Sample Data",
        data: [12, 19, 3, 5, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  React.useEffect(() => {
    // Create the chart on component mount
    const ctx = chartRef.current.getContext("2d");
    let myChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: options,
    });

    // Make sure to destroy the previous chart if it exists
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

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
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right',marginLeft:'150px', height: '500px', width: '1000px' }}>
 
  <canvas ref={chartRef}></canvas>
</div>

      </Container>
  
  );
}

export default dashboardValues;
