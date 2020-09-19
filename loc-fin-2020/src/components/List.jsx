import axios, { AxiosResponse } from 'axios';
import React, { Component } from 'react'
import { useSelector } from 'react-redux';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux'
import { getLocations } from '../store/actions/locationsAction'
import ILocation from '../interfaces/ILocation'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


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

// class locations extends Component {
//   componentDidMount() {
//     this.props.getLocations()
//   }
//   render() {
//     const { locations, loading } = this.props.locations
//     console.log(this.props.locations)
//
//     return (
//       <div>
//         <CardGroup className="app-card-list">
//           <Row className="d-flex justify-content-center cardRow">
//             {loading &&
//               <p>it's loading ...---...</p>
//             }
//             {!loading &&
//               <>
//                 {locations.map((location) => (
//
//                   <Col xs={true} sm={true} lg={true} key={location.id} className="cardColumninRow" >
//                     <Card className="card">
//                       <Card.Img className="card-image" variant="top" src={location.photo} />
//                       <Card.Body className="card-body">
//                         <Card.Title>{location.name}</Card.Title>
//                         <Card.Text className="body-content">
//                           {location.description}
//                         </Card.Text>
//                       </Card.Body>
//                       <Card.Footer>
//                         <small className="text-muted">{location.street}, {location.city}</small>
//                       </Card.Footer>
//                     </Card>
//                   </Col>
//
//                 ))}
//               </>
//             }
//           </Row>
//         </CardGroup>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => ({ locations: state.locations })
//
// export default connect(mapStateToProps, { getLocations })(locations)



// export default (): JSX.Element => {
//   // const [locations, loading] = useApiService('/locations')
//   // const [locations, setLocations] = useState([])
//   // const [loading, setLoading] = useState(false)
//
//   useEffect(() => {
//     this.props.getLocations()
//   }, [])
//
//   return (
//
//     <div>
//       <CardGroup className="app-card-list">
//         <Row>
//           {loading &&
//             <p>it's loading ...---...</p>
//           }
//           {!loading &&
//             <>
//               {locations.map((location: ILocation) => (
//
//                 <Col xs={true} sm={true} lg={true} key={location.id} className="cardColumninRow" >
//                   <Card className="card">
//                     <Card.Img variant="top" src={location.photo} />
//                     <Card.Body className="card-body">
//                       <Card.Title>{location.name}</Card.Title>
//                       <Card.Text className="body-content">
//                         {location.description}
//                       </Card.Text>
//                     </Card.Body>
//                     <Card.Footer>
//                       <small className="text-muted">{location.street}, {location.city}</small>
//                     </Card.Footer>
//                   </Card>
//                 </Col>
//
//               ))}
//             </>
//           }
//         </Row>
//       </CardGroup>
//     </div>
//   )
// }
