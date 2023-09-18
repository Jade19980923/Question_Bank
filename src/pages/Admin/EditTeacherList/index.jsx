import { Link, useParams, useNavigate } from 'react-router-dom'; // 导入 Link 组件
import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';

function EditTeacherList() {
  // get selected teacher
  const [data, setData] = useState({
    username : '',
    email : '',
    organisation : '',
    division : '',

  });

  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("/admin/teacher/"+id)
    .then(res => {if(res.status === 200) {
      setData({
        ...data,
        username : res.data.Result[0].first_name +" "+ res.data.Result[0].last_name ,
        email : res.data.Result[0].email,
        organisation : res.data.Result[0].university,
        division : res.data.Result[0].division
      })
    } else {
      alert("Error")
    }
  })
  .catch(err => console.log(err))
  },[])

  const handleDivisionSelect = (division) => {
    // 根据 division 设置可选框的选择状态
    switch (division) {
      case 'IT':
        // 在这里处理 IT 部门的选择状态
        break;
  
      case 'Art':
        // 在这里处理 Art 部门的选择状态
        break;
  
      // 添加其他部门的处理逻辑
  
      default:
        break;
    }


  }

  // get divisions
  const [divisionInfo, setDivisionInfo] = useState([])
  useEffect(()=> {
    axios.get("/admin/divisions")
    .then(res => {
      if(res.status === 200) {
        setDivisionInfo(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }, [])

  const handleBackButton = () => {
    navigate("/teacherslist")
  }

  // 疑问
  // const [checked, setChecked] = useState([])

  // const handleCheckbox = (event) => {

  //   const {value , checked} = event.target
  //   if () {
  //     setChecked(true)
  //   }
    
  // }
  // console.log(checkedValue);
  //。

  return (
    <div className="edit-teacher-list">
      <button className="back-button" onClick={handleBackButton}>&#9664;</button>

      <div className="upper-section">
        <div className="input-row">
          <label>Username</label>
          <input type="text" value={data.username} onChange={e => setData({...data, username : e.target.value})} />
        </div>
        <div className="input-row">
          <label>Email</label>
          <input type="email" value={data.email} onChange={e => setData({...data, email : e.target.value})} />
        </div>
        <div className="input-row">
          <label>Organisation</label>
          <input value={data.organisation} onChange={e => setData({...data, organisation : e.target.value})} />
        </div>
      </div>

      <div className="lower-section">
        <div className="left-section">
          <h3>Division List</h3>
          <div className="overflow-container">
            <table className="division-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Division ID</th>
                  <th>Division Name</th>
                </tr>
              </thead>
              <tbody>

                {divisionInfo.map((divisions, index) => (
                  <tr key={divisions.id} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                    <td>
                      {<input type="checkbox" value={divisions.id}></input>}
                    </td>
                    <td>{divisions.id}</td>
                    <td>{divisions.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/** 
         * 此处添加桌面上的024代码
         */}
      </div>
      
      
      

      <div className="navigation-buttons">
        {/* Previous and Next buttons */}
      </div>
    </div>
  );
}

export default EditTeacherList;
