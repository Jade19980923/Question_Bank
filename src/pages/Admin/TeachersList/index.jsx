import { Link } from 'react-router-dom';
import './index.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTeacherList from '../EditTeacherList/';

function TeachersList({ onAddNewTeacherClick }) {

  // const handleSortChange = (event) => {
  //   const selectedDivision = event.target.value;
  //   setSortBy(selectedDivision);
  //   sortTeachers(selectedDivision);
  // };

  // const sortTeachers = (selectedDivision) => {
  //   let sortedTeachers = [...teachersData];

  //   if (selectedDivision === 'Division') {
  //     setTeachersData(sortedTeachers); // 不进行排序
  //   } else {
  //     sortedTeachers.sort((a, b) => a.division.localeCompare(b.division));
  //     setTeachersData(sortedTeachers);
  //   }
  // };
  

  // show all teachers
  const [data, setData] = useState([])
  useEffect(()=> {
    axios.get("/admin/teachers")
    .then(res => {
      if(res.status === 200) {
        // console.log(res);
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }, [])
  
  return (
    <div className="teachers-content">
      <div className="header-container">
            <h2>List of Teachers</h2>
            <button className="add-button" onClick={onAddNewTeacherClick}>Add a new teacher</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Name</th>
              <th>Organisation</th>
              <th>
                {/* <div className="division-header">
                    <span>Division</span>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="">Sort by Division</option>
                        <option value="Division">--</option>
                        <option value="IT">IT</option>
                        <option value="Art">Art</option>
                        {/* 添加其他选项 从数据库调取 }
                    </select>
                </div> */}
                Division
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((teachers, index) => (
              <tr key={teachers.id} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                {/* 将 /edit/${teacher.id} 替换为实际的编辑路径 */}
                <td>
                  <Link to={`/admin/editteacherlist/`+teachers.id}>Edit</Link>
                </td> 
                <td>{teachers.email}</td>
                <td>{teachers.first_name+" "+teachers.last_name}</td>
                <td>{teachers.university}</td>
                <td>{teachers.division}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeachersList;
