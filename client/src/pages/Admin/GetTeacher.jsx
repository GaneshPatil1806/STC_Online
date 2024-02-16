import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

export default function GetTeacher() {
  const [teacher, setTeacher] = useState([]);
  const { admin } = useUser();

  useEffect(() => {
    axios.get(`${appVars.backendUrl}/api/teacherDashboard/teachers`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => setTeacher(res.data.data))
      .catch((e) => console.log(e));
  }, [admin.token,teacher]);

  function handleDelete(id) {
    axios.delete(`${appVars.backendUrl}/api/teacherDashboard/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`
      }
    }).then((res) => {
      toast.success(res.data.message)
    }).catch((e)=>{
      toast.error(e.response.data.message || 'Error Deleting teacher');
    })
  }

  return (
    <div className="flex flex-col items-center p-5">
      {
        teacher &&
        <>
          <p className="font-bold text-xl">Teachers</p>
          {teacher.map((element) => (
            <div key={element.name} className="bg-gradient-to-r from-slate-400 to-slate-300 p-4 m-4 rounded-lg w-[20%] h-[30%] flex justify-between flex flex-col">
              <p>Name: {element.name}</p>
              <p>Email: {element.email}</p>
              <p>DomainId: {element.fk_domain}</p>
              <p>Mobile Number: {element.mobile_number}</p>
              <div className="flex items-center cursor-pointer" onClick={() => handleDelete(element.id)}><span>Delete</span> <MdDelete className="rounded-md cursor-pointer text-xl"></MdDelete>
              <Toaster /></div>
            </div>
          ))}</>
      }
    </div>
  );
}
