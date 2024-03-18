import React, { useState } from 'react';
import { Link } from "react-router-dom"


function LogIn(){
    const handleSubmit = ()=> {

    }
    const handleChange = () => {

    }
    return(
        <>
        <Link to="/" className='text-indigo-900 text-2xl' >Home</Link>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
            onChange={handleChange}
              placeholder="Password"
            />
            <button type="submit">Submit</button>
          </form>
          
        </>
    )
}

export default LogIn