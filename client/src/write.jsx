import {useState, useEffect, useContext} from "react"
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';
import { UserDataContext } from "./main";
import Navbar from "./navbar";

function Write(){
  const navigate = useNavigate();
  
  const userDataContext = useContext(UserDataContext)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: userDataContext.userData,
    })
    useEffect(()=>{
      if(!userDataContext.userData){
        navigate("/login")
        
      }
    },[])
   

    const [errors, setErrors] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            const response = axios.post("http://localhost:3000/api/write", formData, {
              withCredentials: true,
              credentials: "include",
            } )
            console.log(response.data)
            navigate('/');
        }catch(error){
            console.error(error.response.data);
            if (error.response && error.response.status === 400) {
              
              setErrors(error.response.data.errors || []);
            } else {
              console.error('Error submitting form:', error);
            }
          }
    }

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    }
    
return(
    <>
    <Navbar/>
    
    <form className="flex flex-col gap-5 justify-center items-start p-20" onSubmit={handleSubmit}>
        <h1 className="font-black yatra text-3xl">Write a post!</h1>
        <input type="text" 
        required
        name="title"
        placeholder="Title"
        minLength={2}
        maxLength={15}
        onChange={handleChange}
        className="justify-self-start self-start" />
        <textarea name="content" cols="30" rows="10" required placeholder="Content" minLength={3} maxLength={1000} onChange={handleChange}
         className="justify-self-start self-start"></textarea>
        <button type="submit" className=" self-start blue p-1 text-black" >Submit</button>
    </form>
    </>
)
}
export default Write