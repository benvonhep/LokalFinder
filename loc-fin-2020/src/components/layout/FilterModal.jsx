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

  const onChange = (filteritem) => (event) => {
    console.log(filteritem, 'sth changed');
    // console.log(filteritem.id, 'sth changed');
    setActiveFilter((prev) => ({
      ...prev,
      [filteritem]: event.target.checked
    }) )
  }

//   const allCategories =[
//
//     { name: 'breakfast', id: 0 },
//     { name: 'lunch', id: 1 },
//     { name: 'dinner', id: 2 },
//
//
//     // 'brunch',
//     // 'african',
//     // 'american',
//     // 'asian',
//     // 'arabic',
//     // 'european',
//     // 'other',
//     // 'casual',
//     // 'fancy'
//
// ]

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
// console.log(allCategories, 'ALLLL')
// console.log(typeof allCategories, 'TYPE');

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
            {activeFilter ? <> Filter {testlog}</> : <div>loading...</div>}
            <Button onClick={() => {console.log(activeFilter, 'bkabka'); tets()}}>Tets</Button>
          </Modal.Title>
          <Button size="sm" variant="outline-secondary" onClick={onCancel}>Close</Button>
        </Modal.Header>
        <Modal.Body>

          {allCategories && Array.from(allCategories).map((i) => (
            <Form.Check
            key={i}
            type='checkbox'
            // id={id}

          label={i}
          // onClick={onChange}
          onClick={onChange(i)}
        />

              ))}

        </Modal.Body>
      </Modal>

  )
}
export default FilterModal;