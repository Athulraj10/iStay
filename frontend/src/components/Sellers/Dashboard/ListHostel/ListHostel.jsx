import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import './style.css'

function ListHostel() {
  const navigate = useNavigate()
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

  const handleEditButton = async (hostelId)=>{
      if (hostelId) {
          const res = await USERSAPI.post("seller/listHostels/editHostel", {
            _id:hostelId,
          });
          const responseData = res.data.data;
          if(responseData){
            navigate('/seller/listHostels/editHostelDetails',{state:{responseData}})
          }
    }
  }

  return (
    <div
      className="event-schedule-area-two p-4 rounded"
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
                <div  className="table-responsive">
                <table className="table table-bordered transparent-table">
                    <thead >
                      <tr>
                        <th className="text-center" scope="col">
                          Hostel Name
                        </th>
                        <th scope="col">Place</th>
                        <th scope="col">Photos</th>
                        <th scope="col">Rate</th>
                        <th className="text-center" scope="col">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(data) ? (
                        data.map((item, index) => (
                          <tr className="inner-box" key={index}>
                            <td className="align-middle">
                              <div className="event-date text-center">
                                <p className="date-month">{item.hostelName}</p>
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="event-img">{item.mainLocation}</div>
                            </td>

                            <td className="align-middle">
                              <div className="event-wrap">
                                {item.images.map((image, index) => (
                                 <img
                                    key={index}
                                    src={`http://localhost:5000/images/${image}`}
                                    // src={`/public/${image}`} 
                                    alt={`Image ${index}`}
                                    className="event-image"
                                    style={{height:'100px', width:'100px', margin:'10px'}}
                                  />
                                ))}
                              </div>
                            </td>

                            <td className="align-middle">
                              <div className="r-no">
                                <span>{item.price}</span>
                              </div>
                            </td>
                            <td className="align-middle text-center">
                              <div className={`primary-btn`}>
                                <button
                                  onClick={() => handleBlockButton(item._id)} // Pass item._id as a parameter
                                  className={`btn ${
                                    item.status ? "btn-primary" : "btn-danger"
                                  }`}
                                >
                                  {item.status ? "Block" : "Active"}
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
                        <tr>
                          <td colSpan="5">Loading data...</td>
                        </tr>
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
