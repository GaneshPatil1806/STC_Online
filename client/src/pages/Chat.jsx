/* eslint-disable no-unused-vars */
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import ChatCard from "../components/ChatCard";
import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import useUser from "../context/UserContext";
import Loading from "../common/Loading";
import axios from "axios";
import { appVars } from "../conf/conf";
import ShowNotify from "./ShowNotify";
import { AiTwotoneNotification } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import toast, { Toaster } from 'react-hot-toast';

function Chat() {

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeGroup, setActiveGroup] = useState({ id: null, name: null });
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const [fileName, setFileName] = useState("No File Selected");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSizeExceed, setFileSizeExceed] = useState(false);
  const [fileSize, setFileSize] = useState(0);

  const toggleProfile = () => {
    setShowProfile((prev) => (!prev));
  };

  const toggleNotify = () => {
    setShowNotifications((prev) => (!prev))
  };

  const onGroupClick = (group) => {
    setActiveGroup({ id: group.id, name: group.group_name });
  };

  useEffect(() => {
    if (user && user.token) {
      setLoading(false)
    }
  }, [loading, user])

  useEffect(() => {

    if (user) {
      let url = `${appVars.backendUrl}/api/studentDashboard/studentGroups`;

      if (user.type === 'teacher') {
        url = `${appVars.backendUrl}/api/teacherDashboard/teacherGroups`;
      } else {
        //url = 
      }
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => {
          setGroups(res.data.data);
          res.data.data.length === 0 && user.type === 'student' ? navigate('/student/createGroup') : ''
          setLoading(false);
        })
        .catch(() => setLoading(false))
    }
  }, [user, navigate]);

  const handleFileUpload = (e) => {
    const formData = {};
    let file = e.target.files[0];
    formData["file"] = file;
    let url = `${appVars.backendUrl}/api/uploadFile/abstract`;

    axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success('Upload success!');
        //console.log("Upload success!", res);
        setFileName("No File Selected");
        setSelectedFile(null);
        setFileSizeExceed(false);
        setFileSize(0);
      })
      .catch((error) => {
        toast.error(error.response.data.message || 'Upload error');
      });
  };

  return (
    loading ? <Loading /> :
      <div className={`flex flex-row h-screen ${!activeGroup.id ? 'bg-slate-200' : ''}`}>

        <Toaster/>

        {/* Sidebar */}                                                                   
        <div className="w-20 lg:w-[5%] h-screen border border-r-grey flex flex-col items-center bg-[#CBF1F5]">
          <p className="flex justify-center items-center h-10 w-10 md:h-10 md:w-10 my-2 cursor-pointer bg-[#71C9CE] rounded-lg text-black hover:bg-[#A6E3E9] hover:text-black" onClick={toggleProfile}>
            {user && user.type === "teacher" ? user[user.type].name.charAt(0).toUpperCase() : user[user.type].first_name.charAt(0).toUpperCase()}
          </p>
          <AiTwotoneNotification className="flex justify-center items-center h-10 w-10 md:h-10 md:w-10 my-2 cursor-pointer bg-[#71C9CE] rounded-lg text-black hover:bg-[#A6E3E9] hover:text-black" onClick={toggleNotify} />
        </div>

        {/* Group list */}

        {showProfile ? <Profile isVisible={showProfile} /> :
          showNotifications ? <ShowNotify /> : <div className={`w-full lg:w-[25%] border border-r-slate-400 border-l-slate-400 ${activeGroup.id !== null ? 'hidden sm:block' : ''}`}>
            {/* STC */}
            <div className="h-12 lg:h-[10%] border bg-[#71C9CE] border-b-slate-400 flex items-center justify-center relative">
              <p className="fixed">STC</p>
              { groups.length > 0 && groups[0].fk_teacher && <CiMenuKebab className={`relative ml-auto mr-2 rounded-lg text-2xl cursor-pointer p-1 ${showMenu ? 'bg-slate-300' : ''}`} onClick={() => setShowMenu((prev) => !prev)} />}
              { user.type === 'student' && showMenu && (
                  <ul className="absolute mt-20 -right-16 bg-white border border-black p-2 rounded-lg">
                    <label htmlFor="uploadBanner" className="cursor-pointer">
                    Upload file
                    <input
                      id="uploadBanner"
                      type="file"
                      accept=".xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                      onChange={handleFileUpload}
                      hidden
                    />
                    </label>
                  </ul>
                )}
            </div>

            {/* Group list */}
            <div className="h-[90%] overflow-y-auto bg-[#E3FDFD]">
              <ul className="list-none flex flex-col">
                {groups.length > 0 && groups[0].fk_teacher ? groups.map((group) => (
                  <Link to={`group/${group.id}`} key={group.id}>
                    <GroupCard group={group} onGroupClick={onGroupClick} activeGroup={activeGroup} />
                  </Link>
                )) : <div className="flex flex-col justify-center items-center"><p className="p-2">No {user.type === 'student' ? 'teacher is' : 'students are'} assigned yet.</p></div>}
              </ul>
            </div>
          </div>}

        {/* Chat section */}
        <div className={`flex flex-col h-screen w-full lg:w-[70%]  overflow-hidden ${activeGroup.id !== null ? `${showProfile ? 'hidden lg:block' : ''}` : 'hidden'}`}>
          {/* Content */}

          <div className="flex items-center bg-[#A6E3E9] h-12 lg:h-[10%] border border-b-slate-400 px-4">
            <Link to={``}><AiOutlineLeft className="w-6 h-6 text-gray-500 hover:text-black" onClick={() => setActiveGroup({ id: null, name: null })} /></Link>
            {activeGroup.id !== null && <ChatHeader activeGroup={activeGroup} />}
          </div>

          <div className="h-[90%]">
            <ChatCard />
          </div>
        </div>
      </div>
  );
}

export default Chat;
