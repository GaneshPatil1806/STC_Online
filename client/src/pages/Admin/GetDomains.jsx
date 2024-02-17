import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading";

export default function GetDomains() {
  const [domain, setDomain] = useState([]);
  const { admin } = useUser();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${appVars.backendUrl}/api/domain`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) =>{
        setLoading(false)
        setDomain(res.data.data)
      })
      .catch(() => setLoading(false));
  }, [admin.token,domain]);

  function handleDelete(domain_name) {
    axios.delete(`${appVars.backendUrl}/api/domain/delete/${domain_name}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`
      }
    }).then((res) => {
      toast.success(res.data.message)
    }).catch((e)=>(
      toast.error(e.response.data.message || 'Error Deleting teacher')
    ))
  }

  return (

    loading ? <Loading/> : 
    <div className="flex flex-col items-center p-5">
      {
        domain &&
        <>
          <p className="font-bold text-xl">Domains</p>
          {domain.map((element) => (
            <div key={element.id} className="bg-gradient-to-r from-slate-400 to-slate-300 p-4 m-4 rounded-lg w-[60%] sm:w-[20%] h-[30%] flex justify-between">
              <span>{element.id}</span>
              <span> {element.domain_name}</span>
              <MdDelete className="rounded-md cursor-pointer text-xl" onClick={() => handleDelete(element.domain_name)}>Delete</MdDelete>
              <Toaster />
            </div>
          ))}</>
      }
    </div>
  );
}
