import { useState } from 'react'
import profileLogo from '../assets/images/profile.jpg'
import { IoIosCloseCircle } from "react-icons/io";

function Profile() {
  
  const [displayEdit,setDisplayEdit] = useState(false);

  function passwordHandler(){
    // change password stuff
  }

  return (
        <div className="absolute left-[5%] h-full w-[30%] bg-white flex items-center flex-col">
            
            <h2 className="text-black p-3 text-xl font-medium">Profile</h2>
            <img className='w-[50%]' src={profileLogo}/>
            <p>Name: Joshi Sir</p>
            <p>Other info...</p>

            <button className='text-xl bg-black px-2 text-white rounded-lg m-2' onClick={()=>setDisplayEdit((prev)=>!prev)}>{ displayEdit ? <IoIosCloseCircle className='text-3xl' /> : "Edit Password"}</button>

            {displayEdit && <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      New Password:
                  </label>
                  <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                  />
              </div>

              <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Conform Password:
                  </label>
                  <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                  />
              </div>

              <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2" type="submit"
                  onClick={passwordHandler}>
                  Submit
              </button>
          </form>}
    </div>
  )
}

export default Profile