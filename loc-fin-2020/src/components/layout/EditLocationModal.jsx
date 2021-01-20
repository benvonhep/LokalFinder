import React, { useState, useEffect, Fragment } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { editLocation, resetLocation } from '../../store/actions/locationsAction';
import './EditLocationModal.scss';
import { useDispatch } from 'react-redux';
import * as Nominatim from "nominatim-browser";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


const initialFormData = {
  id: '',
  name: '',
  photos: [{ id: '', url: '' }, { id: '', url: '' }],
  description: '',
  occasion: '',
  phone: '',
  house_number: '',
  street: '',
  postcode: '',
  city: '',
  country: '',
  food: '',
  casual: '',
  fancy: '',
  nominatim_data: ''
}


function EditLocationModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [addressIsValid, setAddressIsValid] = useState(false);


  useEffect(() => {
    setFormData(props.location)
  }, [props.location])

  const onChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

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

  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    const newLocation = {
      ...formData,
      createdBy: props.location.createdBy
    }
    if (form.checkValidity() === true) {
      dispatch(editLocation(newLocation, newLocation.id))
      setFormData(initialFormData)

      props.onHide();
      setValidated(false);
      setAddressIsValid(false)
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
      house_number: option.address.house_number,
      postcode: option.address.postcode,
      country: option.address.country_code,

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
      animation={false}
    >
      <Modal.Header className="modalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Restaurant
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
              defaultValue={formData.name || ''}
              onChange={onChange}
              placeholder="Enter a name" />
            <Form.Control.Feedback type="invalid">
              Please enter the name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="photo1">
            <Form.Label>Photo Url</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="photo1"
              defaultValue={formData.photos[0].url || ''}
              onChange={onChange}
              placeholder="Enter a photo url" />
            <Form.Control.Feedback type="invalid">
              Please enter the photo url
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="photo2">
            <Form.Label>Photo Url</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="photo2"
              defaultValue={formData.photos[1].url || ''}
              onChange={onChange}
              placeholder="Enter a photo url" />
            <Form.Control.Feedback type="invalid">
              Please enter the photo url
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="description"
              defaultValue={formData.description || ''}
              onChange={onChange}
              placeholder="Enter a description" />
            <Form.Control.Feedback type="invalid">
              Please enter the description
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="occasion">
            <Form.Label>Choose Occasion</Form.Label>
            <Form.Control as="select" size="sm" required name="occasion"
              defaultValue={formData.occasion}
              onChange={onChange}>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Breakfast | Lunch</option>
              <option>Breakfast | Dinner</option>
              <option>Lunch | Dinner</option>
              <option>Lunch | Dinner | Night</option>
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
              defaultValue={formData.phone || ''}
              onChange={onChange}
              placeholder="Enter phone number" />
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
              defaultValue={formData.nominatim_data || ''}
              onSearch={handleSearch}
              options={options}
              placeholder="Search for the address..."
              renderMenuItemChildren={(option, index) => (
                <Fragment key={index}>
                  <span onClick={() => addGeodata(option)}>{option.display_name}</span>
                </Fragment>
              )}
            />
            <Form.Control.Feedback type="invalid">
              Please enter an address
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="street"
              defaultValue={formData.street || ''}
              onChange={onChange}
              placeholder="Enter street" />
            <Form.Control.Feedback type="invalid">
              Please enter the street
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="city"
              defaultValue={formData.city || ''}
              onChange={onChange}
              placeholder="Enter city" />
            <Form.Control.Feedback type="invalid">
              Please enter the city
            </Form.Control.Feedback>
          </Form.Group> */}
          <Form.Group controlId="food">
            <Form.Label>Choose Cuisine</Form.Label>
            <Form.Control as="select" size="sm" required name="food"
              defaultValue={formData.food}
              onChange={onChange}>
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
              // checked={formData.casual}
              onChange={() => setFormData({ ...formData, casual: !formData.casual })}

              placeholder="Enter the fancyness">
            </Form.Check>
          </Form.Group>
          <Form.Group controlId="fancy">
            <Form.Label>Fancy</Form.Label>
            <Form.Check
              inline
              type="checkbox"
              name="fancy"
              checked={formData.fancy}

              // checked={formData.fancy}
              onChange={() => setFormData({ ...formData, fancy: !formData.fancy })}
              placeholder="Enter the fancyness">
            </Form.Check>
          </Form.Group>
          {/* <Form.Group controlId="latitude">
            <Form.Label>Locations Latitude</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="latitude"
              defaultValue={formData.latitude || ''}
              onChange={onChange}
              placeholder="Enter locations latitude" />
            <Form.Control.Feedback type="invalid">
              Please enter the latitude
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="longitude"
              defaultValue={formData.longitude || ''}
              onChange={onChange}
              placeholder="Enter the locations longitude" />
            <Form.Control.Feedback type="invalid">
              Please enter the longitude
            </Form.Control.Feedback>
          </Form.Group> */}
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button variant="outline-success" type="submit">
            Submit
            </Button>
          <Button variant="outline-secondary" onClick={onCancel} className="ml-2">
            Cancel
            </Button>
        </Modal.Footer>
      </Form >
    </Modal >
  );
}

export default EditLocationModal;