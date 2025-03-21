

import { useEffect, useState } from "react"
import Header from "../../components/header/header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import axios from "axios"
import { useLocation } from "react-router-dom"
export default function Home() {
  const [posts,setPosts]=useState([]);
  const {search}=useLocation();
  // console.log(search)
  useEffect(()=>{
      const fetchPosts=async()=>
      {
        const res=await axios.get("/post"+search);
        // console.log("hello")
        setPosts(res.data)
        //  console.log(res)
      }
      fetchPosts();
  },
  [search])
  return (
    <>
    <Header/>
    
    <div className="home">
     <Posts posts={posts}/>
     <Sidebar/>
     
    </div>
    </>
  )
}
