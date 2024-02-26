import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router-dom";

export default function GetTeacher() {
  const [teacher, setTeacher] = useState([]);
  const { admin } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      axios.get(`${appVars.backendUrl}/api/adminDashboard/teachers`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      })
        .then((res) => {
          setLoading(false)
          setTeacher(res.data.data)
        })
        .catch(() => setLoading(false));
    }
  }, [admin, teacher]);

  function handleDelete(id) {
    axios.delete(`${appVars.backendUrl}/api/adminDashboard/deleteTeacher/${id}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`
      }
    }).then((res) => {
      toast.success(res.data.message)
    }).catch((e) => {
      toast.error(e.response.data.message || 'Error Deleting teacher');
    })
  }

  return (
    loading ? <div className="flex h-screen justify-center items-center"> <Loading /> </div> :
      <>

        <div className="flex justify-between absolute w-full">
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/addTeacher')}>Add Teacher</button>
        </div>

        <div className="flex flex-col items-center p-5">
          {
            teacher &&
            <>
              <p className="font-bold text-xl">Teachers</p>
              {teacher.map((element) => (
                <div key={element.name} className="bg-gradient-to-r from-slate-400 to-slate-300 p-4 m-4 rounded-lg w-[60%] sm:w-[20%] h-[30%] flex justify-between flex-col">
                  <p>Name: {element.name}</p>
                  <p>Email: {element.email}</p>
                  <p>Domain: {element.domain_name}</p>
                  <p>Mobile Number: {element.mobile_number}</p>
                  <p>Teacher Id: {element.reg_number}</p>
                  <div className="flex items-center cursor-pointer" onClick={() => handleDelete(element.id)}><span>Delete</span> <MdDelete className="rounded-md cursor-pointer text-xl"></MdDelete>
                    <Toaster /></div>
                </div>
              ))}</>
          }
        </div>
      </>
  );
}
