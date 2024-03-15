/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { appVars } from "../conf/conf";
import useUser from "../context/UserContext";
import { json, useParams } from "react-router-dom";
import "react-chat-elements/dist/main.css";
import { TiAttachmentOutline } from 'react-icons/ti'
import { LuSend } from 'react-icons/lu'
import toast, { Toaster } from 'react-hot-toast';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { formatDistanceToNow , format } from 'date-fns';
import { MdDelete } from "react-icons/md";

export default function ChatCard() {
  const { id } = useParams();
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const [fileName, setFileName] = useState("No File Selected");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSizeExceed, setFileSizeExceed] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileUpload = (e) => {
    const formData = {};
    let file = e.target.files[0];
    formData["file"] = file;
    let url = `${appVars.backendUrl}/api/uploadFile/studentFile`;

    if (user.type === 'teacher') {
      url = `${appVars.backendUrl}/api/uploadFile/file`;
      formData["fk_group"] = id;
    }

    axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success('Upload success!');
        //console.log("Upload success!", res);
        setMessage("");
        setFileName("No File Selected");
        setSelectedFile(null);
        setFileSizeExceed(false);
        setFileSize(0);
      })
      .catch((error) => {
        toast.error(error.response.data.message || 'Upload error');
      });
  };

  useEffect(() => {
    if (user) {
      let url = `${appVars.backendUrl}/api/studentChat/group`;

      if (user.type === 'teacher') {
        url = `${appVars.backendUrl}/api/teacherChat/group/${parseInt(id)}`;
      }

      axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }).then((res) => (
        setChats(res.data.data)
      ))
    }
  }, [user, id, chats])

  const handleSend = () => {

    const data = {}

    let url = `${appVars.backendUrl}/api/studentSuggestions/create`;

    if (user.type === 'teacher') {
      url = `${appVars.backendUrl}/api/teacherSuggestions/create`
      data["fk_group"] = parseInt(id)
      data["data"] = message;
    } else {
      data["datas"] = message;
    }

    axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
      .then((res) => {
        console.log(res);
        setMessage('')
      })
      .catch((err) => {
        console.log(err);
      })
  }


  const downloadDoc = (link) => {
    // Check if link is undefined or null
    if (link === undefined || link === null) {
      console.error('Invalid link:', link);
      return;
    }

    let link_clean = link.slice(2, -2);
    window.open("microsoft-edge:" + link_clean);
  };

  function handleDelete(id) {

    let formData = {}
    formData["delete_id"] = parseInt(id);

    let url = `${appVars.backendUrl}/api/studentSuggestions/delete/${id}`;
    if (user.type === 'teacher') {
      url = `${appVars.backendUrl}/api/teacherSuggestions/delete/${id}`
    }

    if (window.confirm("Are you sure you want to delete this message?")) {
      axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }).then((res) => {
        toast.success(res.data.message)
      }).catch((e) => {
        toast.error(e.response.data.message || 'Error Deleting Teacher');
      })
    }
  }

  //console.log(chats);

  return (
    <div className="h-full w-full flex flex-col bg-[#E3FDFD]">

      <div className="h-[85%] pb-2 overflow-auto">
        {<Toaster />}
        {chats && chats.map((chat) => (
          <><div className={`bg-[#f7f8fd] shadow-lg shadow-b shadow-l border-b-2   border-slate-400 w-fit h-fit text-gray-900 ${chat.teacher_uploaded && user?.type === "teacher" || chat.teacher_uploaded === false && user?.type === "student" ? "ml-auto border-l-2  " : " mr-auto border-r-2"} ${chat.is_file ? " px-2 " : ""} rounded-xl m-2 max-w-[60%] whitespace-pre-line `}>
            <div className="flex justify-between"><h1 className='mr-auto text-sm font-semibold  mb-1 pt-2 pl-3 pr-5 '>{chat.uploader_name}</h1>
            {(chat.teacher_uploaded && user?.type === "teacher") || (chat.teacher_uploaded === false && user?.type === "student") ? <MdDelete className="rounded-md cursor-pointer text-xl m-1" onClick={() => handleDelete(chat.id)} /> : ""}
            </div> 
            {
              chat.is_file ?
                <div className='bg-[#f7f8fd] rounded flex py-1 px-1 cursor-pointer items-start' onClick={() => { downloadDoc(chat.data) }}>
                  <FaFile className='' />
                  <h1 className='pl-3 pr-5  text-sm'>{chat.is_file ? chat.data.substring(chat.data.indexOf('_') + 1, chat.data.indexOf('?')) : chat.data}</h1>
                  <FaCloudDownloadAlt className='w-5 h-5 text-center cursor-pointer' />
                </div> : <h3   className='pl-3 pr-5  text-sm'>{chat.is_file ? chat.data.substring(chat.data.indexOf('_') + 1, chat.data.indexOf('?')) : chat.data}</h3>
            }

            <h1 className='flex justify-end text-sm px-2 pb-1 text-gray-600'>{formatDistanceToNow(new Date(chat.uploaded_at))}</h1>
          </div></>
        ))
        }
      </div>

      <div className='w-full lg:w-[70%] border border-t-slate-400 bg-[#A6E3E9] h-[15%] flex justify-between px-6 gap-5 items-center mb-1 fixed bottom-0 right-0'>
        <label htmlFor="uploadBanner">
          <TiAttachmentOutline className='w-9 h-9 cursor-pointer' />
          <input
            id="uploadBanner"
            type="file"
            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            onChange={handleFileUpload}
            hidden
          />
        </label>
        <div className='w-full'>
          <textarea
            className='w-full h-[10%] rounded-xl px-2 text-xl border-l-4 bg-[#E3FDFD] overflow-hidden '
            type='text'
            placeholder='Enter your message.....'
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button onClick={handleSend}><LuSend className='w-9 h-9' /></button>
      </div>

    </div>
  );
}
