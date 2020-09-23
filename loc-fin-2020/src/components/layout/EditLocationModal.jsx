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
  price: '',
  latitude: '',
  longitude: ''
}

function EditLocationModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  // const location = useSelector(state => state.locations.location)


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
      dispatch(resetLocation())

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
              defaultValue={props.location.name || ''}
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
              defaultValue={props.location.photo || ''}
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
              defaultValue={props.location.description || ''}
              onChange={onChange}
              placeholder="Enter a description" />
            <Form.Control.Feedback type="invalid">
              Please enter the description
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="occasion">
            <Form.Label>Occasion</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="occasion"
              defaultValue={props.location.occasion || ''}
              onChange={onChange}
              placeholder="Enter the occasion" />
            <Form.Control.Feedback type="invalid">
              Please enter the occation
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              required
              size="sm"
              type="text"
              name="phone"
              defaultValue={props.location.phone || ''}
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
              defaultValue={props.location.street || ''}
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
              defaultValue={props.location.city || ''}
              onChange={onChange}
              placeholder="Enter city" />
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
              defaultValue={props.location.food || ''}
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
              defaultValue={props.location.latitude || ''}
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
              defaultValue={props.location.longitude || ''}
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
      </Form>
    </Modal>
  );
}

export default EditLocationModal;