/* eslint-disable no-unused-vars */
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import ChatCard from "../components/ChatCard";
import pictLogo from '../assets/images/pict-logo.jpg';
import Profile from "./Profile";
import { data } from "../assets/data";
import { Link, useNavigate } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import useUser from "../context/userContext";
import Loading from "../common/Loading";
import axios from "axios";
import { appVars } from "../conf/conf";

function Chat() {

  const [showProfile, setShowProfile] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const onGroupClick = (groupId) => {
    setActiveGroupId(groupId);
  };

  useEffect(() => {
    if (user && user.token) {
      setLoading(false)
    }
  }, [loading, user])


  useEffect(() => {

    if (user) { 
      let url = `${appVars.backendUrl}/api/studentDashboard/studentGroups`;

      if(user.type === 'teacher'){
        url = `${appVars.backendUrl}/api/teacherDashboard/teacherGroups`;
      }else{
        //url = 
      }
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => {
          //console.log(res.data.data);
          setGroups(res.data.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  //console.log(user);

  return (
    loading ? <Loading /> : <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div className="w-14 lg:w-[5%] h-screen border border-r-grey flex flex-col items-center bg-gray-100">
        <p className="flex justify-center items-center h-7 w-7 md:h-10 md:w-10 my-2 cursor-pointer bg-gray-300 rounded-lg text-black hover:bg-black hover:text-white" onClick={toggleProfile}>
         {/* {user && user.type === "teacher" ? user[user.type].name.charAt(0).toUpperCase() : user.type.first_name.charAt(0).toUpperCase()} */}
        </p>
        <img src={pictLogo} alt="Logo" className="h-10 w-10 my-2 cursor-pointer" onClick={toggleProfile} />
      </div>

      {/* Group list */}

      {showProfile ? <Profile isVisible={showProfile} type={user?.type}/> :

        <div className={`w-full lg:w-[25%] border border-r-black ${activeGroupId ? 'hidden sm:block' : ''}`}>
          {/* STC */}
          <div className="h-12 lg:h-[10%] border border-b-grey flex items-center justify-center">
            <p>STC</p>
          </div>

          {/* Group list */}
          <div className="h-[90%] overflow-y-auto bg-slate-200">
            <ul className="list-none flex flex-col">
              {groups && groups.map((group) => (
                <Link to={`group/${group.id}`} key={group.id}>
                  <GroupCard group={group} onGroupClick={() => onGroupClick(group.group_id)} activeGroupId={group.group_id} />
                </Link>
              ))}
            </ul>
          </div>
        </div>}

      {/* Chat section */}
      <div className={`flex flex-col h-screen w-full lg:w-[70%]  overflow-hidden ${activeGroupId ? `${showProfile ? 'hidden lg:block' : ''}` : 'hidden'}`}>
        {/* Content */}

        <div className="flex items-center h-12 lg:h-[10%] border border-b-grey px-4">
          <Link to={``}><AiOutlineLeft className="w-6 h-6 text-gray-500 hover:text-black" onClick={()=>onGroupClick(null)} /></Link>
          {activeGroupId && <ChatHeader activeGroupId={activeGroupId}/>}
        </div>

        <div className="h-[90%]">
          <ChatCard activeGroupId={activeGroupId}/>
        </div>
      </div>
    </div>
  );
}

export default Chat;
