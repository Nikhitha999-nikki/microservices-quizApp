import React, { createContext, useState, useCallback } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

export const ToastContext = createContext({ show: (msg)=>{} })

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, variant='primary')=>{
    const id = Date.now()
    setToasts(t=>[...t, { id, message, variant }])
    setTimeout(()=> setToasts(t=>t.filter(x=>x.id!==id)), 3500)
  },[])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {toasts.map(t=> (
          <Toast key={t.id} bg="light">
            <Toast.Body>{t.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

export default ToastContext
