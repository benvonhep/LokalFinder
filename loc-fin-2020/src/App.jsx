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
        return Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1]
          console.log(fObj.id, 'FOBJ')
          let fname = fObj.name.toLowerCase();
          let locationProps = Object.entries(location)
          let locPropArr = locationProps.map(locprop => locprop[0]);
          let locPropIndex = locPropArr.indexOf(fname)

          if(locations && locPropIndex > 0 && fObj.value === true){
            if (fObj.id === 0 || fObj.id === 1 || fObj.id === 2 || fObj.id === 3){
              console.log('you choose occasion: ' + fObj.name)
            } else {
              return
            }
          } else {
            return
          }
        })
      })
      let filterByFood = filterByOccasion.filter((location) => {
        return Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1]
          let fname = fObj.name.toLowerCase();
          let locationProps = Object.entries(location)
          let locPropArr = locationProps.map(locprop => locprop[0]);
          let locPropIndex = locPropArr.indexOf(fname)

          if(locations && locPropIndex > 0 && fObj.value === true){
            if (fObj.id === 5 || fObj.id === 6 || fObj.id === 7 || fObj.id === 8 || fObj.id === 9){
              console.log('you choose food: ' + fObj.name + ' too')
            } else {
              return
            }
          } else {
            return
          }
        })
      })
      let filterByFancyness = filterByOccasion.filter((location) => {
        return Object.entries(selectedFilter).some((f) => {
          let fObj = f[1][1]
          let fname = fObj.name.toLowerCase();
          let locationProps = Object.entries(location)
          let locPropArr = locationProps.map(locprop => locprop[0]);
          let locPropIndex = locPropArr.indexOf(fname)

          if(locations && locPropIndex > 0 && fObj.value === true){
            if (fObj.id === 10 ||fObj.id ===  11) {
              console.log('you choose fancyness: ' + fObj.name + ' too')
            } else {
              return
            }
          } else {
            return
          }
        })
      })
      setFilteredList(filterByFancyness);
      console.log(filterByFancyness, 'filtered');
    } else {
      setFilteredList(locations);
    }


//     for(var loc in locations){
//       for(var filter in filterCategories){
//         let filtername = filter.name
//         let locObj = locations[loc]
//         for(var locItem in locObj){
//           if(filterCategories[filter].value === locations[loc][locItem]){
//             console.log('läuft be idir')
//           }
//           console.log(locItem, 'ITEM')
//           console.log(locObj, 'LOCOBJ')
//           console.log(locations[loc].name + " : " + locObj)
//           if(filterCategories[filter].value === locations[loc][filtername])
//           console.log(filterCategories[filter].value, 'FIL : ' + filterCategories[filter].name)
//           if(locations[loc].breakfast == filterCategories[filter].value &&
//             locations[loc].lunch == filterCategories[filter].value){
//               setFilteredList({
//                 ...filteredList
//               })
//             }
//
//         }
//
//       }
//     }



    // let result = Object.keys(locations).map(key => {
    //   return locations[key].includes(() => {
    //     return selectedFilter.map((selFilter) => selFilter )
    //   })
    // })
    // console.log(result, 'resultFO')
    // return result
    // for (let key in filterCategories.name) {
    //   console.log(key, 'KEY')
    //   let res = locations.locations.filter((location) => location.key)
    // }
//     let selectedFilter = Object.keys(filterCategories).filter((key) => filterCategories[key].value === true);
//     console.log(selectedFilter, 'SELECTED')
//     if(filterCategories) {
//       const result = locations.locations.filter((location) => {
//         return selectedFilter.map((filter) => {
//           let filterObj = filterCategories[filter].name
//           console.log(!!~String(location).indexOf({filterObj}), 'INDEXOFfilterObj')
//           console.log(, 'filterObj');
//           return location.filterObj === true
//         })
//         // console.log(location, 'LOCation')
//         return
//       })
//       console.log(result, 'result');
//       // const filterlist2 = locations.locations.filter((location) => Object.entries(filterCategories).map((entry) => location{entry} === filterCategories[entry])
//       const filterList = locations.locations.filter((location) => {
//                 let result =
//                   location.breakfast === true || 
//                   location.lunch === true || 
//                   location.dinner === true || 
//                   location.night === true || 
//                   location.african === true || 
//                   location.american === true || 
//                   location.arabic === true || 
//                   location.asian === true || 
//                   location.european === true || 
//                   location.other === true || 
//                   location.casual === true || 
//                   location.fancy === true  
//                 console.log(result, '#RES');
//                 return result;
//               })
//             setFilteredList(filterList)
//
//     } else {
//       return
//     }
  }
