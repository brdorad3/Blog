import  { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import { UserDataContext } from "./main";
import Comment from './comment';

function Details() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const userDataContext = useContext(UserDataContext)

  const [formData, setFormData] = useState({
    post: postId,
    user: userDataContext.userData,
    content: '',
    
  })
  
  useEffect(() => {
    // Fetch post data based on postId
    axios.get(`https://blog-qf1e.onrender.com/api/${postId}`)
      .then(response => {
        setPost(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        
        await axios.post("https://blog-qf1e.onrender.com/api/comment", formData)

    }catch(error){
          console.error('Error submitting form:', error);
        
    }
  }

  return(
    <>
    <Navbar/>
    <div className='px-60 py-20 flex flex-col gap-10 padding'>
    {post && 
    <div className=' flex flex-col gap-5'>
      <h1 className='text-2xl font-black'>{post.title}</h1>
      <p className='leading-8'>{post.content}</p>
    </div>
    }
  
  {userDataContext.userData ?
  
    <form onSubmit={handleSubmit}>
      <textarea type="text" name='content' rows={4} cols={30} value={formData.content} onChange={handleChange} placeholder='Write a comment: '></textarea>
    <button type='submit'>Submit</button>
    </form>
    :
   
    <p className='flex justify-center yatra border-blue'>Log in to write!</p>
}
<div className=''>
    <Comment/>
    </div>
    </div>
    </>
  )
}
export default Details