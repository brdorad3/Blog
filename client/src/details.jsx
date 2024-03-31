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
    axios.get(`http://localhost:3000/api/${postId}`)
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
        console.log(postId)
          const response = await axios.post("http://localhost:3000/api/comment", formData)
      console.log(response)

    }catch(error){
          console.error('Error submitting form:', error);
        
    }
  }

  return(
    <>
    <Navbar/>
    
    {post && 
    <div className='px-60 py-10 flex flex-col gap-5'>
      <h1 className='text-2xl font-black'>{post.title}</h1>
      <p className='leading-8'>{post.content}</p>
    </div>
    }
  
    <form onSubmit={handleSubmit}>
      <input type="text" name='content' value={formData.content} onChange={handleChange}/>
    <button type='submit'>Submit</button>



    </form>
    <Comment/>
    </>
  )
}
export default Details