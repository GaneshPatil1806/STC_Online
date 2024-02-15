import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/userContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';

export default function GetDomain() {
  const [domain, setDomain] = useState([]);
  const { admin } = useUser();

  useEffect(() => {
    axios.get(`${appVars.backendUrl}/api/domain`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => setDomain(res.data.data))
      .catch((e) => console.log(e));
  }, [admin.token]);

  function handleDelete(domain_name){
    axios.delete(`${appVars.backendUrl}/api/domain/delete/${domain_name}`,{
      headers:{
        Authorization: `Bearer ${admin.token}`
      }
    }).then((res)=>{
      toast.success(res.data.message)
    })
  }

  return (
    <div className="flex flex-wrap p-5">
      {
          domain &&
          domain.map((element) => (
          <div key={element.id} className="bg-green-400 p-4 m-4 rounded-lg w-[20%] h-[30%]">
            <span>{element.id}</span>
            <p>Domain Name: {element.domain_name}</p>
            <button className="bg-black text-white rounded-md p-1" onClick={()=>handleDelete(element.domain_name)}>Delete</button>
            <Toaster/>
          </div>
        ))
      }
    </div>
  );
}
