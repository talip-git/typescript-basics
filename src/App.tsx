import React, { useState } from 'react';
import { PersonalInfo } from './models/PersonalInfo';
import './app.css'
import Table from './components/Table';
import {personaldata} from './data/data';
const App :React.FC = ()=>{
  const [name,setName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [content,setContent] = useState<string>("");
  const [personalInfos,setPersonalInfos] = useState<PersonalInfo[]>(personaldata)

  const handleSubmit = ():void=>{
    if(name === "" ||  email === "" || content === ""){
      alert("All fields are required!")
      return;
    }
    setPersonalInfos([...personalInfos,{name:name,email:email,content:content}])
    clearForm()
  }
  const clearForm = ():void =>{
    setName("");
    setEmail("");
    setContent("");
  }

  return (
    <div className='whole'> 
      <div className='container'>
        <div className='heading'>
          <h2>Provide Entry Details</h2>
        </div>
        <div className='row'>
          <div className='col-12 col-md-12'>
            <div className='feedback-form'>
              <label htmlFor="name" className='form-label'>Name:</label>
              <input type="text" className='form-control' name='name' onChange={(e)=>setName(e.target.value)} value={name}/>
              <label htmlFor="email" className='form-label mt-1'>Email</label>
              <input type="email" className='form-control' name='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
              <label htmlFor="content" className='form-label mt-1'>Write Some content</label>
              <textarea className="form-control" id="floatingTextarea2" 
                name='content' style={{height:"5rem"}} 
                onChange={(e)=>setContent(e.target.value)}
                value={content}></textarea>
              <button className='btn btn-primary mt-3' onClick={handleSubmit}>Send Feedback</button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-12'>
            <Table personalInfos={personalInfos} setPersonalInfos={setPersonalInfos}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
