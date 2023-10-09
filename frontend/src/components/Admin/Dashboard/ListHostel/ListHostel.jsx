import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import { Link } from "react-router-dom";

function ListHostel({ data }) {
  const handleBlockButton = async (userId) => {
    try {
      let formData = {
        id: userId,
      };
      let res = await USERSAPI.post("admin/listUsers/block", formData);
      if (res.data) {
        // if data what will do
      }
    } catch (error) {
      toast.error(error);
    }
  };
  console.log(data[0]);
  return (
    <div
      style={{ background: "transparent" }}
      className="event-schedule-area-two p-4 rounded"
    >
      <Container>
        <Row>
          <Link to="/admin/listHostels/addhostel">
            <Col>
              <Button className="mb-3 p-2 " variant="dark">
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
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          Onwer 
                        </th>
                        <th className="text-center" scope="col">
                          Hostel Details 
                        </th>
                       
                        <th className="text-center" scope="col">
                         Photos 
                        </th>
                       
                      
                        <th className="text-center" scope="col">
                          Price
                        </th>
                      
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
                                <p className="date-month">{item.sellerDetails.name}</p>
                              </div>
                            </td>

                            <td className="align-middle">
                               <div className="meta">
                                  <div className="categories text-center">
                                    <a style={{ textDecoration: "none" }}>
                                      HostelName : {item.hostelName}
                                    </a>
                                  </div>
                                  <div className="categories">
                                    <a style={{ textDecoration: "none" }}>
                                      Location : {item.mainLocation}
                                    </a>
                                  </div>
                            <div className="time">
                                    <span>
                                      Seller Contact :
                                      {item.contactNumber}
                                    </span>
                                  </div>
                             </div>


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
                              <div className="event-date text-center">
                                <p className="date-month">{item.price}</p>
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
