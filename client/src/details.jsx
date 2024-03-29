import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

function Details() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch post data based on postId
    axios.get(`http://localhost:3000/api/${postId}`)
      .then(response => {
        setPost(response.data);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  return(
    <>
    <Navbar/>
    
    {post && 
    <div className='px-60 py-10 flex flex-col gap-5'>
      <h1 className='text-2xl font-black'>{post.title}</h1>
      <p className='leading-8'>{post.content}</p>
    </div>
    }
  
    </>
  )
}


export default Details