import React, { useState, Fragment, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { addLocation, resetLocation } from '../../store/actions/locationsAction';
import { useDispatch } from 'react-redux';
import './AddLocationModal.scss';
import * as Nominatim from "nominatim-browser";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { setAlert } from '../../store/actions/alertActions';
import { useFormikContext, Formik, Form as Formikform, Field } from 'formik';
import * as yup from 'yup';

const reqdFieldMsg = 'This is a required field';
const schema = yup.object().shape({
  name: yup.string().required(reqdFieldMsg),
  // min max limit einfügen
  description: yup.string().required(reqdFieldMsg),
  occasion: yup.string().required(reqdFieldMsg),
  phone: yup.string().required(reqdFieldMsg),
  address: yup.boolean().oneOf([true], "An address must be chosen."),
  food: yup.string().required(reqdFieldMsg),
  house_number: yup.number().required('Please choose an adress providing a house number'),
  casual: yup.boolean().when("fancy",{
    is: false,
    then: yup.boolean().oneOf([true], "Choose at least one of the two options"),
    otherwise: yup.boolean().required()
  }),
  fancy: yup.boolean()
},
[['name', 'description', 'occasion', 'phone', 'address', 'food', 'house_number', 'casual', 'fancy']]
)

const AddLocationModal = (props) => {
  const [validated, setValidated] = useState(false);
  // const [formData, setFormData] = useState(initialFormData);
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [addressIsValid, setAddressIsValid] = useState(null);
  // const { values, submitForm } = useFormikContext();
  const formRef = useRef();

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

  // const onChange = (e) => {
  //   return setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // }

  const dispatch = useDispatch();

  const test = (event, values) => {
    event.preventDefault();
    console.log(event, 'event');
    console.log(values, 'values');

  }

  const onSubmit =  (event, values) => {
    event.preventDefault();
    console.log(formRef.current, 'FORMREF');
    console.log(values, 'values')

    // if(addressIsValid === null || false){
    //   setAddressIsValid(false)
    //   return;
    // }
    setValidated(true);
      try {
        const newLocation = {
          values,
          createdBy: props.user_id
        }
        dispatch(addLocation(newLocation))
        // setFormData(initialFormData)
        props.onHide();
        setValidated(false);
        setAddressIsValid(false)
        dispatch(setAlert('Added successfully a new blogpost to the map', 'success'))
      } catch {
        dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
      }

  }

  const onCancel = async () => {
    props.onHide()
    // setFormData(initialFormData)
    // setAddressIsValid(false)
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
          Add a new Restaurant
        </Modal.Title>
        <Button size="sm" variant="outline-secondary" onClick={onCancel}>Close</Button>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        // validateOnChange={false}
        validateOnBlur={true}
        innerRef={formRef}
        initialValues={{
          id: '',
          createdBy: '',
          name: '',
          photos: [
            {
              id: 1,
              url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
            },
            {
              id: 2,
              url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
            }],
          nominatim_data: '',
          description: '',
          occasion: '',
          phone: '',
          house_number: '',
          street: '',
          postcode: '',
          city: '',
          country: '',
          latitude: '',
          longitude: '',
          food: '',
          casual: false,
          fancy: true,
          address: false
        }}
        >{({
          handleSubmit,
          handleChange,
          setFieldValue,
          setValues,
          validateField,
          touched,
          values,
          errors
        }) => {

        return (
        <Form noValidate
          onSubmit={(e) => {
            e.preventDefault()
            console.log(values, 'VAL');
            try {
              const newLocation = {
                ...values,
                createdBy: props.user_id
              }
              console.log(newLocation, 'NEWLOCC');
              dispatch(addLocation(newLocation))
              props.onHide();
              setValidated(false);
              setAddressIsValid(false)
              dispatch(setAlert('Added successfully a new blogpost to the map', 'success'))
            } catch {
              dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
            }

        }}
        >
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                size="sm"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name && touched.name}

                placeholder="Enter the name" />
              <Form.Control.Feedback type="invalid">
                Please enter a name
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
                size="sm"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                isInvalid={!!errors.description && touched.description}
                placeholder="Enter the description" />
              <Form.Control.Feedback type="invalid">
                Please enter a description
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="occasion">
              <Form.Label>Occasion</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                required
                name="occasion"
                value={values.occasion}
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
                value={values.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone && touched.phone}

                placeholder="Enter the phone number" />
              <Form.Control.Feedback type="invalid">
                Please enter the phone number
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="address">
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
                }}
                options={options}
                placeholder="Search for the address..."
                renderMenuItemChildren={(option, index) => (
                  <Fragment key={index}>
                    <span
                      onClick={() => {
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
              {values.city &&
                <>
                  <Form.Label style={{marginTop: '15px'}}>Selected Address</Form.Label>
                    <Form.Control
                      required
                      disabled
                      size="sm"
                      type="text"
                      name="currentAddress"
                      isInvalid={!!errors.address && touched.address}
                      value={
                        values.street + ' ' +
                        values.house_number + ', ' +
                        values.postcode  + ', ' +
                        values.city
                      }
                    />
                </>
              }
              <Form.Control.Feedback type="invalid">
                Please enter an address
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="food">
              <Form.Label>Choose Cuisine</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                required
                name="food"
                value={values.food}
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
                Please enter the kind of food served
              </Form.Control.Feedback>
            </Form.Group>
              <Form.Group controlId="casual">
                <Form.Label>Casual</Form.Label>
                <Form.Check
                  inline
                  required
                  type="checkbox"
                  name="casual"
                  // onChange={handleChange}
                isInvalid={!!errors.casual && touched.casual}
                // feedbackTooltip
                feedback='Choose at least one'

                  checked={values.casual}
                  onChange={() => setValues({ ...values, casual: !values.casual })}
                  >
                </Form.Check>

              </Form.Group>
              <Form.Group controlId="fancy">
                <Form.Label>Fancy</Form.Label>
                <Form.Check
                  inline
                  required
                  style={{marginLeft: '8px'}}
                  type="checkbox"
                  name="fancy"
                  feedback='Choose at least one'
                  // onChange={handleChange}
                isInvalid={!!errors.fancy && touched.fancy}
                // isInvalid={true}
                // feedbackTooltip

                  checked={values.fancy}
                  onChange={() => setValues({ ...values, fancy: !values.fancy })}
                  >
                </Form.Check>
                {/* <Form.Control.Feedback type="invalid">
                Choose at least one
              </Form.Control.Feedback> */}
              </Form.Group>
          </Modal.Body>
          <Modal.Footer className="modalFooter">
            <Button variant="outline-success" type="submit">
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

export default AddLocationModal;