import axios from "axios";
import { appVars } from "../../conf/conf";
import { useState } from "react";
import useUser from "../../context/userContext";
import toast, { Toaster } from 'react-hot-toast';
import TeacherInput from "./TeacherInput";
import { useNavigate } from "react-router-dom";

export default function Addname() {

  const { admin } = useUser();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: '',
    password: '',
    email: '',
    mobile_number: BigInt(0),
    reg_number: '',
    fk_domain: BigInt(0)
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = {};
    for (let [key, value] of Object.entries(teacher)) {
      formData[key] = value;
    }

    console.log(formData);
    console.log(admin.token);

    await axios.post(`${appVars.backendUrl}/api/teacher/signup`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response?.data?.message || 'An error occurred.');
      });

  }

  function handleInputChange(key, value) {
    setTeacher({ ...teacher, [key]: value });
  }

  return (

    <>
      <div className="flex justify-between absolute w-full">
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/getTeachers')}>Fetch Teachers</button>
      </div>

      <div className="flex flex-col justify-center items-center h-screen">
        <p className="mb-1">Add Teacher</p>
          <form className="bg-slate-200 shadow-md rounded px-3 pt-6 pb-1 mb-1" onSubmit={submitHandler}>

            <TeacherInput
              label="Name"
              value={teacher.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Name"
            />

            <TeacherInput
              label="Password"
              value={teacher.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Password"
            />

            <TeacherInput
              label="Email"
              value={teacher.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Email"
            />

            <TeacherInput
              label="Mobile number"
              value={teacher.mobile_number}
              onChange={(e) => handleInputChange('mobile_number', e.target.value)}
              placeholder="Mobile Number"
            />

            <TeacherInput
              label="Reg number"
              value={teacher.reg_number}
              onChange={(e) => handleInputChange('reg_number', e.target.value)}
              placeholder="Registration Number"
            />

            <TeacherInput
              label="Domain"
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
    </>
  );
}