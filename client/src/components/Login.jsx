import pictlogo2 from '../assets/images/pictlogo2.png';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useUser, { UserContext } from '../context/UserContext/';
import axios from 'axios';
import { storeInLocal } from '../assets/local';
import { useState, useEffect } from 'react';
import {appVars} from '../conf/conf'
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../common/Loading';

function Login ({ type }) {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)

    const [dummyUser,setDummyUser] = useState({
        email:'',
        password:'',
    });

    const { user,setUser } = useUser();

    function LoginHandler(e){
        setLoading(true);
        e.preventDefault();
    
        axios.post(`${appVars.backendUrl}/api/${type}/login`, dummyUser)
          .then((res) => {
            //toast.success(res.data.message);
            const data = JSON.stringify({ ...res.data.data, type: type });
            storeInLocal('user', data);
            setUser(JSON.parse(data));
            
            setTimeout(() => {
              setLoading(false);
              navigate(`chat`);
            }, 1000);
          })
          .catch((e) => {
            setLoading(false);
            toast.error(e.response.data.message || 'Login Failed!');
          });
    }
          
    function changeHandler(e) {
        const { name, value } = e.target;
        
        setDummyUser({
            ...dummyUser,
            [name]: value
        })
    }

    useEffect(() => {
        if (user && user.token) {
          navigate(`/${user.type}/chat`);
        }
    }, [user, navigate]);

    return (
        <UserContext.Provider value={user}>
            <div className="flex h-screen">
                <div className="lg:w-6/12 md:relative flex justify-center items-center">
                    <img src={pictlogo2} className="hidden md:block w-60 h-60 " alt="Login Logo" />
                </div>

                {type ? (
                    <div className="w-full lg:w-6/12 flex flex-col justify-center items-center lg:p-4 bg-[#71C9CE]">
                        <span className="text-xl mb-5">{type.toUpperCase()}</span>
                        <form className="bg-[#E3FDFD] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    EMAIL
                                </label>
                                <input
                                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="email"
                                    value={dummyUser.email}
                                    onChange={changeHandler}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    PASSWORD
                                </label>
                                <input
                                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={dummyUser.password}
                                    onChange={changeHandler}
                                />
                            </div>

                            {loading && <Loading/>}

                            <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={LoginHandler}>
                                Submit
                            </button>

                        </form>
                        
                        <Link to="/">
                            <p className="text-slate-500"> <FaArrowAltCircleLeft className="w-8 h-8 cursor-pointer" />BACK</p>
                        </Link>

                        <Toaster/>
                    </div>
                ) : (
                    <div className="flex flex-col w-full lg:w-6/12 relative bg-[#A6E3E9]">

                        <Link to="/admin" className='flex ml-5 h-[15%] absolute right-10'>
                        <button className="underline">ADMIN</button>
                        </Link>

                        <div className="flex flex-col justify-center items-center gap-10 h-[85%]">
                            <span className="text-black text-3xl font-semibold">LOGIN</span>
                            <div className="flex gap-10">

                                <Link to="/teacher">
                                    <button className="bg-slate-200 text-black px-5 py-2 rounded-lg text-xl shadow-inner border border-black">TEACHER</button>
                                </Link>

                                <Link to="/student">
                                    <button className="bg-slate-200 text-black px-5 py-2 rounded-lg text-xl shadow-inner border border-black">STUDENT</button>
                                </Link>

                            </div>
                        </div>

                    </div>
                )}
            </div>
        </UserContext.Provider>
    );
}

Login.propTypes = {
    type: PropTypes.string,
};

export default Login;