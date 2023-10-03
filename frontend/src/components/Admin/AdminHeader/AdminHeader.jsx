import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaStore,
  FaHome,
} from "react-icons/fa";
import "./AdminHeader.css";
import logoImage from "./iStays.png";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const AdminHeader = () => {
  const location = useNavigate();
  const [adminInfo, setadminInfo] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    setadminInfo(null);
    location("/admin");
  };

  useEffect(() => {
    // Define an asynchronous function to fetch adminInfo from localStorage
    const fetchadminInfo = async () => {
      const storedadminInfo = localStorage.getItem("adminInfo");
      if (storedadminInfo) {
        // You can add await here if needed
        setadminInfo(storedadminInfo);
      }
    };

    // Call the asynchronous function
    fetchadminInfo();
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
          <LinkContainer to="/admin">
            <Navbar.Brand>
              <img src={logoImage} alt="LOGO" />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              
              <Link to="/listUsers" className="nav-link">
                <FaUser /> List User
              </Link>

              <Link to="/listSellers" className="nav-link">
                <FaStore /> List Seller
              </Link>

              <Link to="/listHostels" className="nav-link">
                <FaHome /> List Hostel
              </Link>
              {/* Conditionally render Login/Logout button */}
              {adminInfo ? (
                // If user information is available, show Logout button
                <>
                  <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/admin/login">
                    <Nav.Link>
                      <FaSignInAlt />
                      &nbsp;
                    </Nav.Link>
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

export default AdminHeader;
