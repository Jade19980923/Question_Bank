import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SignUp from '../../pages/SignUp'
import Login from '../../pages/Login'
import Home from '../../pages/Home'
import Admin from '../../pages/Admin'
import TeachersList from '../../pages/Admin/TeachersList'
import EditTeacherList from '../../pages/Admin/EditTeacherList'
import AddNewTeacherList from '../../pages/Admin/AddNewTeacherList'
import './index.css'

const requireAuth = (component, isAuthenticated) => {
  return isAuthenticated ? component : <Navigate to="/login" replace />;
};

function AuthRouter ({ isAuthenticated }) {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/admin',
      element: (
        <>
          {/* 添加导航链接到 Admin 组件 */}
          <Link to="/Admin"></Link>
          <Admin />
        </>
      ),
      children:[
        {
          path: 'teachersList',
          element: <TeachersList />,
        },
        {
          path: 'addnewteacher',
          element: <AddNewTeacherList />,  
        },
        {
          path: "editteacherlist/:id",
          element: <EditTeacherList />  
        },
      ]
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return  (
    <div className='router-box'>
        {routes}
    </div>
  );
};

export default AuthRouter;

