import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import Chart from "chart.js/auto";
import React from "react";
import {SpinnerChakra} from "../../loadingState/SpinnerChakra";

function Dashboard() {
  const navigate = useNavigate();
  const [sellerInfo, setSellerInfo] = useState([]);

  const [bookingCount, setBookingCount] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [enquery, setEnquery] = useState(0);
  const [messages, setMessages] = useState(0);
  const [chartValues, setChartValues] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedSellerInfo = localStorage.getItem("sellerInfo");
        const sellerInfo = JSON.parse(storedSellerInfo);
        if (!sellerInfo) {
          navigate("/seller/login");
        }
        if (sellerInfo) {
          setSellerInfo(sellerInfo);
        }
        if (sellerInfo) {
          const response = await USERSAPI.get("/seller/dashboard", {
            params: sellerInfo,
          });
          if (response) {
            const {
              bookingCount,
              chartValues,
              enquery,
              messages,
              revenue,
              totalSale,
            } = response.data;
            setBookingCount(bookingCount);
            setChartValues(chartValues);
            setEnquery(enquery);
            setMessages(messages);
            setTotalSale(totalSale);
            setRevenue(revenue);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartRef = React.createRef();

  const labels = chartValues?.map((items) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[items._id.month];
  });

  const revenueAmount = chartValues?.map((items) => items.totalRevenue);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        data: revenueAmount,
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
    const ctx = chartRef?.current?.getContext("2d");
    let myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [chartValues]);

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
  return isLoading ? (
   <SpinnerChakra/>
  ) : (
    <div>
      <Container style={{ height: "auto" }}>
        <Row className="justify-content-md-center">
          <Col xs lg="2" style={style}>
            <Link to="/seller/message" style={{ textDecoration: "none" }}>
              <h4 className="text-center" style={{ color: "white" }}>
                Messages
              </h4>
              <h4 style={{ color: "green" }}>
                {messages !== null ? messages : 0}
              </h4>
            </Link>
          </Col>
          <Col xs lg="2" style={style}>
            <Link to="/seller/listEnquery" style={{ textDecoration: "none" }}>
              <h4 className="text-center" style={{ color: "white" }}>
                Enquery
              </h4>
              <h4 style={{ color: "green" }}>
                {enquery !== null ? enquery : 0}
              </h4>
            </Link>
          </Col>
          <Col xs lg="2" style={style}>
            <h4 className="text-center" style={{ color: "white" }}>
              Revenue
            </h4>
            <h4 style={{ color: "green" }}> {revenue}</h4>
          </Col>
          <Col xs lg="2" style={style}>
            <h4 className="text-center" style={{ color: "white" }}>
              TotalSale
            </h4>
            <h4 style={{ color: "green" }}> {totalSale ? totalSale : 0}</h4>
          </Col>
          <Col xs lg="2" style={style}>
            <Link to="/seller/notification" style={{ textDecoration: "none" }}>
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
          <canvas ref={chartRef ? chartRef : "null"}></canvas>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
