import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "../styles/Navbar.css";
import { useAuth } from "../contexts/AuthContext";

function WebNavbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar expand="lg" className="skyblue-navbar">
      <Container>
        <Navbar.Brand href="/">Flight Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/flights">
              Flights
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-auto">
          {isAuthenticated ? (
            <NavDropdown title="Account" id="account-dropdown">
              <NavDropdown.Item as={Link} to="/account">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default WebNavbar;
