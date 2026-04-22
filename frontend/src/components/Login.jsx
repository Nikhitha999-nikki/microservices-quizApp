import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../api'

const floatingShapes = [
  { emoji: '❓', top: '10%', left: '8%', size: 32, delay: '0s' },
  { emoji: '🧠', top: '20%', right: '10%', size: 28, delay: '0.5s' },
  { emoji: '⭐', top: '70%', left: '5%', size: 24, delay: '1s' },
  { emoji: '💡', top: '80%', right: '8%', size: 28, delay: '1.5s' },
  { emoji: '🎯', top: '45%', left: '3%', size: 22, delay: '0.8s' },
  { emoji: '📝', top: '55%', right: '5%', size: 26, delay: '1.2s' },
]

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  function showToast(msg, type = 'error') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await login(username.trim(), password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      const status = err?.response?.status
      if (status === 401) showToast('Invalid username or password')
      else showToast('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', position: 'relative', overflow: 'hidden'
    }}>

      {/* Floating Shapes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
        }
        .login-card {
          animation: slideIn 0.6s ease forwards;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99,102,241,0.5) !important;
        }
        .input-field:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important;
        }
      `}</style>

      {floatingShapes.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', top: s.top, left: s.left, right: s.right,
          fontSize: s.size, opacity: 0.15,
          animation: `float 3s ease-in-out infinite`,
          animationDelay: s.delay, pointerEvents: 'none'
        }}>
          {s.emoji}
        </div>
      ))}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px',
          background: toast.type === 'error' ? '#ef4444' : '#22c55e',
          color: 'white', padding: '14px 22px', borderRadius: '12px',
          zIndex: 9999, boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          fontWeight: '600', fontSize: '14px',
          animation: 'slideIn 0.3s ease'
        }}>
          {toast.type === 'error' ? '❌ ' : '✅ '}{toast.msg}
        </div>
      )}

      {/* Card */}
      <div className="login-card" style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px', padding: '44px 40px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
      }}>

        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '70px', height: '70px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '20px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '32px',
            animation: 'pulse 2s infinite'
          }}>🧠</div>
          <h4 style={{ fontWeight: '800', color: 'white', marginBottom: '6px', fontSize: '24px' }}>
            Welcome Back!
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>
            Login to continue your quiz journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              USERNAME
            </label>
            <input
              className="input-field"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              style={{
                width: '100%', padding: '13px 16px',
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: 'white',
                fontSize: '15px', outline: 'none',
                transition: 'all 0.2s'
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="input-field"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{
                  width: '100%', padding: '13px 48px 13px 16px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: 'white',
                  fontSize: '15px', outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '14px', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', fontSize: '18px', padding: 0
                }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn"
            style={{
              width: '100%', padding: '14px',
              background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white', border: 'none', borderRadius: '12px',
              fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', letterSpacing: '0.5px'
            }}>
            {loading ? '⏳ Logging in...' : '🚀 Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '22px', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
          New user?{' '}
          <Link to="/register" style={{ color: '#818cf8', fontWeight: '700', textDecoration: 'none' }}>
            Register here →
          </Link>
        </p>
      </div>
    </div>
  )
}