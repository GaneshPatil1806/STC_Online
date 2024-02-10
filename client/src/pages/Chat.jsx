import { LuSendHorizonal } from "react-icons/lu";
import { GrAttachment } from "react-icons/gr";
import { useState } from "react";
import GroupCard from "../components/GroupCard";
import ChatCard from "../components/ChatCard";
import pictLogo from '../assets/images/pict-logo.jpg'
import Profile from "./Profile";
import { data } from "../assets/data";
import { Link } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import useUser from "../context/userContext";

function Chat() {

  const [message, setMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const {user} = useUser();

  return (
    <div className="flex">
        <div className="w-[3rem] lg:w-[4rem] h-screen border border-r-grey flex flex-col items-center">
          {/* add profile and other stuff */}
          <p className="flex justify-center items-center h-7 w-7 md:h-10 md:w-10 my-2 cursor-pointer bg-gray-300 rounded-lg text-black hover:bg-black hover:text-white" onClick={toggleProfile} >{user.username.charAt(0)}</p>
          <img src={pictLogo} alt="Logo" className="h-10 w-10 my-2 cursor-pointer" onClick={toggleProfile} />
        </div>

      {showProfile && <Profile isVisible={showProfile} />}

      <div className="flex flex-col w-[20rem] lg:w-[30%]">
         {/* search bar */}
        <div className="h-12 lg:h-[10%] border border-b-grey flex items-centers justify-center">
          <input type="text" id="search" placeholder="Enter your search here" className="w-[90%] m-1 p-1" />
        </div>

        <div className="h-[90%]">

          <ul className="list-none flex flex-col">
            {data.groups.map((group) => (
              <Link to={`group/${group.id}`} key={group.id}>
                <GroupCard group={group} />
              </Link>
            ))}
          </ul>

        </div>
      </div>

      <div className="flex flex-col w-[65%] border">
        <div className="flex flex-col h-12 lg:h-[10%] border border-b-grey">
          <ChatHeader/>
        </div>

        <div className="h-[80%]">
          <div id="messages" className="flex flex-col space-y-4 p-3 overflow-hidden">
            {<ChatCard />}
          </div>
        </div>

        <div className="flex justify-between items-center h-12 border px-1">
          {/* pdf */}
          <GrAttachment className="justify-center max-w-8 max-h-8 w-6 h-6 cursor-pointer" />

          {/* Group */}
          <div className="flex flex-col justify-center items-center w-[90%] h-[95%] overflow-hidden">
            <textarea
              className="w-[90%] rounded-xl px-2 resize-none overflow-hidden"
              value={message}
              onChange={handleChange}
              placeholder="Type a message..."
            />
          </div>

          {/* send */}
          <LuSendHorizonal className="justify-center max-w-8 max-h-8 w-6 h-6 flex items-center cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Chat;