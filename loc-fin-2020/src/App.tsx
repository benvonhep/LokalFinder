import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home';
import List from './components/pages/List';
import LeafletMap from './components/pages/LeafletMap';
import NavbarComp from './components/layout/NavbarComp'

function App() {
  return (
    <div className="App">
      <NavbarComp />
      <div className="pageMain">
        <Switch>
          // route abchecken dass redirected wird ###########################
          <Route exact path="/list" component={List} />
          <Route exact path="/map" component={LeafletMap} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  )
}

export default App;
