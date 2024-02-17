/* eslint-disable no-unused-vars */
import { LuSendHorizonal } from "react-icons/lu";
import { GrAttachment } from "react-icons/gr";
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
import { getFromLocal } from "../assets/local";

function Chat() {
  const [message, setMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };
  useEffect(() => {
    if (user && user.token) {
      setLoading(false)
    }
  }, [loading, user])


  useEffect(() => {

    if (user) {
      axios.get(`${appVars.backendUrl}/api/teacherDashboard/teacherGroups`, {
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


  const onGroupClick = (groupId) => {
    setActiveGroupId(groupId);
  };

  return (
    loading ? <Loading /> : (
      <div className="flex flex-row h-screen">
        {/* Sidebar */}
        <div className="w-14 lg:w-15 h-screen border border-r-grey flex flex-col items-center bg-gray-100">
          {/* Sidebar content */}
        </div>

        {/* Group list or profile */}
        {showProfile ? (
          <Profile isVisible={showProfile} />
        ) : (
          <div className={`w-full lg:w-[30%] border border-r-black ${activeGroupId !== null ? 'hidden sm:block' : ''}`}>
            {/* Group list */}
            {/* STC */}
            <div className="h-12 lg:h-[10%] border border-b-grey flex items-center justify-center">
              <p>STC</p>
            </div>

            {/* Group list */}
            <div className="h-[90%] overflow-y-auto">
              <ul className="list-none flex flex-col">
                {groups && groups.map((group) => (
                  <Link to={`group/${group.id}`} key={group.id}>
                    <GroupCard
                      group={group}
                      onGroupClick={() => onGroupClick(group.group_id)}
                      activeGroupId={activeGroupId}
                    />
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Chat section */}
        <div className={`flex flex-col h-screen w-full lg:w-[65%] ${activeGroupId ? `${showProfile ? 'hidden lg:block' : ''}` : 'hidden'}`}>
          {/* Content */}
          <div className="flex items-center h-12 lg:h-[10%] border border-b-grey px-4">
            <Link to={``}>
              <AiOutlineLeft className="w-6 h-6 text-gray-500 hover:text-black" onClick={() => onGroupClick('')} />
            </Link>
            {activeGroupId !== null && <ChatHeader activeGroupId={activeGroupId} />}
          </div>

          <div className="h-[80%]">
            <ChatCard />
          </div>

          <div className="flex justify-between items-center border px-4 h-[10%]">
            {/* Attachment icon */}
            <GrAttachment className="max-w-8 max-h-8 w-6 h-6 cursor-pointer" />
            {/* Text input */}
            <div className="flex flex-col justify-center items-center w-[90%] h-[95%] overflow-hidden">
              <textarea className="w-full rounded-xl px-2 resize-none overflow-hidden"
                value={message} onChange={handleChange} placeholder="Type a message..."
              />
            </div>
            {/* Send icon */}
            <LuSendHorizonal className="max-w-8 max-h-8 w-6 h-6 flex items-center cursor-pointer" />
          </div>
        </div>
      </div>
    )
  );
}  