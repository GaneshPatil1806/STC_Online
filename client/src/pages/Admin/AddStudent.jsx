import { useState } from "react";
import axios from "axios";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";

export default function AddStudent() {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile_number: BigInt(0),
    roll_number: BigInt(0),
    reg_number: "",
  });

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function submitHandler(e) {
    e.preventDefault();

    setLoading(true);
    axios.post(`${appVars.backendUrl}/api/student/signup`, formData)
      .then((res) => {

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          mobile_number: BigInt(0),
          roll_number: BigInt(0),
          reg_number: "",
        });

        setLoading(false)
        toast.success(res.data.message);
      })
      .catch((e) => {
        toast.error(e.response.data.message || 'Error while adding student!');
      });
  }

  return (
    <>
      <div className="flex justify-between absolute w-full">
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/getStudents')}>Fetch Students</button>
      </div>

      <div className="flex justify-center items-center h-screen flex-col">
        <p>Add New Student</p>
        <form className="bg-slate-200 shadow-md rounded p-4 overflow-auto h-[60%] m-4" onSubmit={submitHandler}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                {key.replace(/_/g, ' ')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                id={key}
                name={key}
                type={ key === 'password' ? 'password' : 'text'}
                placeholder={key.replace(/_/g, ' ')}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
          
          <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>

          {loading && <Loading/>}
          
          <Toaster />
        </form>
      </div>
    </>

  );
}
