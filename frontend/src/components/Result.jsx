import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Result(){
  const loc = useLocation()
  const navigate = useNavigate()
  const data = loc.state?.result || { score: 'N/A', answers: [] }

  return (
    <div>
      <Card className="p-4 card-quiz center mb-3">
        <h5>Result</h5>
        <div className="my-3">
          <div className="big-score">{data.score}</div>
          <div className="small-muted">Your quiz score</div>
        </div>
        <Button onClick={()=>navigate('/')} className="btn-gradient">Back to Home</Button>
      </Card>

      {data.answers && data.answers.length>0 && (
        <Card className="p-3 card-quiz">
          <h6>Your Answers</h6>
          <ul>
            {data.answers.map(a=> (
              <li key={a.id}><strong>Q{a.id}:</strong> {a.response || '(no answer)'}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
