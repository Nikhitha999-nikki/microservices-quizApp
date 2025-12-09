import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import Home from './components/Home'
import CreateQuiz from './components/CreateQuiz'
import TakeQuiz from './components/TakeQuiz'
import Result from './components/Result'
import { ToastProvider } from './ToastContext'

export default function App(){
  return (
    <ToastProvider>
      <div>
        <AppNavbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateQuiz />} />
            <Route path="/quiz/:id" element={<TakeQuiz />} />
            <Route path="/result/:id" element={<Result />} />
          </Routes>
        </div>
      </div>
    </ToastProvider>
  )
}
