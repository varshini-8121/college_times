import { Link } from 'react-router-dom';
 import React from './topbar.css'
import { useContext } from 'react';
import { Context } from '../../context/Context';
 
 export default function Topbar() {
  const PF="http://localhost:5000/images/"
  const {user,dispatch} = useContext(Context);
  const handleLogout=()=>
  {
    dispatch({type:"LOGOUT"});
  };
  
   return (
   
     <div className="top">
       <div className="topLeft">
        <i className="topIcon fa-brands fa-instagram"></i>
        <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-solid fa-envelope"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        </div>
       <div className="topCenter">
         <ul className="topList">
            <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
            </li>
            <li className="topListItem"><a className="link" href="#about">ABOUT</a></li>
            <li className="topListItem ">CONTACT</li>
            <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
            <li className="topListItem" onClick={handleLogout} >{user && "LOGOUT"}</li>
         </ul>
       </div>
       <div className="topRight">
       {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF+user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className=" topSearch fa-solid fa-magnifying-glass"></i>

       </div>
     </div>
   )
 }
