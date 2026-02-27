import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await register(username.trim(), password)
      navigate('/', { replace: true })
    } catch (err) {
      const status = err?.response?.status
      if (status === 409) alert('Username already exists')
      else alert('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4 card-quiz" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h5>Register</h5>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={4} />
        </Form.Group>
        <div className="d-flex align-items-center">
          <Button type="submit" disabled={loading} className="btn-gradient">Register</Button>
          <span className="ms-3 small-muted">
            Already user? <Link to="/login">Login</Link>
          </span>
        </div>
      </Form>
    </Card>
  )
}
