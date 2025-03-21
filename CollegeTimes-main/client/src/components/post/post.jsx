import "./post.css"
import {Link} from "react-router-dom"
export default function post({post}) {
  const x=post._id;
  console.log(x)
  //HERE WE HAVE TO ADD THE POSTS IMAGE LINK AFTER UPLOADING  IN BELOW LOCAL FOLDER 
  const PF="localhost:5000/images/"
  return (
    <div className="post">
      {
        post.photo && ( <img className="postImg" src={PF+post.photo} alt="" />)
      }
     
      <div className="postInfo">
        <div className="postCats">
         {
          post.categories.map((c)=>(

            <span className="postCat">{c.name}</span>
          ))
         }
         </div>
        
         <Link to={'/post/'+x} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
         <hr />
         <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  )
}
