import { LuSendHorizonal } from "react-icons/lu";
import { GrAttachment } from "react-icons/gr";
import { useState } from "react";
import ChatCard from "./chatCard";
import pictLogo from '../assets/images/pict-logo.jpg'
import Profile from "./Profile";

function Chat() {

  const [message, setMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="flex">
      <div className="w-[5%] h-[100vh] border border-r-black flex flex-col items-center">
        {/* add profile and other stuff */}
        <img src={pictLogo} alt="Logo" className="h-10 w-10 my-2 cursor-pointer" onClick={toggleProfile} />
        <img src={pictLogo} alt="Logo" className="h-10 w-10 my-2 cursor-pointer" onClick={toggleProfile} />
      </div>

      {showProfile && <Profile/>}

      <div className="flex flex-col w-[30%] h-[100vh] border border-r-black">

        <div className="h-[10%] border border-b-black relative flex items-centers justify-center">
          <input type="text" id="search" placeholder="Enter your search here" className="border border-b w-[90%] m-2 rounded-xl p-2" />
        </div>

        <div className="h-[90%]">
          <ul className="list-none flex flex-col">
            <ChatCard Name={"Ganesh"}></ChatCard>
            <ChatCard Name={"Ganesh"}></ChatCard>
          </ul>
        </div>
      </div>

      <div className="flex flex-col w-[65%] h-[100vh] border">
        <div className="flex flex-col h-[10%] border border-b-black">
          <p className="h-[50%] px-5 text-xl">Group Name</p>
          <p className="h-[50%] px-5">Tanmay, Vishal, Ganesh</p>
        </div>

        <div className="h-[80%]">
          <div id="messages" className="flex flex-col space-y-4 p-3 overflow-hidden">
            {/* Your chat messages go here */}
          </div>
        </div>

        <div className="flex justify-between items-center h-[10%] border border-t-black px-4">
          {/* pdf */}
          <GrAttachment className="justify-center max-w-8 max-h-8 w-6 h-6 cursor-pointer" />

          {/* chat */}
          <div className="flex flex-col justify-center items-center w-[90%] h-[95%] overflow-hidden">
            <textarea
              className="w-[90%] h-auto py-4 rounded-xl px-2 resize-none overflow-hidden"
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