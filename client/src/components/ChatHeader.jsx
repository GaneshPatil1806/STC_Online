import { useParams } from "react-router-dom"

export default function ChatHeader() {
    const {id}= useParams();
  
  return (
    <div>
        <p className="h-[50%] px-5 text-sm md:text-xl font-bold">{id}</p>
        <p className="h-[50%] px-5 text-sm md:text-xl"></p>
    </div>
  )
}
