import React, { useState, Fragment, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {
  addLocation,
  resetLocation,
  editLocation,
} from '../../store/actions/locationsAction';
import { useDispatch } from 'react-redux';
import './LocationModal.scss';
import * as Nominatim from 'nominatim-browser';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { setAlert } from '../../store/actions/alertActions';
import { Formik } from 'formik';
import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const urlRegExp =
  // eslint-disable-next-line
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const isValidUrl = (url) => {
  if (url !== undefined && url.length > 12 && url.includes('http')) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }

    // return true;
  }
};

let schema = yup.object().shape(
  {
    name: yup
      .string()
      .min(1, 'thats probably too short ;)')
      .max(35, 'Namelength exceeded')
      .required('LoL :)'),
    bloglink: yup
      .string()
      .min(15, 'LoL :)')
      .test('is-url-valid', 'URL is not valid', (value) => {
        // console.log(value, 'VALUE');
        let res = isValidUrl(value);
        return res;
      })
      .required('heast was id o los'),
    description: yup
      .string('')
      .min(10, 'almost enough ;)')
      .max(372, 'oh no, thats more than 440 characters :(')
      .required('Why should you go there?'),
    // occasion: yup.string().required('When could you go?'),
    breakfast: yup.boolean().when(['lunch', 'dinner', 'brunch', 'night'], {
      is: false,
      then: yup.boolean().oneOf([true], 'Im sure you know the answer ;)'),

      otherwise: yup.boolean().required('i think we need an answer here :)'),
    }),
    brunch: yup.boolean(),
    lunch: yup.boolean(),
    dinner: yup.boolean(),
    night: yup.boolean(),
    phone: yup
      .string()
      .min(5, 'is it enough? ;)')
      .max(20, 'tssss ;)')
      .matches(phoneRegExp, 'Are you sure? ;)')
      .required('A phone number would be awesome :)'),
    food: yup.string().required('What food do they offer?'),
    house_number: yup.string().required('Is it a ghostkitchen? ;)'),
    casual: yup.boolean().when('fancy', {
      is: false,
      then: yup
        .boolean()
        .oneOf([true], 'Are you sure it´s neither of the two? ;)'),
      otherwise: yup.boolean().required(),
    }),
    fancy: yup.boolean(),
  },
  [
    [
      'name',
      'bloglink',
      'description',
      'phone',
      'food',
      'house_number',
      'casual',
      'fancy',
    ],
  ],
);

