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
  },
  {
    id: 4,
    name: 'Night',
    value: 'Night'
  },
  {
    id: 5,
    name: 'African',
    value: 'African'
  },
  {
    id: 6,
    name: 'American',
    value: 'American'
  },
  {
    id: 7,
    name: 'Arabic',
    value: 'Arabic'
  },
  {
    id: 8,
    name: 'Asian',
    value: 'Asian'
  },
  {
    id: 9,
    name: 'European',
    value: 'European'
  },
  {
    id: 10,
    name: 'Other',
    value: 'Other'
  },
  ,
  {
    id: 11,
    name: 'Casual',
    value: 'Casual'
  },
  ,
  {
    id: 12,
    name: 'Fancy',
    value: 'Fancy'
  },
]







function App() {
  const locations = useSelector((state) => {return state.locations})
  const [activeFilter, setActiveFilter] = useState(activeFilterinitialState);
  const [ filterCategories, setFilterCategories ] = useState(filterCategoriesInitialState);
  const [ filteredList, setFilteredList ] = useState();
  const [ filterCompare, setFilterCompare] = useState();
  const [ filterOccasion, setFilterOccasion] = useState();
  const [ filterFood, setFilterFood] = useState();


  function filterLocation(location) {
      return activeFilter.find(filter => {
        if(location.occasion.indexOf(filter) >= 0){

          let res = location.occasion.indexOf(filter) >= 0
          return res
        } else if (location.food.indexOf(filter) >= 0){

          let res = location.food.indexOf(filter) >= 0;
          return res
        }
      })
  }
  // function filterLocation(location) {
  //     return activeFilter.find(filter => {
  //       if(location.occasion.indexOf(filter) >= 0){
  //         let res = location.occasion.indexOf(filter) >= 0
  //         return res
  //       } else if (location.food.indexOf(filter) >= 0){
  //         let res = location.food.indexOf(filter) >= 0;
  //         return res
  //       }
  //     })
  // }
  // function filterFood(location) {
  //     return activeFilter.find(filter => {
  //       let res = location.food.indexOf(filter) >= 0;
  //       return res
  //     })
  // }
  // function filterOccasion(location) {
  //     return activeFilter.find(filter => {
  //       let res = location.occasion.indexOf(filter) >= 0;
  //       return res
  //     })
  // }




  const selectByFilter = () => {
    if (activeFilter) {
      if(!Object.entries(activeFilter).length || 
          Object.entries(activeFilter).length === filterCategories.length)
      {
            setFilteredList(locations.locations);
            setFilterCompare('')
            setFilterOccasion(false)
            setFilterFood(false)
      } else {
        let filterList;
            let result = locations.locations
            let fancyness = activeFilter.indexOf('Fancy')
            let casualness = activeFilter.indexOf('Casual')
            let selectedBlogger;
            let food =
              activeFilter.indexOf('African') >= 0 ||
              activeFilter.indexOf('American') >= 0 ||
              activeFilter.indexOf('Arabic') >= 0 || 
              activeFilter.indexOf('Asian') >= 0 ||
              activeFilter.indexOf('European') >= 0 ||
              activeFilter.indexOf('Other') >= 0;
            let occasion =
              activeFilter.indexOf('Breakfast') >= 0 ||
              activeFilter.indexOf('Lunch') >= 0 ||
              activeFilter.indexOf('Dinner') >= 0 || 
              activeFilter.indexOf('Night') >= 0;
              console.log(occasion, 'YESOccasion');
            console.log(food, 'YESfoot');

            if(fancyness || casualness) {
              const filterList = locations.locations.filter((location) => {
                let result =  !!~String(location.fancy).indexOf('Fancy') || !!~String(location.casual).indexOf('Casual')
                console.log(result, '#RES');
                return result;
              })
            setFilteredList(filterList)
            }
            if(occasion && !food){
              const filterList = locations.locations.filter((location) => {
                let res = activeFilter.every(key => {
                  let result = !!~String(location.occasion).indexOf(key) || fancyness ? !!~String(location.fancy).indexOf(key) : '' || casualness ? !!~String(location.casual).indexOf(key) : '';
                  return result;
                })
                console.log(res, '#RES');
                return res;
              })
            setFilteredList(filterList)


            };
            if(food && !occasion){
              const filterList = locations.locations.filter((location) => {
                let res = activeFilter.every(key => {
                  let result = !!~String(location.food).indexOf(key) || fancyness ? !!~String(location.fancy).indexOf(key) : '' || casualness ? !!~String(location.casual).indexOf(key) : '';
                  return result;
                })
                console.log(res, '#RES');
                return res;
              })
            setFilteredList(filterList)
            };
            if(food && occasion){
              const filterList = locations.locations.filter((location) => {
                let res = activeFilter.every(key => {
                  let result = !!~String(location.occasion).indexOf(key) || !!~String(location.food).indexOf(key) || fancyness ? !!~String(location.fancy).indexOf(key) : '' || casualness ? !!~String(location.casual).indexOf(key) : '';
                  return result;
                })
                console.log(res, '#RES');
                return res;
              })
            setFilteredList(filterList)
            }
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

        console.log(filterList, 'Filterlist');
      }
    } else {
      return;
    }

  }


  useEffect(() => {
    selectByFilter()
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
