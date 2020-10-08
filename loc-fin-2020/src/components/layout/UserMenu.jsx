import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { FcManager } from 'react-icons/fc';

import { useAuth0 } from "@auth0/auth0-react";
import { LinkContainer } from 'react-router-bootstrap';





export default function UserMenu() {
  const userMenuDropDown = (<FcManager />)
  const { logout } = useAuth0();

  return (

    <NavDropdown title={userMenuDropDown} id="basic-nav-dropdown">
      <LinkContainer to="/profile"><NavDropdown.Item>Edit Profile</NavDropdown.Item></LinkContainer>
      <NavDropdown.Item
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >Logout</NavDropdown.Item>

    </NavDropdown >
  )
}
