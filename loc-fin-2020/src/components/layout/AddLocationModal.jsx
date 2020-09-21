import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { addLocation } from '../../store/actions/locationsAction';
import './AddLocationModal.scss';
import { useDispatch } from 'react-redux';
// import ILocation from '../../interfaces/ILocation';

function AddLocationModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
    description: '',
    openingTime: '',
    phone: '',
    street: '',
    city: '',
    food: ''
  });

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


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new Restaurant
        </Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" name="name" value={formData.name} onChange={onChange} placeholder="Enter name" />
            <Form.Control.Feedback type="invalid">
              Please enter a name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="photo">
            <Form.Label>Photo Url</Form.Label>
            <Form.Control required type="text" name="photo" value={formData.photo} onChange={onChange} value={'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'} placeholder="Enter photo url" />
            <Form.Control.Feedback type="invalid">
              Please enter the photo url
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control required type="text" name="description" value={formData.description} onChange={onChange} placeholder="Enter description" />
            <Form.Control.Feedback type="invalid">
              Please enter a description
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="openingTime">
            <Form.Label>Opening Times</Form.Label>
            <Form.Control required type="text" name="openingTime" value={formData.openingTime} onChange={onChange} placeholder="Enter opening times" />
            <Form.Control.Feedback type="invalid">
              Please enter the opening times
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control required type="text" name="phone" value={formData.phone} onChange={onChange} placeholder="Enter phone number" />
            <Form.Control.Feedback type="invalid">
              Please enter the phone number
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control required type="text" name="street" value={formData.street} onChange={onChange} placeholder="Enter street" />
            <Form.Control.Feedback type="invalid">
              Please enter the street
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control required type="text" name="city" value={formData.city} onChange={onChange} placeholder="Enter city" />
            <Form.Control.Feedback type="invalid">
              Please enter the city
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="food">
            <Form.Label>Food</Form.Label>
            <Form.Control required type="text" name="food" value={formData.food} onChange={onChange} placeholder="Enter kind of food" />
            <Form.Control.Feedback type="invalid">
              Please enter the kind of food served
            </Form.Control.Feedback>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button variant="outline-success" type="submit">
            Submit
          </Button>
          <Button variant="outline-secondary" onClick={props.onHide} className="ml-2">
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddLocationModal;