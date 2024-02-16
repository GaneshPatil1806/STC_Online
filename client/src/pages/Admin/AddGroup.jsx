/* eslint-disable no-undef */
import axios from "axios";
import { appVars } from "../../conf/conf";
import { useState } from "react";
import useUser from "../../context/userContext";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function AddGroup() {

  const { admin } = useUser();
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    let form = new FormData(formElement);
    let formData = {}

    for(let [key,value] of form.entries()){
        formData[key] = parseInt(value);
    }

    console.log(formData);
    axios.post(`${appVars.backendUrl}/api/group/create`, formData, {
      headers: { Authorization: `Bearer ${admin.token}` },
    })
      .then((res) => {
        toast.success(res.data.message);
        // setTimeout(() => {
        //   navigate('/admin/dashboard/getGroup');
        // }, 1000);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="h-screen flex justify-center items-center">
      {/* <p>Add New Group</p> */}
      <form id='formElement' className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Group">
          Group Id
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