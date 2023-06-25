import React from 'react';
import './style/navbar.css';
import { NavLink as Link } from "react-router-dom";

function Navbar() {

  return (
    <div>
      <div className='navbar'>
        <div className='nav-left'>
          <div className='site-brand'>
            <div className='logo'>
              <h4>TradeX!</h4>
            </div>
          </div>
        </div>
        <div className='nav-right'>
          <div className='right-menu'>
           
              {/* <div className='logout'>
                {isAuthenticated && <div><span><img src= {user.picture} className='userImg' alt='user'/></span></div>}
                {isAuthenticated && <div><span>{user.name}</span></div>}
                <span onClick={() => logout()} className='btn'>Logout</span>
              </div> */}
              
              <>
                <Link to={'/'}>
                  <span className='btn'>Home</span>
                </Link>
                <Link to={'/login'}>
                  <span className='btn'>Login</span>
                </Link>
                <Link to={'/signup'}>
                  <span className='btn'>Signup</span>
                </Link>
              </>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;