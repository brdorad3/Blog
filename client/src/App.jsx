import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './App.css'

function App() {
  let [test, setTest] = useState(null)
  useEffect(()=>{
    fetchData();
    
  },[])

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/create'); 
      const responseData = await response.json();
      setTest(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
<div>
      
      <div className="flex flex-col">
      <Link to="create" className='text-indigo-900 text-2xl' >Create new user</Link>
      <Link to="login" className='text-indigo-900 text-2xl' >Log in</Link>
    </div>
    </div>
    </>
  )
}

export default App
