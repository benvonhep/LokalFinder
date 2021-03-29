import React,{useEffect} from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

import './FilterModal.scss'

const  FilterModal = (props)=> {

  const { setActiveFilter, activeFilter, testlog, onHide, ...rest} = props

  const onCancel = () => {
    onHide()
    // dispatch(resetLocation())
  }
//   useEffect(() => {
//     console.log(props.activeFilter, 'ACTIVE');
//
//   }, [props.activeFilter])

  const tets = () => {
    console.log('filtermodal change tets');
  }

  const onChange = (text) => (event) => {
    console.log(text, 'sth changed');
    setActiveFilter((prev) => ({
      ...prev,
      [text]: event.target.checked
    }) )
  }

  const allCategories =
  [
    'breakfast',
    'lunch',
    'dinner',
    'brunch',
    'african',
    'american',
    'asian',
    'arabic',
    'european',
    'other',
    'casual',
    'fancy'
  ]


  return (

      <Modal
        {...rest}
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
            {activeFilter ? <> Filter {testlog}{activeFilter}</> : <div>loading...</div>}
            <Button onClick={() => {console.log(activeFilter, 'bkabka'); tets()}}>Tets</Button>
          </Modal.Title>
          <Button size="sm" variant="outline-secondary" onClick={onCancel}>Close</Button>
        </Modal.Header>
        <Modal.Body>

          {allCategories.sort().map((text) => (
            <Form.Check
            key={text}
          type='checkbox'
          id={text}

          label={text}
          onClick={onChange(text)}
        />

              ))}

        </Modal.Body>
      </Modal>

  )
}
export default FilterModal;