import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { addLocation, resetLocation } from '../../store/actions/locationsAction';
import './AddLocationModal.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';

const initialFormData = {
  id: '',
  name: '',
  photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
  description: '',
  occasion: '',
  phone: '',
  street: '',
  city: '',
  food: '',
  casual: '',
  fancy: '',
  latitude: 48.23,
  longitude: 16.35
}

function AddLocationModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

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
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    const newLocation = {
      ...formData
    }
    if (form.checkValidity() === true) {
      dispatch(addLocation(newLocation))
      form.reset()
      props.onHide();
      setValidated(false);
    }
  }

  const onCancel = async () => {
    props.onHide()
    setFormData(initialFormData)
    dispatch(resetLocation())
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
          <Form.Group controlId="photo">
            <Form.Label>Photo Url</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="photo"
              value={formData.photo}
              onChange={onChange}
              placeholder="Enter the photo url" />
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
              value={formData.description}
              onChange={onChange}
              placeholder="Enter the description" />
            <Form.Control.Feedback type="invalid">
              Please enter a description
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="occasion">
            <Form.Label>Occasion</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="occasion"
              value={formData.occasion}
              onChange={onChange}
              placeholder="Enter the occasion" />
            <Form.Control.Feedback type="invalid">
              Please enter the opening times
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
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="street"
              value={formData.street}
              onChange={onChange}
              placeholder="Enter the street" />
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
              value={formData.city}
              onChange={onChange}
              placeholder="Enter the city" />
            <Form.Control.Feedback type="invalid">
              Please enter the city
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="food">
            <Form.Label>Food</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="food"
              value={formData.food}
              onChange={onChange}
              placeholder="Select the cuisine" />
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
              onChange={onChange}
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
              onChange={onChange}
              placeholder="Enter the fancyness">
            </Form.Check>
          </Form.Group>
          <Form.Group controlId="latitude">
            <Form.Label>Locations Latitude</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={onChange}
              placeholder="Enter the locations latitude" />
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
              value={formData.longitude}
              onChange={onChange}
              placeholder="Enter the locations longitude" />
            <Form.Control.Feedback type="invalid">
              Please enter the longitude
            </Form.Control.Feedback>
          </Form.Group>

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

export default AddLocationModal;