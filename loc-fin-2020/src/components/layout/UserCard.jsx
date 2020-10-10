import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { MdKeyboardArrowUp } from 'react-icons/md';
import './UserCard.scss';


export default function UserCard(props) {
  const loading = useSelector(state => state.loading)
  const [open, setOpen] = useState(false)

  return (
    <div>
      {loading &&
        <h1>loading ....</h1>
      }
      {props.user &&

        <Card className="user-card shadow-lg rounded">
          <div>
            <Card.Img
              className={`${open ?
                'user-card-image user-image-hide' :
                'user-card-image d-block w-100'
                }`}
              variant="top"
              src={props.user.photo}
              alt="sorry - there should be a photo here">
            </Card.Img>
          </div>
          <div className={`${open ? 'user-card-slider-open' : 'user-card-slider-closed'}`} >

            <Card.Title
              className="user-card-title"
              onClick={() => { setOpen(!open) }}>
              <div className="user-card-user-name">{props.user.username}</div>
              <MdKeyboardArrowUp className={`${open ? 'user-card-arrow-open' : 'user-card-arrow-closed'}`} />

            </Card.Title>
            <div className={`${open ? 'user-card-info-collapse-open' : 'user-card-info-collapse-closed'}`}>

              <div className="user-card-body">
                <p className="user-card-text">{props.user.description}</p>
              </div>
              <Card.Footer className="user-card-footer">
                <div className="user-card-details">
                  <span>{props.user.city}</span>
                </div>

              </Card.Footer>
            </div>
          </div>
        </Card>
      }
    </div>
  )
}
