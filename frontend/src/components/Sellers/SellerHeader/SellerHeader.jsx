import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import {
  FaSignOutAlt,
  FaUser,
  FaStore,
  FaHome,
  FaFonticonsFi,
  FaBell,
} from "react-icons/fa";
import "./SellerHeader.css";
import logoImage from "./iStays.png";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import Cookies from "js-cookie";

const SellerHeader = () => {
  const location = useNavigate();
  const [sellerInfo, setsellerInfo] = useState();
  const [notification, setNotification] = useState(null);

  const handleLogout = async () => {
    let res = await USERSAPI.post("/seller/logout");
    if (res.status) {
      localStorage.removeItem("sellerInfo");
      Cookies.remove('seller_JWT_token')
      setsellerInfo(null);
      location("/seller/login");
    }
  };

  useEffect(() => {
    const fetchSellerInfo = async () => {
      const parsedSellerInfo = JSON.parse(localStorage.getItem("sellerInfo"));
      if (parsedSellerInfo) {
        setsellerInfo(parsedSellerInfo);
        const response = await USERSAPI.get("seller/notification", {
          params: { sellerInfo: parsedSellerInfo._id },
        });
        if (response.data.sellerBookings) {
          
          setNotification(response.data.sellerBookings);

        } else {
          setNotification(null);
        }
      }
    };
    fetchSellerInfo();
  },[]);

  return (
    <>
      <Navbar
        className="navbarStyle"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >

        <Container>
          <LinkContainer to="/seller">
            <Navbar.Brand>
              <img src={logoImage} alt="LOGO" />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {sellerInfo ? (
                <>
                  <Link to="/seller/message" className="nav-link">
                    <FaStore /> List Messge
                  </Link>

                  <Link to="/seller/listEnquery" className="nav-link">
                    <FaUser /> List Enquery
                  </Link>
                  <Link to="/seller/listHostels" className="nav-link">
                    <FaHome /> List Hostel
                  </Link>
                  <Link to="/seller/notification" className="nav-link">
                    <FaBell /> Notification
                    {notification != null ? (
                      <span
                        style={{
                          color: "red",
                          borderRadius: "5px",
                          padding: "3px",
                          margin: "5px",
                        }}
                      >
                      {notification}
                      </span>
                    ) : null}
                  </Link>


                  <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Nav.Link>
                </>
              ) : (
              null
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default SellerHeader;
