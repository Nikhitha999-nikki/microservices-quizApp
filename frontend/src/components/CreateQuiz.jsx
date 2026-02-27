import React, { useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { createQuiz, getCategoryCounts } from '../api'
import { useContext } from 'react'
import ToastContext from '../ToastContext'
import { useNavigate } from 'react-router-dom'

export default function CreateQuiz(){
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [numQuestions, setNumQuestions] = useState(5)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toastCtx = useContext(ToastContext)

  useEffect(() => {
    let active = true
    getCategoryCounts()
      .then((data) => {
        if (!active) return
        const entries = Object.entries(data || {})
          .map(([name, count]) => ({ name, count: Number(count) || 0 }))
          .filter((x) => x.name && x.count > 0)
          .sort((a, b) => a.name.localeCompare(b.name))
        setCategories(entries)
        if (entries.length > 0) {
          setCategory(entries[0].name)
        }
      })
      .catch(() => {
        if (!active) return
        setCategories([])
        setCategory('')
      })
    return () => { active = false }
  }, [])

  async function handleCreate(e){
    e.preventDefault()
    const cleanTitle = title.trim()
    if(!cleanTitle){
      alert('Please enter a quiz title')
      return
    }
    if(numQuestions < 1 || numQuestions > 20){
      alert('Number of questions must be between 1 and 20')
      return
    }
    if(!category){
      alert('No category available')
      return
    }
    setLoading(true)
    try{
      // send QuizDto expected by quiz-service
      const quizDto = { categoryName: category, numQuestions: numQuestions, title: cleanTitle }
      const quizId = await createQuiz(quizDto)
      // persist created quiz metadata locally for user to find later
      const stored = JSON.parse(localStorage.getItem('createdQuizzes') || '[]')
      stored.unshift({ id: quizId, title: cleanTitle, numQuestions })
      localStorage.setItem('createdQuizzes', JSON.stringify(stored.slice(0,20)))
      // show toast
      toastCtx.show('Quiz created successfully')
      navigate(`/quiz/${quizId}`)
    }catch(err){
      console.error(err)
      const status = err?.response?.status
      if (status === 400) {
        alert('Failed to create quiz: no questions found for the selected category.')
      } else {
        alert('Failed to create quiz')
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <Card className="p-4 card-quiz">
      <h5>Create Quiz</h5>
      <p className="muted-small">Generate a quiz from available questions and save it to the quiz-service.</p>
      <Form onSubmit={handleCreate} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="e.g. JavaScript Basics" value={title} onChange={e=>setTitle(e.target.value)} required />
        </Form.Group>
        <div className="d-flex">
          <div className="me-3" style={{flex:1}}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={category} onChange={e=>setCategory(e.target.value)}>
                {categories.length === 0 && <option value="">No categories</option>}
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>{c.name} ({c.count})</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div style={{width:160}}>
            <Form.Group className="mb-3">
              <Form.Label>Number</Form.Label>
              <Form.Control type="number" value={numQuestions} onChange={e=>setNumQuestions(Number(e.target.value))} min={1} max={20} />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex">
          <Button type="submit" disabled={loading} className="btn-gradient">Create</Button>
          <Button variant="outline-secondary" className="ms-2 btn-outline-custom" onClick={()=>{
            const g = sessionStorage.getItem('generatedQuestions')
            if(g){
              const parsed = JSON.parse(g)
              setNumQuestions(parsed.length)
              alert('Loaded generated questions into the form. Click Create to save.')
            } else alert('No generated questions in session')
          }}>Load Generated</Button>
        </div>
      </Form>
    </Card>
  )
}
