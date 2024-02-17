import axios from "axios";
import { appVars } from "../../conf/conf";
import { useState } from "react";
import useUser from "../../context/userContext";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function AddDomain() {

  const { admin } = useUser();
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');

  function submitHandler(e) {
    e.preventDefault();

    const domainObj = {
      domain_name: domain,
    };

    axios.post(`${appVars.backendUrl}/api/domain/create`, domainObj, {
      headers: { Authorization: `Bearer ${admin.token}` },
    })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/admin/dashboard/getDomain');
        }, 1000);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">

    <p>Add New Domain</p>
      <form className="bg-slate-200 shadow-md rounded p-4 m-2" onSubmit={submitHandler}>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
          Domain
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          id="domain"
          name="domain"
          type="text"
          placeholder="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)} // Controlled component
        />

        <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
}