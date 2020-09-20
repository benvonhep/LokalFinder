import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { HIDE_MODAL } from '../../store/actionTypes';
import './AddLocationModal.scss'
// import {hideModal, showModal} from '../../store/actions/modalActions';
import { useDispatch } from 'react-redux';

function AddLocationModal(props: any) {
  const [validated, setValidated] = useState(false);
  // const [newLocation, setNewLocation] = useState(null);


  const submitLocation = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    if (form.checkValidity() === true) {
      form.reset()
      setValidated(false);
      props.onHide()
    }
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new Restaurant
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={submitLocation}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter name" />
            <Form.Control.Feedback type="invalid">
              Please enter a name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="photoUrl">
            <Form.Label>Photo Url</Form.Label>
            <Form.Control required type="text" placeholder="Enter photo url" />
            <Form.Control.Feedback type="invalid">
              Please enter the photo url
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control required type="text" placeholder="Enter description" />
            <Form.Control.Feedback type="invalid">
              Please enter a description
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="openingTime">
            <Form.Label>Opening Times</Form.Label>
            <Form.Control required type="text" placeholder="Enter opening times" />
            <Form.Control.Feedback type="invalid">
              Please enter the opening times
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control required type="text" placeholder="Enter phone number" />
            <Form.Control.Feedback type="invalid">
              Please enter the phone number
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control required type="text" placeholder="Enter street" />
            <Form.Control.Feedback type="invalid">
              Please enter the street
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control required type="text" placeholder="Enter city" />
            <Form.Control.Feedback type="invalid">
              Please enter the city
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="food">
            <Form.Label>Food</Form.Label>
            <Form.Control required type="text" placeholder="Enter kind of food" />
            <Form.Control.Feedback type="invalid">
              Please enter the kind of food served
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button variant="secondary" onClick={props.onHide} className="ml-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AddLocationModal;