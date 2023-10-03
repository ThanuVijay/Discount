import logo from './logo.svg';
import './App.css';
import {MdClose} from "react-icons/md"
import { useEffect, useState } from 'react';
import axios from "axios"

axios.defaults.baseURL = "http://localhost:8000"


function App() {

  const [addSection,setAddSection] = useState(false)

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    number:"",
    date:"",
    status:""
  })
  const [datalist,setDatalist]= useState([])

  const handleChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

const handleSubmit = async (e)=>{
  e.preventDefault()
  const data = await axios.post('/create',formData)
  console.log(data);
  if(data.data.success){
    setAddSection(false)
    alert(data.message)
  }
}

  const getFetchData = async()=>{
    const data = await axios.get('/',formData)
    if(data.data.success){
      setAddSection(false)
      alert(data.message)
      setDatalist(data.data.data)
  }
}
useEffect(()=>{
  getFetchData()
},[])



  return (
    <>
    <div className="Container">
      <button className = "btn btn-add" onClick={()=>setAddSection(true)}>ADD</button>

      {
        addSection && (
          <div className="addContainer">
      <form onSubmit={handleSubmit}>
      <div className="close-btn" onClick={()=>setAddSection(false)}><MdClose/></div>
         <label htmlFor="name">Name : </label>
        <input type ="text" id="name" name="name" onChange={handleChange}/>

        <label htmlFor="email">email : </label>
        <input type ="text" id="email" name="email" onChange={handleChange}/>

        <label htmlFor="number">Number : </label>
        <input type ="text" id="number" name="number" onChange={handleChange}/>

        <label htmlFor="date">Date : </label>
        <input type ="date" id="date" name="date" onChange={handleChange}/>

        <label htmlFor="status">Status : </label>
        <input type ="text" id="status" name="status" onChange={handleChange}/>

        <button className='btn'>Subbmit</button>
      </form>
    </div>
        )
      }
    </div>
    </>
  );
}

export default App;
