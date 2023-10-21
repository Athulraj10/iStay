import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import Chart from "chart.js/auto";
import React from "react";

function dashboardValues() {
  const [totalUsers, settotalUsers] = useState(0);
  const [totalBlockUsers, settotalBlockUsers] = useState(0);
  const [totalSeller, setTotalSeller] = useState(0);
  const [totalBlockSeller, setTotalBlockSeller] = useState(0);
  const [totalHostel, setTotalHostel] = useState(0);
  const [totalBlockHostel, setTotalBlockHostel] = useState(0);

  const [totalBookingCount, setBookingCount] = useState(0);
  const [totalRevenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await USERSAPI.post("admin/usersCount");
        const {
          userCount,
          userBlockCount,
          sellerCount,
          sellerBlockCount,
          hostelCount,
          hostelBlockCount,
          bookingCount,
          revenue,
        } = response.data;
        setTotalSeller(sellerCount);
        setTotalBlockSeller(sellerBlockCount);
        setTotalHostel(hostelCount);
        setTotalBlockHostel(hostelBlockCount);
        settotalUsers(userCount);
        settotalBlockUsers(userBlockCount);

        setBookingCount(bookingCount);
        setRevenue(revenue);

        setLoading(false);
        
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  // const firstLabel = totalRevenue.length && totalRevenue[0]._id ? `${totalRevenue[0]._id.day}/${totalRevenue[0]._id.month}/${totalRevenue[0]._id.year} Daily Revenue` : "No Revenue";
  // const secondLabel = monthlyRevenue.length && monthlyRevenue[0]._id ? `${monthlyRevenue[0]._id.month}/${monthlyRevenue[0]._id.year} Monthly Revenue` : "No Revenue";
  const firstData = totalRevenue ? totalRevenue : 0.1;
  // const secondData = monthlyRevenue.length && monthlyRevenue[0] ? `${monthlyRevenue[0].totalAmount}` : 0.1;

  const data = {
    labels: ["September", "Octobar", "November"],
    datasets: [
      {
        label: "Revenue",
        data: [0.1, firstData, firstData],
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
      type: "line",
      data: data,
      options: options,
    });

    // Make sure to destroy the previous chart if it exists
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [totalRevenue]);

  return (
    <Container style={{ height: "100vh" }}>
      <Row className="justify-content-md-center">
        <Col xs lg="2" style={style}>
          <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
              Total Booking
            </h4>
            <h4 style={{ color: "white" }}>Count : {totalBookingCount}</h4>
            {/* <h4 style={{color:'white'}}>Blocked : {totalBlockUsers}</h4> */}
          </Link>
        </Col>
        <Col xs lg="2" style={style}>
          <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
              Total Revenue
            </h4>
            <h4 style={{ color: "white" }}>₹{totalRevenue}</h4>
            {/* <h4 style={{color:'white'}}>Blocked : {totalBlockUsers}</h4> */}
          </Link>
        </Col>
        <Col xs lg="2" style={style}>
          <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
              Total Users
            </h4>
            <h4 style={{ color: "white" }}>Count : {totalUsers}</h4>
            <h4 style={{ color: "white" }}>Blocked : {totalBlockUsers}</h4>
          </Link>
        </Col>
        <Col xs lg="2" style={style}>
          <Link to="/admin/listSellers" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
              Total Sellers
            </h4>
            <h4 style={{ color: "white" }}>Count : {totalSeller}</h4>
            <h4 style={{ color: "white" }}>Blocked : {totalBlockSeller}</h4>
          </Link>
        </Col>
        <Col xs lg="2" style={style}>
          <Link to="/admin/listHostels" style={{ textDecoration: "none" }}>
            <h4 className="text-center" style={{ color: "white" }}>
              Total Hostels
            </h4>
            <h4 style={{ color: "white" }}>Count : {totalHostel}</h4>
            <h4 style={{ color: "white" }}>Blocked : {totalBlockHostel}</h4>
          </Link>
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          marginLeft: "150px",
          height: "500px",
          width: "1000px",
        }}
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </Container>
  );
}

export default dashboardValues;
