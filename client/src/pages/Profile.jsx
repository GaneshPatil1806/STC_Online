/* eslint-disable react/prop-types */
import { useState } from 'react';
import profileLogo from '../assets/images/profile.jpg';
import { IoIosCloseCircle } from 'react-icons/io';
import { getFromLocal, removeFromLocal } from '../assets/local'
import { useNavigate } from 'react-router-dom';
import useUser from '../context/userContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { appVars } from '../conf/conf';
import Loading from '../common/Loading';

function Profile({type}) {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useUser();

  function passwordHandler() {
    // change password stuff
  }

  function handleLogOut() {
    
    setLoading(true);
    axios.post(`${appVars.backendUrl}/api/${user.type === 'teacher' ? 'teacher' : 'student' }/logout`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        removeFromLocal('user');
        setLoading(false);
        setUser(null);
        toast.success(res.data.message);
      })
      .catch(() => {
        toast.error('Logout failed!');
      })
      .finally(() => {
        setTimeout(() => {
          navigate('/');
        }, 1000);
      });
  }

  return (
    <div className="left-[5%] w-full lg:w-[25%] bg-white flex items-center flex-col h-screen">

      <Toaster/>
      {loading && <Loading/>}
      <h2 className="text-black p-3 text-xl font-medium">Profile</h2>
      {displayEdit ? (
        <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <button
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
            type="submit"
            onClick={passwordHandler}
          >
            Submit
          </button>
        </form>
      ) : <>

        <img className="w-[50%] md:w-[80%]" src={profileLogo} alt="Profile" />
        <p>{user && user.type === 'teacher' ? user.teacher.name : user.student.first_name}</p>
        <p>{user && user[type].email}</p>

        <p>Other info...</p>

        <button className='bg-black text-white p-1 m-3 rounded-md' onClick={handleLogOut}>LogOut</button>
      </>}

      <button onClick={() => setDisplayEdit((prev) => (!prev))}>{displayEdit ? <div className='flex flex-col'><IoIosCloseCircle className="text-3xl" /> <p>Close</p></div> : <p className='text-white bg-black rounded p-2'>Edit Password</p>}</button>

    </div>
  );
}

export default Profile;