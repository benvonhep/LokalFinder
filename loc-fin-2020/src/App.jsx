import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home';
import List from './components/pages/List';
import LeafletMap from './components/pages/LeafletMap';
import NavbarComp from './components/layout/NavbarComp'
import { useSelector, useDispatch } from 'react-redux';
// import { useAuth0 } from '@auth0/auth0-react';
// import Spinner from './components/layout/Spinner';
import EditProfile from './components/pages/EditProfile';
import { PrivateRoute } from './components/layout';
import UserList from './components/pages/UserList';

const activeFilterinitialState = []

const filterCategoriesInitialState = [
  {
    id: 1,
    name: 'Breakfast',
    value: 'Breakfast'
  },
  {
    id: 2,
    name: 'Lunch',
    value: 'Lunch'
  },
  {
    id: 3,
    name: 'Dinner',
    value: 'Dinner'
  }
]







function App() {
  const locations = useSelector((state) => {return state.locations})
  const [activeFilter, setActiveFilter] = useState(activeFilterinitialState);
  const [ filterCategories, setFilterCategories ] = useState(filterCategoriesInitialState);
  const [ filteredList, setFilteredList ] = useState();


  useEffect(() => {
    if (activeFilter) {
      if(!Object.entries(activeFilter).length || 
          Object.entries(activeFilter).length === filterCategories.length)
      {
            setFilteredList(locations.locations);
      } else {
        const filterList = Object.values(locations.locations).filter(location => {
          return activeFilter.find(filter => {
            let res = location.occasion.indexOf(filter) >= 0;
            console.log(res, 'RES');
            return res
          })
        })
        console.log(filterList, 'Filterlist');
        console.log(filterList, 'Filterlist2');
        setFilteredList(filterList)
      }
    } else {
      return;
    }
  }, [activeFilter, locations])

  return (
    <div className="App">
      <NavbarComp activeFilter={activeFilter} setActiveFilter={setActiveFilter} filterCategories={filterCategories}/>
      <div className="pageMain">
        <Switch>
          <Route exact path="/list" component={() => <List activeFilter={activeFilter} locations={filteredList}/>} />
          <Route exact path="/map" component={LeafletMap} />
          <Route exact path="/user" component={UserList} />
          <PrivateRoute path="/profile" component={EditProfile} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  )
}

export default App;
