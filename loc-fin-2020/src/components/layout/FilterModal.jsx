// https://codesandbox.io/s/upbeat-ramanujan-b2jui?file=/src/Search.js:0-3336

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Spinner } from '../layout';

import './FilterModal.scss';

const FilterModal = (props) => {
  const {
    filterCategories,
    setFilterCategories,
    userFilterList,
    setUserFilterList,
    filterBooleans,
    testlog,
    onHide,
    users,
    getGpsLocation,
    loadingLocation,
    sortDistDateToggle,
    setSortDistDateToggle,
    ...rest
  } = props;
  const loading = useSelector((state) => state.loading);

  const onCancel = () => {
    onHide();
    // dispatch(resetLocation())
  };

  const refreshPosition = () => {
    getGpsLocation();
  };

  const handleToggle = (e) => {
    e.preventDefault();

    setSortDistDateToggle(!sortDistDateToggle);
  };

  const onFilterChange = (filterItem, type, userid) => {
    if (filterItem === 'ALL') {
      if (filterCategories && filterBooleans.indexOf(true) < 0) {
        return;
      } else {
        Object.keys(filterCategories).map((key) =>
          setFilterCategories((prevState) => ({
            ...prevState,
            [key]: { ...prevState[key], value: false },
          })),
        );
      }

      Object.entries(userFilterList).map((x) => {
        return x[1].value === true;
      });

      if (Object.entries(userFilterList).map((x) => x[1].value === true)) {
        Object.entries(userFilterList).forEach((item) => {
          setUserFilterList((prevState) => ({
            ...prevState,
            [item[0]]: { ...prevState[item], value: false },
          }));
          return;
        });
      }
    }
    if (type === 'user') {
      if (userFilterList[filterItem.username] !== undefined) {
        setUserFilterList((prevState) => ({
          ...prevState,
          [filterItem.username]: {
            ...prevState[filterItem.username],
            value: !userFilterList[filterItem.username].value,
          },
        }));
      } else {
        setUserFilterList((prevState) => ({
          ...prevState,
          [filterItem.username]: {
            ...prevState[filterItem.username],
            value: true,
            userId: userid,
          },
        }));
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
          <div className="modal-sort">
            <span style={{ width: '150px' }}>Sort by:</span>
            <div className="modal-sortbutton">
              <span>Distance</span>
              <div className="toggle-switch-container">
                <div className="toggle-switch toggle-switch__rounded">
                  <div className="toggle-switch__wrapper">
                    <div
                      type="button"
                      className={`toggle-switch__slider ${
                        !sortDistDateToggle && 'isChecked'
                      }`}
                      onClick={(e) => {
                        // e.preventDefault();
                        handleToggle(e);
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <span>Newest</span>
            </div>
          </div>
          <form>
            <div className="filter-option__buttons">
              <Button
                id="selectAll"
                type="button"
                onClick={() => onFilterChange('ALL')}
                className="modal-filterall"
              >
                All
              </Button>
              <Button
                className="modal-gpsrefresh"
                disabled={loadingLocation}
                onClick={() => refreshPosition()}
              >
                gps refresh
              </Button>
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
                        onChange={(event) =>
                          onFilterChange(user, 'user', user.id)
                        }
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
