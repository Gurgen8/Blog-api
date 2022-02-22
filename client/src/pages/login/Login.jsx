import "./login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from 'axios';
import { useState } from "react";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useContext(Context);
  const[error,setError]=useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const result = await axios.post("/auth/login", {
        userName: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data })
      console.log(result.data)

    } catch (error) {

      dispatch({ type: "LOGIN_FAIL" });
      setError(error?.response?.data)
      console.log(error)
    }
  };




  return (
    <div className="login">
      <h4 className="errorMessage">{error}</h4>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input ref={userRef} className="loginInput" type="text" placeholder="Enter your username..." />
        <label>Password</label>
        <input ref={passwordRef} className="loginInput" type="password" placeholder="Enter your password..." />
        <button type="submit" className="loginButton" disabled={isFetching}>Login</button>
      </form>
      <Link className="loginRegisterButton" to={'/register'}>Register</Link>
    </div>
  );
}
