import {useState, useEffect } from "react"
import { useParams } from 'react-router-dom';


function Comment(){
    const [comms, setComms] = useState(null);
    
    const { postId } = useParams();
    
    
    useEffect(()=>{
        fetchComment(postId)
       },[])

    const fetchComment = async(postId) => {
    
        const response = await fetch(`https://blog-qf1e.onrender.com/comments/${postId}`);
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