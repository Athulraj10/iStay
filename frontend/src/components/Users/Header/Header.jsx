import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import { FaSignOutAlt, FaHotel, FaPhone, FaInfoCircle ,FaSignInAlt} from "react-icons/fa";

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
  useEffect(() => {
    // Define an asynchronous function to fetch userInfo from localStorage
    const fetchUserInfo = async () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        // You can add await here if needed
        setUserInfo(storedUserInfo);
      }
    };

    // Call the asynchronous function
    fetchUserInfo();
  }, []); // Empty dependency array to run once on mount

  const links = [
    { name: "About" },
    { name: "Find Accommodation" },
    { name: "Contact" },
    { name: "Logout" },
  ];

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
              {/* Conditionally render Login/Logout button */}
              {userInfo ? (
                // If user information is available, show Logout button
                <>
                  <Nav>
                    <Link to="/user" className="nav-link">
                    <FaHotel />
                    &nbsp; About
                    </Link>
                  </Nav>

                  <Nav>
                    <Link to="/findAccommodation" className="nav-link">
                      <FaPhone />
                      &nbsp; Find Accommodation
                    </Link>
                  </Nav>

                  <Nav>
                    <Link to="/user" className="nav-link">
                    <FaInfoCircle /> &nbsp;Contact
                    </Link>
                  </Nav>


                  <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> &nbsp;Logout
                  </Nav.Link>
                </>
              ) : (
                <>
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
