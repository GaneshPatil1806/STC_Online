import loginLogo from '../assets/images/login-logo.jpg';
import pictLogo from '../assets/images/pict-logo.jpg';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useUser, { UserContext } from '../context/userContext';

function Login({ type }) {
    const navigate = useNavigate();

    const {user,setUser} = useUser();

    function LoginHandler(e) {
        e.preventDefault();
        // verification
        navigate('chat');
    }

    function changeHandler(e) {
        const { name, value } = e.target;
        
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
        <UserContext.Provider value={user}>
            <div className="flex h-screen bg-white">
                <div className="w-6/12 relative">
                    <img className="absolute top-0 left-0 w-50 h-50 z-10" src={pictLogo} alt="Pict Logo" />
                    <img src={loginLogo} className="h-screen" alt="Login Logo" />
                </div>

                {type ? (
                    <div className="w-6/12 flex flex-col justify-center items-center">
                        <span className="text-xl mb-5">{type.toUpperCase()}</span>

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
                                    value={user.username}
                                    onChange={changeHandler}
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
                                    value={user.password}
                                    onChange={changeHandler}
                                />
                            </div>

                            <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
                                onClick={LoginHandler}>
                                Submit
                            </button>
                        </form>

                        <Link to="/">
                            <p className="text-slate-500"> <FaArrowAltCircleLeft className="w-8 h-8 cursor-pointer" />BACK</p>
                        </Link>

                    </div>
                ) : (
                    <div className="w-6/12 flex flex-col justify-center items-center border border-solid border-white">
                        <div className="flex flex-col justify-center items-center gap-10">
                            <span className="text-black text-3xl font-semibold">LOGIN</span>
                            <div className="flex gap-10">
                                <Link to="/teacher">
                                    <button className="bg-slate-200 text-black px-5 py-2 rounded-lg text-xl shadow-inner">TEACHER</button>
                                </Link>

                                <Link to="/student">
                                    <button className="bg-slate-200 text-black px-5 py-2 rounded-lg text-xl shadow-inner">STUDENT</button>
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