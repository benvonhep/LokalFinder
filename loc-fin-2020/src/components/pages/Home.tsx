import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { SignupButton } from '../layout';
import './Home.scss';

export default function Home(): JSX.Element {
  const { isAuthenticated } = useAuth0()
  const { isLoading } = useAuth0();
  return (
    <div className="home-class">
      <p className="aboutText shadow-lg">Welcome to Restaurant Finder,
      here you can find new places to eat
      </p>
      <Button variant="outline-warning" href="/list" className="homeActionButton shadow-lg">
        Go to List
      </Button>
      <br />
      {isLoading ? '' :

        <>
          {!isAuthenticated &&
            <SignupButton />
          }
        </>
      }

    </div>
  )
}