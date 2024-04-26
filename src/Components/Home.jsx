// Home.js
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Home = () => {
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        style={{ paddingTop: "0px", paddingBottom: "0px" }}
      >
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* Use NavLink instead of Nav.Link for better routing */}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Login">Login</Nav.Link>
              <Nav.Link href="/Create">Create</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Home;
