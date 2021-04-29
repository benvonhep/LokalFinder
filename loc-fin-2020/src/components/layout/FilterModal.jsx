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

  useEffect(() => {
    let reskey = Object.keys(users.users);
    // console.log(res, 'res');
    console.log(reskey, 'reskey');
    if (users) {
      // let res = Object.entries(users.users).map((x) => console.log(x, 'usa'));
      console.log(users.users[0], 'USER');
      // console.log(res[0], 'USERRES');
    }
    // console.log(users[0].username, 'USERname');
  }, [users]);

  const onFilterChange = (filterItem) => {
    if (filterItem === 'ALL') {
      if (filterCategories && filterBooleans.indexOf(true) <= 0) {
        return;
      } else {
        Object.keys(filterCategories).map((key) =>
          setFilterCategories((prevState) => ({
            ...prevState,
            [key]: { ...prevState[key], value: false },
          })),
        );
      }
    } else {
      // console.log(filterItem, '#FILTER#ITEM#')
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
                        // label={user.username}
                        // name={users ? users.users[key].username : ''}
                        // id={users.users[key].id}
                        // onChange={(event) => onFilterChange(users.users[key])}
                        // // value="true"
                        // checked={users.users[key].value === true ? true : false}
                      />
                      <span></span>
                      <label htmlFor={user.username} className="ml-1">
                        {user.username}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </form>
        </>
      </Modal.Body>
    </Modal>
  );
};
export default FilterModal;
