import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { appVars } from "../../conf/conf";
import useUser from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { removeFromLocal } from "../../assets/local";
import Loading from "../../common/Loading";

export default function CreateGroup() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const [grpNumber, setGrpNumber] = useState('2');

  const [formData, setFormData] = useState({
    domain_id: "",
    roll_number2: "",
    roll_number3: "",
  });

  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${appVars.backendUrl}/api/domain/student`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setDomains(res.data.data);
      })
      .catch((e) => console.error(e));
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

    if (formData.roll_number2 !== '') {
      requestBody.remaining_roll_numbers.push(parseInt(formData.roll_number2));
    }

    if (formData.roll_number3 !== '') {
      requestBody.remaining_roll_numbers.push(parseInt(formData.roll_number3));
    }

    axios
      .post(`${appVars.backendUrl}/api/group/create`, requestBody, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(() => {
        toast.success("Group Created!");
        setTimeout(() => {
          navigate('/student/chat');
        }, 1000);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Group not created!");
        console.error(e);
      })
      .finally(() => {
        // Add any cleanup or additional logic here
      });
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
    <div className="flex flex-col items-center bg-[#71C9CE] h-screen">
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
          className="bg-[#E3FDFD] shadow-md rounded p-4 m-2 flex flex-col"
        >
          <label
            htmlFor="grpnumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select the number of students
          </label>
          <select
            className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            value={grpNumber || '2'}
            name="grpnumber"
            onChange={(e) => setGrpNumber(e.target.value)}
          >
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <label
            htmlFor="roll_number1"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Student 1
          </label>
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 cursor-not-allowed"
            type="text"
            id="roll_number1"
            name="roll_number1"
            value={user.type === 'student' && user['student'].roll_number}
            disabled
          />

          <label
            htmlFor="roll_number2"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Student 2
          </label>
          <input
            className="shadow appearance-none border border-black  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            id="roll_number2"
            name="roll_number2"
            onChange={handleChange}
          />

          {grpNumber === '3' && (
            <><label
              htmlFor="roll_number3"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Student 3
            </label>
              <input
                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                type="text"
                id="roll_number3"
                name="roll_number3"
                onChange={handleChange}
              /></>
          )}

          <label
            htmlFor="domain_id"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            DomainId
          </label>
          <select
            className="border border-black  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
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
          <button className="bg-[#71C9CE] hover:bg-[#A6E3E9] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>

          {loading && <Loading />}
        </form>
      </div>
    </div>
  );
}