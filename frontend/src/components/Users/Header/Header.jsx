import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import {
  FaSignOutAlt,
  FaHotel,
  FaPhone,
  FaInfoCircle,
  FaSignInAlt,
  FaUserAltSlash,
  FaUser,
  FaBook,
} from "react-icons/fa";

import "./Header.css";
import logoImage from "./iStays.png";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = async () => {
    let res = await USERSAPI.post("users/logout");
    if (res.status) {
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      navigate("/login");
    }
  };

  const fetchUserInfo = async () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserInfo(userInfo);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userInfo]);
  return (
    <>
      <Navbar
        className="navbarStyle"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logoImage} alt="LOGO" />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <Nav>
                    <Link to="/profile" className="nav-link">
                      <FaUser />
                      &nbsp; Profile
                    </Link>
                  </Nav>

                  <Nav>
                    <Link to="/findAccommodation" className="nav-link">
                      <FaPhone />
                      &nbsp; Find Accommodation
                    </Link>
                  </Nav>

                  <Nav>
                    <Link to="/myBookings" className="nav-link">
                      <FaBook /> &nbsp;My Bookings
                    </Link>
                  </Nav>

                  <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> &nbsp;Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav>
                    <Link to="/findAccommodation" className="nav-link">
                      <FaPhone />
                      &nbsp; Find Accommodation
                    </Link>
                  </Nav>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Login In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
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

export default Header;
