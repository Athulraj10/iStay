import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { SpinnerChakra } from "../../../loadingState/SpinnerChakra";
import { ProgressChakra } from "../../../loadingState/ProgressChakra";
import ChatLoading from "../../../ChatPage/ChatLoading";

function ListHostel() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sellerInfo, setSellerInfo] = useState(null);
  const [sellerIdStored, setSellerId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    const storedSellerInfo = localStorage.getItem("sellerInfo");
    if (storedSellerInfo) {
      setSellerInfo(storedSellerInfo);
      const seller = JSON.parse(storedSellerInfo);
      setSellerId(seller._id);
      setDataReceived(true);
    } else {
      navigate("/seller/login");
    }
  }, [dataReceived]);

  useEffect(() => {
    setLoading(true);
    if (dataReceived) {
      const fetchdata = async () => {
        const res = await USERSAPI.post("seller/listHostels", {
          sellerId: sellerIdStored,
        });
        const responseData = res.data.data;
        setData(responseData);
        setLoading(false);
      };
      fetchdata();
    }
  }, [dataReceived, sellerIdStored]);

  const handleEditButton = async (hostelId) => {
    if (hostelId) {
      setLoading(true);
      const response = await USERSAPI.post("seller/listHostels/editHostel", {
        _id: hostelId,
      });
      const responseData = response.data.data;
      if (responseData) {
        setLoading(false);
        navigate("/seller/listHostels/editHostelDetails", {
          state: { responseData },
        });
      }
    }
  };

  return loading ? (
    <SpinnerChakra />
  ) : (
    <div
      className="event-schedule-area-two p-4 rounded"
      style={{ minHeight: "100vh",height:'auto', color:'whte'}}
    >
      <Container>
        <Row>
          <Link to="/seller/listHostels/addhostel">
            <Col>
              <Button className="mb-3 p-2" variant="dark">
                Add New Hostels
              </Button>
            </Col>
          </Link>
        </Row>

        <Row>
          <Col lg={12}>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade active show"
                id="home"
                role="tabpanel"
              >
                <div className="table table-responsive">
                  <table id="tables" className="table table-bordered" style={{border:'2px solid black' }}>
                    <thead>
                      <tr>
                        <th style={{border:'2px solid black'}}>Hostel Name</th>
                        <th style={{border:'2px solid black'}}>Photos</th>
                        <th style={{border:'2px solid black'}}>Rate</th>
                        <th className="text-center" style={{border:'2px solid black'}}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(data) ? (
                        data.map((item, index) => (
                          <tr style={{border:'2px solid black'}} className="inner-box" key={index}>
                            <td className="align-middle" style={{border:'2px solid black'}}>
                              <div className="event-date text-center" >
                                <p className="date-month">{item.hostelName}</p>
                              </div>
                            </td>
                            {/* <td className="align-middle">
                              <div className="event-img">
                                {item.mainLocation}
                              </div>
                            </td> */}

                            <td style={{border:'2px solid black'}}>
                              <div style={{display:'flex',flexWrap:"wrap",margin:'50px 0 50px 0'}}>
                                {item.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={`https://www.istay.site/images/${image}`}
                                    // src={`/public/${image}`}
                                    alt={`Image ${index}`}
                                    className="event-image"
                                    style={{
                                      height: "100px",
                                      width: "100px",
                                      margin: "5px",
                                    }}
                                  />
                                ))}
                              </div>
                            </td>

                            <td className="align-middle" style={{border:'2px solid black'}}>
                              <div className="r-no m-5">
                                <span>{item.price}</span>
                              </div>
                            </td>
                            <td className="align-middle text-center" >
                              <div className={`primary-btn`}>
                                <button
                                  className={`btn ${
                                    item.isBlock ? "btn-danger" : "btn-success"
                                  }`}
                                >
                                  {item.isBlock ? "Admin Blocked" : "Live"}
                                </button>
                                <button
                                  className="m-1 btn btn-primary"
                                  onClick={() => handleEditButton(item._id)} // Pass item._id as a parameter
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <ChatLoading />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ListHostel;
