import React, { useState } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"

function LogIn(){
  const [formData, setFormData] =  useState({
    email: '',
    password: '',
  })
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
  
    const handleSubmit = async(e)=> {
      e.preventDefault();
      try{
        const response = await axios.post("http://localhost:3000/api/login", formData, {headers:{"Content-Type" : "application/json"}});
        console.log(response.data);
        setLoggedIn(true)
      }catch(error){
        console.error(error.response.data);
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
    if (loggedIn) {
      
      return <Link to="/" />;
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
          
        </>
    )
}
export default LogIn