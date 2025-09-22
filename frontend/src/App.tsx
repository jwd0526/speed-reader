// src/App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Reader from './pages/Reader'

function App() {
  return (
    <div className="App w-full h-full">
      <Routes>
        <Route path="/" element={<Reader />} />
        <Route path="/reader/:documentId?" element={<Reader />} />
      </Routes>
    </div>
  )
}

export default App