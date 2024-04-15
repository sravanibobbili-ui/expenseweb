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
          <h1>Expense Tracker</h1>

          <Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav id="basic-navbar-nav navbar navbar-dark bg-primary">
                <Nav.Link>Expense Tracker</Nav.Link>
                <Nav.Link
                  href="/Login"
                  style={{ color: "black", fontSize: "16px", padding: "1.5em" }}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  href="/Create"
                  style={{ color: "black", fontSize: "16px", padding: "1.5em" }}
                >
                  Create
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Home;
