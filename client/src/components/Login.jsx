import  { useState } from 'react';
import loginLogo from '../assets/images/login-logo.jpg';
import pictLogo from '../assets/images/pict-logo.jpg'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [showForm, setShowForm] = useState(null);
    const navigate = useNavigate();

    function LoginHandler(){
        // Handle validations and routes
        navigate('/chat')
    }

    return (
        <div className="flex h-screen bg-white">
            
            <div className="w-6/12 relative">
                <img className="absolute top-0 left-0 w-50 h-50 z-10" src={pictLogo} alt="Pict Logo" />
                <img src={loginLogo} className="h-screen" alt="Login Logo" />
            </div>

            {!showForm && (
                    <div className="w-6/12 flex flex-col justify-center items-center border border-solid border-white">
                    <div className="flex flex-col justify-center items-center gap-10">
                        <span className="text-black text-3xl font-semibold">LOGIN</span>
                        <div className="flex gap-10">
                            <button className="bg-slate-200 text-black px-5 py-2 rounded-lg text-xl shadow-inner" onClick={()=>setShowForm('Teacher')}>
                                TEACHER
                            </button>
                            <button className="bg-slate-200 text-black px-5 py-2 rounded-lg text-xl shadow-inner" onClick={()=>setShowForm('Student')}>
                                STUDENT
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showForm && (

                <div className="w-6/12 flex flex-col justify-center items-center">
                    <span className='text-xl mb-5'>{showForm}</span>

                    <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>

                        <button
                            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" onClick={LoginHandler}
                        >
                            Submit
                        </button>
                    </form>
                    <p className="text-slate-500"><FaArrowAltCircleLeft className="w-8 h-8 cursor-pointer" onClick={()=>setShowForm(null)}/>BACK</p>
                </div>
            )}
        </div>
    );
}

export default Login;
