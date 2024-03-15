import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/UserContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading"
import { useNavigate } from "react-router-dom";

export default function GetGroups() {
  const [groups, setGroups] = useState([]);
  const { admin } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${appVars.backendUrl}/api/group`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => {
        setLoading(false)
        setGroups(res.data.groups);
      })
      .catch(() => setLoading(false));
  }, [admin.token, groups]);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this group?")) {
      axios.delete(`${appVars.backendUrl}/api/group/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`
        }
      }).then((res) => {
        toast.success(res.data.message)
      }).catch((e) => (
        toast.error(e.response.data.message || 'Error Deleting Group')
      ))
    }
  }

  return (

    loading ? <div className="flex h-screen justify-center items-center bg-[#71C9CE]"> <Loading /> </div> :
      <div className="bg-[#71C9CE] h-screen">

        <div className="flex justify-between fixed w-full">
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/assignGroups')}>Assign Group</button>
        </div>

        <div className="flex flex-col items-center p-20">
        <p className="font-bold text-xl mt-9">Groups</p>
          {groups.length > 0 ? (
            <>
              <table className="w-full mt-2">
                <thead>
                  <tr className="bg-[#A6E3E9]">
                    <th className="border border-black px-4 py-2">Group Name</th>
                    <th className="border border-black px-4 py-2">Group ID</th>
                    <th className="border border-black px-4 py-2">Teacher ID</th>
                    <th className="border border-black px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((element,index) => (
                    <tr key={element.id} className={ index%2==0 ? `bg-[#CBF1F5]`: `bg-[#A6E3E9]`}>
                      <td className="border border-black px-4 py-2">{element.group_name.toUpperCase()}</td>
                      <td className="border border-black px-4 py-2">{element.id}</td>
                      <td className="border border-black px-4 py-2">{element.fk_teacher}</td>
                      <td className="px-4 py-1 border border-black">
                        <MdDelete
                          className="rounded-md cursor-pointer text-xl ml-2"
                          onClick={() => handleDelete(element.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Toaster />
            </>
          ) : (
            <p className="font-bold mt-3">No groups are created yet.</p>
          )}
        </div>

      </div>
  );
}
