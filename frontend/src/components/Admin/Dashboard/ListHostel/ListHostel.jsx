import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { SpinnerChakra } from "../../../loadingState/SpinnerChakra";

function ListHostel() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Add currentPage state
  const itemsPerPage = 10; // Number of items to display per page

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);



  const handleBlockButton = async (hostelId) => {
    try {
      let res = await USERSAPI.patch(`admin/listHostel/block/${hostelId}`);
      if (res.data) {
        if(res?.data?.status){
          toast.error(res?.data?.message)
        }else{
          toast.success(res?.data?.message)
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };


  useEffect(() => {
   const adminInfo =  localStorage.getItem('adminInfo');
   if(adminInfo){
    const fetchData = async () => {
      try {
        const response = await USERSAPI.post("admin/listHostels");
        const responseData = response.data.data;
        setData(responseData);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };
    fetchData();
   }
  //  else{
  //   navigate('/admin')
  //  }
  },[handleBlockButton]);
  return loading ? (
    <SpinnerChakra/>
  ):(
    <div
    style={{ background: "transparent",height:'auto' }}
    className="event-schedule-area-two p-4 rounded"
  >
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
                        Onwer
                      </th>
                      <th className="text-center" scope="col" style={{maxWidth:'50px'}}>
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
                              <p className="date-month">
                                {item.sellerDetails.name}
                              </p>
                            </div>
                          </td>

                          <td className="align-middle">
                            <div className="meta">
                              <div className="categories">
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
                                  Seller Contact :{item.contactNumber}
                                </span>
                              </div>
                            </div>
                          </td>

                          

                          <td className="align-middle">
                            <div className="event-wrap">
                              {item.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={`https://www.hexashop.shop/images/${image}`}
                                  // src={`/public/${image}`}
                                  alt={`Image ${index}`}
                                  className="event-image"
                                  style={{
                                    height: "100px",
                                    width: "100px",
                                    margin: "10px",
                                  }}
                                />
                              ))}
                            </div>
                          </td>


                          <td className="align-middle">
                            <div className="event-date text-center">
                              <p className="date-month">
                                {item.price}
                              </p>
                            </div>
                          </td>


                          <td className="align-middle text-center">
                            <div className={`primary-btn`}>
                              <button
                                onClick={() => handleBlockButton(item._id)}
                                className={`btn ${
                                  item.isBlock
                                    ? "btn-danger"
                                    : "btn-Success"
                                }`}
                              >
                                {item.isBlock ? "Blocked" : "Block"}
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
      <Row>
     <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(data?.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
     </Row>
    </Container>
  </div>
  )
}

export default ListHostel;
