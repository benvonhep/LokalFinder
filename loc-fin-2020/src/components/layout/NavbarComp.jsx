import React, { useState, useEffect } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import { FiPlus } from 'react-icons/fi';
import LocationModal from './LocationModal';
import LoginButton from './LoginButton';
import './NavbarComp.scss';
import UserMenu from './UserMenu';
import AlertSnack from './AlertSnack';
import FilterModal from './FilterModal';

const NavbarComp = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [locationModalShow, setLocationModalShow] = useState(false);
  const [filterModalShow, setFilterModalShow] = useState(false);
  const {
    filterCategories,
    setFilterCategories,
    userFilterList,
    setUserFilterList,
    filterBooleans,
    users,
    getGpsLocation,
    loadingLocation,
    sortDistDateToggle,
    setSortDistDateToggle,
  } = props;
  const [loadingData, setLoadingData] = useState(true);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (!isLoading && users && user) {
      const findUserProfile = users.users.find(
        (foundUser) => user.email === foundUser.email,
      );
      setUserProfile(findUserProfile);
      setLoadingData(false);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, loadingData, user, isLoading]);

  return (
    <>
      <Navbar className="navbar navbar-dark shadow-lg" sticky="top">
        <>
          <Nav className="usermenulogin">
            {isLoading ? (
              ''
            ) : (
              <>{isAuthenticated ? <UserMenu /> : <LoginButton />}</>
            )}
          </Nav>

          <Nav className="logo-center">
            <LinkContainer to="/home">
              <Navbar.Brand href="/home">Lokal Finder</Navbar.Brand>
            </LinkContainer>
          </Nav>
          {isAuthenticated && userProfile ? (
            <Button
              variant="outline-warning"
              className="add-button ml-1"
              size="sm"
              onClick={() => setLocationModalShow(true)}
            >
              <FiPlus />
            </Button>
          ) : (
            ''
          )}
        </>
        <div style={{ position: 'absolute', top: '56px', width: '100vw' }}>
          <AlertSnack />
        </div>
      </Navbar>
      {userProfile && (
        <LocationModal
          show={locationModalShow}
          user_id={userProfile.id}
          onHide={() => setLocationModalShow(false)}
          type="addNewLocation"
        />
      )}

      <Navbar className="navbar-footer navbar-dark shadow-lg" fixed="bottom">
        <>
          <Nav className="footer-nav-buttons">
            <LinkContainer to="/list">
              <Nav.Link>List</Nav.Link>
            </LinkContainer>
            <div onClick={() => setFilterModalShow(!locationModalShow)}>
              <Nav.Link>Filter</Nav.Link>
            </div>
            <LinkContainer to="/map">
              <Nav.Link>Map</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/user">
              <Nav.Link>User</Nav.Link>
            </LinkContainer>
          </Nav>
        </>
      </Navbar>
      <FilterModal
        show={filterModalShow}
        testlog="test!1"
        onHide={() => setFilterModalShow(false)}
        filterBooleans={filterBooleans}
        filterCategories={filterCategories}
        setFilterCategories={setFilterCategories}
        userFilterList={userFilterList}
        setUserFilterList={setUserFilterList}
        users={users}
        getGpsLocation={getGpsLocation}
        loadingLocation={loadingLocation}
        sortDistDateToggle={sortDistDateToggle}
        setSortDistDateToggle={setSortDistDateToggle}
      />
    </>
  );
};

export default NavbarComp;
