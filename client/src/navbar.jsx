import {Link} from "react-router-dom"

function Navbar(){


    return(
        <>
        <div className="flex justify-between py-6 px-60 border-b border-black items-center ">
      <div>
        <h1 className="text-3xl font-black font-serif">Robnite</h1>
      </div>
      <div className="flex gap-10 items-center" >
      <Link to="create" className='bg-black text-white rounded-3xl py-2 px-5 text-sm font-medium' >Get started</Link>
      <Link to="login" className='text-black text-lg' >Log in</Link>
        </div>
    </div>
        </>
    )
}
export default Navbar