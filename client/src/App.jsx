import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './App.css'
import Navbar from './navbar';
import Body from './body'

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
    <Navbar />
    {test &&
    
    <p>{test.user[0].username}</p>}
    
    <Body />
    </>
    
  )
}

export default App
