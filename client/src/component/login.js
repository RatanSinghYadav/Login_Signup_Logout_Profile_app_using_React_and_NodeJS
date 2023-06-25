import React, { useContext, useState } from 'react';
import './style/login.css'
import { Link, useNavigate } from 'react-router-dom';
import img from './style/g.png';
import closeImg from './style/close.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from './Contextprovider';


function Login() {
  const [logdata, setData] = useState(
    {
      email: '',
      pass: ''
    }
  )

  const navigate = useNavigate();
  const { setAccount } = useContext(Logincontext);

  function adddata(e) {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value
      }
    })
  }

  const senddata = async (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(logdata));

    const { email, pass } = logdata;


    try {
      if (email === '') {
        toast.warn("Email Provide 👎!", {
          position: "top-center"
        });
      } else if (pass === '') {
        toast.warn("Password Provide 👎!", {
          position: "top-center"
        });
      } else {
        const res = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email, pass
          })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
          toast.error("Invalid Details 👎!", {
            position: "top-center"
          });
        } else {
          setData({
            ...logdata, email: "", pass: ""
          });
          toast.success("Login Successfully Done 😃!", {
            position: "top-center"
          });
          setAccount(data)
          setTimeout(() => {
            navigate('/')
          }, 4000)
        }

      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div>
      <form>
        <div className='main_div'>
          <img className='close' src={closeImg} alt='close' />
          <div className="auth-welcome">
            <p>Sign In!</p>
          </div>
          <div className='signin_form'>
            <button className='google_btn'>Google</button>
            <img className='gImage' src={img} alt='google' />
            <input className='signin_input' name='email' value={logdata.email} onChange={adddata} placeholder='Email' />
            <input className='signin_input' name='pass' value={logdata.pass} onChange={adddata} placeholder='Password' />
            <button type="submit" onClick={senddata} className='login_btn'>LOG IN</button>
            <span className='forget-password'>Forgot Your Password ?</span>
            <div className='bottom_row'>
              Don't Have An Account Yet ?
              <Link to={'/signup'}>
                <span className='get_started'>SIGNUP!</span>
              </Link>
            </div>
          </div>
          <div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login;