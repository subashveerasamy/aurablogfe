import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import BlogContext from '../Context/BlogContext.jsx';
import UserContext from '../Context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectedBlogContext from '../Context/SelectedBlog.jsx';




const Home = () => {
    const {blog, setBlog}= useContext(BlogContext);
    const {user, setUser}= useContext(UserContext); 
    const {selectedBlog, setSelectedBlog}= useContext(SelectedBlogContext);
    console.log(blog);
    const navigate= useNavigate();
    
    
  return (
    <div >
      <div className='text-light ' style={{display:"flex",position:"fixed", top:"0", width:"100%", background:"black", height:"100px", alignItems:"center", justifyContent:"center", zIndex:"10000"}}> 
          <div> <h1>AURA BLOG</h1></div>
      </div>
       <div className='text-end' style={{width:"100vw", marginTop:"150px"}}>
        <button className='mx-5 btn btn-success' onClick={(e)=> navigate("/App/blog")}>+ Create Blog</button>
       </div>


      <div className="row mx-3 ms-3 gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center" style={{marginTop:"20px"}}>
    
           {blog.map((item, index) => (
             <div className='col mb-5 d-flex justify-content-center' key={index} style={{cursor:"pointer"}} >
    
  <div className="card mx-2 ms-2" key={index} style={{ width: "18rem"}}>
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={item.image ? `https://aurablogbe.onrender.com${item.image}` : "/imageContent.avif"}
        alt="Blog Image"
        style={{ width: "18rem", height: "200px", borderRadius: "10px" }}
      />
     
      { item.userId === user._id ? (
      <div>
          <FontAwesomeIcon
        icon={faEdit}
        size="lg"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          cursor: "pointer",
          backgroundColor: "white",
          padding: "5px",
          borderRadius: "50%",
          color: "blue",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
        }}
        onClick={() => {
          setSelectedBlog(item);  
            navigate(`/App/update`);
        }}
      />
      
      <FontAwesomeIcon
        icon={faTrash}
        size="lg"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          backgroundColor: "white",
          padding: "5px",
          borderRadius: "50%",
          color: "red",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
        }}
        onClick={() => {
          const deleteBlog= async() =>{
            const response= await axios.delete(`https://aurablogbe.onrender.com/blog/delete/${item._id}`)
              if(response){
                alert("Blog Deleted Successfully");
                navigate("/App");
              }
            
          }
          deleteBlog();
        }}
      />
      </div> ):null}
    </div>
    <div className="card-body">
      <h5 className="card-title">{item.title}</h5>
      <h6>Category: {item.category}</h6>
      <p className="card-text">{item.content}</p>
    </div>
    <div className="card-body">
      <div>Author: {item.author}</div>
      <div>Created At: {item.createdAt}</div>
    </div>
  </div>
  </div>
))}
</div>
      
    </div>
  )
}

export default Home




    