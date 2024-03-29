import React, { useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import Navbar from './navbar';

const Create = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

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
      const response = await axios.post('http://localhost:3000/api/create', formData);
      console.log(response.data);
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
    <h1>Create a new user!</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
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
    </>
  );
};

export default Create;
