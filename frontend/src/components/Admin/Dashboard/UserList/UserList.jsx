import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function EventSchedule({ data }) {
    return (
        <div className="event-schedule-area-two p-4 rounded">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade active show" id="home" role="tabpanel">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">Status</th>
                                                <th className="text-center" scope="col">Block</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr className="inner-box" key={index}>
                                                    <td className="align-middle">
                                                        <div className="event-date text-center">
                                                            <p className="date-month">{item.name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="event-img">
                                                            {item.email}
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="event-wrap">
                                                            <h3><a href="#">{item.location}</a></h3>
                                                            <div className="meta">
                                                                <div className="organizers">
                                                                    <a href="#">{item.pincode}</a>
                                                                </div>
                                                                <div className="categories">
                                                                    <a href="#">{item.phoneNo}</a>
                                                                </div>
                                                                <div className="time">
                                                                    <span>{item.lastlogin}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="r-no">
                                                            <span>{item.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <div className="primary-btn">
                                                            <a className="btn btn-primary" href="#">Block</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
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

export default EventSchedule;
