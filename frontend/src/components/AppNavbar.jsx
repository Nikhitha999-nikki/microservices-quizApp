import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthUser, isAuthenticated, logout } from '../api'

export default function AppNavbar(){
  const navigate = useNavigate()
  const loggedIn = isAuthenticated()
  const username = getAuthUser()

  function handleLogout(){
    logout()
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="shadow-sm navbar-custom py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">Quiz App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loggedIn && <Nav.Link as={Link} to="/">Home</Nav.Link>}
            {loggedIn && <Nav.Link as={Link} to="/create">Create Quiz</Nav.Link>}
          </Nav>
          <Nav>
            {!loggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
            {!loggedIn && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
            {loggedIn && <Navbar.Text className="me-3 small-muted">Hi, {username}</Navbar.Text>}
            {loggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
