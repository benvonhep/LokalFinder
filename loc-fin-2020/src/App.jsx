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

  const [ occasionFilterActive, setOccasionFilterActive] = useState(false)
  const [ occasionFilterRes, setOccasionFilterRes] = useState(false)
  const [ foodFilterActive, setFoodFilterActive] = useState(false)
  const [ foodFilterRes, setFoodFilterRes] = useState(false)
  const [ fancyFilterActive, setFancyFilterActive] = useState(false)
  const [ fancyFilterRes, setFancyFilterRes] = useState(false)



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
    // let selectedFilterKeys = Object.keys(filterCategories).filter((key) => filterCategories[key].value === true);
    // let occasionFilterActive = 0;

    // console.log(selectedFilterKeys, 'filterthisshit')

    let selectedFilter = Object.entries(filterCategories).filter((filter) => filter[1].value === true)
    // console.log(selectedFilter, 'TEEEEEST')

    if(selectedFilter.length > 0) {
      let filterByOccasion = locations.filter((location) => {

        let occasionRes = Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1]
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
                  setOccasionFilterActive(true)
                  return res
            } else {
              return false
            }
          } else {
            return false
          }
        })
        return occasionRes
      })
      // setOccasionFilterRes(filterByOccasion)
      // setOccasionFilterActive(false)
      // console.log(filterByOccasion, 'filterByOccasion');
      // console.log(occasionFilterRes, 'occasionFilterRes');

      if(filterByOccasion.length === 0) {
        // setOccasionFilterRes(locations)
        filterByOccasion = locations;
        // console.log('OCCASIONNN []')
      }
      let filterByFood = filterByOccasion.filter((location) => {
        let foodRes = Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1]
          let fname = fObj.name.toLowerCase();
          let locationProps = Object.entries(location)
          let locPropArr = locationProps.map(locprop => locprop[0]);
          let locPropIndex = locPropArr.indexOf('food')
          console.log('lol', locPropIndex)
          console.log(location.food === fObj.name, 'LOCFOOD')
          console.log(fObj.value, 'VALUEOBJECTTT')
          if(location && locPropIndex > 0 && fObj.value === true){
            console.log(fObj.id)
            if (fObj.id === 4 || fObj.id === 5 || fObj.id === 6 || fObj.id === 7 || fObj.id === 8 || fObj.id === 9){
                  // let res =  fObj.id === 4 ? location.african === true : '' ||
                  //   fObj.id === 5 ? location.american === true : '' ||
                  //   fObj.id === 6 ? location.arabic === true : '' ||
                  //   fObj.id === 7 ? location.asian === true : '' ||
                  //   fObj.id === 8 ? location.european === true : '' ||
                  //   fObj.id === 9 ? location.other === true : ''

                  let res =  location.food === fObj.name

                  return res
            } else {
              return false
            }
          } else {
            return false
          }
        })

        return foodRes
      })
      // setFoodFilterRes(filterByFood)
      // setFoodFilterActive(false)
      console.log(filterByFood, 'FOODRES')
      // console.log(foodFilterRes, 'foodFilterRes')

      if(filterByFood.length === 0){
        if(filterByOccasion.length === 0){
          setFilteredList(locations)
        } else {
          setFilteredList(filterByOccasion)
        }
      } else {
        setFilteredList(filterByFood)
      }





//       console.log(occasionFilterRes, 'filtered by occasion');
//       console.log(foodFilterRes, 'filtered by food');
    } else {
      setFilteredList(locations);
    }

  }



  useEffect(() => {
    // console.log(filterCategories, 'filterCategories');
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
