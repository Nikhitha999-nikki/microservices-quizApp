import React, { useEffect, useState } from 'react'
import { Card, Button, Form, Spinner, ProgressBar } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { getQuiz, submitQuiz } from '../api'

export default function TakeQuiz(){
  const { id } = useParams()
  const [questions, setQuestions] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    setLoading(true)
    setLoadError('')
    // quiz-service GET /quiz/get/{id} returns list of QuestionWrapper objects
    getQuiz(id).then(data=>{
      if(Array.isArray(data)){
        setQuestions(data)
      } else if(data.questionIds){
        // fallback: if quiz object returned, try to fetch question wrappers
        // but quiz-service already provides wrappers via getQuiz
        setQuestions([])
      } else {
        setQuestions([])
      }
    }).catch(()=>{
      setQuestions([])
      setLoadError('Unable to load this quiz. Please try again.')
    }).finally(()=>setLoading(false))
  },[id])

  function handleChange(qid, value){
    setAnswers(a=>({ ...a, [qid]: value }))
  }

  async function handleSubmit(){
    setLoading(true)
    try{
      const payload = (questions || []).map(q=>({ id: q.id, response: answers[q.id] || '' }))
      const res = await submitQuiz(id, payload)
      // expect an integer score returned from quiz-service
      navigate(`/result/${id}`, { state: { result: { score: res } } })
    }catch(err){
      console.error(err)
      alert('Failed to submit')
    }finally{setLoading(false)}
  }

  if(loading || !questions) return <div className="center py-5"><Spinner animation="border" /></div>

  if(loadError){
    return (
      <Card className="p-4 card-quiz center">
        <h5>Quiz {id}</h5>
        <p className="small-muted mb-3">{loadError}</p>
        <Button className="btn-gradient" onClick={()=>navigate('/')}>Back to Home</Button>
      </Card>
    )
  }

  if(questions.length === 0){
    return (
      <Card className="p-4 card-quiz center">
        <h5>Quiz {id}</h5>
        <p className="small-muted mb-3">No questions are available for this quiz.</p>
        <Button className="btn-gradient" onClick={()=>navigate('/')}>Back to Home</Button>
      </Card>
    )
  }

  const total = questions.length
  const q = questions[current]

  return (
    <Card className="p-4 card-quiz">
      <h5>Quiz {id}</h5>
      <div className="mb-2 small-muted">Question {current+1} of {total}</div>
      <ProgressBar now={(current+1)/total*100} className="mb-3" />

      <div className="question-box mb-3">
        <div className="q-title">{q.questionTitle}</div>
        <div className="mt-2">
          {[q.option1, q.option2, q.option3, q.option4].map((opt, idx)=> (
            <Form.Check 
              key={idx}
              type="radio"
              id={`q-${q.id}-opt-${idx}`}
              name={`q-${q.id}`}
              label={opt}
              checked={answers[q.id] === opt}
              onChange={()=>handleChange(q.id, opt)}
              className="mb-2"
            />
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <div>
          <Button variant="outline-secondary" disabled={current===0} onClick={()=>setCurrent(c=>c-1)}>Previous</Button>
          <Button className="ms-2" variant="outline-secondary" disabled={current===total-1} onClick={()=>setCurrent(c=>c+1)}>Next</Button>
        </div>
        <div>
          <Button className="btn-gradient" onClick={handleSubmit}>Submit Quiz</Button>
        </div>
      </div>
    </Card>
  )
}
