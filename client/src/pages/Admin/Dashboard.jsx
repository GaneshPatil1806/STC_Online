import { Link, useNavigate } from "react-router-dom"
import useUser from "../../context/UserContext"
import axios from "axios";
import { appVars } from "../../conf/conf";
import toast, { Toaster } from "react-hot-toast";
import { removeFromLocal } from "../../assets/local";
import { useEffect, useState } from "react";
import Loading from "../../common/Loading";

function Dashboard() {

    const { admin, setAdmin } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

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
                toast.success(res.data.message);
            })
            .catch(() => {
                //toast.error('Logout failed!');
            })
            .finally(() => {
                navigate('/');
            });
    }

    useEffect(() => {
        if (!admin) {
            navigate('/');
        }
    }, [admin, navigate]);

    let classVar = "h-[60%] w-[25%] bg-[#CBF1F5] rounded-lg m-5 flex justify-center items-center shadow-md border border-b-2 border-gray-700";

    return (

        <div className="bg-[#71C9CE] min-h-screen"> 
        <div className="bg-[#71C9CE] pr-2 pt-2">
            <Toaster />
            <button className="flex text-white bg-black p-2 rounded-md ml-auto " onClick={logOutHandler}>Logout</button>

            <div className="flex flex-wrap justify-center items-center p-10 absolute bg-[#71C9CE]">

                <Link to='addDomain' className={classVar}>
                    <div className="p-3 font-bold text-xl">Add Domain</div>
                </Link>

                <Link to='getDomains' className={classVar}>
                    <div className="p-3 font-bold text-xl">Get Domains</div>
                </Link>

                <Link to='addTeacher' className={classVar}>
                    <div className="p-3 font-bold text-xl">Add Teacher</div>
                </Link>

                <Link to='getTeachers' className={classVar}>
                    <div className="p-3 font-bold text-xl">Get Teachers</div>
                </Link>

                <Link to='addStudent' className={classVar}>
                    <div className="p-3 font-bold text-xl">Add Student</div>
                </Link>

                <Link to='getStudents' className={classVar}>
                    <div className="p-3 font-bold text-xl">Get Students</div>
                </Link>

                <Link to='assignGroups' className={classVar}>
                    <div className="p-3 font-bold text-xl">Assign Groups</div>
                </Link>

                <Link to='getGroups' className={classVar}>
                    <div className="p-3 font-bold text-xl">Get Groups</div>
                </Link>

                <Link to='assignTeacherDomains' className={classVar}>
                    <div className="p-3 font-bold text-xl">Assign Domains(Teacher)</div>
                </Link>

                <Link to='addNotice' className={classVar}>
                    <div className="p-3 font-bold text-xl">Add Notice</div>
                </Link>

                <Link to='fetchFinal' className={classVar}>
                    <div className="p-3 font-bold text-xl">Fetch Final Files</div>
                </Link>

            </div>

            {loading && <Loading />}
        </div></div>

    )
}

export default Dashboard