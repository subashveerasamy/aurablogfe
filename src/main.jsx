import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Blog from './Componenets/Blog.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Componenets/Login.jsx'
import Register from './Componenets/Register.jsx'
import Home from './Componenets/Home.jsx'
import Update from './Componenets/update.jsx'

const router= createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/App",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path:"update",
        element: <Update/>
      }
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}   />
 
)
