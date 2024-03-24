import {useState, useEffect} from "react"
import axios from "axios"

function Write(){

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })
    const [errors, setErrors] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            const response = axios.post("http://localhost:3000/api/write", formData)
            console.log(response.data)
        }catch(error){
            console.error(error.response.data);
            if (error.response && error.response.status === 400) {
              
              setErrors(error.response.data.errors || []);
            } else {
              console.error('Error submitting form:', error);
            }
          }
    }

    const handleChange = (e) =>{
        const { name, value } = e.target;
        console.log(e.target)
        setFormData({
          ...formData,
          [name]: value
        });
    }

return(
    <>
    <form className="flex flex-col gap-5 justify-center items-center p-20" onSubmit={handleSubmit}>
        <h1>Write a post</h1>
        <input type="text" 
        required
        name="title"
        placeholder="Title"
        minLength={2}
        maxLength={15}
        onChange={handleChange}
        className="justify-self-start self-start" />
        <textarea name="content" cols="30" rows="10" required placeholder="Content" minLength={3} maxLength={100} onChange={handleChange}
         className="justify-self-start self-start"></textarea>
        <button type="submit" className=" self-start" >Submit</button>
    </form>
    </>
)
}
export default Write