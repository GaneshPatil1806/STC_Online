import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { appVars } from '../../conf/conf'
import axios from "axios";
import { storeInLocal } from '../../assets/local'
import useUser from '../../context/UserContext/'

import { UserProvider } from "../../context/UserContext";
import Loading from "../../common/Loading";
import toast,{ Toaster } from "react-hot-toast";

function Admin() {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const [dummyUser, setDummyUser] = useState({
    username: '',
    password: '',
  });
  const { admin, setAdmin } = useUser();

  function LoginHandler(e) {
    setLoading(true)
    e.preventDefault();

    axios.post(`${appVars.backendUrl}/api/admin/login`, dummyUser)
      .then((res) => {
        //toast.success(res.data.message);
        setLoading(false);
        const adminData = res.data.data;
        let data = JSON.stringify({ ...adminData });
        storeInLocal('admin', data);
        setAdmin(adminData); 
        setTimeout(() => {
          navigate('dashboard');
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Login Failed!');
      });
  }

  useEffect(() => {
    if (admin && admin.token) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

  function changeHandler(e) {
    const { name, value } = e.target;

    setDummyUser({
      ...dummyUser,
      [name]: value
    })
  }

  return (
      <UserProvider value={admin}>
        <div className="w-full flex flex-col justify-center items-center h-screen">
          <p className="text-xl p-2 font-bold">Admin Login</p>
          <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                USERNAME
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="username"
                value={dummyUser.username}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={dummyUser.password}
                onChange={changeHandler}
              />
            </div>

            <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={LoginHandler}>
              Submit
            </button>

            {loading && <Loading/>}
            <Toaster/>
          </form>
        </div>
      </UserProvider>
  )
}

export default Admin