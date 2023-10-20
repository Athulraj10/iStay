import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import Chart from "chart.js/auto";
import React from "react";

function Dashboard() {
  const [sellerInfo, setSellerInfo] = useState([]);

  const [bookingCount, setBookingCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [enquery, setEnquery] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState([0]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([0]);
  const [messages, setMessages] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedSellerInfo = localStorage.getItem("sellerInfo");
        const sellerInfo = JSON.parse(storedSellerInfo);
        if (sellerInfo) {
          setSellerInfo(sellerInfo);
        }
        if (sellerInfo) {
          const response = await USERSAPI.get("/seller/dashboard", {
            params: sellerInfo,
          });
          if (response) {
            const { bookingCount, revenue, dailyRevenue, monthlyRevenue } =
              response.data;
            setBookingCount(bookingCount);
            setRevenue(revenue);
            setMonthlyRevenue(monthlyRevenue);
            setDailyRevenue(dailyRevenue);
          }
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartRef = React.createRef();

  const firstLabel =
    dailyRevenue.length && dailyRevenue[0]._id
      ? `${dailyRevenue[0]._id.day}/${dailyRevenue[0]._id.month}/${dailyRevenue[0]._id.year} Daily Revenue`
      : "No Revenue";
  const secondLabel =
    monthlyRevenue.length && monthlyRevenue[0]._id
      ? `${monthlyRevenue[0]._id.month}/${monthlyRevenue[0]._id.year} Monthly Revenue`
      : "No Revenue";

  const firstData =
    dailyRevenue.length && dailyRevenue[0]
      ? `${dailyRevenue[0].totalAmount}`
      : 0.1;
  const secondData =
    monthlyRevenue.length && monthlyRevenue[0]
      ? `${monthlyRevenue[0].totalAmount}`
      : 0.1;

  const today = new Date();
  const labels = [today];
  for (let i = 1; i < 4; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date);
  }
  const formattedLabels = labels.map((date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  });


  const data = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Revenue",
        data: [firstData, secondData, 0.1, 0.1, 0.1, 0.1],
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
      type: "bar",
      data: data,
      options: options,
    });

    // Make sure to destroy the previous chart if it exists
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [dailyRevenue, monthlyRevenue]);

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
    <div>
      <Container style={{ height: "auto" }}>
        <Row className="justify-content-md-center">
          <Col xs lg="2" style={style}>
            <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
              <h4 className="text-center" style={{ color: "white" }}>
                Messages
              </h4>
              <h4 style={{ color: "green" }}>
                {messages !== null ? messages : 0}{" "}
              </h4>
              {/* <h4 style={{ color: "white" }}>Blocked : 0</h4> */}
            </Link>
          </Col>
          <Col xs lg="2" style={style}>
            <Link to="/admin/listSellers" style={{ textDecoration: "none" }}>
              <h4 className="text-center" style={{ color: "white" }}>
                Enquery
              </h4>
              <h4 style={{ color: "green" }}>
                {enquery !== null ? enquery : 0}
              </h4>
              {/* <h4 style={{ color: "white" }}>Blocked : 0</h4> */}
            </Link>
          </Col>
          <Col xs lg="2" style={style}>
            <Link to="/admin/listHostels" style={{ textDecoration: "none" }}>
              <h4 className="text-center" style={{ color: "white" }}>
                Revenue
              </h4>
              <h4 style={{ color: "green" }}> {revenue}</h4>
            </Link>
          </Col>
          <Col xs lg="2" style={style}>
            <Link to="/admin/listUsers" style={{ textDecoration: "none" }}>
              <h4 className="text-center" style={{ color: "white" }}>
                Booking
              </h4>
              <h4 style={{ color: "green" }}>{bookingCount}</h4>
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
    </div>
  );
}
export default Dashboard;
