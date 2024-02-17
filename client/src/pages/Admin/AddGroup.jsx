/* eslint-disable no-undef */
import axios from "axios";
import { appVars } from "../../conf/conf";
import useUser from "../../context/userContext";
import toast, { Toaster } from 'react-hot-toast';

export default function AddGroup() {

  const { admin } = useUser();

  function submitHandler(e) {
    e.preventDefault();
    let form = new FormData(formElement);
    let formData = {}

    for(let [key,value] of form.entries()){
      if(key === 'teacherId'){
        value = parseInt(value);
      }
      formData[key] = (value);
    }

    axios.post(`${appVars.backendUrl}/api/group/create`, formData, {
      headers: { Authorization: `Bearer ${admin.token}` },
    })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <p>Add New Group</p>
      <form id='formElement' className="bg-slate-200 shadow-md rounded p-4 m-4" onSubmit={submitHandler}>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Group">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          id="groupId"
          name="groupId"
          type="text"
          placeholder="Group Id"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Group">
          Teacher Id
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          id="teacherId"
          name="teacherId"
          type="text"
          placeholder="Teacher Id"
        />

        <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={submitHandler}>
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
}