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
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";

const AdminHeader = () => {
  const location = useNavigate();
  const [adminInfo, setadminInfo] = useState(null);

  const handleLogout = async () => {
    let res = await USERSAPI.post("/admin/logout");
    if (res.status) {
      localStorage.removeItem("adminInfo");
      setadminInfo(null);
      location("/admin");
    }
  };

  useEffect(() => {
    const storedAdminInfo = localStorage.getItem("adminInfo");
    if (storedAdminInfo) {
      setadminInfo(storedAdminInfo);
    }
  }, []);

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
              {adminInfo ? (
                // If admin information is available, show the logged-in content
                <>
                  <Link to="/admin/listUsers" className="nav-link">
                    <FaUser /> List User
                  </Link>

                  <Link to="/admin/listSellers" className="nav-link">
                    <FaStore /> List Seller
                  </Link>

                  <Link to="/admin/listHostels" className="nav-link">
                    <FaHome /> List Hostel
                  </Link>

                  <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Nav.Link>
                </>
              ) : (
                // If admin information is not available, show the default content
                <>
                  <Link to="/admin/login" className="nav-link">
                    <FaSignInAlt /> Login
                  </Link>
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
