import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
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

    loading ? <div className="flex h-screen justify-center items-center"> <Loading /> </div> :
      <>
        <div className="flex justify-between absolute w-full">
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/addGroup')}>Add Group</button>
        </div>

        <div className="flex flex-col items-center">
        <p className="font-bold text-xl mt-9">Groups</p>
          {groups.length > 0 ? (
            <>
              <table className="w-full border-collapse border mt-2">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Group Name</th>
                    <th className="border px-4 py-2">Group ID</th>
                    <th className="border px-4 py-2">Teacher ID</th>
                    <th className="border px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((element) => (
                    <tr key={element.id} className="bg-gradient-to-r">
                      <td className="border px-4 py-2">{element.group_name.toUpperCase()}</td>
                      <td className="border px-4 py-2">{element.id}</td>
                      <td className="border px-4 py-2">{element.fk_teacher}</td>
                      <td className="border px-4 py-2 flex items-center">
                        <p>Delete</p>
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

      </>
  );
}
