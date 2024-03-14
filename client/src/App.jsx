import { useEffect, useState } from 'react'
import Chat from './pages/Chat'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { UserProvider } from './context/UserContext/';
import { getFromLocal } from './assets/local';
import Admin from './pages/Admin/Admin';

import Dashboard from './pages/Admin/Dashboard';
import AddDomain from './pages/Admin/AddDomain';
import AddTeacher from './pages/Admin/AddTeacher';
import AddStudent from './pages/Admin/AddStudent';
import AddGroup from './pages/Admin/AddGroup';

import GetDomains from './pages/Admin/GetDomains';
import GetTeachers from './pages/Admin/GetTeachers';
import GetStudents from './pages/Admin/GetStudents';
import GetGroups from './pages/Admin/GetGroups';

import ChatCard from './components/ChatCard';
import ChatHeader from './components/ChatHeader';
import Login from './components/Login'
import AssignGroups from './pages/Admin/AssignGroups';
import AddTeacherDomains from './pages/Admin/AddTeacherDomains';
import CreateGroup from './pages/Student/CreateGroup';
import AddNotice from './pages/Admin/AddNotice';
import FetchFinal from './pages/Admin/FetchFinal';
// import EventScheduler from './components/MeetSchedule/EventScheduler';

function App() {

  const [user, setUser] = useState({})
  const [admin, setAdmin] = useState({})

  useEffect(() => {
    const user = getFromLocal('user');
    const admin = getFromLocal('admin');

    if (user) {
      setUser(JSON.parse(user));
    }

    if (admin) {
      setAdmin(JSON.parse(admin));
    }
  }, []);

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
          <Route path="/admin/dashboard/getDomains" element={<GetDomains/>}></Route>
          
          <Route path="/admin/dashboard/addTeacher" element={<AddTeacher/>}></Route>
          <Route path="/admin/dashboard/getTeachers" element={<GetTeachers/>}></Route>

          <Route path="/admin/dashboard/addGroup" element={<AddGroup/>}></Route>
          <Route path="/admin/dashboard/getGroups" element={<GetGroups/>}></Route>

          <Route path="/admin/dashboard/addStudent" element={<AddStudent/>}></Route>
          <Route path="/admin/dashboard/getStudents" element={<GetStudents/>}></Route>

          <Route path="/admin/dashboard/assignGroups" element={<AssignGroups/>}></Route>
          <Route path="/admin/dashboard/assignTeacherDomains" element={<AddTeacherDomains/>}></Route>

          <Route path="/admin/dashboard/addNotice" element={<AddNotice/>}></Route>
          <Route path="/admin/dashboard/fetchFinal" element={<FetchFinal/>}></Route>

          {/* <Route path="meet" element={<EventScheduler/>}></Route> */}
          
          <Route path="/:person/chat" element={<Chat />}>
            <Route path="group/:id" element={<ChatCard />} />
            <Route path="group/:id" element={<ChatHeader />} />
          </Route>
          
          <Route path="/student/createGroup" element={<CreateGroup/>} />
          <Route path="/student/register" element={<AddStudent/>} /> 

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App
