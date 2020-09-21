import React, { useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './NavbarComp.scss';
import AddLocationModal from './AddLocationModal';
// import {hideModal, showModal} from '../../store/actions/modalActions';

export default function NavbarComp() {
  const [modalShow, setModalShow] = useState(false);

  // function submitLocation(e: any) {
  //   e.preventDefault();
  //   return console.log('submitted');
  // }

  return (
    <>
      <Navbar
        className="navbar navbar-dark"
        sticky="top"
        expand="sm">
        <>
          <Navbar.Brand>Restaurant Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
            <Nav>
              <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              <LinkContainer to="/list"><Nav.Link >List</Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </>
        <Button
          variant="outline-warning"
          className="add-button ml-auto"
          size="sm"
          onClick={() => setModalShow(true)}>
          Add Restaurant
          </Button>
      </Navbar>
      <AddLocationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      // onSubmit={() => submitLocation(e)}
      />
    </>

  )
}
