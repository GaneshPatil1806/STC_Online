import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading";

export default function GetStudents() {
  const [students, setStudents] = useState([]);
  const [loading,setLoading] = useState(true)
  const { admin } = useUser();

  useEffect(() => {
    axios.get(`${appVars.backendUrl}/api/adminDashboard/students`, {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    })
    .then((res) => {
      setLoading(false);
      setStudents(res.data.data);
    })
    .catch(() => {
      setLoading(false);
    });
  }, [admin.token]);
  

  function handleDelete(id) {
    axios.delete(`${appVars.backendUrl}/api/student/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${admin?.token}`
      }
    }).then((res) => {
      toast.success(res.data.message)
    }).catch((e)=>(
      toast.error(e.response.data.message || 'Error Deleting Student')
    ))
  }

  return (
    loading ?  <Loading/> : <div className="flex flex-col items-center p-5">
      {
        students &&
        <>
          <p className="font-bold text-xl">Students</p>
          {students.map((element) => (
            <div key={element.id} className="bg-gradient-to-r from-slate-400 to-slate-300 p-4 m-4 rounded-lg w-[60%] lg:w-[20%] h-[30%] flex flex-col">
              <p>First Name: {element.first_name}</p>
              <p>Last Name: {element.last_name}</p>
              <p>Roll Number: {element.roll_number}</p>
              <p>Domain: {element.fk_domain}</p>
              <p>Roll Number: {element.fk_group}</p>
              <div className="flex items-center">
                <p>Delete</p>
                <MdDelete className="rounded-md cursor-pointer text-xl" onClick={() => handleDelete(element.id)}>Delete</MdDelete></div>
              <Toaster />
            </div>
          ))}</>
      }
    </div>
  );
}
