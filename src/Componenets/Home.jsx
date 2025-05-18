import React, { useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import BlogContext from '../Context/BlogContext.jsx';
import UserContext from '../Context/UserContext.jsx';




const Home = () => {
    const {blog, setBlog}= useContext(BlogContext);
    const {user, setUser}= useContext(UserContext); 
    console.log(blog);
    
  return (
    <div>
      <div className='text-light ' style={{display:"flex",position:"fixed", top:"0", width:"100%", background:"black", height:"100px", alignItems:"center", justifyContent:"center"}}> 
          <div> <h1>AURA BLOG</h1></div>
      </div>
       <div className='text-end' style={{width:"100vw"}}>
        <button className='mx-5 btn btn-success'>+ Create Blog</button>
       </div>


      {
        blog.map((item, index) =>{
            <div className="card mx-2 ms-2" key={index} style={{width: "18rem"}}>
  <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src="http://localhost:3000/uploads/1747584592819.jpeg"
        alt="Sample"
        style={{ width: "18rem", height: "200px", borderRadius: "10px" }}
      />
      
      {/* Edit Icon - Left Side */}
      <FontAwesomeIcon icon={faEdit}
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
        onClick={() => alert("Edit clicked")}
      />
      
      {/* Delete Icon - Right Side */}
      
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
  onClick={() => alert("Delete clicked")}
/>

    </div>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <h6>category : </h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
  </div>
 
  <div className="card-body">
        <div>Author :</div>
        <div>CreatedAt</div>
   </div>
</div>
        })
      }
    </div>
  )
}

export default Home




    