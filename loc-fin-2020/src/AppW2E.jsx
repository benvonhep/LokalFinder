import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import List from './components/pages/List';
import LeafletMap from './components/pages/LeafletMap';
import NavbarComp from './components/layout/NavbarComp';
import { useSelector } from 'react-redux';
import EditProfile from './components/pages/EditProfile';
import { PrivateRoute } from './components/layout';
import UserList from './components/pages/UserList';
import { latLng } from 'leaflet';

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

export default function AppW2E() {
  const locations = useSelector((state) => {
    return state.locations.locations;
  });
  const users = useSelector((state) => state.users);
  const [filterCategories, setFilterCategories] = useState(
    filterCategoriesInitialState,
  );
  const [userFilterList, setUserFilterList] = useState(
    userFilterListInitialState,
  );
  const [filteredList, setFilteredList] = useState();
  const [filterSortList, setFilterSortList] = useState();

  const [filterBooleans, setFilterBooleans] = useState();
  const [locationsGps, setLocationsGps] = useState();
  // const [sortedByDist, setSortedByDist] = useState();
  // const [sortByDateBool, setSortByDateBool] = useState(false);
  // const [sortByDistanceBool, setSortByDistanceBool] = useState(false);
  const [sortDistDateToggle, setSortDistDateToggle] = useState(false); // true is distance false is date

  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getGpsLocation = () => {
    setLoadingLocation(true);
    const geolocation = navigator.geolocation;

    new Promise((resolve, reject) => {
      if (!geolocation) {
        setLoadingLocation(false);
        return;
      }

      geolocation.getCurrentPosition(
        (position) => {
          setLon(position.coords.longitude);
          setLat(position.coords.latitude);
          setLoadingLocation(false);
          resolve(position);
        },
        (error) => {
          setLon(null);
          setLat(null);
          setLoadingLocation(false);
          console.log(error.message);
          // reject(error.message);
        },
      );
      return;
    });
  };

  useEffect(() => {
    getGpsLocation();
  }, []);

  useEffect(() => {
    let res = Object.keys(filterCategories).map(
      (key) => filterCategories[key].value,
    );
    setFilterBooleans(res);
  }, [filterCategories]);

  // setlocationsgps
  useEffect(() => {
    if (lat && lon !== null) {
      if (filteredList) {
        const getDistance = () => {
          if (locations) {
            try {
              let res = locations.map((location) => {
                const latlngCurrentUserPosition = latLng(lat, lon);
                const latlngLocationPosition = latLng(
                  location.latitude,
                  location.longitude,
                );
                const userLocationDistanceMeter =
                  latlngCurrentUserPosition.distanceTo(latlngLocationPosition);
                const userLocationDistanceKm = (
                  userLocationDistanceMeter / 1000
                ).toFixed(1);

                if (userLocationDistanceKm > 0 && userLocationDistanceKm) {
                  return {
                    ...location,
                    distance: userLocationDistanceKm,
                  };
                } else {
                  console.log('no distance available');
                  return {
                    ...location,
                    distance: 'oops',
                  };
                }
              });
              setLocationsGps(res);
            } catch {
              setLocationsGps(locations);
              console.log('no gps no distance');
            }
          }
        };
        getDistance();
      } else {
        setLocationsGps(locations);
      }
    } else {
      setLocationsGps(locations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon, filterCategories, userFilterList, locations]);
  // Filter locationsgps
  useEffect(() => {
    const filterObserver = () => {
      let selectedFilter = Object.entries(filterCategories).filter(
        (filter) => filter[1].value === true,
      );

      let selectedUserFilter = Object.entries(userFilterList).filter(
        (filter) => filter[1].value === true,
      );

      if (
        (selectedFilter.length > 0 && locationsGps) ||
        (selectedUserFilter.length > 0 && locationsGps)
      ) {
        let filterByOccasion = locationsGps.filter((location) => {
          let occasionRes = Object.entries(selectedFilter).some((f) => {
            let fObj = f[1][1];
            let fname = fObj.name.toLowerCase();
            let locationProps = Object.entries(location);
            let locPropArr = locationProps.map((locprop) => locprop[0]);
            let locPropIndex = locPropArr.indexOf(fname);

            if (locationsGps && locPropIndex > 0 && fObj.value === true) {
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
          filterByOccasion = locationsGps;
        }

        let filterByFood = filterByOccasion.filter((location) => {
          let foodRes = Object.entries(selectedFilter).some((f) => {
            let fObj = f[1][1];
            let locationProps = Object.entries(location);
            let locPropArr = locationProps.map((locprop) => locprop[0]);
            let locPropIndex = locPropArr.indexOf('food');

            if (location && locPropIndex > 0 && fObj.value === true) {
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
            filterByFood = locationsGps;
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

        if (selectedUserFilter.length > 0 && filterByFancy) {
          let filterByUser = filterByFancy.filter((location) => {
            let userRes = Object.entries(selectedUserFilter).some((f) => {
              let fId = f[1][1].userId;
              return location.createdBy === fId;
            });
            return userRes;
          });

          if (filterByUser.length === 0) {
            filterByUser = filterByFancy;
          }
          setFilteredList(filterByUser);
        } else {
          setFilteredList(filterByFancy);
        }
      } else {
        setFilteredList(locationsGps);
      }
    };

    filterObserver();
  }, [filterCategories, locationsGps, userFilterList, locations]);

  const sortByDistance = () => {
    if (filteredList) {
      const sortByDist = filteredList.sort((a, b) => a.distance - b.distance);
      setFilterSortList([...sortByDist]);
    }
  };

  const sortByDate = () => {
    if (filteredList) {
      const sortById = filteredList.sort((a, b) => a.id - b.id);
      setFilterSortList([...sortById]);
    }
  };

  useEffect(() => {
    if (sortDistDateToggle && lat && lon) {
      sortByDistance();
    } else {
      sortByDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDistDateToggle, filteredList, lat, lon]);

  return (
    <div>
      <NavbarComp
        filterCategories={filterCategories}
        setFilterCategories={setFilterCategories}
        userFilterList={userFilterList}
        setUserFilterList={setUserFilterList}
        filterBooleans={filterBooleans}
        users={users}
        getGpsLocation={getGpsLocation}
        loadingLocation={loadingLocation}
        sortDistDateToggle={sortDistDateToggle}
        setSortDistDateToggle={setSortDistDateToggle}
      />
      <div className="pageMain">
        <Switch>
          <Route
            exact
            path="/list"
            component={() => (
              <List locations={filterSortList ? filterSortList : []} />
            )}
          />
          <Route
            exact
            path="/map"
            component={() => (
              <LeafletMap
                latitude={lat}
                longitude={lon}
                locations={filterSortList}
                loadingLocation={loadingLocation}
              />
            )}
          />
          <Route exact path="/user" component={UserList} />
          <PrivateRoute path="/profile" component={EditProfile} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}
