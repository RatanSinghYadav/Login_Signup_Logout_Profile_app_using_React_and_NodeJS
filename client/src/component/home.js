import React, { useContext } from 'react';
import './style/home.css';
import { Logincontext } from './Contextprovider';
import { useNavigate } from 'react-router-dom';

function Home() {

  const { account } = useContext(Logincontext);
  
  const navigate = useNavigate();

  const handleLogout = ()=>{
    navigate('/login');
  }

  return (
    <div className='container'>
        <>
          <h1 class="hero_heading">
            Welcome to the CareerGuide.com!
            <br/>
            Hello {account.fname}
            <br/>
            Email: {account.email}
            <br/>
            Phone: {account.code} {account.phone}
            <br/>
            Education: {account.education}
            <br/>
            City: {account.city}
          </h1>
          <button onClick={handleLogout} className='logout'>Logout</button>
        </>
        
    </div>
  )
}
export default Home;
