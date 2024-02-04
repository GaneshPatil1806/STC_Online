import { useParams } from "react-router-dom"; 

function ChatCard() {
  const {id} = useParams();
  
  return (
    <div>
       {id}
    </div>
  )
}
export default ChatCard