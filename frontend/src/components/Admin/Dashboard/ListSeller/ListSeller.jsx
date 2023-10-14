import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import { useNavigate } from "react-router-dom";

function ListSeller({ data }) {
  const location = useNavigate()
  const handleBlockButton = async (sellerId) => {
    try {
      let res = await USERSAPI.patch(`admin/listSeller/block/${sellerId}`);
      if (res.data) {
        // Handle success
      }
    } catch (error) {
      toast.error(error);
    }
  };
  
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
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          Name
                        </th>
                        <th scope="col">Email</th>
                        <th scope="col">Location</th>
                        <th scope="col">LastCheckIn</th>
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
                                <p className="date-month">{item.name}</p>
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="event-img">{item.email}</div>
                            </td>
                            <td className="align-middle">
                              <div className="event-wrap">
                                <h6>
                                  <a style={{ textDecoration: "none" }}>
                                    {item.location ? item.location : "Kannur"}
                                  </a>
                                </h6>

                                <div className="meta">
                                  <div className="categories">
                                    <a style={{ textDecoration: "none" }}>
                                      Mobile : {item.mobile}
                                    </a>
                                  </div>
                                  <div className="time">
                                    <span>
                                      Account Created :{" "}
                                      {item.createdAt.substring(0, 10)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="r-no">
                                <span>{item.updatedAt.slice(0, 10)}</span>
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

export default ListSeller;
