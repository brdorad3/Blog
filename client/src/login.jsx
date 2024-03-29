import React, { useState, useContext } from 'react';
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from './main';

function LogIn(){
  const [data, setData] = useState(null)
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
        const response = await axios.post("http://localhost:3000/api/login", formData, {
    withCredentials:true,
    credentials:"include",
   }
);
console.log("Login success "+ JSON.stringify(response.data.user) )
        userDataContext.setUserData(response.data.user); 
        setData(response.data.user)
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
        <Link to="/" className='text-indigo-900 text-2xl' >Home</Link>
          <form onSubmit={handleSubmit} action="http://localhost:3000/api/login">
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
            <button type="submit">Submit</button>
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
          <Link to="/create"> Sign up</Link>
        </div>
        </>
    )
}
export default LogIn