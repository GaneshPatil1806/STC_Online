// import { useState } from 'react'
import './App.css'
import Chat from './components/Chat'
import ChatCard from './components/ChatCard';
import ChatHeader from './components/ChatHeader';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher" element={<Login type="teacher" />} />
        <Route path="/student" element={<Login type="student" />} />


          <Route path="/chat" element={<Chat />}>
             <Route path="group/:id" element={<ChatCard />} />
             <Route path="group/:id" element={<ChatHeader />} />
          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App
