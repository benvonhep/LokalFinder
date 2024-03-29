import React from 'react'
import UserCard from '../layout/UserCard'
import { useSelector } from 'react-redux';

import './UserList.scss'
import { Spinner } from '../layout';

export default function UserList() {
  const loading = useSelector(state => state.loading)
  const users = useSelector(state => state.users)


  return (
    <div className="card-grid-container">

      {loading &&
        <Spinner />
      }
      {!loading &&
        <div className="user-card-grid">
          {users.users.map((user) => (
            <div className="card-Grid-Item" key={user.id}>
              <UserCard
                user={user} />


            </div>
          ))}
        </div>
      }

    </div>
  )
}
