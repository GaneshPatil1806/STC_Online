import { useState,useEffect } from "react";
import { appVars } from "../../conf/conf";
import useUser from "../../context/UserContext";
import axios from "axios";

export default function FetchFinal() {
    const [chats, setChats] = useState([]);
    const {admin} = useUser();
    
    useEffect(() => 
    {
      if(admin){
        let url = `${appVars.backendUrl}/api/studentChat/group`;
        axios.get(url,{
          headers: {
            Authorization: `Bearer ${admin?.token}`,
          },
        }).then((res) => (
          setChats(res.data.data)
        ))
      }
    }, [admin,chats])

    return (
        <div>FetchFinal</div>
    )
}
