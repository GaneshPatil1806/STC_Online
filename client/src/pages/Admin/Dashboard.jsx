import { Link, useNavigate } from "react-router-dom"
import useUser from "../../context/userContext"
import axios from "axios";
import { appVars } from "../../conf/conf";
import toast,{Toaster} from "react-hot-toast";
import { removeFromLocal } from "../../assets/local";
import { useEffect, useState } from "react";
import Loading from "../../common/Loading";

function Dashboard() {

    const {admin,setAdmin} = useUser();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)

    function logOutHandler() {
        
        setLoading(true);
        removeFromLocal('admin');
        axios
          .post(`${appVars.backendUrl}/api/admin/logout`, {}, {
            headers: {
              Authorization: `Bearer ${admin.token}`,
            },
          })
          .then((res) => {
            setAdmin(null);
            //console.log('admin logged out');
            toast.success(res.data.message);
          })
          .catch(() => {
            //toast.error('Logout failed!');
          })
          .finally(() => {
            setTimeout(() => {
                navigate('/');
            }, 2000);
          });
    }

    useEffect(() => {
        if (!admin) {
          navigate('/');
        }
    }, [admin, navigate]);
            
    return (

        <div>
            <Toaster/>
            <button className="flex text-white bg-black p-2 m-4 rounded-md ml-auto" onClick={logOutHandler}>Logout</button>

            <div className="flex flex-wrap justify-center items-center p-10 absolute">

                <Link to='addDomain' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Add Domain</div>
                </Link>

                <Link to='getDomains' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Get Domains</div>
                </Link>

                <Link to='addTeacher' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Add Teacher</div>
                </Link>

                <Link to='getTeachers' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Get Teachers</div>
                </Link>

                <Link to='addGroup' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Add Group</div>
                </Link>

                <Link to='getGroups' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Get Groups</div>
                </Link>

                <Link to='addStudent' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Add Student</div>
                </Link>

                <Link to='getStudents' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Get Students</div>
                </Link>

                <Link to='assignGroups' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Assign Groups</div>
                </Link>

                <Link to='assignTeacherDomains' className="h-[60%] w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
                    <div className="p-3 font-bold text-xl">Assign Teacher Domains</div>
                </Link>

            </div>

            {loading && <Loading/>}

        </div>

    )
}

export default Dashboard