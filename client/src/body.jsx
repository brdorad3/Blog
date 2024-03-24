import {useState, useEffect} from "react"

function Body(){
    let [tests, setTest] = useState(null)
    useEffect(()=>{
      fetchData();
      
    },[])
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/write'); 
        const responseData = await response.json();
        
        
        setTest(responseData.post);
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

return(<>
 {tests && 
 (  
        <ul>
          {tests.map((test, index) => (
            <li key={index}>
                {console.log(test)}
              <h1>{test.title}</h1>
              <p>{test.content}</p>
            </li>
          ))}
        </ul>
      )}

</>)
}
export default Body