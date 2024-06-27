import {useState, useEffect, useContext} from "react"
import { UserDataContext } from "./main";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

function Body(){
  const dt = DateTime.now();
  const userDataContext = useContext(UserDataContext)
    let [tests, setTest] = useState(null)
    useEffect(()=>{
      fetchData();
      
    },[])
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://blog-qf1e.onrender.com/write'); 
        const responseData = await response.json();
       
        setTest(responseData.post);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

return(<>
{userDataContext.userData && (
        <div>
          <p>Username: {userDataContext.userData.username.toLocaleString()}</p>
          
        </div>
      )}

 {tests ?
 (  
  <div className=" mx-60 my-10 bg-white rounded-2xl white test" >
        <ul className="flex flex-col gap-5 p-7 ">
          {tests.map((test, index) => (
          
            <li  className="blueborder rounded-lg p-5 " key={index}  >
              
              {test.author && test.author.username && (
            <h1 className="text-red-900 text-xl" >@{test.author.username}</h1>
          )}  

              <h2 className="text-black font-black text-2xl">{test.title}</h2>
              <p className="text-black">{test.content}</p>
             <Link to={`/${test._id}`} className="blue" >Read more</Link>
             <p className="text-black float-right">{DateTime.fromISO(test.Date).toLocaleString(DateTime.DATETIME_MED)}</p>
            </li>
          ))}
        </ul>
        </div>
      ):
      <div className="w-screen h-60 flex justify-center items-center">
      <h1>Loading...</h1>
      </div>
      }
  
</>)
}
export default Body