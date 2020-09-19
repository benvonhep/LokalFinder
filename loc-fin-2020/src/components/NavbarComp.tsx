import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default function NavbarComp() {
  return (
    <Navbar className="navbar" sticky="top" variant="light" expand="sm">
      <Navbar.Brand>Restaurant Finder</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
        <Nav className="mr-auto">
          <Nav.Link href="/list">List</Nav.Link>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  )
}
