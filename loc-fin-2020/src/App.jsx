import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home';
import List from './components/pages/List';
import LeafletMap from './components/pages/LeafletMap';
import NavbarComp from './components/layout/NavbarComp';
import { useSelector, useDispatch } from 'react-redux';
// import { useAuth0 } from '@auth0/auth0-react';
// import Spinner from './components/layout/Spinner';
import EditProfile from './components/pages/EditProfile';
import { PrivateRoute } from './components/layout';
import UserList from './components/pages/UserList';

const activeFilterinitialState = [];

const userFilterListInitialState = [];

const filterCategoriesInitialState = [
  {
    id: 0,
    name: 'Breakfast',
    value: false,
  },
  {
    id: 1,
    name: 'Lunch',
    value: false,
  },
  {
    id: 2,
    name: 'Dinner',
    value: false,
  },
  {
    id: 3,
    name: 'Night',
    value: false,
  },
  {
    id: 4,
    name: 'African',
    value: false,
  },
  {
    id: 5,
    name: 'American',
    value: false,
  },
  {
    id: 6,
    name: 'Arabic',
    value: false,
  },
  {
    id: 7,
    name: 'Asian',
    value: false,
  },
  {
    id: 8,
    name: 'European',
    value: false,
  },
  {
    id: 9,
    name: 'Other',
    value: false,
  },
  {
    id: 10,
    name: 'Casual',
    value: false,
  },
  {
    id: 11,
    name: 'Fancy',
    value: false,
  },
];

function App() {
  const locations = useSelector((state) => {
    return state.locations.locations;
  });
  const users = useSelector((state) => state.users);
  const [activeFilter, setActiveFilter] = useState(activeFilterinitialState);
  const [filterCategories, setFilterCategories] = useState(
    filterCategoriesInitialState,
  );
  const [userFilterList, setUserFilterList] = useState(
    userFilterListInitialState,
  );
  const [filteredList, setFilteredList] = useState();
  const [filterBooleans, setFilterBooleans] = useState();

  useEffect(() => {
    let res = Object.keys(filterCategories).map(
      (key) => filterCategories[key].value,
    );
    setFilterBooleans(res);
  }, [filterCategories]);

  const filterObserver = () => {
    let selectedFilter = Object.entries(filterCategories).filter(
      (filter) => filter[1].value === true,
    );

    if (selectedFilter.length > 0) {
      let filterByOccasion = locations.filter((location) => {
        let occasionRes = Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1];
          let fname = fObj.name.toLowerCase();
          let locationProps = Object.entries(location);
          let locPropArr = locationProps.map((locprop) => locprop[0]);
          let locPropIndex = locPropArr.indexOf(fname);

          if (locations && locPropIndex > 0 && fObj.value === true) {
            if (
              fObj.id === 0 ||
              fObj.id === 1 ||
              fObj.id === 2 ||
              fObj.id === 3
            ) {
              let res =
                fObj.id === 0
                  ? location.breakfast === true
                  : '' || fObj.id === 1
                  ? location.lunch === true
                  : '' || fObj.id === 2
                  ? location.dinner === true
                  : '' || fObj.id === 3
                  ? location.night === true
                  : '';
              return res;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
        return occasionRes;
      });

      if (filterByOccasion.length === 0) {
        filterByOccasion = locations;
      }

      let filterByFood = filterByOccasion.filter((location) => {
        let foodRes = Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1];
          let locationProps = Object.entries(location);
          let locPropArr = locationProps.map((locprop) => locprop[0]);
          let locPropIndex = locPropArr.indexOf('food');

          if (location && locPropIndex > 0 && fObj.value === true) {
            console.log(fObj.id);
            if (
              fObj.id === 4 ||
              fObj.id === 5 ||
              fObj.id === 6 ||
              fObj.id === 7 ||
              fObj.id === 8 ||
              fObj.id === 9
            ) {
              let res = location.food === fObj.name;
              return res;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
        return foodRes;
      });

      if (filterByFood.length === 0) {
        if (filterByOccasion.length === 0) {
          filterByFood = locations;
        } else {
          filterByFood = filterByOccasion;
        }
      }

      let filterByFancy = filterByFood.filter((location) => {
        let fancyRes = Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1];
          let fname = fObj.name.toLowerCase();
          let locationProps = Object.entries(location);
          let locPropArr = locationProps.map((locprop) => locprop[0]);
          let locPropIndex = locPropArr.indexOf(fname);

          if (locations && locPropIndex > 0 && fObj.value === true) {
            if (fObj.id === 10 || fObj.id === 11) {
              let res =
                fObj.id === 10
                  ? location.casual === true
                  : '' || fObj.id === 11
                  ? location.fancy === true
                  : '';
              return res;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
        return fancyRes;
      });

      if (filterByFancy.length === 0) {
        filterByFancy = filterByFood;
      }

      setFilteredList(filterByFancy);
    } else {
      setFilteredList(locations);
    }
  };

  useEffect(() => {
    filterObserver();
  }, [filterCategories, locations]);

  return (
    <div className="App">
      <NavbarComp
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filterCategories={filterCategories}
        setFilterCategories={setFilterCategories}
        userFilterList={userFilterList}
        setUserFilterList={setUserFilterList}
        filterBooleans={filterBooleans}
        users={users}
      />
      <div className="pageMain">
        <Switch>
          <Route
            exact
            path="/list"
            component={() => (
              <List activeFilter={activeFilter} locations={filteredList} />
            )}
          />
          <Route exact path="/map" component={LeafletMap} />
          <Route exact path="/user" component={UserList} />
          <PrivateRoute path="/profile" component={EditProfile} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
