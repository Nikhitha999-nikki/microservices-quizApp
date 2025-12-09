import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8765'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
})

export async function fetchAllQuestions(){
  const res = await api.get('/question/allQuestions')
  return res.data
}

export async function generateQuestions(categoryName, numQuestions){
  const res = await api.get('/question/generate', { params: { categoryName, numQuestions }})
  return res.data
}

export async function createQuiz(quizDto){
  const res = await api.post('/quiz/create', quizDto)
  return res.data
}

export async function getQuiz(id){
  const res = await api.get(`/quiz/get/${id}`)
  return res.data
}

export async function submitQuiz(id, answers){
  // answers: array of { id: number, response: string }
  const res = await api.post(`/quiz/submit/${id}`, answers)
  return res.data
}

export async function getQuestionsByIds(ids){
  const res = await api.post('/question/getQuestions', ids)
  return res.data
}

export default api
