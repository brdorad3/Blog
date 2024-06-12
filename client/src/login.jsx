import  { useState, useContext} from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from './main';
import Navbar from './navbar';

function LogIn(){
  const [formData, setFormData] =  useState({
    email: '',
    password: '',
  })
  
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const userDataContext = useContext(UserDataContext);

  

  

    const handleSubmit = async(e)=> {
      e.preventDefault();
      try{
        const response = await axios.post("https://blog-qf1e.onrender.com/api/login", formData, {
    withCredentials:true,
    credentials:"include",
   }
);
        userDataContext.setUserData(response.data.user); 
        navigate('/');
        
      }catch(error){
        console.error(error);
        if (error.response && error.response.status === 400) {
          
          setErrors(error.response.data.errors || []);
        } else {
          console.error('Error submitting form:', error);
        }
      }
      
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
   
    return(
        <>
        <Navbar/>
        <div className='flex flex-col gap-8 px-60 py-20'>
        <h1 className='text-black text-3xl yatra'>Log in!</h1>
          <form onSubmit={handleSubmit} action="http://localhost:3000/api/login" className='flex flex-col gap-5 items-start' >
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
              required
              minLength={5}
              maxLength={50}
            />
            <input
              type="password"
              name="password"
            onChange={handleChange}
            value={formData.password}
              placeholder="Password"
              required
              minLength={8}
              maxLength={58}
            />
            <button className='p-1 blue font-black' type="submit">Submit</button>
          </form>
          {errors.length > 0 && (
        <div>
          <h4>Error(s) occurred:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
        <div>
          <h2>Dont have an account?</h2>
          <Link to="/create" className='blue yatra'> Sign up</Link>
        </div>
        </div>
        </>
    )
}
export default LogIn