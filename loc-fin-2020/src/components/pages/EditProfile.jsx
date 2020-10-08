import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";

import { editUser, resetUser } from '../../store/actions/usersAction';
import './EditProfile.scss'





const initialFormData = {
  id: '',
  username: '',
  email: '',
  picture: '',
  description: '',
  city: ''
}



const EditProfile = (props) => {
  const { user } = useAuth0();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const users = useSelector(state => state.users)

  useEffect(() => {
    const editUser = users.users.find((userProfile) => user.email === userProfile.email)
    setFormData(editUser)
    // console.log(editUser);
  }, [users, user.email])





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
    const newUserProfile = {
      ...formData,
    }

    if (form.checkValidity() === true) {
      dispatch(editUser(newUserProfile, newUserProfile.id))
      setFormData(initialFormData)

      setValidated(false);
    }
  }

  const onCancel = async () => {
    setFormData(initialFormData)
    dispatch(resetUser())
  }

  return (
    <Container className="mb-5 profile-container">

      <Form noValidate validated={validated} onSubmit={onSubmit}>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            size="sm"
            type="text"
            name="username"
            defaultValue={formData.username || ''}
            onChange={onChange}
            placeholder="Enter a username" />
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
            defaultValue={formData.picture || ''}
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
            placeholder="Enter a description url" />
          <Form.Control.Feedback type="invalid">
            Please enter the description url
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
            placeholder="Enter a city url" />
          <Form.Control.Feedback type="invalid">
            Please enter the city url
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            disabled
            size="sm"
            type="text"
            name="email"
            defaultValue={user.email || ''}
          />

        </Form.Group>
        <div>
          <Button variant="outline-success" type="submit">
            Submit
            </Button>
          <Button variant="outline-secondary" onClick={onCancel} className="ml-2">
            Cancel
            </Button>
        </div>
      </Form >



    </Container>
  );
};

export default EditProfile;