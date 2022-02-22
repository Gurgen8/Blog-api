import { useState } from "react";
import axios from "axios";
import "./register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [allready, setAllready] = useState('')

  const handleSubmith = async (e) => {
    e.preventDefault();
    const res = await axios.post('/auth/register', { userName, email, password }).catch(e => {
      setErrorMessage(e.response.data?.message);
      return setAllready(JSON.stringify(e?.response?.data?.keyValue));
    })
    res.data && window.location.replace('login')
  };


  return (
    <div className="register">
      <h4 className="errorMessage"> {allready ?allready.replace("{", "").replace("}", "") + "has been allready":""} </h4>
      <h4 className="errorMessage">{errorMessage}</h4>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmith}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={(e) => setUserName(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="registerButton">Register</button>
      </form>
      <Link className="loginRegisterButton" to={'/login'}>Login</Link>
    </div>
  )
}
