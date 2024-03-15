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
      {test && (
        <div>
          <p>Data 1: {test.data1}</p>
          <p>Data 2: {test.data2}</p>
        </div>
      )}
      <Link to="create" >Create new user</Link>
    </div>
    </>
  )
}

export default App
