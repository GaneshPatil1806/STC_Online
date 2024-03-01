import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router-dom";

export default function GetTeachers() {
  const [teacher, setTeacher] = useState([]);
  const { admin } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      axios.get(`${appVars.backendUrl}/api/adminDashboard/getDomainAndTeacher`, {
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

 // console.log(teacher);

  return (
    loading ? <div className="flex h-screen justify-center items-center"> <Loading /> </div> :
      <div className="flex flex-col items-center">

        <div className="flex justify-between w-full">
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/addTeacher')}>Add Teacher</button>
        </div>

        <p className="font-bold text-xl">Teachers</p>

        <div className="flex flex-wrap items-center justify-center p-5">
          {
            teacher &&
            <>
              {teacher.map((element) => (
                <div key={element.name} className="bg-gradient-to-r from-slate-400 to-slate-300 p-4 m-4 rounded-lg flex flex-col w-[55%] lg:w-[50%] h-[40%] ">
                  <p>Name: {element.name}</p>
                  <p>Email: {element.email}</p>
                  <p>Domain: {element.domains.map((domain,index)=>(<span key={domain.id}>{domain.domain_name}{index !== element.domains.length-1 ? ', ' : '' }</span>))}</p>
                  <p>Mobile Number: {element.mobile_number}</p>
                  <p>Teacher Id: {element.reg_number}</p>
                  <p>Designation: {element.designation}</p>
                  <div className="flex items-center cursor-pointer" onClick={() => handleDelete(element.id)}><span>Delete</span> <MdDelete className="rounded-md cursor-pointer text-xl"></MdDelete>
                    <Toaster /></div>
                </div>
              ))}</>
          }
        </div>
      </div>
  );
}
