import axios from "axios";
import { appVars } from "../../conf/conf";
import { useState } from "react";
import useUser from "../../context/userContext";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import TeacherInput from "./TeacherInput";

export default function Addname() {

  const { admin } = useUser();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: '', 
    password: '',
    email: '', 
    mobile_number: 0, 
    reg_number: 0, 
    fk_domain: ''
  });

  function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    for (let [key, value] of Object.entries(teacher)) {
      if (key === 'mobile_number' || key === 'reg_number') {
        value = parseInt(value, 10);
      }
      formData.append(key, value);
    }

    axios.post(`${appVars.backendUrl}/api/teacher/signup`, formData, {
      headers: { Authorization: `Bearer ${admin.token}` },
    })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/admin/dashboard/getname');
        }, 1000);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  function handleInputChange(key, value) {
    setTeacher({ ...teacher, [key]: value });
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

        <TeacherInput
          label="name"
          value={teacher.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Name"
        />

        <TeacherInput
          label="password"
          value={teacher.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="Password"
        />

        <TeacherInput
          label="email"
          value={teacher.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Email"
        />

        <TeacherInput
          label="mobile_number"
          value={teacher.mobile_number}
          onChange={(e) => handleInputChange('mobile_number', e.target.value)}
          placeholder="Mobile Number"
        />

        <TeacherInput
          label="reg_number"
          value={teacher.reg_number}
          onChange={(e) => handleInputChange('reg_number', e.target.value)}
          placeholder="Registration Number"
        />

        <TeacherInput
          label="fk_domain"
          value={teacher.fk_domain}
          onChange={(e) => handleInputChange('fk_domain', e.target.value)}
          placeholder="e.g.DSA"
        />

        <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
}