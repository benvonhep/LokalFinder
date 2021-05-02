// https://codesandbox.io/s/upbeat-ramanujan-b2jui?file=/src/Search.js:0-3336

import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Spinner } from '../layout';

import './FilterModal.scss';

const FilterModal = (props) => {
  const {
    activeFilter,
    setActiveFilter,
    filterCategories,
    setFilterCategories,
    userFilterList,
    setUserFilterList,
    filterBooleans,
    testlog,
    onHide,
    users,
    ...rest
  } = props;
  // const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.loading);

  const onCancel = () => {
    onHide();
    // dispatch(resetLocation())
  };

  // useEffect(() => {
  //   let res = users.users.map((user) => {
  //     setUserFilterList((prevState) => ({
  //       ...prevState,
  //       [user.username]: { ...prevState[user.username], value: false },
  //     }));
  //     console.log('fliterinit fireeeeeeeeed');
  //   });
  // }, []);

  useEffect(() => {
    let reskey = Object.keys(users.users);
    // console.log(res, 'res');
    // console.log(reskey, 'reskey');
    if (users) {
      // let res = Object.entries(users.users).map((x) => console.log(x, 'usa'));
      // console.log(users.users[0], 'USER');
      // console.log(res[0], 'USERRES');
    }

    console.log(userFilterList, 'userfilterlist');

    // console.log(users[0].username, 'USERname');
  }, [users, userFilterList]);

  const onFilterChange = (filterItem, type) => {
    // console.log(filterItem, type, 'FILTERITEM');
    if (filterItem === 'ALL') {
      if (filterCategories && filterBooleans.indexOf(true) <= 0) {
        Object.entries(userFilterList).map((x) =>
          console.log('ALL - no filter selected'),
        );
      } else {
        console.log('ALL - filter selected ');
        Object.keys(filterCategories).map((key) =>
          setFilterCategories((prevState) => ({
            ...prevState,
            [key]: { ...prevState[key], value: false },
          })),
        );
      }
      console.log('ALL DONE');
      console.log(userFilterList, 'userFilterList');
      console.log(filterItem, 'filteritem');
      Object.entries(userFilterList).map((x) => {
        return x[1].value === true;
      });

      if (Object.entries(userFilterList).map((x) => x[1].value === true)) {
        console.log('arrived at userfilterlist IF ALL');
        Object.entries(userFilterList).map((item) => {
          console.log(item, 'ITEMUF');
          setUserFilterList((prevState) => ({
            ...prevState,
            [item[0]]: { ...prevState[item], value: false },
          }));
        });
      }
    }
    if (type === 'user') {
      console.log(' type user start');
      // if (userFilterList[filterItem.username] !== undefined) {
      //   console.log(
      //     userFilterList[filterItem.username].value,
      //     'is username true?',
      //   );
      // }

      if (userFilterList[filterItem.username] !== undefined) {
        setUserFilterList((prevState) => ({
          ...prevState,
          [filterItem.username]: {
            ...prevState[filterItem.username],
            value: !userFilterList[filterItem.username].value,
          },
        }));
        console.log('now false');
      } else {
        setUserFilterList((prevState) => ({
          ...prevState,
          [filterItem.username]: {
            ...prevState[filterItem.username],
            value: true,
          },
        }));
        console.log('now new true');
      }
    } else {
      if (filterCategories[filterItem.id] !== undefined)
        setFilterCategories((prevState) => ({
          ...prevState,
          [filterItem.id]: {
            ...prevState[filterItem.id],
            value: !filterCategories[filterItem.id].value,
          },
        }));
    }
  };

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onKeyPress={(e) => {
        e.key === 'Enter' && e.preventDefault();
      }}
      animation={false}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="modalHeader">
        <Modal.Title id="contained-modal-title-vcenter">Filter</Modal.Title>
        <Button size="sm" variant="outline-secondary" onClick={onCancel}>
          Close
        </Button>
      </Modal.Header>
      <Modal.Body>
        <>
          <form>
            <div className="filter-option__all">
              <input
                id="selectAll"
                type="checkbox"
                label="All"
                onChange={() => onFilterChange('ALL')}
                checked={
                  filterCategories
                    ? Object.entries(filterCategories).indexOf(false) <= 0
                    : false
                }
              />
              <label htmlFor="selectAll" className="ml-1">
                All
              </label>
            </div>
            <div className="filter-option__container">
              <div className="filter-option__categories">
                {filterCategories &&
                  Object.keys(filterCategories).map((key) => (
                    <div className="mb-1" key={key}>
                      <input
                        type="checkbox"
                        name={filterCategories[key].name}
                        id={filterCategories[key].id}
                        onChange={(event) =>
                          onFilterChange(filterCategories[key])
                        }
                        // value="true"
                        checked={
                          filterCategories[key].value === true ? true : false
                        }
                      />
                      <label
                        htmlFor={filterCategories[key].name}
                        className="ml-1"
                      >
                        {filterCategories[key].name}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="filter-option__blogger">
                {loading && <Spinner />}
                {!loading &&
                  users.users.map((user) => (
                    <div className="mb-1" key={user.id}>
                      <input
                        type="checkbox"
                        name={user ? user.username : ''}
                        id={user.id}
                        checked={
                          userFilterList[user.username] !== undefined
                            ? userFilterList[user.username].value === true
                            : false
                        }
                        onChange={(event) => onFilterChange(user, 'user')}
                        // // value="true"
                        // checked={users.users[key].value === true ? true : false}
                      />
                      <span></span>
                      <label htmlFor={user.username} className="ml-1">
                        {user.username}
                      </label>
                    </div>
                  ))}
                <Button
                  onClick={() => console.log(userFilterList, 'userfilterlist')}
                >
                  Userfilter
                </Button>
              </div>
            </div>
          </form>
        </>
      </Modal.Body>
    </Modal>
  );
};
export default FilterModal;
