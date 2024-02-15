import { useState } from 'react';
import profileLogo from '../assets/images/profile.jpg';
import { IoIosCloseCircle } from 'react-icons/io';
import {removeFromLocal} from '../assets/local'
import { useNavigate } from 'react-router-dom';
import useUser from '../context/userContext';

function Profile() {
  const [displayEdit, setDisplayEdit] = useState(false);

  const navigate = useNavigate();
  const {user,setUser} = useUser();
  const type = user.type

  function passwordHandler() {
    // change password stuff
  }

  function handleLogOut(){
    removeFromLocal('user');
    setUser('')
    navigate('/')
  }

  return (
    <div className="left-[5%] w-full lg:w-[30%] bg-white flex items-center flex-col h-screen">

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
        <p>{user[type].first_name}</p>
        <p>Other info...</p>

        <button className='bg-black text-white p-1 m-3 rounded-md' onClick={handleLogOut}>LogOut</button>
      </>}

      <button onClick={() => setDisplayEdit((prev) => (!prev))}>{displayEdit ? <div className='flex flex-col'><IoIosCloseCircle className="text-3xl" /> <p>Close</p></div> : <p className='text-white bg-black rounded p-2'>Edit Password</p>}</button>

    </div>
  );
}

export default Profile;