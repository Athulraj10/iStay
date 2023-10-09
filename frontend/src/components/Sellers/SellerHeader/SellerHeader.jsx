import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaStore,
  FaHome,
} from "react-icons/fa";
import "./SellerHeader.css";
import logoImage from "./iStays.png";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";

const SellerHeader = () => {
  const location = useNavigate();
  const [sellerInfo, setsellerInfo] = useState(null);


  const handleLogout = async () => {
    let res = await USERSAPI.post("/seller/logout");
    if (res.status) {
      localStorage.removeItem("sellerInfo");
      setsellerInfo(null);
      location("/seller/login");
    }
  };

  useEffect(() => {
    // Define an asynchronous function to fetch sellerInfo from localStorage
    const fetchsellerInfo = async () => {
      const storedsellerInfo = localStorage.getItem("sellerInfo");
      if (storedsellerInfo) {
        // You can add await here if needed
        setsellerInfo(storedsellerInfo);
      }
    };
    // Call the asynchronous function
    fetchsellerInfo();
  }, []); // Empty dependency array to run once on mount
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
              {/* Conditionally render Login/Logout button */}
              {sellerInfo ? (
                // If user information is available, show Logout button
                <>
                  <Link to="/seller/message" className="nav-link">
                    <FaStore /> List Messge
                  </Link>

                  <Link to="/seller/listEnquery" className="nav-link">
                    <FaUser/> List Enquery
                  </Link>

                  <Link to="/seller/listHostels" className="nav-link">
                    <FaHome /> List Hostel
                  </Link>

                  <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/seller/login">
                  <>
                  <Link to="/seller/message" className="nav-link">
                    <FaStore /> List Messge
                  </Link>

                  <Link to="/seller/listEnquery" className="nav-link">
                    <FaUser/> List Enquery
                  </Link>

                  <Link to="/seller/listHostels" className="nav-link">
                    <FaHome /> List Hostel
                  </Link>

                  <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Nav.Link>
                </>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default SellerHeader;
