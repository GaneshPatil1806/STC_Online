import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/UserContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router-dom";

export default function GetTeachers() {
  const [teachers, setTeachers] = useState([]);
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
          setTeachers(res.data.data)
        })
        .catch(() => setLoading(false));
    }
  }, [admin, teachers]);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      axios.delete(`${appVars.backendUrl}/api/adminDashboard/deleteTeacher/${id}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`
        }
      }).then((res) => {
        toast.success(res.data.message)
      }).catch((e) => {
        toast.error(e.response.data.message || 'Error Deleting Teacher');
      })
    }
  }
  // console.log(teachers);

  return (
    loading ? <div className="flex h-screen justify-center items-center bg-[#71C9CE]"> <Loading /> </div> :
      <div className="bg-[#71C9CE]">
      
      <div className="flex justify-between fixed w-full">
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/addTeacher')}>Add Teacher</button>
      </div>

        <div className="flex flex-col items-center p-20">
          <p className="font-bold text-xl mb-5">Teachers</p>
          {teachers.length > 0 ? (<><table className="w-full mt-2 border border-black">
            <thead>
              <tr className="px-2 py-4 bg-[#A6E3E9]">
                <th className="border border-black px-2 py-2">Name</th>
                <th className="border border-black px-2 py-2">Email</th>
                <th className="border border-black px-2 py-1">Password</th>
                <th className="border border-black px-2 py-2">Domains</th>
                <th className="border border-black px-2 py-2">Designation</th>
                <th className="border border-black px-2 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((element,index) => (
                <tr key={element.id} className={ index%2==0 ? `bg-[#CBF1F5]`: `bg-[#A6E3E9]`}>
                  <td className="border border-black px-2 py-1">{element.name}</td>
                  <td className="border border-black px-2 py-1">{element.email}</td>
                  <td className="border border-black px-2 py-1">{element.password}</td>
                  <td className="border border-black px-2 py-1">
                    {element.domains.map((domain, index) => (
                      <span key={domain.id}>{domain.domain_name}{index !== element.domains.length - 1 ? ', ' : ''}</span>
                    ))}
                  </td>
                  {/* <td className="border border-black px-2 py-1">{element.mobile_number}</td> */}
                  {/* <td className="border border-black px-2 py-1">{element.reg_number}</td> */}
                  <td className="border border-black px-2 py-1">{element.designation}</td>
                  <td className="border border-b-black py-5 flex justify-center items-center">
                    <MdDelete className="rounded-md cursor-pointer text-xl" onClick={() => handleDelete(element.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table></>) : (<p className="mt-5 text-xl">No teachers to show</p>)}

          <Toaster />
        </div></div>
  );
}