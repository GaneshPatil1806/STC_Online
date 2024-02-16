import { Link } from "react-router-dom"

function Dashboard() {
  return (
    <div className="flex flex-wrap justify-center items-center">
        
        <Link to='addDomain' className="h-60 w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
            <div className="p-3 font-bold text-xl">Add Domain</div>
        </Link>

        <Link to='getDomain' className="h-60 w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
            <div className="p-3 font-bold text-xl">Get Domain</div>
        </Link>

        <Link to='addTeacher' className="h-60 w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
            <div className="p-3 font-bold text-xl">Add Teacher</div>
        </Link>

        <Link to='getTeacher' className="h-60 w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
            <div className="p-3 font-bold text-xl">Get Teacher</div>
        </Link>

        <Link to='addGroup' className="h-60 w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
            <div className="p-3 font-bold text-xl">Add Group</div>
        </Link>

        <Link to='getGroups' className="h-60 w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
            <div className="p-3 font-bold text-xl">Get Group</div>
        </Link>

        <Link to='addStudent' className="h-60 w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
            <div className="p-3 font-bold text-xl">Add Student</div>
        </Link>

        <Link to='getStudent' className="h-60 w-[25%] bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg m-5 flex justify-center items-center">
            <div className="p-3 font-bold text-xl">Get Student</div>
        </Link>

    </div>
  )
}

export default Dashboard