import { LuSendHorizonal } from "react-icons/lu";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineLeft } from "react-icons/ai";
import { useState } from "react";
import GroupCard from "../components/GroupCard";
import ChatCard from "../components/ChatCard";
import pictLogo from '../assets/images/pict-logo.jpg';
import Profile from "./Profile";
import { data } from "../assets/data";
import { Link } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import useUser from "../context/userContext";

function Chat() {
  const [message, setMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const { user } = useUser();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const onGroupClick = (groupId) => {
    setActiveGroupId(groupId);
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div className="w-14 lg:w-15 h-screen border border-r-grey flex flex-col items-center bg-gray-100">
        <p className="flex justify-center items-center h-7 w-7 md:h-10 md:w-10 my-2 cursor-pointer bg-gray-300 rounded-lg text-black hover:bg-black hover:text-white" onClick={toggleProfile}>
          {user.username.charAt(0)}
        </p>
        <img src={pictLogo} alt="Logo" className="h-10 w-10 my-2 cursor-pointer" onClick={toggleProfile} />
      </div>

      {/* Group list */}

      {showProfile ? <Profile isVisible={showProfile} /> :

        <div className={`w-full lg:w-[30%]  ${activeGroupId ? 'hidden sm:block' : ''}`}>
          {/* Search bar */}
          <div className="h-12 lg:h-[10%] border border-b-grey flex items-center justify-center">
            <input type="text" id="search" placeholder="Enter your search here" className="w-[90%] m-1 p-1" />
          </div>

          {/* Group list */}
          <div className="h-[90%] overflow-y-auto">
            <ul className="list-none flex flex-col">
              {data.groups.map((group) => (
                <Link to={`group/${group.id}`} key={group.id}>
                  {/* Pass the group.id to onGroupClick */}
                  <GroupCard group={group} onGroupClick={() => onGroupClick(group.id)} activeGroupId={activeGroupId} />
                </Link>
              ))}
            </ul>
          </div>
        </div>}

      {/* Chat section */}
      <div className={`flex flex-col h-screen w-full lg:w-[65%] ${activeGroupId ? `${showProfile ? 'hidden lg:block' : ''}` : 'hidden'}`}>
        {/* Content */}

        <div className="flex items-center h-12 lg:h-[10%] border border-b-grey px-4">
          <Link to={``}><AiOutlineLeft className="w-6 h-6 text-gray-500 hover:text-black" onClick={() => onGroupClick(null)} /></Link>
          <ChatHeader/>
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
  );
}

export default Chat;
