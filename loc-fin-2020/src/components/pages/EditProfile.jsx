import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { editUser, addUser } from '../../store/actions/usersAction';
import { useHistory } from "react-router-dom";
import './EditProfile.scss'
import { setAlert } from '../../store/actions/alertActions';


const initialFormData = {
  id: '',
  username: '',
  email: '',
  photo: '',
  description: '',
  city: ''
}

const EditProfile = () => {
  const users = useSelector(state => state.users);
  const loading = useSelector(state => state.loading);
  const { push } = useHistory();
  const { user } = useAuth0();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loadingData, setLoadingData] = useState(true)
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState()

  useEffect(() => {
    if (loadingData) {

      const findUserProfile = users.users.find((userProfile) => user.email === userProfile.email)
      if (findUserProfile) {
        setUserProfile(findUserProfile)
        setFormData(findUserProfile)
        setLoadingData(false)
      } else {
        setFormData(initialFormData)
        setLoadingData(false)
      }
    } else {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loadingData])

  const onChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmitInitial = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    const newUserProfile = {
      ...formData,
      email: user.email
    }

    if (form.checkValidity() === true) {
      try {
        dispatch(addUser(newUserProfile, newUserProfile.id))
        dispatch(setAlert('Successfully added your profile', 'success'))
        push('/user')
      } catch {
        dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
      }
    } else {
      dispatch(setAlert('Please check all fields', 'danger'))

    }

  }

  const onEditSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      dispatch(setAlert('Please check all fields', 'danger'))
    }

    setValidated(true);
    const newUser = {
      ...formData
    }
    if (form.checkValidity() === true) {
      try {
        dispatch(editUser(newUser, newUser.id))
        push('/user')
        setFormData(initialFormData)
        setValidated(false);
        dispatch(setAlert('Successfully edited your profile', 'success'))
      } catch {
      dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
      }
    } else {
      dispatch(setAlert('Please check all fields', 'danger'))

    }
  }

  const onCancel = async () => {
    push('/user')
    setFormData(initialFormData)
  }

  return (
    <Container className="mb-5 profile-container">
      {loadingData &&
        <h1>loading...</h1>
      }
      {!loadingData &&
        <div>
          {userProfile &&
            <Form noValidate validated={validated} onSubmit={onEditSubmit}>
              {userProfile &&
                <div>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      required
                      disabled
                      size="sm"
                      type="text"
                      name="username"
                      defaultValue={formData.username || ''}
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
                </div>
              }
              {!userProfile && !loading &&
                <div>
                  <Form.Group controlId="username">
                    <Form.Label>UsernameNOUSERNAME</Form.Label>
                    <Form.Control
                      required
                      size="sm"
                      type="text"
                      name="username"
                      value={formData.username}
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
                      value={formData.photo}
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
                      value={formData.description}
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
                      value={formData.city}
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
                      value={user.email}
                    />
                  </Form.Group>
                </div>
              }
              <div>
                <Button variant="outline-success" type="submit">
                  Submit
                </Button>
                <Button variant="outline-secondary" onClick={onCancel} className="ml-2">
                  Cancel
                </Button>
              </div>
            </Form >
          }
          {!userProfile &&
            <Form noValidate validated={validated} onSubmit={onSubmitInitial}>
              <div>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    size="sm"
                    type="text"
                    name="username"
                    value={formData.username}
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
                    value={formData.photo}
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
                    value={formData.description}
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
                    value={formData.city}
                    onChange={onChange}
                    placeholder="Enter a city url" />
                  <Form.Control.Feedback type="invalid">
                    Please enter the city url
            </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div>
                <Button variant="outline-success" type="submit">
                  Submit
            </Button>
                <Button variant="outline-secondary" onClick={onCancel} className="ml-2">
                  Cancel
            </Button>
              </div>
            </Form >
          }
        </div>
      }
    </Container >
  );
};

export default EditProfile;