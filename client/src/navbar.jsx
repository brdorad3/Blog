import {Link} from "react-router-dom"

function Navbar(){


    return(
        <>
        <div className="flex justify-between py-6 px-60 border-b border-blue items-center ">
      <div>
        <h1 className="text-3xl font-black font-serif blue">Robnite</h1>
      </div>
      <div className="flex gap-10 items-center" >
      <Link to="write" className="blue text-lg">Write</Link>
      <Link to="login" className='blue text-lg' >Log in</Link>
      <Link to="create" className='bg-blue text-white rounded-3xl py-2 px-5 text-sm font-medium' >Get started</Link>
      
        </div>
    </div>
        </>
    )
}
export default Navbar