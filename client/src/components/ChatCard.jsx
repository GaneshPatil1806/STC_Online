/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { appVars } from "../conf/conf";
import useUser from "../context/userContext";
import { json, useParams } from "react-router-dom";
import "react-chat-elements/dist/main.css";
import { TiAttachmentOutline } from 'react-icons/ti'
import { LuSend } from 'react-icons/lu'
import toast, { Toaster } from 'react-hot-toast';
import {
  ChatItem,
  MessageBox,
  SystemMessage,
  MessageList,
  ChatList,
  Input,
  Button,
  Popup,
  Navbar,
  Dropdown,
  Avatar
} from "react-chat-elements";

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
    let url=`${appVars.backendUrl}/api/uploadFile/studentFile`;

    if(user.type==='teacher'){
      url=`${appVars.backendUrl}/api/uploadFile/file`;
      formData["fk_group"]=id;
    }
  
    axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success('Upload success!');
        console.log("Upload success!", res);
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

  //console.log(chats);
  
  useEffect(() => 
  {
    if(user){
      let url = `${appVars.backendUrl}/api/studentChat/group`;

      if(user.type === 'teacher'){
        url = `${appVars.backendUrl}/api/teacherChat/group/${parseInt(id)}`;
      }

      axios.get(url,{
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }).then((res) => (
        setChats(res.data.data)
      ))
    }
  }, [user, id, chats])

  const handleSend = () => 
  {

    const data = {}

    let url = `${appVars.backendUrl}/api/studentSuggestions/create`;

    if(user.type === 'teacher'){
      url = `${appVars.backendUrl}/api/teacherSuggestions/create`
      data["fk_group"] = parseInt(id)
      data["data"]=message;
    }else{
      data["datas"]=message;
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
    window.open("microsoft-edge:"+ link_clean);
  };
  
  return (
    <div className="h-full w-full flex flex-col bg-slate-200">

      <div className="h-[85%] overflow-auto">
        {<Toaster/>}
        {chats && chats.map((message) => (
          <MessageBox   
            title={message.uploader_name}
            key={message.uploaded_at}
            position={ (message.teacher_uploaded === true && user.type==='teacher')  || (message.teacher_uploaded === false && user.type==='student')  ? 'right' : 'left'}
            type={ message.is_file
               === true ? "file" : "text"}
            text={ message.is_file ? message.data.substring(
              message.data.indexOf('_') + 1,
              message.data.indexOf('?')
            ) : message.data}
            data={{
              uri: '',
              status: {
                click: false,
                loading: 0,
              },
            }}
            date={message.uploaded_at}
            onDownload={()=>downloadDoc(message.data)}
            toBottomHeight={true}
           // onReplyClick={()=>console.log('hello')}
            
          />
        ))}
      </div>

      <div className='w-full lg:w-[70%] border border-t-slate-400 bg-gray-100 h-[15%] flex justify-between px-6 gap-5 items-center mb-1 fixed bottom-0 right-0'>
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
            className='w-full h-[10%] rounded-xl px-2 text-xl border-l-4 bg-gray-200 overflow-hidden '
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
