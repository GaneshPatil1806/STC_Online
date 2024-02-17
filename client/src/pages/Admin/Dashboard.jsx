import { Link, useNavigate } from "react-router-dom"
import useUser from "../../context/userContext"
import axios from "axios";
import { appVars } from "../../conf/conf";
import toast,{Toaster} from "react-hot-toast";
import { removeFromLocal } from "../../assets/local";
import { useEffect } from "react";

function Dashboard() {

    const {admin} = useUser();
    const navigate = useNavigate();

    function logOutHandler() {
        removeFromLocal('admin');
        axios
          .post(`${appVars.backendUrl}/api/admin/logout`, {}, {
            headers: {
              Authorization: `Bearer ${admin.token}`,
            },
          })
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch(() => {
            //toast.error('Logout failed!');
          })
          .finally(() => {
            setTimeout(() => {
                navigate('/');
            }, 1000);
          });
    }

    useEffect(() => {
        if (!admin.token) {
          navigate('/');
        }
    }, [admin.token, navigate]);
            
    return (
        <div>
            <Toaster/>
            <button className="flex text-white bg-black p-2 m-4 rounded-md ml-auto" onClick={logOutHandler}>Logout</button>

            <div className="flex flex-wrap justify-center items-center p-10 absolute">

                <Link to='addDomain' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Add Domain</div>
                </Link>

                <Link to='getDomains' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Get Domain</div>
                </Link>

                <Link to='addTeacher' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Add Teacher</div>
                </Link>

                <Link to='getTeachers' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Get Teacher</div>
                </Link>

                <Link to='addGroup' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Add Group</div>
                </Link>

                <Link to='getGroups' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Get Group</div>
                </Link>

                <Link to='addStudent' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Add Student</div>
                </Link>

                <Link to='getStudents' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Get Student</div>
                </Link>

            </div>

        </div>

    )
}

export default Dashboard