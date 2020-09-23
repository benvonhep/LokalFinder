import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetLocation } from '../../store/actions/locationsAction';
import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import './MapLocationModal.scss'

export default function MapLocationModal(props) {
  const loading = useSelector(state => state.loading)
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
      {!loading &&
        <Card className="card shadow-lg rounded">
          <Card.Img className="card-image" variant="top" src='https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80' />
          <Card.Body className="card-body">
            <Card.Title>name</Card.Title>
            <Card.Text className="body-content">
              descr
            </Card.Text>
          </Card.Body>
          <Card.Footer className="footer">
            <small className="address">street and city</small>
            <div className="buttonGroup">
              <Button size="sm" variant="outline-info" onClick={() => onCancel()}>Close</Button>
            </div>
          </Card.Footer>
        </Card>
      }
    </Modal>
  )
}
