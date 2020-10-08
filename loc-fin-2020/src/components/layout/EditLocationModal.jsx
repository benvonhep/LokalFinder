import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { editLocation, resetLocation } from '../../store/actions/locationsAction';
import './EditLocationModal.scss';
import { useDispatch } from 'react-redux';

const initialFormData = {
  id: '',
  name: '',
  photo: '',
  description: '',
  occasion: '',
  phone: '',
  street: '',
  city: '',
  food: '',
  casual: '',
  fancy: '',
  latitude: '',
  longitude: ''
}

function EditLocationModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(initialFormData);


  useEffect(() => {
    setFormData(props.location)
  }, [props.location])

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
      dispatch(editLocation(newLocation, newLocation.id))
      setFormData(initialFormData)

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
          <Form.Group controlId="photo">
            <Form.Label>Photo Url</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="photo"
              defaultValue={formData.photo || ''}
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
              <option>Lunch | Dinner-Night</option>
              <option>Breakfast | Lunch |Dinner | Night</option>
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
          <Form.Group controlId="street">
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
          </Form.Group>
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
          <Form.Group controlId="latitude">
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

export default EditLocationModal;