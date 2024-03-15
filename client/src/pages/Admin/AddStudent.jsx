import { useState } from "react";
import axios from "axios";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import useUser from "../../context/UserContext";

export default function AddStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { admin } = useUser();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile_number: BigInt(0),
    roll_number: BigInt(0),
    reg_number: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function submitHandler(e) {
    e.preventDefault();

    setLoading(true);
    axios.post(`${appVars.backendUrl}/api/student/signup`, formData)
      .then((res) => {
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          mobile_number: BigInt(0),
          roll_number: BigInt(0),
          reg_number: "",
        });

        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((e) => {
        toast.error(e.response.data.message || 'Error while adding student!');
        setLoading(false);
      });
  }

  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    const formData = {}
    formData["file"] = file;
    let url = `${appVars.backendUrl}/api/csv/students/csv`
    console.log(formData)
    axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
        "Content-Type ": "multipart/form-data"
      }
    })
      .then((res) => {
        console.log(res);

      })
      .catch((err) => {
        toast.error(err.response.data.message || 'Upload failed!')
      })
  }

  return (
    <>
      {admin && admin.token && (
        <div className="flex justify-between absolute w-full">
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>
            DashBoard
          </button>
          <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard/getStudents')}>
            Fetch Students
          </button>
        </div>
      )}

      <div className="flex justify-center items-center h-screen flex-col bg-[#71C9CE]">
        <h1 className='md:text-3xl text-2xl font-bold md:my-5 my-3'>Add New Student / <span className='cursor-pointer hover:underline rounded-xl p-1'><label className='cursor-pointer' htmlFor="uploadBanner">
          Upload CSV
          <input
            id="uploadBanner"
            type="file"
            onChange={handleFileUpload}
            hidden
          />
        </label>
        </span>
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col items-center bg-[#E3FDFD] shadow-md rounded p-4 mx-auto border-b-2 border-white w-[30%]">
          <div className="flex flex-wrap -mx-2">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="mb-1 md:w-1/2 px-1 flex flex-col items-center">
                <label className="block text-gray-700 text-sm font-bold my-2" htmlFor={key}>
                  {key.replace(/_/g, ' ').toUpperCase()}
                </label>
                <input
                  className="shadow appearance-none border border-black rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={key}
                  name={key}
                  type={key === 'password' ? 'password' : 'text'}
                  placeholder={key.replace(/_/g, ' ')}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <button className="bg-[#71C9CE] hover:bg-[#A6E3E9] text-black font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
          {loading && <Loading />}

          <Toaster />
        </form>
      </div>
    </>
  );
}
