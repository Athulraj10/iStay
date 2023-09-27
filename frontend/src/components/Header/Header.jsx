import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import logoImage from "./iStays.png";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
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
              
              {/* login link created for link to login page */}
              <LinkContainer to='/login' >
                 <Nav.Link>
                    <FaSignInAlt /> Login In
                 </Nav.Link>
              </LinkContainer>

              {/* login link created for link to register page */}
              <LinkContainer to='/register'>
              <Nav.Link>
                <FaSignOutAlt /> Sign Up
              </Nav.Link>
              </LinkContainer>
           
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
