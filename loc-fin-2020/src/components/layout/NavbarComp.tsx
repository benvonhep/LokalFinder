import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { SHOW_MODAL } from '../../store/actionTypes'
import IModal from '../../interfaces/ILocation'
import './NavbarComp.scss';
import AddLocationModal from './AddLocationModal';
// import {hideModal, showModal} from '../../store/actions/modalActions';

export default function NavbarComp() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar className="navbar navbar-dark" sticky="top" expand="sm">
        <>
          <Navbar.Brand>Restaurant Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/list">List</Nav.Link>
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
      <AddLocationModal show={modalShow} onHide={() => setModalShow(false)} />
    </>

  )
}
