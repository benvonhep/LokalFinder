import React from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './_components/Home';
import List from './_components/List';

function App() {
  return (
    <div className="App">
      <Navbar className="navbar row justify-content-center" sticky="top" variant="light" expand="sm">
        <Navbar.Brand>Restaurant Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/list">List</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="pageMain">
        <Switch>
          // route abchecken dass redirectede wird ###########################
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={List} />
          <Route path="" component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
