import axios from "axios";
import { appVars } from "../../conf/conf";
import { useState } from "react";
import useUser from "../../context/userContext";

export default function AddDomain() {
  const [error, setError] = useState();
  const {admin} = useUser();

  function submitHandler(e) {
    e.preventDefault();

    const domainObj = {}
    domainObj['domain_name']=e.target.domain.value;
    console.log(domainObj);
    
    axios.post(`${appVars.backendUrl}/api/domain/create`,domainObj,{
        headers:{Authorization: `Bearer ${admin.token}`}
      })
      .then((res) => {
        console.log('Response:', res);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
          Domain
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          id="domain"
          name="domain"
          type="text"
          placeholder="domain"
        />

        <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>

        {error && <p className="p-2">{error}</p>}
      </form>
    </div>
  );
}