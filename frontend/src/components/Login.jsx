import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from || '/'

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await login(username.trim(), password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      const status = err?.response?.status
      if (status === 401) alert('Invalid username or password')
      else alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4 card-quiz" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h5>Login</h5>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <div className="d-flex align-items-center">
          <Button type="submit" disabled={loading} className="btn-gradient">Login</Button>
          <span className="ms-3 small-muted">
            New user? <Link to="/register">Register</Link>
          </span>
        </div>
      </Form>
    </Card>
  )
}
