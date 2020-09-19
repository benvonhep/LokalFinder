import React, { Fragment } from 'react'
import Button from 'react-bootstrap/esm/Button'

export default function Home() {
  return (
    <div className="home-class">
      <p className="aboutText">Welcome to Restaurant Finder,
      here you can find new places to eat
      </p>
      <Button variant="outline-success" href="/list" className="homeActionButton">
        Go to List
      </Button>
    </div>
  )
}
