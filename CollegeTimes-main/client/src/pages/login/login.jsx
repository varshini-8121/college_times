import { useContext,useRef } from "react";
import "./login.css";
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";
import axios from "axios"

export default function Login() {
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context)

  // const handleSubmit=async(e)=>{
  //   e.preventDefault()
  //   dispatch({type: "LOGIN_START"});
  //   console.log("starting login")
  
  //   try{
  //     const res= await axios.post("/auth/login",{
  //       username: userRef.current.value,
  //       password: passwordRef.current.value,
  //     }
  //     )
  //     console.log("after now ");
  //     console.log(res.username);
  //     dispatch({type: "LOGIN_SUCCESS",payload:res.data});
  //     console.log("login success")

  //   }catch(err)
  //   {
  //     console.log("login ff")
  //     dispatch({type: "LOGIN_FAILURE"});
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      console.log("trying to fetch");
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  // console.log(user)
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your Username.." ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
        <button className="loginButton" type="submit">Login</button>
      </form>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">Register</Link>
        </button>
    </div>
  );
}