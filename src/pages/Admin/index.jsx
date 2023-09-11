import { Link } from 'react-router-dom';
import './index.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin () {
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get("/admin/home")
    .then(res => {
      if(res.status === 200) {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="main-container">
      <h3>Teacher List</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Picture</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Division</th>
            <th>University</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((teachers, index) => {
            return <tr key={index}>
              <td>{teachers.id}</td>
              <td>{teachers.img}</td>
              <td>{teachers.first_name}</td>
              <td>{teachers.last_name}</td>
              <td>{teachers.email}</td>
              <td>{teachers.mobile}</td>
              <td>{teachers.division_id}</td>
              <td>{teachers.uid}</td>
              <td>
                <button>edit</button>
                <button>delete</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
