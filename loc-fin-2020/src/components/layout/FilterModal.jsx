import React,{useEffect} from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

import './FilterModal.scss'

const  FilterModal = (props)=> {

  // const { activefilter, setactivefilter, testlog} = filterValues


  const onCancel = () => {
    props.onHide()
    // dispatch(resetLocation())
  }
  useEffect(() => {
    console.log(props.activefilter, 'ACTIVE');

  }, [props.activefilter])

  const tets = () => {
    console.log('filtermodal change tets');
  }

  const onChange = () => {
    console.log('sth changed');
    props.setactivefilter('asdasd')
  }


  return (

      <Modal
        {...props}
        // activefilter={activefilter}
        // setactivefilter={setactivefilter}
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
            {props.activefilter ? <> Filter {props.testlog}{props.activefilter}</> : <div>loading...</div>}
            <Button onClick={() => {console.log(props.activefilter, 'bkabka'); tets()}}>Tets</Button>
          </Modal.Title>
          <Button size="sm" variant="outline-secondary" onClick={onCancel}>Close</Button>
        </Modal.Header>
      </Modal>

  )
}
export default FilterModal;