// #####################################
    // if (activeFilter) {
    //   if(!Object.entries(activeFilter).length || 
    //       Object.entries(activeFilter).length === filterCategories.length)
    //   {
    //         setFilteredList(locations.locations);
    //   } else {
    //     let filterList;
    //         let result = locations.locations



//             if(fancyness || casualness) {
//               const filterList = locations.locations.filter((location) => {
//                 let result =  !!~String(location.fancy).indexOf('Fancy') || !!~String(location.casual).indexOf('Casual')
//                 console.log(result, '#RES');
//                 return result;
//               })
//             setFilteredList(filterList)
//             }
//             if(occasion && !food){
//               const filterList = locations.locations.filter((location) => {
//                 let res = activeFilter.every(key => {
//                   let result = !!~String(location.occasion).indexOf(key) || fancyness ? !!~String(location.fancy).indexOf(key) : '' || casualness ? !!~String(location.casual).indexOf(key) : '';
//                   return result;
//                 })
//                 console.log(res, '#RES');
//                 return res;
//               })
//             setFilteredList(filterList)
//
//
//             };
//             if(food && !occasion){
//               const filterList = locations.locations.filter((location) => {
//                 let res = activeFilter.every(key => {
//                   let result = !!~String(location.food).indexOf(key) || fancyness ? !!~String(location.fancy).indexOf(key) : '' || casualness ? !!~String(location.casual).indexOf(key) : '';
//                   return result;
//                 })
//                 console.log(res, '#RES');
//                 return res;
//               })
//             setFilteredList(filterList)
//             };
//             if(food && occasion){
//               const filterList = locations.locations.filter((location) => {
//                 let res = activeFilter.every(key => {
//                   let result = !!~String(location.occasion).indexOf(key) || !!~String(location.food).indexOf(key) || fancyness ? !!~String(location.fancy).indexOf(key) : '' || casualness ? !!~String(location.casual).indexOf(key) : '';
//                   return result;
//                 })
//                 console.log(res, '#RES');
//                 return res;
//               })
//             setFilteredList(filterList)
//             }
            // if (activeFilter.indexOf('Breakfast') >= 0 || activeFilter.indexOf('Lunch') >= 0 || activeFilter.indexOf('Dinner') >= 0 || activeFilter.indexOf('Night') >= 0){
            //   result = locations.locations.filter(l => l.occasion === 'Breakfast' || 'Lunch' || 'Dinner' || 'Night')
            //   console.log(result, 'OCCres');
            //   setFilterOccasion(true)
            //   console.log('YESOccasion');
            // }
            // if (activeFilter.indexOf( activeFilter.indexOf('African') >= 0 || activeFilter.indexOf('American') >= 0 || activeFilter.indexOf('Arabic') >= 0 || activeFilter.indexOf('Asian') >= 0 || activeFilter.indexOf('European') >= 0 || activeFilter.indexOf('Other') >= 0)){
            //   console.log('YESfood');
            //   setFilterFood(true)
            // }


//         const filterList = locations.locations.filter((location) => {
//           console.log(activeFilter, '#ACTIVE');
//           let res = activeFilter.every(key => {
//
//             let result = !!~String(location.occasion).indexOf(key)
//             console.log(key, '#KEY');
//
//             return result;
//           }
//           )
//           console.log(res, '#RES');
//           return res;
//         })

//         console.log(filterList, 'Filterlist');
//       }
//     } else {
//       return;
//     }
//
//   }


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
