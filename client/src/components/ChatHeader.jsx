import { useParams } from "react-router-dom"
import useUser from "../context/userContext";

export default function ChatHeader() {
    const {id}= useParams();
    const {user} = useUser();

    console.log(user);
  return (
    <div>
        <p className="h-[50%] px-5 text-xl font-bold">{id}</p>
          <p className="h-[50%] px-5">{user.username}</p>
    </div>
  )
}
