import { Link } from 'react-router-dom';
import './index.css'
import React, { useEffect, useState } from 'react';
import TeachersList from './TeachersList';
import EditTeacherList from './EditTeacherList';
import axios from 'axios';

function Admin() {
  const [content, setContent] = useState(""); // State to track content in right-content

  const handleMenuClick = (menu) => {
      switch (menu) {
          case "Account Info":
              setContent("Hello!");
              break;

          case "Universities":
              setContent("UoW");
              break;

          case "List of Divisions":
              setContent("IT");
              break;

          case "List of Teachers":
              setContent("IT");
              // setContent(<TeachersList />);
              break;

          case "Edit List of Teachers":
              setContent(<TeachersList onAddNewTeacherClick={() => setContent(<EditTeacherList />)} />);
              break;

          case "Back to List of Teachers":
              setContent(<EditTeacherList onBackToTeachersListClick={() => setContent(<TeachersList />)} />);
              break;

          case "Settings":
              setContent("Edit");
              break;

          default:
              setContent(""); // Reset content
              break;
      }
  };

  return (
    <div className='centered-container'>
      <div className="admin-dashboard">
          <div className="left-sidebar">
              <h3 className="menu-item dashboard">Dashboard</h3>
              <div className="menu-item">
                  <Link to="#" onClick={() => handleMenuClick("Account Info")}>Account Info</Link>
              </div>
              <div className="menu-item">
                  <Link to="#" onClick={() => handleMenuClick("Universities")}>Universities</Link>
              </div>
              <div className="menu-item">
                  <Link to="#" onClick={() => handleMenuClick("List of Divisions")}>List of Divisions</Link>
              </div>
              <div className="menu-item">
                  <Link to="/admin/teacherslist" onClick={() => handleMenuClick("List of Teachers")}>List of Tearchers</Link>
              </div>
              <div className="menu-item">
                  <Link to="#" onClick={() => handleMenuClick("Settings")}>Settings</Link>
              </div>
          </div>
          <div className="right-content">
              {content && <div>{content}</div>}
          </div>
      </div>
    </div>
  );
}

export default Admin;