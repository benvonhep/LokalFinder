import React from 'react'
import { useSelector } from 'react-redux';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './List.scss';
// import ILocation from '../interfaces/ILocation'

function List() {
  const locations = useSelector(state => state.locations)
  const loading = useSelector(state => state.loading)

  return (
    <div>
      <CardGroup className="app-card-list">
        <Row className="d-flex justify-content-center cardRow">
          {loading &&
            <p>it's loading ...---...</p>
          }
          {!loading &&
            <>
              {locations.locations.map((location) => (

                <Col xs={true} sm={true} lg={true} key={location.id} className="cardColumninRow" >
                  <Card className="card">
                    <Card.Img className="card-image" variant="top" src={location.photo} />
                    <Card.Body className="card-body">
                      <Card.Title>{location.name}</Card.Title>
                      <Card.Text className="body-content">
                        {location.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{location.street}, {location.city}</small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </>
          }
        </Row>
      </CardGroup>
    </div>
  )
}

export default List;
