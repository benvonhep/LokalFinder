import React, { Fragment } from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import List from './components/List';
import NavbarComp from './components/NavbarComp'


function App() {
  return (
    <div className="App">
      <NavbarComp />
      <div className="pageMain">
        <Switch>
          // route abchecken dass redirected wird ###########################
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={List} />
          <Route path="" component={Home} />
        </Switch>
      </div>
    </div>
  )
}



export default App;
