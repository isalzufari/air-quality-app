import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";

export const NavbarComponent = () => {
  return (
    <Navbar className="shadow">
      <Container>
        <Navbar.Brand href="/">AirQ</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Halo
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
