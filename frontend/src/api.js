import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8765'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
})

const TOKEN_KEY = 'authToken'
const USER_KEY = 'authUser'

export function getAuthToken(){
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function isAuthenticated(){
  return Boolean(getAuthToken())
}

export function logout(){
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getAuthUser(){
  return localStorage.getItem(USER_KEY) || ''
}

api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function register(username, password){
  const res = await api.post('/quiz/auth/register', { username, password })
  if (res.data?.token) {
    localStorage.setItem(TOKEN_KEY, res.data.token)
    localStorage.setItem(USER_KEY, res.data.username || username)
  }
  return res.data
}

export async function login(username, password){
  const res = await api.post('/quiz/auth/login', { username, password })
  if (res.data?.token) {
    localStorage.setItem(TOKEN_KEY, res.data.token)
    localStorage.setItem(USER_KEY, res.data.username || username)
  }
  return res.data
}

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

export async function getCategoryCounts(){
  const res = await api.get('/question/categoryCounts')
  return res.data
}

export default api
