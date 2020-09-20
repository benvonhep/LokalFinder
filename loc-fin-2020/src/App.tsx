import React from 'react';

import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home';
import List from './components/pages/List';
import NavbarComp from './components/layout/NavbarComp'





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
