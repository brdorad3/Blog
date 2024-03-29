import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";

function Logout(){
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            
            // Send a request to the server to logout
            await axios.get('/logout');
            // After successful logout, redirect the user to the homepage or any other appropriate page
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
        <div>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/">Cancel</Link>
        </div>
        </>
    );
}
export default Logout