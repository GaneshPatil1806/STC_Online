import { useEffect, useState } from "react";
import { appVars } from "../conf/conf";
import axios from "axios";
import useUser from "../context/UserContext";

export default function ShowNotify() {

  const { user } = useUser();
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    if (user) {
      let url = `${appVars.backendUrl}/api/studentDashboard/getBroadcasts`;
      if (user.type === 'teacher') {
        url = `${appVars.backendUrl}/api/teacherDashboard/getBroadcasts`;
      }
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => {
          setNotice(res.data.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [user, notice]);

  return (
    <div className="left-[5%] w-full lg:w-[25%] bg-[#71C9CE] flex items-center flex-col h-screen border border-r-slate-400 border-l-slate-400">
      <p className="font-bold m-5">Notices!</p>
      <div className='h-[100%] top-0 left-0 right-0' style={{ overflowWrap: 'break-word' ,overflow:'auto'
    }}>
        {notice.length > 0 ?
          notice.map((msg) => (
            <div key={msg.id} className='p-2 bg-[#CBF1F5] rounded-lg m-2'>
              <h2 className='font-bold'>{msg.title}</h2>
              <p>{msg.message}</p>
              {/* <p>{msg.created_at.toString()}</p> */}
            </div>
          ))
          :
          <p className='text-center'>No new notices!</p>
        }
      </div>
    </div>
  )
}
