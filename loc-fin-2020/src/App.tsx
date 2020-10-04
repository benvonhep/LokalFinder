import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home';
import List from './components/pages/List';
import LeafletMap from './components/pages/LeafletMap';
import NavbarComp from './components/layout/NavbarComp'
// import { useAuth0 } from '@auth0/auth0-react';
// import Spinner from './components/layout/Spinner';
import Profile from './components/pages/Profile';
import { PrivateRoute } from './components/layout';

function App() {

  //   const { isLoading } = useAuth0();
  //
  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  return (
    <div className="App">
      <NavbarComp />
      <div className="pageMain">
        <Switch>
          // route abchecken dass redirected wird ###########################
          <Route exact path="/list" component={List} />
          <Route exact path="/map" component={LeafletMap} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  )
}

export default App;
