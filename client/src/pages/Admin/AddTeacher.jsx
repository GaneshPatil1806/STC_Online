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
    mobile_number: '',
    reg_number: '',
    designation: ''
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = {};
    for (let [key, value] of Object.entries(teacher)) {
      formData[key] = value;
    }

    await axios.post(`${appVars.backendUrl}/api/teacher/signup`, formData,{
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    })
      .then((res) => {
        setTeacher({
          name: '',
          password: '',
          email: '',
          mobile_number: '',
          reg_number: '',
          designation: ''
        });
        toast.success(res.data.message);
      })
      .catch((e) => {
        toast.error(e.response.data.message || 'An error occurred.');
      });
    } 

  function handleInputChange(key, value) {
    setTeacher({ ...teacher, [key]: value });
  }

  const selectDesignation = [
    'Professor',
    'Asscoiate Professor',
    'Assistant Professor',
    'Adjunct Faculty',
  ]

  return (

    <>
      <div className="flex justify-between absolute w-full">
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/getTeachers')}>Fetch Teachers</button>
      </div>

      <div className="flex flex-col justify-center items-center h-screen">
        <p className="mb-1">Add Teacher</p>
        <form className="bg-slate-300 shadow-md rounded px-3 pt-6 pb-1 mb-1" onSubmit={submitHandler}>

          <TeacherInput
            label="Name"
            value={teacher.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Name"
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

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
              Designation
          </label>
          <p className="designation">
            <select 
            className="px-2 py-2 bg-gray-100 cursor-pointer outline-none mb-2"
            value={teacher.designation}
            onChange={(e) => teacher && setTeacher((prev) => ({ ...prev, designation: e.target.value }))}    
          >
            
            <option selected="selected" value="select_desig">Select Designation</option>
            {selectDesignation.map((des) => (
              <option key={des} value={des}>
                {des}
              </option>
            ))}
          </select></p>

          <TeacherInput
            label="Password"
            value={teacher.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Password"
            type="password"
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