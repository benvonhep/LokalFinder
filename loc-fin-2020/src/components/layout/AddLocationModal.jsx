import React, { useState, Fragment, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { addLocation, resetLocation } from '../../store/actions/locationsAction';
import { useDispatch } from 'react-redux';
import './AddLocationModal.scss';
import * as Nominatim from "nominatim-browser";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { setAlert } from '../../store/actions/alertActions';
import { Formik, useFormikContext } from 'formik';
import * as yup from 'yup';

const reqdFieldMsg = 'This is a required field';
const schema = yup.object({
  name: yup.string().required(reqdFieldMsg),
  // min max limit einfügen
  description: yup.string().required(reqdFieldMsg),
  occasion: yup.string().required(reqdFieldMsg),
  phone: yup.string().required(reqdFieldMsg),
  address: yup.boolean().oneOf([true], "An address must be chosen."),
  food: yup.string().required(reqdFieldMsg),
  house_number: yup.number().required('Please choose an adress providing a house number'),
  casual: yup.boolean(),
  fancy: yup.boolean().when("casual", (casual) => {
    if(!casual) return yup.string().required("Choose at least one of the two options")
  }),
})

// const initialvalues = {
//   id: '',
//   createdBy: '',
//   name: '',
//   photos: [
//     {
//       id: 1,
//       url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
//     },
//     {
//       id: 2,
//       url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
//     }],
//   nominatim_data: '',
//   description: '',
//   occasion: '',
//   phone: '',
//   house_number: '',
//   street: '',
//   postcode: '',
//   city: '',
//   country: '',
//   latitude: '',
//   longitude: '',
//   food: '',
//   casual: true,
//   fancy: false
// }

const AddLocationModal = (props) => {
  // const [validated, setValidated] = useState(false);
  // const [formData, setFormData] = useState(initialFormData);
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [addressIsValid, setAddressIsValid] = useState();
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

  const onSubmit = async (values) => {
    // event.preventDefault();
    if(addressIsValid === null || false){
      setAddressIsValid(false)
      return;
    }
    // const form = event.currentTarget;
      // dispatch(setAlert('Please check the fields are correctly filled in', 'danger'))

    // setValidated(true);
      try {
        const newLocation = {
          values,
          createdBy: props.user_id
        }
        dispatch(addLocation(newLocation))
        // setFormData(initialFormData)
        props.onHide();
        // setValidated(false);
        // setAddressIsValid(false)
        // dispatch(setAlert('Added successfully a new blogpost to the map', 'success'))
      } catch {
        dispatch(setAlert('Oooops, something weired happened during saving', 'danger'))
      }

  }

  const onCancel = async () => {
    props.onHide()
    // setFormData(initialFormData)
    // setAddressIsValid(false)
    // dispatch(resetLocation())
  }

  const addGeodata = (option) => {
    console.log(option, 'option');
    console.log('addgetodata', formRef);
    // setValues({
    //   ...formRef,
    //   latitude: parseFloat(option.lat),
    //   longitude: parseFloat(option.lon),
    //   city: option.address.city,
    //   street: option.address.road,
    //   house_number: parseFloat(option.address.house_number),
    //   postcode: option.address.postcode,
    //   country: option.address.country_code,
    //   nominatim_data: option.display_name
    // });
    // setAddressIsValid(true)
    return
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
        onSubmit={onSubmit}
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
          casual: true,
          fancy: false,
          address: false
        }}
        >{({
          handleSubmit,
          handleChange,
          setFieldValue,
          setValues,
          touched,
          values,
          errors
        }) => {

        return (<Form noValidate onSubmit={handleSubmit}>
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
                isInvalid={errors.name}

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
                isInvalid={errors.photo1}
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
                isInvalid={errors.photo2}
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
                isInvalid={errors.description}
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
                isInvalid={errors.occasion}
                >
                <option></option>
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
                isInvalid={errors.phone}

                placeholder="Enter the phone number" />
              <Form.Control.Feedback type="invalid">
                Please enter the phone number
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Location Address</Form.Label>
              <AsyncTypeahead
                required
                isInvalid={!!errors.address}
                filterBy={filterBy}
                id="async-example"
                isLoading={isLoading}
                labelKey={option => `${option.display_name}`}
                minLength={2}
                name="address"
                onSearch={handleSearch}
                // onInputChange={() => setAddressIsValid(false)}
                options={options}
                placeholder="Search for the address..."
                renderMenuItemChildren={(option, index) => (
                  <Fragment key={index}>
                    <span
                      onClick={() => {
                        addGeodata(option)
                        setAddressIsValid(true)
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
                >
                <option></option>
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
                  onChange={handleChange}
                  checked={values.casual}
                  // onChange={() => setValues({ ...values, casual: !values.casual })}
                  >
                </Form.Check>
                <Form.Control.Feedback type="invalid">
                Please choose casualness
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="fancy">
                <Form.Label>Fancy</Form.Label>
                <Form.Check
                  inline
                  type="checkbox"
                  name="fancy"
                  onChange={handleChange}
                  checked={values.fancy}
                  // onChange={() => setValues({ ...values, fancy: !values.fancy })}
                  >
                </Form.Check>
                <Form.Control.Feedback type="invalid">
                Please choose fancyness
              </Form.Control.Feedback>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer className="modalFooter">
            <Button variant="outline-success" type="submit">
              Save
            </Button>
            <Button variant="outline-secondary" onClick={onCancel} className="ml-2">
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