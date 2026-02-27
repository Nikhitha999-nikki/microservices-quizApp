import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function QuizList(){
  const rawItems = JSON.parse(localStorage.getItem('createdQuizzes') || '[]')
  const seen = new Set()
  const items = rawItems.filter((q) => {
    const id = String(q?.id ?? '')
    if (!id || seen.has(id)) return false
    seen.add(id)
    return true
  })

  if(items.length === 0) return (
    <Card className="p-3 mb-3 card-quiz">
      <div className="center">No created quizzes yet. Create one to get started.</div>
    </Card>
  )

  return (
    <div className="mb-3">
      <h5>Your Quizzes</h5>
      {items.map((q, idx)=> (
        <Card key={`${q.id}-${idx}`} className="p-3 mb-2 card-quiz">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div style={{ fontWeight: 700 }}>{q.title || `Quiz ${q.id}`}</div>
              <div className="muted-small">ID: {q.id} | {q.numQuestions || 'N/A'} questions</div>
            </div>
            <div>
              <Button as={Link} to={`/quiz/${q.id}`} className="btn-gradient">Take Quiz</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
