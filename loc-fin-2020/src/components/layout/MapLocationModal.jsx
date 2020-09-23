import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetLocation } from '../../store/actions/locationsAction';
import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import './MapLocationModal.scss'

export default function MapLocationModal(props) {
  const loading = useSelector(state => state.loading)
  // const location = useSelector(state => state.location)
  const dispatch = useDispatch();

  const onCancel = async () => {
    props.onHide()
    dispatch(resetLocation())
  }



  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      {loading &&
        <h1>loading ....</h1>
      }
      {props.location &&
        <Card className="card shadow-lg rounded">
          <Card.Img className="card-image" variant="top" src={props.location.photo} />
          <Card.Body className="card-body">
            <Card.Title>{props.location.name}</Card.Title>
            <Card.Text className="body-content">
              {props.location.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="footer">
            <small className="address">{props.location.address, props.location.city}</small>
            <div className="buttonGroup">
              <Button size="sm" variant="outline-info" onClick={() => onCancel()}>Close</Button>
            </div>
          </Card.Footer>
        </Card>
      }
    </Modal>
  )
}
