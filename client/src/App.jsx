import { useState, useEffect } from 'react'
import { Link, redirect } from "react-router-dom";
import './App.css'
import Navbar from './navbar';
import Body from './body'
import Login from './login'


function App() {
  let [test, setTest] = useState(null)
  useEffect(()=>{
    fetchData();
    
  },[])

  const fetchData = async () => {
    try {
      const response = await fetch('https://blog-qf1e.onrender.com/create'); 
      
      const responseData = await response.json();
      setTest(responseData);
     

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <>
    <Navbar />
    <Body />
    </>
    
  )
}

export default App