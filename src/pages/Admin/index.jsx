import { Link, Outlet} from 'react-router-dom';
import './index.css'
import React, { useEffect, useState } from 'react';
import TeachersList from './TeachersList';
import EditTeacherList from './EditTeacherList';
import axios from 'axios';

function Admin() {
  return (
    <div className='centered-container'>
      <div className="admin-dashboard">
          <div className="left-sidebar">
              <h3 className="menu-item dashboard">Dashboard</h3>
              <div className="menu-item">
                  <Link to="#">Account Info</Link>
              </div>
              <div className="menu-item">
                  <Link to="#">Universities</Link>
              </div>
              <div className="menu-item">
                  <Link to="#">List of Divisions</Link>
              </div>
              <div className="menu-item">
                  <Link to="/admin/teacherslist">List of Tearchers</Link>
              </div>
              <div className="menu-item">
                  <Link to="#">Settings</Link>
              </div>
          </div>
          <div className="right-content">
            <Outlet />
          </div>
      </div>
    </div>
  );
}

export default Admin;
