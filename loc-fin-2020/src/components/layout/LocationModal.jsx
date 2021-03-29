import React, { useState, Fragment, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { addLocation, resetLocation, editLocation } from '../../store/actions/locationsAction';
import { useDispatch } from 'react-redux';
import './LocationModal.scss';
import * as Nominatim from "nominatim-browser";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { setAlert } from '../../store/actions/alertActions';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string("").min(1, 'thats probably too short ;)').max(35, 'Namelength exceeded').required('LoL :)'),
  description: yup.string().min(10,'almost enough ;)').max(440, 'oh no, thats more than 440 characters :(').required('Why should you go there?'),
  occasion: yup.string().required('When could you go?'),
  phone: yup.string().min(5, 'is it enough? ;)').max(20, 'tssss ;)').required('A phone number would be awesome :)'),
  address: yup.boolean().oneOf([true], "Impossible to find :)"),
  food: yup.string().required('What food do they offer?'),
  house_number: yup.number().required('A house number would be pretty awesome :)'),
  casual: yup.boolean().when("fancy",{
    is: false,
    then: yup.boolean().oneOf([true], "Are you sure it´s neither of the two? ;)"),
    otherwise: yup.boolean().required()
  }),
  fancy: yup.boolean(),
},
[['name', 'description', 'occasion', 'phone', 'address', 'food', 'house_number', 'casual', 'fancy']]
)

