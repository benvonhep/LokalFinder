import React, { useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useAuth0 } from "@auth0/auth0-react";

import { FiPlus } from 'react-icons/fi'
import AddLocationModal from './AddLocationModal';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import './NavbarComp.scss';
import UserMenu from './UserMenu';

export default function NavbarComp() {
  const [modalShow, setModalShow] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();


  return (
    <>
      <Navbar
        className="navbar navbar-dark shadow-lg"
        sticky="top"
      >
        <>
          <Nav className="usermenulogin">
            {isLoading ? '' :
              <>
                {isAuthenticated ? <UserMenu /> : <LoginButton />}
              </>

            }
          </Nav>
          <Nav className="logo-center">
            <LinkContainer to="/home"><Navbar.Brand href="/home">Lokal Finder</Navbar.Brand></LinkContainer>
          </Nav>
          {isAuthenticated ?
            <Button
              variant="outline-warning"
              className="add-button ml-1"
              size="sm"
              onClick={() => setModalShow(true)}>
              <FiPlus />
            </Button>
            : ''}
        </>
      </Navbar>

      <AddLocationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Navbar
        className="navbar-footer navbar-dark shadow-lg"
        fixed="bottom"
      >
        <>

          <Nav className="footer-nav-buttons">
            <LinkContainer to="/list"><Nav.Link >List</Nav.Link></LinkContainer>
            <LinkContainer to="/profile"><Nav.Link >Filter</Nav.Link></LinkContainer>
            <LinkContainer to="/map"><Nav.Link >Map</Nav.Link></LinkContainer>
            <LinkContainer to="/user"><Nav.Link >User</Nav.Link></LinkContainer>
          </Nav>

        </>
      </Navbar>
    </>
  )
}
