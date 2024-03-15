import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "../../context/UserContext";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import Loading from "../../common/Loading";
import { useNavigate } from "react-router-dom";

export default function GetDomains() {
  const [domains, setDomains] = useState([]);
  const { admin } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${appVars.backendUrl}/api/domain`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => {
        setLoading(false);
        setDomains(res.data.data);
      })
      .catch(() => setLoading(false));
  }, [admin.token,domains]);

  function handleDelete(domain_name) {
    axios.delete(`${appVars.backendUrl}/api/domain/delete/${domain_name}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`
      }
    }).then((res) => {
      toast.success(res.data.message)
    }).catch((e) => (
      toast.error(e.response.data.message || 'Error Deleting teacher')
    ))
  }

  return (
    loading ? <div className="flex h-screen justify-center items-center bg-[#71C9CE]"> <Loading/> </div> : 
      <div className="bg-[#71C9CE] h-screen">

        <div className="flex justify-between fixed w-full">
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>DashBoard</button>
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/addDomain')}>Add Domain</button>
        </div>

        <div className="flex flex-col items-center p-20">
          <p className="font-bold text-xl mb-5">Domains</p>
          <table className="table-auto">
            <thead className="bg-[#A6E3E9]">
              <tr className="border border-black">
                <th className="px-4 py-2 border border-black">ID</th>
                <th className="px-4 py-2 border border-black">Domain Name</th>
                <th className="px-4 py-2 border border-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((element,index) => (
                <tr key={element.id} className={ index%2==0 ? `bg-[#CBF1F5]`: `bg-[#A6E3E9]`}>
                  <td className="border border-black px-4 py-2">{element.id}</td>
                  <td className="border border-black px-4 py-2">{element.domain_name}</td>
                  <td className="border border-black px-4 py-2">
                    <MdDelete className="rounded-md cursor-pointer text-xl" onClick={() => handleDelete(element.domain_name)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Toaster />
        </div>
      </div>
  );
}