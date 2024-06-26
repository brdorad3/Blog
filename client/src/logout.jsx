import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";

function Logout(){
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            
            await axios.get('/logout');
            document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate('/');
            window.location.reload();
            
           
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="px-60 py-20 padding">
            <p className="text-xl font-black yatra">Are you sure you want to logout?</p>
            <button onClick={handleLogout} className=" blue font-black p-1">Logout</button>
            <Link to="/" className=" blue font-black bblueb p-1">Cancel</Link>
        </div>
        </>
    );
}
export default Logout