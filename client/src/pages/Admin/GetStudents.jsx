import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/UserContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router-dom";

export default function GetStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useUser();
  const navigate = useNavigate();

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
  }, [admin.token, students]);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`${appVars.backendUrl}/api/adminDashboard/deleteStudent/${id}`, {
        headers: {
          Authorization: `Bearer ${admin?.token}`
        }
      }).then((res) => {
        toast.success(res.data.message)
      }).catch((e) => (
        toast.error(e.response.data.message || 'Error Deleting Student')
      ))
    }
  }

  return (
    loading ? <div className="flex h-screen justify-center items-center bg-[#71C9CE]"> <Loading/> </div> : (
      <div className="bg-[#71C9CE]">

        <div className="flex justify-between fixed w-full">
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/addStudent')}>Add Student</button>
        </div>

        <div className="flex flex-col items-center p-20">
          <p className="font-bold text-xl mt-9">Students</p>
          {students.length > 0 ? (
            <table className="w-full border border-black mt-2">
              <thead className="bg-[#A6E3E9]">
                <tr>
                  <th className="border border-black px-4 py-1">Name</th>
                  <th className="border border-black px-4 py-1">Roll Number</th>
                  <th className="border border-black px-4 py-1">Password</th>
                  <th className="border border-black px-4 py-1">Email</th>
                  <th className="border border-black px-4 py-1">Delete</th>
                </tr>
              </thead>
              <tbody>
                {students.map((element, index) => (
                  <tr key={element.id} className={ index%2==0 ? `bg-[#CBF1F5]`: `bg-[#A6E3E9]`}>
                    <td className="border border-black px-4 py-1">{element.first_name}</td>
                    <td className="border border-black px-4 py-1">{element.roll_number}</td>
                    <td className="border border-black px-4 py-1">{element.password}</td>
                    <td className="border border-black px-4 py-1">{element.email}</td>
                    <td className="px-4 py-1 border border-black">
                      <MdDelete className="rounded-md cursor-pointer text-xl" onClick={() => handleDelete(element.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="font-bold mt-3">No students to show</p>
          )}
          <Toaster />
        </div>
      </div>
    )
  );
}