import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import logoImage from './iStays.png'

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
          <Navbar.Brand href=""> <img src={logoImage} alt="LOGO" />  </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login">
                <FaSignInAlt/> Login In
              </Nav.Link>
              <Nav.Link href="/login">
                <FaSignOutAlt/> Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
