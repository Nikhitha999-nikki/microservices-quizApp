import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { fetchAllQuestions, generateQuestions } from '../api'
import QuizList from './QuizList'

export default function Home(){
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setLoading(true)
    fetchAllQuestions().then(data=>{
      setQuestions(data)
    }).catch(()=>{}).finally(()=>setLoading(false))
  },[])

  async function handleQuickQuiz(){
    setLoading(true)
    try{
      const generated = await generateQuestions('general', 5)
      // create quiz via API will be in CreateQuiz flow; navigate to TakeQuiz using generated id if backend supports it
      // For now store in sessionStorage then navigate to create flow
      sessionStorage.setItem('generatedQuestions', JSON.stringify(generated))
      navigate('/create')
    }finally{setLoading(false)}
  }

  return (
    <div>
      <QuizList />
      <Row className="mb-4">
        <Col>
          <Card className="p-3 card-quiz hero">
            <h4>Welcome to Quiz App</h4>
            <p className="small-muted">Try a quick 5-question quiz or create a custom quiz.</p>
            <div className="mt-3">
              <Button onClick={handleQuickQuiz} disabled={loading} className="btn-gradient">Start Quick Quiz</Button>
              <Button variant="outline-secondary" className="ms-2 btn-outline-custom" as={Link} to="/create">Create Custom Quiz</Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        {questions.map((q)=> (
          <Col key={q.id} md={6} className="mb-3">
            <Card className="p-3 card-quiz">
              <h6 className="mb-1">{q.category}</h6>
              <div className="text-muted small">{q.question}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
