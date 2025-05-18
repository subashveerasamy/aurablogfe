import axios from 'axios';
import React, { useState } from 'react'

const Blog = () => {

    const [formData, setFormData] = useState({

        title:"",
        category:"",
        image:null,
        content:""
    })
   
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit= async(e)=>{
     e.preventDefault();
     console.log(formData);
if (!formData.title || !formData.category || !formData.content) {
        alert("All fields are required!");
        return;
    }
     const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("content", formData.content);
    if (formData.image) {
        formDataToSend.append("image", formData.image);
    }

    try {
        const response = await axios.post("http://localhost:3000/blog/upload", formDataToSend);
        if(response.data){
            alert("Blog submitted successfully!");
            console.log(response.data.filePath)

        }
        
    } catch (error) { console.error("Error submitting blog:", error);
        alert("Failed to submit blog.");
    }
  }



  return (
    <div>
        <div className='text-light ' style={{display:"flex",position:"fixed", top:"0", width:"100%", background:"black", height:"100px", alignItems:"center", justifyContent:"center"}}> 
          <div> <h1>AURA BLOG</h1></div>
      </div>
       

     <form onSubmit={handleSubmit}>

         <div className='d-flex justify-content-around align-items-center' style={{marginTop:"40px"}}>
        <div className='d-flex flex-column justify-content-evenly p-5' style={{height:"70vh", width:"50vw"}}>
            <div>
                <h1>Create Your Own</h1>
            </div>
            <div className='w-100'>
                <label> Title :
                    <input className='form-control mt-2' name='title' placeholder='Title' type="text" style={{width:"300px",border: "1px solid #333"}} value={formData.title} onChange={handleChange} required
                 />
                </label>
            </div>
            <div>
                <label > Category :
                    <input type="text" name='category' value={formData.category} onChange={handleChange} placeholder='Category' className="form-control mt-2" style={{width:"300px",border: "1px solid #333"}} required/>
                </label>
            </div>
            
            <div>
                <label > Image :
                    <input type="file" accept="image/*"  onChange={handleImageUpload} placeholder='Image' className="form-control mt-2" style={{width:"300px",border: "1px solid #333"}} />
                </label>
            </div>
            <div className='ms-5'>
            <button className="btn btn-primary mt-3" type='submit' 
                >
        Submit
      </button>

        </div>
      
        </div>
        <div className='p-5' style={{width:"40vw", marginTop:"40px"}}>
            <div className=''>
                
                    <textarea className='form-control mt-2' name='content' value={formData.content} onChange={handleChange} placeholder='Write your Blog Content' required style={{border: "1px solid #333", position:"fixed", bottom:"20px", top:"120px", width:"600px"}}></textarea>
                    
            </div>
        </div>
      </div>
      
     </form>
       

    </div>
  )
}

export default Blog