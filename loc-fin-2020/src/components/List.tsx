import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
// import useApiService from '../hooks/apiService';
import ILocation from '../interfaces/ILocation'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';




export default (): JSX.Element => {
  // const [locations, loading] = useApiService('/locations')
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/locations'
    }).then(res => {
      setLocations(res.data)
      setLoading(false)
    })
    return () => {
      console.log('cleaned up');

    }
  }, [setLocations])

  return (

    <div>
      <CardGroup className="app-card-list">
        <Row>
          {loading &&
            <p>it's loading ...---...</p>
          }
          {!loading &&
            <>
              {locations.map((location: ILocation) => (

                <Col xs={true} sm={true} lg={true} key={location.id} className="cardColumninRow" >
                  <Card className="card">
                    <Card.Img variant="top" src={location.photo} />
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
