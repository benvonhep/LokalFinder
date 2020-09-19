import React, { Fragment } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'


export default function Home() {
  return (
    // <Container fluid className>

    <div className="home-class">
      <p className="aboutText">Welcome to Restaurant Finder,
      here you can find new places to eat
      </p>
      <Button variant="outline-success" href="/list" className="homeActionButton">
        Go to List
      </Button>
    </div>
    // </Container>
  )
}
