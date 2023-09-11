import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

function NavigationBar() {
    return (
        <div className="navigation-bar-box">
            <div>
                <nav className="navigation-container">
                    <ul className="navigation-list">
                        <li><Link to="/">Home</Link></li>
                        <li className="dropdown">
                            <div className="dropdown-content">
                                <Link to="/course/view">View Course</Link>
                                <Link to="/course/create">Create Course</Link>
                                <Link to="/course/edit">Edit Course</Link>
                            </div>
                            <Link to="#">Course <span className="dropdown-arrow">&#9662;</span></Link>
                        </li>
                        <li className="dropdown">
                            <div className="dropdown-content">
                                <Link to="/question/view">View Question</Link>
                                <Link to="/question/edit">Edit Question</Link>
                                {/* 添加其他选项 */}
                            </div>
                            <Link to="#">Question <span className="dropdown-arrow">&#9662;</span></Link>
                        </li>
                        <li className="dropdown">
                            <div className="dropdown-content">
                                <Link to="/exam/view">Create Exam</Link>
                                <Link to="/exam/upload">Upload Exam</Link>
                                <Link to="/exam/upload">Download Exam</Link>
                            </div>
                            <Link to="#">Exam <span className="dropdown-arrow">&#9662;</span></Link>
                        </li>
                        <li className="dropdown">
                            <div className="dropdown-content">
                                <Link to="/archive/view">View Archive</Link>
                                <Link to="/archive/edit">Edit Archive</Link>
                                {/* 添加其他选项 */}
                            </div>
                            <Link to="#">Archive <span className="dropdown-arrow">&#9662;</span></Link>
                        </li>
                        <li><Link to="#">Search</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                        <li><Link to="#">Login</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default NavigationBar