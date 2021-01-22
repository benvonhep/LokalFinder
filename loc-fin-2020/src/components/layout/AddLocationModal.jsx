import React, { useState, Fragment } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { addLocation, resetLocation } from '../../store/actions/locationsAction';
import { useDispatch } from 'react-redux';
import './AddLocationModal.scss';
import * as Nominatim from "nominatim-browser";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { setAlert } from '../../store/actions/alertActions';

const initialFormData = {
  id: '',
  createdBy: '',
  name: '',
  photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    }],
  nominatim_data: '',
  description: '',
  occasion: '',
  phone: '',
  house_number: '',
  street: '',
  postcode: '',
  city: '',
  country: '',
  latitude: '',
  longitude: '',
  food: '',
  casual: true,
  fancy: false
}

const AddLocationModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [addressIsValid, setAddressIsValid] = useState(false);

  const handleSearch = async (query) => {
    setIsLoading(true);

    const search = await Nominatim.geocode({
      countrycodes: "AT",
      q: query,
      addressdetails: 1,
      format: JSON,
    })
    setOptions(search)
    setIsLoading(false)
    return search
  }

  const onChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !addressIsValid) {
      event.stopPropagation();
      return;
    }

    setValidated(true);
    const newLocation = {
      ...formData,
      createdBy: props.user_id
    }
    if (form.checkValidity() === true) {
      try {
        dispatch(addLocation(newLocation))
        setFormData(initialFormData)
        props.onHide();
        setValidated(false);
        setAddressIsValid(false)
        dispatch(setAlert('Added successfully a new blogpost to the map', 'success'))
      } catch {
        dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
      }

    } else {
      dispatch(setAlert('Please check all fields', 'danger'))
    }
  }

  const onCancel = async () => {
    props.onHide()
    setFormData(initialFormData)
    setAddressIsValid(false)
    dispatch(resetLocation())
  }

  const addGeodata = (option) => {
    console.log(option, 'option');
    setFormData({
      ...formData,
      latitude: parseFloat(option.lat),
      longitude: parseFloat(option.lon),
      city: option.address.city,
      street: option.address.road,
      house_number: parseFloat(option.address.house_number),
      postcode: option.address.postcode,
      country: option.address.country_code,
      nominatim_data: option.display_name
    });
    setAddressIsValid(true)
    return
  }

  const filterBy = () => true;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
      animation={false}
      backdrop="static"
        keyboard={false}
    >
      <Modal.Header className="modalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new Restaurant
        </Modal.Title>
        <Button size="sm" variant="outline-secondary" onClick={onCancel}>Close</Button>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Enter the name" />
            <Form.Control.Feedback type="invalid">
              Please enter a name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="photo1">
            <Form.Label>Photo Url</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="photo1"
              value={formData.photos[0].url}
              onChange={onChange}
              placeholder="Enter the photos url" />
            <Form.Control.Feedback type="invalid">
              Please enter the photos url
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="photo2">
            <Form.Label>Photo Url</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="photo2"
              value={formData.photos[1].url}
              onChange={onChange}
              placeholder="Enter the photos url" />
            <Form.Control.Feedback type="invalid">
              Please enter the photos url
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Enter the description" />
            <Form.Control.Feedback type="invalid">
              Please enter a description
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="occasion">
            <Form.Label>Choose Occasion</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              required
              name="occasion"
              value={formData.occasion}
              onChange={onChange}>
              <option></option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Breakfast | Lunch</option>
              <option>Breakfast | Dinner</option>
              <option>Lunch | Dinner</option>
              <option>Lunch | Dinner | Night</option>
              <option>Breakfast | Lunch | Dinner | Night</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please enter the occasion
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="Enter the phone number" />
            <Form.Control.Feedback type="invalid">
              Please enter the phone number
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Location Address</Form.Label>
            <AsyncTypeahead
              required
              isInvalid={!addressIsValid}
              filterBy={filterBy}
              id="async-example"
              isLoading={isLoading}
              labelKey={option => `${option.display_name}`}
              minLength={2}
              onSearch={handleSearch}
              onInputChange={() => setAddressIsValid(false)}
              options={options}
              placeholder="Search for the address..."
              renderMenuItemChildren={(option, index) => (
                <Fragment key={index}>
                  <span
                    onClick={() => addGeodata(option)}>{option.display_name}</span>
                </Fragment>
              )}
            />
            {formData.city &&
              <>
                <Form.Label style={{marginTop: '15px'}}>Selected Address</Form.Label>
                  <Form.Control
                  required
                    disabled
                    size="sm"
                    type="text"
                    name="currentAddress"
                    value={
                      formData.street + ' ' +
                      formData.house_number + ', ' +
                      formData.postcode  + ', ' +
                      formData.city
                    }
                  />
              </>
            }
            <Form.Control.Feedback type="invalid">
              Please enter an address
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="food">
            <Form.Label>Choose Cuisine</Form.Label>
            <Form.Control as="select" size="sm" required name="food" value={formData.food}
              onChange={onChange}>
              <option></option>
              <option>African</option>
              <option>American</option>
              <option>Asian</option>
              <option>Arabic</option>
              <option>European</option>
              <option>Other</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please enter the kind of food served
            </Form.Control.Feedback>
          </Form.Group>
            <Form.Group controlId="casual">
              <Form.Label>Casual</Form.Label>
              <Form.Check
                inline
                type="checkbox"
                name="casual"
                checked={formData.casual}
                onChange={() => setFormData({ ...formData, casual: !formData.casual })}
                >
              </Form.Check>
            </Form.Group>
            <Form.Group controlId="fancy">
              <Form.Label>Fancy</Form.Label>
              <Form.Check
                inline
                type="checkbox"
                name="fancy"
                checked={formData.fancy}
                onChange={() => setFormData({ ...formData, fancy: !formData.fancy })}
                >
              </Form.Check>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button variant="outline-success" type="submit">
            Save
          </Button>
          <Button variant="outline-secondary" onClick={onCancel} className="ml-2">
            Cancel
          </Button>
        </Modal.Footer>
      </Form >
    </Modal >
  );
}

export default AddLocationModal;