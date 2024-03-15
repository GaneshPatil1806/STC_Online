import axios from "axios";
import { appVars } from "../../conf/conf";
import { useState } from "react";
import useUser from "../../context/UserContext";
import toast, { Toaster } from 'react-hot-toast';
import TeacherInput from './TeacherInput'
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

    await axios.post(`${appVars.backendUrl}/api/teacher/signup`, formData, {
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
  ]

  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    const formData = {}
    formData["file"] = file;
    let url = `${appVars.backendUrl}/api/csv/teachers/csv`
    console.log(formData)
    axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
        "Content-Type ": "multipart/form-data"
      }
    })
      .then((res) => {
        console.log(res);
        toast.success('Upload success!')
      })
      .catch((err) => {
        toast.error(err.response.data.message || 'Upload failed!')
      })
  }

  return (
    
    <>
      <div className="flex justify-between absolute w-full">
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/getTeachers')}>Fetch Teachers</button>
      </div>

      <div className="flex flex-col justify-center items-center h-screen bg-[#71C9CE]">
      <h1 className='text-xl font-bold md:my-5 my-3'>Add New Teacher/ <span className='cursor-pointer hover:underline rounded-xl p-1'><label className='cursor-pointer' htmlFor="uploadBanner">
          Upload CSV
          <input
            id="uploadBanner"
            type="file"
            onChange={handleFileUpload}
            hidden
          />
        </label>
        </span>
        </h1>
        <form className="flex flex-col justify-center items-center bg-[#E3FDFD] shadow-md rounded px-3 pt-6 pb-1 mb-1 w-[40%]" onSubmit={submitHandler}>

          <div className="flex flex-wrap"><TeacherInput
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

            <div className="m-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                DESIGNATION
              </label>
              <select
                className="outline-none border border-black rounded w-full py-2 px-6 text-gray-700 leading-tight"
                value={teacher.designation}
                onChange={(e) => teacher && setTeacher((prev) => ({ ...prev, designation: e.target.value }))}
              >
                <option selected="selected" value="select_desig">Select Designation</option>
                {selectDesignation.map((des) => (
                  <option key={des} value={des}>
                    {des}
                  </option>
                ))}
              </select>
            </div>

            <TeacherInput
              label="Password"
              value={teacher.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Password"
              type="password"
            /></div>

          <button className="bg-[#71C9CE] hover:bg-[#A6E3E9] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
          <Toaster />
        </form>
      </div>
    </>
  );
}