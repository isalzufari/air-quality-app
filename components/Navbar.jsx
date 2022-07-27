import React from "react";
import { useRouter } from 'next/router';
import { Container, Navbar, NavDropdown } from "react-bootstrap";

export const NavbarComponent = ({ logOut, user }) => {
  const router = useRouter()

  return (
    <Navbar sticky="top" className="shadow bg-body">
      <Container>
        <Navbar.Brand onClick={() => router.push('/')} style={{ pointer: 'cursor' }}>AirQ</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={user ? `Haloo, ${user.email}` : 'Belum punya akun ?'} id="navbarScrollingDropdown">
            {user ?
              <NavDropdown.Item onClick={logOut} >Logout</NavDropdown.Item> :
              <>
                <NavDropdown.Item onClick={() => router.push('register')}>Register</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => router.push('login')}>Login</NavDropdown.Item>
              </>
            }
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
