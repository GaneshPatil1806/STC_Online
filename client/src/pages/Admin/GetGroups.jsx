import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading"

export default function GetGroups() {
  const [groups, setGroups] = useState([]);
  const { admin } = useUser();
  const [loading,setLoading] = useState(true);

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
  }, [admin.token,groups]);

  function handleDelete(id) {
    axios.delete(`${appVars.backendUrl}/api/group/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`
      }
    }).then((res) => {
      toast.success(res.data.message)
    }).catch((e)=>(
      toast.error(e.response.data.message || 'Error Deleting Group')
    ))
  }

  return (

    loading ? <Loading/> :
    <div className="flex flex-col items-center p-5">
      {
        groups &&
        <>
          <p className="font-bold text-xl">Groups</p>
          {groups.map((element) => (
            <div key={element.id} className="bg-gradient-to-r from-slate-400 to-slate-300 p-4 m-4 rounded-lg w-[60%] sm:w-[20%] h-[30%] flex flex-col">
              <p>GroupId: {element.group_id}</p>
              <p>fk_group: {element.id}</p>
              <p>TeacherId: {element.fk_teacher}</p>
              <div className="flex items-center"><p>Delete</p><MdDelete className="rounded-md cursor-pointer text-xl" onClick={() => handleDelete(element.id)}></MdDelete></div>
              <Toaster />
            </div>
          ))}</>
      }
    </div>
  );
}
