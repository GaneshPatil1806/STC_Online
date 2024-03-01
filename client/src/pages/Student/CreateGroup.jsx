import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { appVars } from "../../conf/conf";
import useUser from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { removeFromLocal } from "../../assets/local";
import Loading from "../../common/Loading";

export default function CreateGroup() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState();
  const { user, setUser } = useUser();
  
  const [formData, setFormData] = useState({
    domain_id: "",
    roll_number1: "",
    roll_number2: "",
  });
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${appVars.backendUrl}/api/domain/student`,{
        headers:{
            Authorization: `Bearer ${user?.token}`
        }
      })
      .then((res) => {
        setDomains(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function submitHandler(e) {
    e.preventDefault();

    const requestBody = {
      domain_id: parseInt(formData.domain_id),
      remaining_roll_numbers: [],
    };

    if(formData.roll_number1 !== ''){
        requestBody.remaining_roll_numbers.push(parseInt(formData.roll_number1));
    }

    if(formData.roll_number2 !== ''){
        requestBody.remaining_roll_numbers.push(parseInt(formData.roll_number2));
    }

    axios
      .post(`${appVars.backendUrl}/api/group/create`, requestBody, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(() => {
        //console.log(res.data);
        toast.success("Group Created!");
        setTimeout(()=>{
            navigate('/student/chat')
        },1000)
      })
      .catch((e) => {
        toast.error(e.response.message || "Group not created!");
        console.log(e);
      }).finally(()=>{
        // setTimeout(()=>{
        //     navigate('/student/chat')
        // },1000)
      })
   }

  function handleLogOut() {
    setLoading(true);
    setUser(null);
    removeFromLocal("user");

    let url = `${appVars.backendUrl}/api/student/logout`;
    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch(() => {
        toast.error("Logout failed!");
      })
      .finally(() => {
        navigate("/");
      });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full">
        <button
          className="bg-black text-white p-1 m-3 rounded-md relative"
          onClick={handleLogOut}
        >
          LogOut
        </button>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Toaster />
        <form
          ref={formRef}
          onSubmit={submitHandler}
          className="bg-slate-200 shadow-md rounded p-4 m-2 flex flex-col"
        >
          <label
            htmlFor="roll_number1"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Roll Number 1
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            id="roll_number1"
            name="roll_number1"
            onChange={handleChange}
          />

          <label
            htmlFor="roll_number2"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Roll Number 2
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            id="roll_number2"
            name="roll_number2"
            onChange={handleChange}
          />

          <label
            htmlFor="domain_id"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            DomainId
          </label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            value={formData.domain_id}
            name="domain_id"
            onChange={handleChange}
          >
            <option value="">Select Domain</option>
            {domains &&
              domains.map((domain) => (
                <option key={domain.id} value={domain.id}>
                  {domain.domain_name}
                </option>
              ))}
          </select>
          <button
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>

          {loading && <Loading />}
        </form>
      </div>
    </div>
  );
}