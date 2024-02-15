import { useEffect, useState } from 'react'
import './App.css'
import Chat from './pages/Chat'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext/';
import { getFromLocal } from './assets/local';
import Admin from './pages/Admin/Admin';
import Dashboard from './pages/Admin/Dashboard';
import AddDomain from './pages/Admin/AddDomain';
import GetDomain from './pages/Admin/getDomain';
import AddTeacher from './pages/Admin/AddTeacher';
import GetTeacher from './pages/Admin/getTeacher';
import AddGroup from './pages/Admin/AddGroup';
import GetGroup from './pages/Admin/getGroup';
import AddStudent from './pages/Admin/AddStudent';
import GetStudent from './pages/Admin/GetStudent';
import ChatCard from './components/ChatCard';
import ChatHeader from './components/ChatHeader';
import Login from './components/Login'

function App() {

  const [user, setUser] = useState({})
  const [admin, setAdmin] = useState({})

  useEffect(()=>{
      const user = getFromLocal('user')
      const admin = getFromLocal('admin')
      if(user){
        setUser(JSON.parse(user));
      }

      if(admin){
        setAdmin(JSON.parse(admin));
      }
  },[])

  return (
    <UserProvider value={{ user, setUser, admin, setAdmin}}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teacher" element={<Login type="teacher" />} />
          <Route path="/student" element={<Login type="student" />} /> 

          <Route path="/admin" element={<Admin/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}></Route>

          <Route path="/admin/dashboard/addDomain" element={<AddDomain/>}></Route>
          <Route path="/admin/dashboard/getDomain" element={<GetDomain/>}></Route>
          
          <Route path="/admin/dashboard/addTeacher" element={<AddTeacher/>}></Route>
          <Route path="/admin/dashboard/getTeacher" element={<GetTeacher/>}></Route>

          <Route path="/admin/dashboard/addGroup" element={<AddGroup/>}></Route>
          <Route path="/admin/dashboard/getGroup" element={<GetGroup/>}></Route>

          <Route path="/admin/dashboard/addStudent" element={<AddStudent/>}></Route>
          <Route path="/admin/dashboard/getStudent" element={<GetStudent/>}></Route>
          
          
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
