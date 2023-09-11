import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function Login() {
    const [inputs, setInputs] = useState({
        email : "",
        password : "",
    })

    // Send error message on the screen
    const [error, setError] = useState(null)

    // Go to home page after login success
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/auth/login", inputs)
            navigate("/home")
        } catch (error) {
            setError(error.response.data)          
        }       
    }

    const handleSubmitAdmin = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/auth/admin", inputs)
            navigate("/admin")
        } catch (error) {
            setError(error.response.data)          
        }       
    }

    return (
        <div className="login-box">
            <div className='login-content'>
                <div className='login-content-left'>
                    <p>Registered User</p>

                    <form action="">{/**修改前端 */}
                        <div className='login-content-left-option'>
                            Login
                        </div>
                        {error && <p color=''>{error}</p>}
                        <div className='login-content-left-tip'>Username(email address you registered with)</div>
                        <input name='email' type="email" onChange={handleChange}></input> {/**修改前端 */}
                        <div className='login-content-left-forget'>Forgot username?</div>
                        <div className='login-content-left-option'>Password</div>
                        <input name='password' type="password" onChange={handleChange}></input> {/**修改前端 */}
                        <div className='login-content-left-forget'>Forgot password?</div>
                        {/* <Link to="/Home">
                            <div className='login-content-left-login' onClick={handleSubmit}>Login</div>
                        </Link> */}
                        <button className='login-content-left-login' onClick={handleSubmit}>Login</button>
                        <button className='login-content-left-login-admin' onClick={handleSubmitAdmin}>Login As Admin</button>
                    </form>{/**修改前端 */}
                    
                
                </div>
                <div className='divider'></div>
                <div className='login-content-right'>
                    <div className='login-content-right-part'>New to Question Bank</div>
                    <div className='login-content-right-content'>Only create a new account if you are new to Question Bank. During registration, we will ask you minimal personal information sowe can confirm you as a unique user.</div>
                    <Link to="/signUp">
                        <div className='login-content-create'>Create new account</div>
                    </Link>
                    <div className='login-content-right-part'>Need help?</div>
                    <div className='login-content-right-content'>If you have trouble logging in, or if you need to update your personal information or school/organization affiliation, please contact us.</div>
                </div>
            </div>
        </div>
    )
}

export default Login