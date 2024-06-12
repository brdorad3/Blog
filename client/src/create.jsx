import { useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post('https://blog-qf1e.onrender.com/api/create', formData);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors || []);
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className='flex flex-col px-60 py-20 gap-8'>
    <h1 className='yatra text-3xl'>Create a new user!</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-5'>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          minLength={1}
          maxLength={16}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          minLength={7}
          maxLength={50}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          minLength={8}
          maxLength={25}
          required
        />
        <button className='blue p-1 font-black' type="submit">Submit</button>
      </form>
      {errors.length > 0 && (
        <div>
          <h4>Error(s) occurred:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </>
  );
};

export default Create;
