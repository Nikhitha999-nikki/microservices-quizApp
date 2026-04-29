import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Result() {
  const loc = useLocation()
  const navigate = useNavigate()
 const data = loc.state?.result || { score: 'N/A', answers: [] }
  }

  const score = typeof data.score === 'number' ? data.score : null
  const isPassed = score !== null && score >= 60
  const isNA = score === null

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '20px', position: 'relative', overflow: 'hidden'
    }}>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes scorePopup {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .result-card { animation: slideIn 0.6s ease forwards; }
        .score-circle { animation: scorePopup 0.8s ease forwards; }
        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99,102,241,0.5) !important;
        }
        .answer-item:hover {
          background: rgba(255,255,255,0.08) !important;
        }
      `}</style>

      {['🎯', '⭐', '🧠', '💡', '🏆', '❓'].map((emoji, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${10 + i * 15}%`,
          left: i % 2 === 0 ? `${3 + i}%` : undefined,
          right: i % 2 !== 0 ? `${3 + i}%` : undefined,
          fontSize: 48, opacity: 0.2,
          animation: `float 3s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
          pointerEvents: 'none'
        }}>{emoji}</div>
      ))}

      <div className="result-card" style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px', padding: '44px 40px',
        width: '100%', maxWidth: '580px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        textAlign: 'center', marginBottom: '24px'
      }}>

        <div style={{ fontSize: '60px', marginBottom: '16px' }}>
          {isNA ? '📊' : isPassed ? '🏆' : '💪'}
        </div>

        <h4 style={{ color: 'white', fontWeight: '800', fontSize: '28px', marginBottom: '8px' }}>
          {isNA ? 'Quiz Complete!' : isPassed ? 'Excellent Work!' : 'Keep Practicing!'}
        </h4>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '28px' }}>
          {isNA ? 'Your result is ready' : isPassed ? 'You passed the quiz! 🎉' : 'You can do better next time!'}
        </p>

        <div className="score-circle" style={{
          width: '180px', height: '180px',
          borderRadius: '50%',
          background: isNA
            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
            : isPassed
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : 'linear-gradient(135deg, #ef4444, #dc2626)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: isNA
            ? '0 0 40px rgba(99,102,241,0.4)'
            : isPassed
              ? '0 0 40px rgba(34,197,94,0.4)'
              : '0 0 40px rgba(239,68,68,0.4)'
        }}>
          <div style={{ fontSize: '48px', fontWeight: '800', color: 'white', lineHeight: 1 }}>
            {data.score}
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginTop: '6px' }}>
            YOUR SCORE
          </div>
        </div>

        {!isNA && (
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            borderRadius: '20px',
            background: isPassed ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
            border: `1px solid ${isPassed ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`,
            color: isPassed ? '#4ade80' : '#f87171',
            fontSize: '14px', fontWeight: '700',
            marginBottom: '28px'
          }}>
            {isPassed ? '✅ PASSED' : '❌ FAILED'}
          </div>
        )}

        <button className="back-btn" onClick={() => navigate('/')}
          style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: '700', cursor: 'pointer',
            transition: 'all 0.2s', letterSpacing: '0.5px'
          }}>
          🏠 Back to Home
        </button>
      </div>

      {data.answers && data.answers.length > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px', padding: '32px',
          width: '100%', maxWidth: '580px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
          animation: 'slideIn 0.8s ease forwards'
        }}>
          <h6 style={{ color: 'white', fontWeight: '700', fontSize: '20px', marginBottom: '20px' }}>
            📝 Your Answers
          </h6>
          {data.answers.map((a) => (
            <div key={a.id} className="answer-item" style={{
              padding: '14px 18px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '10px', transition: 'all 0.2s',
              textAlign: 'left'
            }}>
              <span style={{ color: '#818cf8', fontWeight: '700', fontSize: '14px' }}>
                Q{a.id}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginLeft: '12px' }}>
                {a.response || '(no answer)'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}