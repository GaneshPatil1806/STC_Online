import { useState } from "react";
import axios from "axios";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';

export default function AddStudent() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile_number: BigInt(0),
    roll_number: BigInt(0),
    reg_number: "",
    fk_group: "",
    fk_domain: "",
  });

  function handleChange(e) {
   
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  }

  function submitHandler(e) {
    e.preventDefault();

    //console.log(formData);
    axios.post(`${appVars.backendUrl}/api/student/signup`, formData)
    .then((res) => {
      toast.success(res.data.message);
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <p>Add New Student</p>
      <form className="bg-slate-200 shadow-md rounded p-4 overflow-auto h-[60%] m-4" onSubmit={submitHandler}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
              {key.replace(/_/g, ' ')}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              id={key}
              name={key}
              type={typeof(value)}
              placeholder={key.replace(/_/g, ' ')}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
}
