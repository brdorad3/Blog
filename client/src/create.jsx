import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

function Create() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/create', formData);
      console.log(response.data);
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  return (
    <>
<Link to="/" className='text-indigo-900 text-2xl' >Home</Link>
<form onSubmit={handleSubmit} action="http://localhost:3000/create">
  <input type="text" minLength={6} name="username" maxLength={20} value={formData.username} required={true} placeholder="username" onChange={handleChange} />
  <input type="email" minLength={6} name="email" maxLength={50} value={formData.email} required={true} placeholder="email" onChange={handleChange} />
  <input type="password" minLength={8} name="password" maxLength={20} value={formData.password} required={true} placeholder="password" onChange={handleChange} />
  <button type="submit" className="p-1" >Submit</button>
</form>
    </>
  )
}
export default Create
