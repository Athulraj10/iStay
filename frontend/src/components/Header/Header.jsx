import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import logoImage from "./iStays.png";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect } from "react";

const Header = () => {
  // const userInfo = localStorage.getItem("userInfo");
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    useEffect(() => {
      if (userInfo) {
        console.log(userInfo)
      }
    });
  }
  return (
    <header>
      <Navbar className="navbarStyle" variant="dark" expand="lg" collapseOnSelect>
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
                <Nav.Link onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              ) : (
                // If user information is not available, show Login and Signup links
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
    </header>
  );
};

export default Header;
