import React from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DEVplaceholdercomponent from './DEVplaceholdercomponent';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand >Restaurant Finder :)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">List</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={DEVplaceholdercomponent} />
          <Route path="/" component={DEVplaceholdercomponent} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