const LocationModal = (props) => {
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [addressIsValid, setAddressIsValid] = useState('null');
  const formRef = useRef();
  const [locationToEdit] = useState(props.location ? props.location : '')

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

  const onCancel = async () => {
    props.onHide()
    dispatch(resetLocation())
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
          {props.type === 'addNewLocation' && <p>Add a new post</p>}
          {props.type === 'editLocation' && <p>Edit the post</p>}
        </Modal.Title>
        <Button size="sm" variant="outline-secondary" onClick={onCancel}>Close</Button>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          try {
            const newLocation = {
              ...values,
              createdBy: props.user_id
            }
            console.log(newLocation, 'NEWLOCC');
            if(props.type === 'addNewLocation'){
              try {
                dispatch(addLocation(newLocation))
                dispatch(setAlert('Added successfully a new blogpost to the map', 'success'))
              } catch (error) {
                dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
              }
            }
            if(props.type === 'editLocation'){
              try {
                dispatch(editLocation(newLocation, newLocation.id))
                dispatch(setAlert('Edited successfully the blogpost', 'success'))
              } catch (error) {
                dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
              }
            }
            props.onHide();
            setAddressIsValid(false)
          } catch {
            dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
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
              url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
            },
            {
              id: 2,
              url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
            }],
          nominatim_data: locationToEdit.nominatim_data,
          description: locationToEdit.description,
          occasion: locationToEdit.occasion,
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
          addressdisabled: ''
        }}
        >{({
          handleSubmit,
          handleChange,
          setFieldValue,
          setFieldError,
          setValues,
          validateField,
          touched,
          isValid,
          values,
          errors
        }) => {

        return (
        <Form noValidate
        onSubmit={handleSubmit}
        >
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

                placeholder="Enter the name" />
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
                value={values.photos[1].url}
                onChange={handleChange}
                isInvalid={!!errors.photo2 && touched.photo2}
                placeholder="Enter the photos url" />
              <Form.Control.Feedback type="invalid">
                Please enter the photos url
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
                value={values.description || ''}
                onChange={handleChange}
                isInvalid={!!errors.description && touched.description}
                placeholder="Enter the description" />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="occasion">
              <Form.Label>Occasion</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                required
                name="occasion"
                value={values.occasion || ''}
                onChange={handleChange}
                isInvalid={!!errors.occasion && touched.occasion}
                >
                <option hidden value="">Choose an occasion</option>
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
                {errors.occasion}
              </Form.Control.Feedback>
            </Form.Group>
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

                placeholder="Enter the phone number" />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="addressdisabled">

              <Form.Label>Location Address</Form.Label>
              <AsyncTypeahead
                required
                isInvalid={!!addressIsValid && !!null}
                filterBy={filterBy}
                id="adress_typeahead"
                isLoading={isLoading}
                labelKey={option => `${option.display_name}`}
                minLength={2}
                name="address"
                onSearch={handleSearch}
                onInputChange={() => {
                  setAddressIsValid(false)
                  setFieldValue('currentAddress', '')
                }}
                options={options}
                placeholder="Search for the address..."
                renderMenuItemChildren={(option, index) => (
                  <Fragment key={index}>
                    <span
                      onClick={() => {
                        if(isNaN(option.address.house_number)){
                          console.log('housenumber fail');
                          setAddressIsValid(false)
                          setFieldValue('address', false)
                          // setFieldError('addressdisabled', 'Enter a valid house number')
                          setAddressIsValid(false)
                          validateField('address')
                          return
                        }
                        setFieldValue('address', true)
                        validateField('address')
                        setAddressIsValid(true)
                        if(
                          option.lat &&
                          option.lon &&
                          option.address.city &&
                          option.address.road &&
                          option.address.house_number &&
                          option.address.postcode &&
                          option.address.country_code)
                            {setAddressIsValid(true)}
                          else
                          {
                            setAddressIsValid(false)
                            setFieldValue('address', true)}
                            setFieldValue('latitude', parseFloat(option.lat))
                            setFieldValue('longitude', parseFloat(option.lon))
                            setFieldValue('city', option.address.city)
                            setFieldValue('street', option.address.road)
                            setFieldValue('house_number', parseFloat(option.address.house_number))
                            setFieldValue('postcode', option.address.postcode)
                            setFieldValue('country', option.address.country_code)
                            setFieldValue('nominatim_data', option.address.display_name)
                            setFieldValue('address', true)
                        }}>{option.display_name}</span>
                  </Fragment>

                )}
              />
              <Form.Control
                required
                disabled
                size="sm"
                placeholder=""
                type="text"
                isInvalid={!addressIsValid}
                name="currentAddress"
                value={values.street ?
                  values.street + ' ' +
                  values.house_number + ', ' +
                  values.postcode  + ', ' +
                  values.city : ''
                }
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
                <option hidden value="">Choose the cuisine</option>
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
              <div style={{'display': 'flex', 'justifyContent': 'center', 'flexDirection': 'row'}}>
                <Form.Group controlId="casual" style={{'width': '265px'}}>
                  <Form.Label>Casual</Form.Label>
                  <Form.Check
                    inline
                    required
                    type="checkbox"
                    feedback="Choose at least one :)"
                    name="casual"
                    isInvalid={!!errors.casual && touched.casual}
                    checked={values.casual || ''}
                    onChange={() => setValues({ ...values, casual: !values.casual })}
                    >
                  </Form.Check>
                <Form.Control.Feedback type="invalid" style={{'width': '300px'}}>
                {errors.casual}
              </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="fancy" style={{'width': '100px', 'height': '30px'}}>
                  <Form.Label>Fancy</Form.Label>
                  <Form.Check
                    inline
                    required
                    style={{marginLeft: '1px'}}

                    type="checkbox"
                    name="fancy"
                  isInvalid={!!errors.fancy && touched.fancy}
                    checked={values.fancy || ''}
                    onChange={() => setValues({ ...values, fancy: !values.fancy })}
                    >
                  </Form.Check>

                </Form.Group>
              </div>
          </Modal.Body>
          <Modal.Footer className="modalFooter">
            <Button variant="outline-success" type="submit" onClick={() => {
              if(addressIsValid === 'null'){
                setAddressIsValid(false)
              }
            }}>
              Save
            </Button>
            <Button variant="outline-secondary" type="button" onClick={onCancel} className="ml-2">
              Cancel
            </Button>
          </Modal.Footer>
        </Form >)
        }}
      </Formik>
    </Modal >
  );
}

export default LocationModal;