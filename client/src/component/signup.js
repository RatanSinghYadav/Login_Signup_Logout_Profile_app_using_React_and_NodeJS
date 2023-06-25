import React, { useState } from 'react';
import './style/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Cities from './indianCites.js';
import CountryCode from './countryCode.js';
import img from './style/g.png';
import closeImg from './style/close.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [edu] = useState(["6th - 9th Class", "10th Class", "11th class", "12th Class", "Graduate Degree/Diploma", "Postgraduate Degree", "Working Professional"])
  const [city] = useState(Cities)
  const [code] = useState(CountryCode)
  const [signup, setSignup] = useState({
    email: '',
    fname: '',
    pass: '',
    education: '',
    city: '',
    code: '',
    phone: '',
  })

  const signupData = (e) => {
    const { name, value } = e.target;
    setSignup((newData) => {
      return {
        ...newData, [name]: value
      }
    })
  }

  const Navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    console.log(signup);
    localStorage.setItem('userData', JSON.stringify(signup));

    const { fname, email, phone, pass, code, education, city } = signup;

    // Extra validation


    try {
      if (fname === '') {
        toast.warn("Provide Your Full Name 👎!", {
          position: "top-center"
        });
      } else if (email === '') {
        toast.warn("Provide Email Address 👎!", {
          position: "top-center"
        });
      } else if (phone === '') {
        toast.warn("Provide Mobile Number 👎!", {
          position: "top-center"
        });
      } else if (pass === '') {
        toast.warn("Provide Password 👎!", {
          position: "top-center"
        });
      } else if (code === '') {
        toast.warn("Provide Conutry Code 👎!", {
          position: "top-center"
        });
      } else {
        const res = await fetch("http://localhost:8000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fname, email, phone, pass, code,education,city
          })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
          toast.error("Invalid Details 👎!", {
            position: "top-center"
          });
        } else {
          setSignup({
            ...signup, fname: "", email: "",
            phone: "", pass: "", code: "",education:"",city:""
          });
          toast.success("Registration Successfully Done 😃!", {
            position: "top-center"
          });
          setTimeout(() => {
            Navigate('/login')
          }, 4000)
        }

      }
    } catch (error) {
      console.log("front end ka catch error hai" + error.message);
    }
  }


  return (
    <div>
      <form onSubmit={sendData}>
        <div className='signup_main_div'>
          <img className='close' src={closeImg} alt='close' />
          <div className="auth-welcome">
            <p>Create An Account</p>
          </div>
          <div className='signin_form'>
            <button className='google_btn'>Google</button>
            <img className='gImage' src={img} alt='google' />
            <input value={signup.email} name='email' type="text" onChange={signupData} className='signin_input' placeholder='Email' />
            <input value={signup.fname} name='fname' type="text" onChange={signupData} className='signin_input' placeholder='Full Name' />
            <input value={signup.pass} name='pass' type="text" onChange={signupData} className='signin_input' placeholder='Password' />

            <select value={signup.education} name='education' onChange={signupData} className='signin_input custom-select'>
              <option className='option'>----Highest Education Level----</option>
              {edu.map((e) => {
                return (
                  <option>{e}</option>
                )
              })}
            </select>
            <select value={signup.city} name='city' onChange={signupData} className='signin_input custom-select'>
              <option className='option'>----Select your City----</option>
              {
                city.map((e) => {
                  return (
                    <option className='option'>{e}</option>
                  )
                })
              }
            </select>
            <select value={signup.code} name='code' onChange={signupData} className='signin_input custom-select'>
              <option className='option'>Country (+001)</option>
              {
                code.map((e) => {
                  return (
                    <option className='option'>{e.country} (+{e.code})</option>

                  )
                })
              }
            </select>
            <input value={signup.phone} name='phone' type="number" onChange={signupData} className='signin_input' placeholder='Mobile Numbers' />
            <button onSubmit={sendData} className='signup_btn'>Create Account</button>
            <Link to={'/login'}>
              <span className='backtologin'>Back To Login</span>
            </Link>

          </div>

        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup;