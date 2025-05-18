import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogContext from "./Context/BlogContext.jsx";
import UserContext from "./Context/UserContext.jsx";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog/getblogs");
        if (response.data.blogsData) {
          setBlog(response.data.blogsData);
        }

        const userResponse = await axios.get("http://localhost:3000/user/getuser", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        });

        if (userResponse.data.user) {
          setUser(userResponse.data.user);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBlogs();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    if (user && blog) {
      navigate("/App/home");
    }
  }, [user, blog]); // Runs only when user or blog changes

  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </BlogContext.Provider>
  );
};

export default App;