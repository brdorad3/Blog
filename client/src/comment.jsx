import {useState, useEffect, useContext } from "react"
import { useParams } from 'react-router-dom';
import { UserDataContext } from "./main";

function Comment(){
    const [comms, setComms] = useState(null);
    const userDataContext = useContext(UserDataContext)
    const { postId } = useParams();
    
    
    useEffect(()=>{
        fetchComment(postId)
       },[comms])

    const fetchComment = async(postId) => {
    
        const response = await fetch(`http://localhost:3000/comments/${postId}`);
        const responseData = await response.json();
        
        setComms(responseData);
        
      }

    return(
        <>
        {comms && 
    (
    <ul>
      {comms.map((comm, index)=>(
        <li key={index}>
          <p >@{comm.author.username}: {comm.content}</p>
          
        </li>
      ))}
     
    </ul>
   ) }
        </>
    )
}
export default Comment