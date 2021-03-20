import React, { useState, useEffect } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { FiPlus } from 'react-icons/fi'
import LocationModal from './LocationModal';
import LoginButton from './LoginButton';
import './NavbarComp.scss';
import UserMenu from './UserMenu';
import AlertSnack from './AlertSnack';





const NavbarComp = () => {
  const users = useSelector(state => state.users);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [modalShow, setModalShow] = useState(false);
  const [loadingData, setLoadingData] = useState(true)
  const [userProfile, setUserProfile] = useState()



  useEffect(() => {
    if (!isLoading && users && user) {
      const findUserProfile = users.users.find((foundUser) => user.email === foundUser.email)
      setUserProfile(findUserProfile)
      setLoadingData(false)
    } else {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, loadingData, user, isLoading])

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
          {isAuthenticated && userProfile ?
            <Button
              variant="outline-warning"
              className="add-button ml-1"
              size="sm"
              onClick={() => setModalShow(true)}
            >
              <FiPlus />
            </Button>
            : ''}
        </>
      <div style={{position: 'absolute', top: '56px', width: '100vw'}}><AlertSnack /></div>

      </Navbar>
      {userProfile &&
        <LocationModal
          show={modalShow}
          user_id={userProfile.id}
          onHide={() => setModalShow(false)}
          type="addNewLocation"
        />
      }

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

export default NavbarComp;
