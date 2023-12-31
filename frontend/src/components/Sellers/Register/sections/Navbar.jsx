import { Container, Navbar, Nav, NavLink } from "react-bootstrap";

const Navbars = () => {
  const styles = {
    fontSize: "20px",
    fontWeight: "600",
    color:" white",
    padding:"10px",
    // borderRadius:'5px'
  };
  const width = "w-100";
  const textAlign = "text-center";

  return (
    <Container>
      <h2 className="m-4" style={{color:'white'}}>FEATURED ON</h2>

      <Navbar
        expand="lg"
        id="custom-navbar"
        style={{ backgroundColor: "red" }}
        className="rounded-3 bg-body-tertiary m-4 p-3"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 rounded">
            <Nav.Item className="flex-fill">
              <NavLink href="#home" className={`${width}${textAlign}`}>
                <h5 style={styles}>CHAT OPTIONS</h5>
              </NavLink>
            </Nav.Item>
            <Nav.Item className="flex-fill">
              <NavLink href="#link" className={`${width}${textAlign}`}>
                <h5 style={styles}>LIVE LOCATION</h5>
              </NavLink>
            </Nav.Item>
            <Nav.Item className="flex-fill">
              <NavLink href="#link" className={`${width}${textAlign}`}>
                <h5 style={styles}>REVIEW</h5>
              </NavLink>
            </Nav.Item>
            <Nav.Item className="flex-fill">
              <NavLink href="#link" className={`${width}${textAlign}`}>
                <h5 style={styles}>LOCATION FILTER</h5>
              </NavLink>
            </Nav.Item>
            <Nav.Item className="flex-fill">
              <NavLink href="#link" className={`${width}${textAlign}`}>
                <h5 style={styles}>SEARCH AND SORT</h5>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Navbars;
