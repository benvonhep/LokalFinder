import React, { useState, useEffect } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { FiPlus } from 'react-icons/fi'
import AddLocationModal from './AddLocationModal';
import LoginButton from './LoginButton';
import './NavbarComp.scss';
import UserMenu from './UserMenu';




export default function NavbarComp() {
  const users = useSelector(state => state.users);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [modalShow, setModalShow] = useState(false);
  const [loadingData, setLoadingData] = useState(true)
  const [userProfile, setUserProfile] = useState()



  useEffect(() => {
    if (user && users) {
      const findUserProfile = users.users.find((foundUser) => user.email === foundUser.email)
      setUserProfile(findUserProfile)
      setLoadingData(false)
      console.log(findUserProfile, 'USER');
    } else {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, loadingData])


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
              onClick={() => setModalShow(true)}
            >
              <FiPlus />
            </Button>
            : ''}
        </>
      </Navbar>

      <AddLocationModal
        show={modalShow}
        username={username => userProfile.username}
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

// disabled={!enabledToAdd}

// const [enabledToAdd, setEnabledToAdd] = useState(false);
// const { isAuthenticated, user, isLoading } = useAuth0();
  // const [userProfile, setUserProfile] = useState()
  // const users = useSelector(state => state.users)

  //   useEffect(() => {
  //     const userProf = users.users.find((item) => user.email === item.email)
  //     setUserProfile(userProf)
  //
  //
  //   }, [users])
  //
  //   useEffect(() => {
  //     if (userProfile.username) {
  //       setEnabledToAdd(true)
  //
  //     } else {
  //       setEnabledToAdd(false)
  //
  //     }
  //   }, [userProfile])
