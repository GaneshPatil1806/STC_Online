// import { useState } from 'react'
import './App.css'
import Chat from './components/Chat'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
   <>
      <Router>
      <div> 
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
   </>
  )
}

export default App
