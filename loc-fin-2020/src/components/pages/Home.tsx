import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import './Home.scss';

export default function Home(): JSX.Element {
  return (
    <div className="home-class">
      <p className="aboutText shadow-lg">Welcome to Restaurant Finder,
      here you can find new places to eat
      </p>
      <Button variant="outline-success" href="/list" className="homeActionButton shadow-lg">
        Go to List
      </Button>
    </div>
  )
}