import { useNavigate } from 'react-router-dom'; // 导入 Link 组件
import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';

function AddNewTeacher() {
  const [data, setData] = useState({
    first_name : "",
    last_name : "",
    email : "",
    organisation : '',
    //division : ''
    
  })

  // Send error message on the screen
  const [error, setError] = useState(null)

  // Go to login page after register success
  const navigate = useNavigate()

  const onBackBtnClick = () => {
    navigate('/admin/teacherslist')
  }

  const [selectedDivisions, setSelectedDivisions] = useState([]); // 用于存储选中的学生名字
  const [inputValue, setInputValue] = useState(''); // 用于存储右侧部分的输入框内容

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

  // 处理点击 ">>" 按钮的函数
  const handleMoveRightClick = () => {
    const checkboxes = document.querySelectorAll('.Division-checkbox');
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
    setInputValue(selectedNames.join(', ')); // 将学生名字用逗号分隔显示
  };

  // 处理点击 "<<" 按钮的函数
  const handleMoveLeftClick = () => {
    // 清空右侧部分的输入框内容
    setInputValue('');
    // 清空选中的学生名字
    setSelectedDivisions([]);
  };

  const handleConfirmClick = async (e) => {
      e.preventDefault() 
      try {
          axios.post("/admin/addTeacher", data)
          console.log(data);
          navigate("/admin/teacherslist");
      } catch (error) {
          setError(error.response.data)
          
      }
      
  }


  return (
    <div className="edit-teacher-list">
      <button className="back-button" onClick={onBackBtnClick}>&#9664;</button>

      <div className="upper-section">
        <div className="input-row">
          <label>First Name</label>
          <input type="text" onChange={e => setData({...data, first_name : e.target.value})} />
        </div>

        <div className="input-row">
          <label>Last Name</label>
          <input type="text" onChange={e => setData({...data, last_name : e.target.value})} />
        </div>

        <div className="input-row">
          <label>Email</label>
          <input type="email" onChange={e => setData({...data, email : e.target.value})} />
        </div>

        <div className="input-row">
          <label>Organisation</label>
          <select onChange={e => setData({...data, organisation : e.target.value})}>
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
          value={inputValue}
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

export default AddNewTeacher;
