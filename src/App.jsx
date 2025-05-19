import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogContext from "./Context/BlogContext.jsx";
import UserContext from "./Context/UserContext.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import SelectedBlogContext from "./Context/SelectedBlog.jsx";

const App = () => {
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState({});
  const [selectedBlog, setSelectedBlog]= useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (!sessionStorage.getItem("login")) {
      return navigate("/");
    }

    const getBlogs = async () => {
      try {
        const response = await axios.get("https://aurablogbe.onrender.com/blog/getblogs");
        if (isMounted && response.data.blogsData) {
          console.log(response.data.blogsData);
          setBlog(response.data.blogsData);
        }

        const userResponse = await axios.get("https://aurablogbe.onrender.com/user/getuser", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (isMounted && userResponse.data.user) {
          console.log(userResponse.data.user);
          setUser(userResponse.data.user);
        }
        if(isMounted){
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBlogs();

    return () => {
      isMounted = false;
    };
  }, []);
  
 

  

  return (
    <SelectedBlogContext.Provider value={{selectedBlog, setSelectedBlog}}>
    <BlogContext.Provider value={{ blog, setBlog }}>
      <UserContext.Provider value={{ user, setUser }}>
       {user && blog.length >0 ? <Outlet /> : null}
      </UserContext.Provider>
    </BlogContext.Provider>
    </SelectedBlogContext.Provider>
  );
};

export default App;