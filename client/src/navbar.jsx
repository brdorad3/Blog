import {Link} from "react-router-dom"
import { UserDataContext } from './main';
import { useContext } from "react";
function Navbar(){
  const userDataContext = useContext(UserDataContext);

    return(
        <>
        <div className="flex justify-between bg-blue py-6 px-60 border-b border-blue items-center ">
      <div>
        <h1 className="text-3xl font-black white font-serif blue">Robnite</h1>
      </div>
      <div className="flex gap-10 items-center" >
        
        <Link to="write" className="white text-lg">Write</Link>
        
      
      <Link to="login" className='white text-lg' >Log in</Link>
      <Link to="logout">Logout</Link>
      <Link to="create" className='bg-white blue rounded-3xl py-2 px-5 text-sm font-medium' >Get started</Link>
      
        </div>
    </div>
        </>
    )
}
export default Navbar