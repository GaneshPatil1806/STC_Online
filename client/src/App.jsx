import { useEffect, useState } from 'react'
import './App.css'
import Chat from './pages/Chat'
import ChatCard from './components/ChatCard';
import ChatHeader from './components/ChatHeader';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { getFromLocal } from './assets/local';

function App() {

  const [user, setUser] = useState({
      access_token: "",
      username: "",
      type:""
  })

  useEffect(()=>{
      const user = getFromLocal('user')
      if(user){
        setUser(JSON.parse(user));
      }
  },[])

  return (
    <UserProvider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teacher" element={<Login type="teacher" />} />
          <Route path="/student" element={<Login type="student" />} />
          <Route path="/:person/chat" element={<Chat />}>
            <Route path="group/:id" element={<ChatCard />} />
            <Route path="group/:id" element={<ChatHeader />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App
