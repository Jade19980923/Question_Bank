import Login from './pages/Login/index'
import SignUp from './pages/SignUp/index'
import Home from './pages/Home/index'
import Admin from './pages/Admin/index'
import Header from './components/Header'
import AuthRouter from './components/AuthRouter'
import NavigationBar from './components/NavigationBar'
import BottomBar from './components/BottomBar'
import Background from './components/Background'
import { useRoutes, Navigate, BrowserRouter as Router, Route, Routes} from 'react-router-dom' ;
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import './App.css'
{/**修改前端 */ }


const Layout = () => {
  return(
    <>
      
        <Header></Header>
        <NavigationBar></NavigationBar>
        <AuthRouter></AuthRouter>
        <Background></Background>
        <BottomBar></BottomBar>
      
      
    </>
  );
}

{/**修改前端 */ }
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },

      {
        path: "/home",
        element: <Home></Home>,
      },

      {
        path: "/admin",
        element: <Admin></Admin>,
      }
    ]
  },
  

]);

function App() {
  return (

    <div>
      <RouterProvider router={router}/>
    </div>


  );
}

export default App;
