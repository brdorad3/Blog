import {Link} from "react-router-dom"

function Navbar(){
  

    return(
        <>
        <div className="flex justify-between bg-blue py-6 px-60 border-b border-blue items-center padding">
      <div>
        <Link to="/" className="text-4xl font-black white font-serif blue sz">Robnite</Link>
      </div>
      <div className="flex gap-10 items-center gp" >
        
        <Link to="/write" className="white text-lg sz2">Write</Link>
      <Link to="/login" className='white text-lg sz2' >Log in</Link>
      <Link to="/logout" className="white text-lg sz2">Logout</Link>
      <Link to="/create" className='bg-white blue rounded-3xl py-2 px-5 text-sm font-medium pd' >Get started</Link>
      
        </div>
    </div>
        </>
    )
}
export default Navbar