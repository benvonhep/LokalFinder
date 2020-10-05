import React, { useEffect, useState, useCallback } from 'react';
import './UserCard.scss';


export default function UserCard(props) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      ... Hi im a list of user ...
      <p>{props.user.name}</p>
    </div>
  )
}
