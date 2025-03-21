import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./sidebar.css"
import axios from "axios"

export default function Sidebar() {
  const [cats,setCats]=useState([]);
  useEffect(()=>{
    const getCats =async()=>{
      const res= await axios.get("/categories")
      setCats(res.data)
    }
    getCats();
  },[]);
  return (
    <div className="sidebar" > 
      <div className="sidebarItem " id="about">
      <span className="sidebarTitle">ABOUT ME</span>
      <img className="sidebarImg"src="https://lh5.googleusercontent.com/-hb8NbaZVZs8/TwFGkLWzS5I/AAAAAAAAA3A/zQxg6R8islU/s430/Pink_Apple_Macbook_Screenshot.jpg" alt="" />
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
      <div className="sidebarItem">
      <span className="sidebarTitle">CATEGORIES</span>
      <ul className="sidebarList">
        {
          cats.map((c)=>(

            <li className="sidebarListItem">
              <Link className="link"to={"/?cat="+c.name}>{c.name}</Link>
              </li>
          ))
        }
        
      </ul>

      </div>
      <div className="sidebarItem">
      <span className="sidebarTitle">FOLLOW US</span>
      <div className="sidebarsocial">
      <i className="sidebarIcon fa-brands fa-instagram"></i>
        <i className="sidebarIcon fa-brands fa-facebook"></i>
        <i className="sidebarIcon fa-solid fa-envelope"></i>
        <i className="sidebarIcon fa-brands fa-twitter"></i>
      </div>

      </div>
    </div>
  )
}
