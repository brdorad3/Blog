import {Link} from "react-router-dom"

function Navbar(){
  

    return(
        <>
        <div className="flex justify-between bg-blue py-6 px-60 border-b border-blue items-center ">
      <div>
        <Link to="/" className="text-4xl font-black white font-serif blue ">Robnite</Link>
      </div>
      <div className="flex gap-10 items-center" >
        
        <Link to="/write" className="white text-lg">Write</Link>
      <Link to="/login" className='white text-lg' >Log in</Link>
      <Link to="/logout" className="white text-lg">Logout</Link>
      <Link to="/create" className='bg-white blue rounded-3xl py-2 px-5 text-sm font-medium' >Get started</Link>
      
        </div>
    </div>
        </>
    )
}
export default Navbar