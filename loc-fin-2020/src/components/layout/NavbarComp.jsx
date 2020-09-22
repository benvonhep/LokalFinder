import React, { useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { FaBars } from 'react-icons/fa';

import './NavbarComp.scss';
import AddLocationModal from './AddLocationModal';

export default function NavbarComp() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar
        className="navbar navbar-dark shadow-lg"
        sticky="top"
        collapseOnSelect
        expand="sm">
        <>
          <Navbar.Brand>Lokal Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-2"><FaBars /></Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav" className="navbar-collapse">
            <Nav className="mr-auto">
              <IndexLinkContainer to="/"><Nav.Link>Home</Nav.Link></IndexLinkContainer>
              <LinkContainer to="/list"><Nav.Link >List</Nav.Link></LinkContainer>
              <LinkContainer to="/map"><Nav.Link >Map</Nav.Link></LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              <Button
                variant="outline-warning"
                className="add-button ml-1"
                size="sm"
                onClick={() => setModalShow(true)}>
                Add New
                </Button>
            </Nav>
          </Navbar.Collapse>
        </>
      </Navbar>
      <AddLocationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}
