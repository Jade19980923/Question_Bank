import { Link, useParams, useNavigate } from 'react-router-dom'; // 导入 Link 组件
import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';

function EditTeacherList() {
  // get selected teacher
  const [data, setData] = useState({
    first_name : '',
    last_name : '',
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
        first_name : res.data.Result[0].first_name ,
        last_name : res.data.Result[0].last_name ,
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

  const handleConfirmClick = (event) => {
    event.preventDefault()
    axios.put("/admin/updateTeacher/"+id, data)
    .then(res => {
      if(res.status === 200) {
        alert("Update Success")
        navigate('/admin/teacherslist')
      }else alert("Update Failed")
    })
  }

  const handleBackButton = () => {
    navigate("/admin/teacherslist")
  }

  // get divisions
  const [divisionData, setDivisionData] = useState([])
  useEffect(()=> {
    axios.get("/admin/divisions")
    .then(res => {
      if(res.status === 200) {
        setDivisionData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }, [])

  const [selectedDivisions, setSelectedDivisions] = useState([]); // 用于存储选中的部门名字

  // 处理点击 ">>" 按钮的函数
  const handleMoveRightClick = () => {

    // 获取所有复选框元素
    const checkboxes = document.querySelectorAll('.Division-checkbox');

    // 用于存储选中的学生名字的数组
    const selectedNames = [];

    // 遍历复选框元素，如果选中则将对应学生名字添加到数组中
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const DivisionName = checkbox.getAttribute('data-Division-name');
        selectedNames.push(DivisionName);
      }
    });

    // 更新选中的学生名字状态
    setSelectedDivisions(selectedNames);

    // 在这里将选中的学生名字更新到右侧部分的输入框
    setData({
      ...data,
      division : selectedNames.join(', ')
    })
    
    
  };

  // 处理点击 "<<" 按钮的函数
  const handleMoveLeftClick = () => {
    // 清空选中的学生名字
    setSelectedDivisions([]);
    // 清空右侧部分的输入框内容
    setData({
      division : ''
    })
  };


  return (
    <div className="edit-teacher-list">
      <button className="back-button" onClick={handleBackButton}>&#9664;</button>

      <div className="upper-section">
      <div className="input-row">
          <label>First Name</label>
          <input type="text" value={data.first_name} onChange={e => setData({...data, first_name : e.target.value})} />
        </div>
        <div className="input-row">
          <label>Last Name</label>
          <input type="text" value={data.last_name} onChange={e => setData({...data, last_name : e.target.value})} />
        </div>
        <div className="input-row">
          <label>Email</label>
          <input type="email" value={data.email} onChange={e => setData({...data, email : e.target.value})} />
        </div>
        <div className="input-row">
          <label>Organisation</label>
          <select value={data.organisation} onChange={e => setData({...data, organisation : e.target.value})}>
            <option value="">Select an organisation</option>
            <option value="UOA">UOA</option>
            <option value="UOW">UOW</option>

            {/* Add other options */}
          </select>
        </div>
      </div>

      <div className="lower-section">
        <div className="left-section">
          <h3>Division List</h3>
          <div className="overflow-container">
            <table className="Division-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Division ID</th>
                  <th>Division Name</th>
                </tr>
              </thead>
              <tbody>
                {divisionData.map((Division) => (
                  <tr key={Division.id}>
                    <td>
                      {/* 
                        渲染复选框
                        使用 data-Division-name 属性存储学生名字
                      */}
                      <input
                        type="checkbox"
                        className="Division-checkbox"
                        data-Division-name={Division.name}
                      />
                    </td>
                    <td>{Division.id}</td>
                    <td>{Division.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="middle-section">
          <div
            className="symbol"
            onClick={handleMoveRightClick}
          >
            &#187;
          </div>
          <div
            className="symbol"
            onClick={handleMoveLeftClick}
          >
            &#171;
          </div>
        </div>

        <div className="right-section">
          <h3>Selected Divisions</h3>
          <input
          type="text"
          id="Division-text"
          value={data.division} onChange={e => setData({...data, division : e.target.value})}
          readOnly
          />
        </div>
      
      </div>

      <div className="navigation-buttons">
        <button className="confirm-button" onClick={handleConfirmClick}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default EditTeacherList;
