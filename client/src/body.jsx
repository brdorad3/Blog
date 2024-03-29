import {useState, useEffect, useContext} from "react"
import { UserDataContext } from "./main";

function Body(){
  const userDataContext = useContext(UserDataContext)
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
{userDataContext.userData && (
        <div>
          {/* Display user data */}
          <p>Username: {userDataContext.userData.username}</p>
          
        </div>
      )}

 {tests && 
 (  
  <div className="mx-60 my-10 border-blue   bg-white rounded-2xl white" >
        <ul className="p-7">
          {tests.map((test, index) => (
            <li className="" key={index}>
              
              {test.author && test.author.username && (
            <h1 className="text-red-900 text-xl" >{test.author.username}</h1>
          )}
              <h2 className="text-black font-black text-2xl">{test.title}</h2>
              <p className="text-black">{test.content}</p>
            </li>
          ))}
        </ul>
        </div>
      )}
  
</>)
}
export default Body