const LocationModal = (props) => {
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [urlIsValid, setUrlIsValid] = useState();
  const [addressIsValid, setAddressIsValid] = useState('null');
  const formRef = useRef();
  const [locationToEdit] = useState(
    props.location
      ? props.location
      : {
          fancy: false,
          casual: false,
          breakfast: false,
          brunch: false,
          lunch: false,
          dinner: false,
          night: false,
          vegan: false,
          vegetarian: false,
        },
  );
  const [addressValue, setAddressValue] = useState(
    locationToEdit.street
      ? locationToEdit.street +
          ' ' +
          locationToEdit.house_number +
          ', ' +
          locationToEdit.city +
          ' ' +
          locationToEdit.postcode
      : undefined,
  );

  const handleSearch = async (query) => {
    setIsLoading(true);

    const search = await Nominatim.geocode({
      countrycodes: 'AT',
      q: query,
      addressdetails: 1,
      format: JSON,
    });
    const validresult = search.find(
      (res) => res.address.house_number && res.address.house_number !== '',
    );
    let res;
    if (validresult === undefined) {
      res = [];
    } else {
      res = [validresult];
    }
    setOptions(res);
    setIsLoading(false);
    return search;
  };

  const onUrlChangeValidation = (e) => {
    const regex = new RegExp(urlRegExp);
    if (regex.test(e.target.value)) {
      setUrlIsValid(true);
    } else {
      return;
    }
  };

  const addressSelectOption = (option, validateField, setFieldValue) => {
    let optionResult = {};
    if (
      option.address !== undefined &&
      option.address.house_number.length < 1 &&
      isNaN(option.address.house_number)
    ) {
      console.log('housenumber fail');
      validateField('address');
      return;
    }

    if (option.lat === null || undefined) {
      console.log('coordinates cannot be null, check gps connection');
      return;
    }

    if (option.address !== undefined) {
      if (
        option.lat &&
        option.lon &&
        option.address.state &&
        option.address.road &&
        option.address.house_number &&
        option.address.postcode &&
        option.address.country_code
      ) {
        optionResult = {
          lat: option.lat,
          lon: option.lon,
          city: option.address.state,
          street: option.address.road,
          house_number: option.address.house_number,
          postcode: option.address.postcode,
          country: option.address.country_code,
          nominatim_data: option.display_name,
        };
      }
    } else if (option.house_number !== undefined || '' || null) {
      optionResult = option;
    }

    setFieldValue('latitude', parseFloat(optionResult.lat));
    setFieldValue('longitude', parseFloat(optionResult.lon));
    setFieldValue('city', optionResult.city);
    setFieldValue('street', optionResult.street);
    setFieldValue('house_number', parseFloat(optionResult.house_number));
    setFieldValue('postcode', optionResult.postcode);
    setFieldValue('country', optionResult.country);
    setFieldValue('nominatim_data', optionResult.nominatim_data);

    setAddressValue(
      optionResult.street +
        ' ' +
        optionResult.house_number +
        ', ' +
        optionResult.city +
        ' ' +
        optionResult.postcode,
    );
    setTimeout(() => {
      validateField('house_number');
    }, 1);
  };

  const dispatch = useDispatch();

  const onCancel = async () => {
    props.onHide();
    dispatch(resetLocation());
    setAddressValue('');
  };

  const filterBy = () => true;

  return (
    <>
      {props.user_id !== undefined && (
        <>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onKeyPress={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
            animation={false}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header className="modalHeader">
              <Modal.Title id="contained-modal-title-vcenter">
                {props.type === 'addNewLocation' && <p>Add a new post</p>}
                {props.type === 'editLocation' && <p>Edit the post</p>}
              </Modal.Title>
              <Button size="sm" variant="outline-secondary" onClick={onCancel}>
                Close
              </Button>
            </Modal.Header>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                try {
                  const newLocation = {
                    ...values,
                    createdBy: props.user_id,
                  };
                  console.log(newLocation, 'varnewlocationLOC');
                  if (props.type === 'addNewLocation') {
                    try {
                      dispatch(addLocation(newLocation));
                      dispatch(
                        setAlert(
                          'Added successfully a new blogpost to the map',
                          'success',
                        ),
                      );
                    } catch (error) {
                      dispatch(
                        setAlert(
                          'Oooops, something weired happened during saving',
                          'danger',
                        ),
                      );
                    }
                  }
                  if (props.type === 'editLocation') {
                    try {
                      dispatch(editLocation(newLocation, newLocation.id));
                      console.log(newLocation, props.user_id, 'YOLO');
                      dispatch(
                        setAlert('Edited successfully the blogpost', 'success'),
                      );
                    } catch (error) {
                      dispatch(
                        setAlert(
                          'Oooops, something weired happened during saving',
                          'danger',
                        ),
                      );
                    }
                  }
                  props.onHide();
                  setAddressIsValid(false);
                } catch {
                  dispatch(
                    setAlert(
                      'Oooops, something weired happened during saving',
                      'danger',
                    ),
                  );
                }
              }}
              validateOnBlur={true}
              innerRef={formRef}
              initialValues={{
                id: locationToEdit.id,
                createdBy: locationToEdit.createdBy,
                name: locationToEdit.name,
                photos: [
                  {
                    id: 1,
                    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
                  },
                  {
                    id: 2,
                    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
                  },
                ],
                nominatim_data: locationToEdit.nominatim_data,
                description: locationToEdit.description,
                breakfast: locationToEdit.breakfast,
                brunch: locationToEdit.brunch,
                dinner: locationToEdit.dinner,
                lunch: locationToEdit.lunch,
                night: locationToEdit.night,
                phone: locationToEdit.phone,
                house_number: locationToEdit.house_number,
                street: locationToEdit.street,
                postcode: locationToEdit.postcode,
                city: locationToEdit.city,
                country: locationToEdit.country,
                latitude: locationToEdit.latitude,
                longitude: locationToEdit.longitude,
                food: locationToEdit.food,
                casual: locationToEdit.casual,
                fancy: locationToEdit.fancy,
                address: locationToEdit.address,
                addressdisabled: '',
                bloglink: locationToEdit.bloglink,
                vegan: locationToEdit.vegan,
                vegetarian: locationToEdit.vegetarian,
              }}
            >
              {({
                handleSubmit,
                handleChange,
                setFieldValue,
                setFieldError,
                setValues,
                validateField,
                setFieldTouched,
                touched,
                isValid,
                values,
                errors,
              }) => {
                return (
                  <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                    <Modal.Body>
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          required
                          size="sm"
                          type="text"
                          name="name"
                          value={values.name || ''}
                          onChange={handleChange}
                          isInvalid={errors.name && touched.name}
                          placeholder="Enter the name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="photo1">
                        <Form.Label>Photo Url</Form.Label>
                        <Form.Control
                          required
                          size="sm"
                          type="text"
                          name="photo1"
                          value={values.photos[0].url}
                          onChange={handleChange}
                          isInvalid={!!errors.photo1 && touched.photo1}
                          placeholder="Enter the photos url"
                        />
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
                          value={values.photos[1].url}
                          onChange={handleChange}
                          isInvalid={!!errors.photo2 && touched.photo2}
                          placeholder="Enter the photos url"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the photos url
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="bloglink">
                        <Form.Label>Blog Link</Form.Label>
                        <Form.Control
                          required
                          size="sm"
                          type="text"
                          name="bloglink"
                          value={
                            values.bloglink ? values.bloglink : 'https://www.'
                          }
                          onChange={(e) => {
                            handleChange(e);
                            onUrlChangeValidation(e);
                          }}
                          isInvalid={errors.bloglink && touched.bloglink}
                          placeholder="Enter the blog post url"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.bloglink}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          size="sm"
                          type="text"
                          name="description"
                          value={values.description || ''}
                          onChange={handleChange}
                          isInvalid={errors.description && touched.description}
                          placeholder="Enter the description, min 10 max 372 long pls :)"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className="locationmodal-occasion">
                        <>
                          <Form.Group
                            controlId="breakfast"
                            className="locationmodal-occasion-item"
                          >
                            <Form.Label>Breakfast</Form.Label>
                            <Form.Check
                              inline
                              required
                              type="checkbox"
                              name="breakfast"
                              checked={values.breakfast || ''}
                              onChange={() =>
                                setValues({
                                  ...values,
                                  breakfast: !values.breakfast,
                                })
                              }
                            ></Form.Check>
                          </Form.Group>
                          <Form.Group
                            controlId="brunch"
                            className="locationmodal-occasion-item"
                          >
                            <Form.Label>Brunch</Form.Label>
                            <Form.Check
                              inline
                              required
                              type="checkbox"
                              name="brunch"
                              checked={values.brunch || ''}
                              onChange={() =>
                                setValues({ ...values, brunch: !values.brunch })
                              }
                            ></Form.Check>
                          </Form.Group>
                        </>
                        <>
                          <Form.Group
                            controlId="dinner"
                            className="locationmodal-occasion-item"
                          >
                            <Form.Label>Dinner</Form.Label>
                            <Form.Check
                              inline
                              required
                              type="checkbox"
                              name="dinner"
                              checked={values.dinner || ''}
                              onChange={() =>
                                setValues({ ...values, dinner: !values.dinner })
                              }
                            ></Form.Check>
                          </Form.Group>
                          <Form.Group
                            controlId="lunch"
                            className="locationmodal-occasion-item"
                          >
                            <Form.Label>Lunch</Form.Label>
                            <Form.Check
                              inline
                              required
                              type="checkbox"
                              name="lunch"
                              checked={values.lunch || ''}
                              onChange={() =>
                                setValues({ ...values, lunch: !values.lunch })
                              }
                            ></Form.Check>
                          </Form.Group>
                          <Form.Group
                            controlId="night"
                            className="locationmodal-occasion-item"
                          >
                            <Form.Label>Night</Form.Label>
                            <Form.Check
                              inline
                              required
                              type="checkbox"
                              name="night"
                              checked={values.night || ''}
                              onChange={() =>
                                setValues({ ...values, night: !values.night })
                              }
                            ></Form.Check>
                          </Form.Group>
                          <Form.Group
                            controlId="vegan"
                            className="locationmodal-occasion-item"
                          >
                            <Form.Label>Vegan</Form.Label>
                            <Form.Check
                              inline
                              type="checkbox"
                              name="vegan"
                              checked={values.vegan || ''}
                              onChange={() =>
                                setValues({ ...values, vegan: !values.vegan })
                              }
                            ></Form.Check>
                          </Form.Group>
                          <Form.Group
                            controlId="vegetarian"
                            className="locationmodal-occasion-item"
                          >
                            <Form.Label>Vegetarian</Form.Label>
                            <Form.Check
                              inline
                              type="checkbox"
                              name="vegetarian"
                              checked={values.vegetarian || ''}
                              onChange={() =>
                                setValues({
                                  ...values,
                                  vegetarian: !values.vegetarian,
                                })
                              }
                            ></Form.Check>
                          </Form.Group>
                        </>
                        {errors.breakfast && touched.breakfast && (
                          <div
                            type="invalid"
                            className="custom-validation-text"
                          >
                            {errors.breakfast}
                          </div>
                        )}
                      </div>
                      <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          required
                          size="sm"
                          type="text"
                          name="phone"
                          value={values.phone || ''}
                          onChange={handleChange}
                          isInvalid={!!errors.phone && touched.phone}
                          placeholder="Enter the phone number"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="address">
                        <Form.Label>Location Address</Form.Label>

                        <AsyncTypeahead
                          filterBy={filterBy}
                          id="adress_typeahead"
                          isLoading={isLoading}
                          labelKey={(option) => `${option.display_name}`}
                          minLength={2}
                          onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                              const dropDown =
                                document.getElementById('adress_typeahead');
                              const selectedOption =
                                dropDown.querySelector('.active');
                              const data = selectedOption.children[0].dataset;
                              addressSelectOption(
                                data,
                                validateField,
                                setFieldValue,
                              );
                            } else {
                              return;
                            }
                          }}
                          name="asynctypeahead"
                          onSearch={handleSearch}
                          onInputChange={() => {}}
                          options={options}
                          inputProps={{ autoComplete: 'new-password' }}
                          placeholder="Search for the address..."
                          renderMenuItemChildren={(option, index) => {
                            return (
                              <Fragment key={index}>
                                <span
                                  onClick={() => {
                                    addressSelectOption(
                                      option,
                                      validateField,
                                      setFieldValue,
                                    );
                                  }}
                                  data-latitude={option.lat}
                                  data-longitude={option.lon}
                                  data-city={option.address.state}
                                  data-street={option.address.road}
                                  data-house_number={
                                    option.address.house_number
                                  }
                                  data-postcode={option.address.postcode}
                                  data-country={option.address.country_code}
                                  data-nominatim_data={
                                    option.address.display_name
                                  }
                                >
                                  {option.display_name}
                                </span>
                              </Fragment>
                            );
                          }}
                        />

                        <Form.Control
                          style={{
                            marginTop: '5px',
                            pointerEvents: 'none',
                            backgroundColor: 'lightgrey',
                          }}
                          size="sm"
                          placeholder="..."
                          type="text"
                          isInvalid={
                            !!errors.house_number && touched.house_number
                          }
                          name="house_number"
                          value={addressValue !== undefined ? addressValue : ''}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.house_number}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="food">
                        <Form.Label>Choose Cuisine</Form.Label>
                        <Form.Control
                          as="select"
                          size="sm"
                          required
                          name="food"
                          value={values.food || ''}
                          onChange={handleChange}
                          isInvalid={!!errors.food && touched.food}
                        >
                          <option hidden value="">
                            Choose the cuisine
                          </option>
                          <option>African</option>
                          <option>American</option>
                          <option>Asian</option>
                          <option>Arabic</option>
                          <option>European</option>
                          <option>Other</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.food}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className="locationform-casual-fancy-container">
                        <div className="casual-fancy-wrapper">
                          <Form.Group
                            controlId="casual"
                            className="locationmodal-occasion-item"
                          >
                            <Form.Label>Casual</Form.Label>
                            <Form.Check
                              inline
                              required
                              type="checkbox"
                              // feedback="Choose at least one :)"
                              name="casual"
                              isInvalid={!!errors.casual && touched.casual}
                              checked={values.casual || ''}
                              onChange={() =>
                                setValues({ ...values, casual: !values.casual })
                              }
                            ></Form.Check>
                          </Form.Group>
                          <Form.Group
                            controlId="fancy"
                            style={{ width: '120px', textAlign: 'right' }}
                          >
                            <Form.Label>Fancy</Form.Label>
                            <Form.Check
                              inline
                              required
                              style={{ marginLeft: '1px' }}
                              type="checkbox"
                              name="fancy"
                              isInvalid={errors.fancy && touched.fancy}
                              checked={values.fancy || ''}
                              onChange={() =>
                                setValues({ ...values, fancy: !values.fancy })
                              }
                            ></Form.Check>
                          </Form.Group>
                        </div>
                        {errors.casual && touched.casual && (
                          <div
                            type="invalid"
                            className="custom-validation-text"
                          >
                            {errors.casual}
                          </div>
                        )}
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="modalFooter">
                      <Button
                        variant="outline-success"
                        type="submit"
                        onClick={() => {
                          if (addressIsValid === 'null') {
                            setAddressIsValid(false);
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={onCancel}
                        className="ml-2"
                      >
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Form>
                );
              }}
            </Formik>
          </Modal>
        </>
      )}
    </>
  );
};

export default LocationModal;
