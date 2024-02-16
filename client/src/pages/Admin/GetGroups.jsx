import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

export default function GetGroups() {
  const [groups, setGroups] = useState([]);
  const { admin } = useUser();

  useEffect(() => {
    axios.get(`${appVars.backendUrl}/api/group`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => {
        setGroups(res.data.groups);
      })
      .catch((e) => console.log(e));
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

  //console.log(groups);

  return (
    <div className="flex flex-col items-center p-5">
      {
        groups &&
        <>
          <p className="font-bold text-xl">Groups</p>
          {groups.map((element) => (
            <div key={element.id} className="bg-gradient-to-r from-slate-400 to-slate-300 p-4 m-4 rounded-lg w-[20%] h-[30%] flex justify-between">
              <p>GroupId: {element.group_id}</p>
              <p>TeacherId: {element.fk_teacher}</p>
              <MdDelete className="rounded-md cursor-pointer text-xl" onClick={() => handleDelete(element.id)}>Delete</MdDelete>
              <Toaster />
            </div>
          ))}</>
      }
    </div>
  );
}
