import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLocation } from '../../store/actions/locationsAction';
import { ListLocationCard, Spinner } from '../layout';
import LocationModal from '../layout/LocationModal';
import { useAuth0 } from '@auth0/auth0-react';

import './List.scss';

const List = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [modalShow, setModalShow] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [userProfile, setUserProfile] = useState();
  const loading = useSelector((state) => state.loading);
  const [location, setLocation] = useState(null);
  const { locations, distanceArray, users } = props;
  const dispatch = useDispatch();

  const onItemEditClicked = (id) => {
    setModalShow(true);
    const location = locations.find((location) => location.id === id);
    setLocation(location);
  };

  const deleteItem = (id) => {
    dispatch(deleteLocation(id));
  };

  useEffect(() => {
    if (!isLoading && users && user) {
      const findUserProfile = users.users.find(
        (foundUser) => user.email === foundUser.email,
      );
      setUserProfile(findUserProfile);
      setLoadingData(false);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, loadingData, user, isLoading]);

  return (
    <div className="container listcontainer">
      <div style={{ color: 'red' }}></div>
      {loading && <Spinner />}
      {!loading && (
        <div className="location-card-grid">
          {locations &&
            locations.length > 0 &&
            locations.map((location) => (
              <div className="card-Grid-Item" key={location.id}>
                <ListLocationCard
                  distanceArray={distanceArray}
                  location={location}
                  onDelete={() => deleteItem(location.id)}
                  onEdit={() => onItemEditClicked(location.id)}
                />
              </div>
            ))}
        </div>
      )}
      {location && userProfile !== undefined && (
        <LocationModal
          show={modalShow}
          location={location}
          type="editLocation"
          user_id={userProfile.id}
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
};

export default List;
