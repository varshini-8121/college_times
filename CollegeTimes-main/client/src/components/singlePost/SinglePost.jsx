import { useLocation,Link } from "react-router-dom"
import "./singlePost.css"
import { useContext, useEffect ,useState} from "react"


import axios from "axios"
import { Context } from "../../context/Context"

export default function SinglePost() {
  const location =useLocation()
  const path=location.pathname.split("/")[2]
  const [post,setPost]=useState({})
  const PF="localhost:5000/images/"
  const {user}=useContext(Context);
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [updateMode,setUpdateMode]=useState(false); 

  const x=post.username;
  console.log(path);
  const z=post._id;
  
  useEffect(()=>{
    const getPost=async()=>{
       const res=await axios.get("/post/"+path)
      setPost(res.data)
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  },[path])

const handleDelete = async () => {
  try {
    console.log("hand delete loki occhinam")
    await axios.delete('/post/'+z, {
       data: { username: user.username },

    });
    console.log("hand delete lo function call aindhi")
    window.location.replace("/");
  } catch (err) {
    console.log("ERROR IN FRONTEND");
  }
};

 const handleUpdate=async()=>{
  try {
    console.log("update loki occhinam")
    await axios.put('/post/'+z, {
        username: user.username,title,desc ,

    });
    console.log("hand delete lo function call aindhi")
    // window.location.reload();
    setUpdateMode(false);
  } catch (err) {
    console.log("ERROR IN FRONTEND");
  }
 }

  console.log(post.username===user.username);
  {console.log(PF+post.photo)}
  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
      {post.photo &&(<img
        className="singlePostImg"
        
        src={PF+post.photo}//here also made changes regarding photos
        alt="not able to find image"
      />)}
      {
        updateMode?<input type="text" value={title} 
        className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}
        />:(
      <h1 className="singlePostTitle">
       {title}
       {
        post.username===user?.username&&(
        <div className="singlePostEdit">
          <i className="singlePostIcon far fa-edit" onClick={
            ()=>setUpdateMode(true)
          }></i>
          <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
        </div>
        )}
      </h1>
        )
      }
      <div className="singlePostInfo">
        <span>
          Author:
          <b className="singlePostAuthor">
            
            <Link className="link"to={'/?user='+x}>{post.username}</Link>
           
          </b>
        </span>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      {updateMode?<textarea className="singlePostDescInput"
      value={desc} onChange={(e)=>setDesc(e.target.value)}
      />:(
      <p className="singlePostDesc">
      {desc}
      </p>
      )
      }
      {
        updateMode?
        <button className="singlePostButton" onClick={handleUpdate}>Update</button>:(null)
      }
    </div>
  </div>
  )
}
