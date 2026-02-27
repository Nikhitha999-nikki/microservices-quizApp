import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import Home from './components/Home'
import CreateQuiz from './components/CreateQuiz'
import TakeQuiz from './components/TakeQuiz'
import Result from './components/Result'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastProvider } from './ToastContext'

export default function App(){
  return (
    <ToastProvider>
      <div>
        <AppNavbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
            <Route path="/quiz/:id" element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />
            <Route path="/result/:id" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </ToastProvider>
  )
}
