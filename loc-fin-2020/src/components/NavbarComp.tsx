import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

export default function NavbarComp() {
  return (
    <Navbar className="navbar" sticky="top" expand="sm">
      <>
        <Navbar.Brand>Restaurant Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
          <Nav className="mr-auto">
            <Nav.Link href="/list">List</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </>
      <Button variant="outline-warning" className="add-button ml-auto" size="sm">
        Add Restaurant
        </Button>
    </Navbar>

  )
}
