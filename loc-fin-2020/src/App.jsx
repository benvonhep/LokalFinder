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
    id: 0,
    name: 'Breakfast',
    value: false
  },
  {
    id: 1,
    name: 'Lunch',
    value: false
  },
  {
    id: 2,
    name: 'Dinner',
    value: false
  },
  {
    id: 3,
    name: 'Night',
    value: false
  },
  {
    id: 4,
    name: 'African',
    value: false
  },
  {
    id: 5,
    name: 'American',
    value: false
  },
  {
    id: 6,
    name: 'Arabic',
    value: false
  },
  {
    id: 7,
    name: 'Asian',
    value: false
  },
  {
    id: 8,
    name: 'European',
    value: false
  },
  {
    id: 9,
    name: 'Other',
    value: false
  },
  {
    id: 10,
    name: 'Casual',
    value: false
  },
  {
    id: 11,
    name: 'Fancy',
    value: false
  }
]
// const filterCategoriesInitialState = [
//   {
//     name: 'Breakfast',
//     value: true
//   },
//   {
//     name: 'Lunch',
//     value: true
//   },
//   {
//     name: 'Dinner',
//     value: true
//   },
//   {
//     name: 'Night',
//     value: true
//   },
//   {
//     name: 'African',
//     value: true
//   },
//   {
//     name: 'American',
//     value: true
//   },
//   {
//     name: 'Arabic',
//     value: true
//   },
//   {
//     name: 'Asian',
//     value: true
//   },
//   {
//     name: 'European',
//     value: true
//   },
//   {
//     name: 'Other',
//     value: true
//   },
//   {
//     name: 'Casual',
//     value: true
//   },
//   {
//     name: 'Fancy',
//     value: true
//   }
// ]



// cities
//     .filter(city => city.population < 3000000)
//     .sort((c1, c2) => c1.population - c2.population)
//     .map(city => console.log(city.name + ':' + city.population));





function App() {
  const locations = useSelector((state) => {return state.locations.locations})
  const [activeFilter, setActiveFilter] = useState(activeFilterinitialState);
  const [ filterCategories, setFilterCategories ] = useState(filterCategoriesInitialState);
  const [ filteredList, setFilteredList ] = useState();
  const [ filterBooleans, setFilterBooleans ] = useState()
  const [ selectedFilter, setSelectedFilter ] = useState()

  const [ occasionFilter, setOccasionFilter] = useState(false)
  const [ foodFilter, setFoodFilter] = useState(false)
  const [ fancyFilter, setFancyFilter] = useState(false)



//   function filterLocation(location) {
//       return activeFilter.find(filter => {
//         if(location.occasion.indexOf(filter) >= 0){
//
//           let res = location.occasion.indexOf(filter) >= 0
//           return res
//         } else if (location.food.indexOf(filter) >= 0){
//
//           let res = location.food.indexOf(filter) >= 0;
//           return res
//         }
//       })
//   }

  useEffect(() => {
    let res = Object.keys(filterCategories).map(key => filterCategories[key].value);
    setFilterBooleans(res)

    // let resSelected = Object.entries(filterCategories).filter((key) => console.log(filterCategories[key], 'LOG'));
    // // console.log(resSelected, 'ResSelected');
    // setSelectedFilter(resSelected)

  }, [filterCategories])


  // function filterLocations(locations, )
  const filterObserver = () => {
    let selectedFilterKeys = Object.keys(filterCategories).filter((key) => filterCategories[key].value === true);

    console.log(selectedFilterKeys, 'filterthisshit')

    let selectedFilter = Object.entries(filterCategories).filter((filter) => filter[1].value === true)
    console.log(selectedFilter, 'TEEEEEST')

    if(selectedFilter.length > 0) {
      let filterByOccasion = locations.filter((location) => {

        let occasionRes = Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1]
          // console.log(fObj.id, 'FOBJ')
          let fname = fObj.name.toLowerCase();
          let locationProps = Object.entries(location)
          let locPropArr = locationProps.map(locprop => locprop[0]);
          let locPropIndex = locPropArr.indexOf(fname)

          if(locations && locPropIndex > 0 && fObj.value === true){
            if (fObj.id === 0 || fObj.id === 1 || fObj.id === 2 || fObj.id === 3){
                  let res =  fObj.id === 0 ? location.breakfast === true : '' ||
                    fObj.id === 1 ? location.lunch === true : '' ||
                    fObj.id === 2 ? location.dinner === true : '' ||
                    fObj.id === 3 ? location.night === true : ''

                  return res
            } else {
              if(occasionFilter){
                return false
              } else {
                return locations
              }
            }
          } else {
            return false
          }

        })
        console.log(occasionRes, 'occasionRes')
        return occasionRes
      })


      setFancyFilter(false)
      setFilteredList(filterByOccasion);
      console.log(filterByOccasion, 'filtered');
    } else {
      setFilteredList(locations);
    }
  }



  useEffect(() => {
    console.log(filterCategories, 'filterCategories');
    filterObserver()

  }, [filterCategories, locations])

  return (
    <div className="App">
      <NavbarComp activeFilter={activeFilter} setActiveFilter={setActiveFilter} filterCategories={filterCategories} setFilterCategories={setFilterCategories} filterBooleans={filterBooleans}/>
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
