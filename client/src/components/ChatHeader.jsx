/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useUser from "../context/UserContext";
import axios from "axios";
import { appVars } from "../conf/conf";

export default function ChatHeader({activeGroup}) {
  const {id}= useParams();
  const {user} = useUser();

  const [data,setData] = useState([]);

  useEffect(() => {

    if (user) { 

      let url = `${appVars.backendUrl}/api/${user?.type}Dashboard/studentsUnderGroup/${id}`;

      if(user.type === 'student'){
        url = `${appVars.backendUrl}/api/${user?.type}Dashboard/studentsUnderGroup`;
      }
      axios.get(url , {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => {
          setData(res.data.data);
          // setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, [user,id]);

  return (
    <div>
        <p className="px-5 text-sm font-bold">{activeGroup.name.toUpperCase()}</p>
        <p className="h-[50%] px-5">
          {data && data.map((student,index)=>(
            <span key={student.id}>{student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1)}{index+1==data.length ? '' :','} </span>
          ))}
        </p>
    </div>
  )
}
