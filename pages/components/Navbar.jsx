import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";

export const NavbarComponent = () => {
  return (
    <Container>
      <Navbar>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
