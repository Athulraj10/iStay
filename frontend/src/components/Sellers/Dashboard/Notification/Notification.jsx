import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

function Notification() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sellerInfo, setSellerInfo] = useState(null);
  const [sellerIdStored, setSellerId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    const storedSellerInfo = localStorage.getItem("sellerInfo");
    if (storedSellerInfo) {
      console.log(storedSellerInfo);
      setSellerInfo(storedSellerInfo);
      const seller = JSON.parse(storedSellerInfo);
      setSellerId(seller._id);
      setDataReceived(true);
    }
  }, [dataReceived]);

  useEffect(() => {
    if (dataReceived) {
      const fetchdata = async () => {
        const res = await USERSAPI.get("seller/notificationDetails", {
          params: { sellerId: sellerIdStored },
        });
        const responseData = res.data.sellerBookings;
        setData(responseData);
        setLoading(false);
        console.log(data);
      };
      fetchdata();
    }
  }, [dataReceived, sellerIdStored]);

  //   const handleEditButton = async (hostelId)=>{
  //       if (hostelId) {
  //           const res = await USERSAPI.post("seller/listHostels/editHostel", {
  //             _id:hostelId,
  //           });
  //           const responseData = res.data.data;
  //           if(responseData){
  //             navigate('/seller/listHostels/editHostelDetails',{state:{responseData}})
  //           }
  //     }
  //   }

  return (
    <div className="event-schedule-area-two p-4 rounded">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade active show"
                id="home"
                role="tabpanel"
              >
                <div className="table-responsive">
                  <table className="table table-bordered transparent-table">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          Hostel Name
                        </th>
                        <th className="text-center" scope="col">
                          Hostel Address
                        </th>
                        <th scope="col">PaymentMode</th>
                        <th scope="col">Paid Amount</th>
                        <th scope="col" className="text-center">
                          Date of Booking
                        </th>
                        <th className="text-center" scope="col">
                          User Details
                        </th>
                        <th scope="col">Status</th>
                        {/* <th scope="col">Approve</th> */}
                        {/* <th scope="col">Message</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(data) ? (
                        data.map((item, index) => (
                          <tr className="inner-box" key={index}>
                            <td className="align-middle">
                              <div className="event-date text-center">
                                <p className="date-month">
                                  {item.hostelDetails.hostelName}
                                </p>
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="event-img text-center">
                                {item.hostelDetails.mainLocation}
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="event-img text-center">
                                {item.paymentVia}
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="event-img text-center">
                                {item.totalAmount}
                              </div>
                            </td>

                            <td
                              className="align-middle"
                              style={{ textAlign: "center" }}
                            >
                              <span>{item.createdAt.split("T")[0]}</span>
                            </td>

                            <td
                              className="align-middle"
                              style={{ textAlign: "center" }}
                            >
                              <span>
                                {item.userDetails.name} <br />
                                {item.userDetails.mobile}
                              </span>
                            </td>
                            {/* <td className="align-middle" style={{textAlign:'center'}}>
                                <span>{item.userDetails.name} <br />{item.userDetails.mobile}</span>
                            </td> */}
                            <td className="align-middle text-center">
                              <button
                                className="m-1 btn btn-primary"
                                onClick={() => handleEditButton(item._id)}
                              >
                                Paid
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                       null
                      )}
                    </tbody>
                  </table>
                      <div class="spinner-container">
                        <div class="spinner">
                          <div class="spinner">
                            <div class="spinner">
                              <div class="spinner">
                                <div class="spinner">
                                  <div class="spinner"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Notification;
