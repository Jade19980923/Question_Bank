import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './index.css';
import axios from 'axios';

function SignUp() {
    const [inputs, setInputs] = useState({
        first_name : "",
        last_name : "",
        password : "",
        email : "",
        //confirm_email : "",
    })

    // Send error message on the screen
    const [error, setError] = useState(null)

    // Go to login page after register success
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/auth/signup", inputs)
            navigate("/login")
        } catch (error) {
            setError(error.response.data)
            
        }
        
    }

    return (
        
        <div className="sign-up-box">
            <div className='sign-up-title'>Question Bank sign up</div>
            <div className='sign-up-content'>
                <div className='sign-up-tip'>
                    <h4>Already have an account?</h4>
                    <Link to="/login">
                        <div>Login</div>
                    </Link>
                    <span>|</span>
                    <div>Forgot Password</div>
                    <span>|</span>
                    <div>Forgot Username</div>
                </div>
                <div className='sign-up-part'>
                    <span>Personal Details</span>
                    <div className='sign-up-part-left'>
                        <div>First Name*</div>
                        <input name="first_name" type="text" placeholder='First Name' onChange={handleChange}></input>
                        <div>Last Name*</div>
                        <input name="last_name" type="text" placeholder='Last Name' onChange={handleChange}></input>
                        <div>Password*</div>
                        <input name="password" type="password" placeholder='password' onChange={handleChange}></input>
                    </div>
                    <div className='sign-up-part-right'>
                        <div>Important note: Please do not create a new account if you think you have one already.</div> 
                        <div>To change your personal details such as your surname, or need to change the school/organisation with which you are affiliated, please contact us.</div>
                    </div>
                </div>
                <div className='sign-up-part'>
                    <span>Email Details</span>
                    <div className='sign-up-part-left'>
                        <div>Username/Permanent email address*</div>
                        <input name="email" type="email" placeholder='yourname@example.com' onChange={handleChange}></input>
                        <div>Confirm your email*</div>
                        <input name="confirm_email" type="email" placeholder='yourname@example.com' onChange={handleChange}></input>
                        <div>School email or organizational email(optional)</div>
                        <input placeholder='yourname@example.com'></input>
                    </div>
                    <div className='sign-up-part-right'>
                        <div>The email address you enter here will become your userame for Question Bank. </div>
                        <div>If you wish to change it after registration, you will need to contact us.</div>
                    </div> 
                </div>

                <div className='sign-up-part'>
                    <span>Security Check</span>
                    <ReCAPTCHA sitekey="6LeIxAcTAAAAAGDYwTEbZcY3_dRkLutN4exvVa0f" />
                </div>
                <div className='sign-up-part'>
                    <span>Team & Conditions</span>
                    <div className='sign-up-team'>
                        <div> 
                            By clicking below you agree to the terms and conditions
                        </div>
                        <label>
                            <input type="checkbox" name="fruit" value="apple" />
                            <span> I confirm acceptance</span>
                        </label>
                        <div> 
                        Any Personal data that you provide will be handled in line only with the Question Bank.
                        </div>
                    </div>
                </div>
            </div>
            <button className='sign-up-button' onClick={handleSubmit}>Create my account</button>
            {error && <p color=''>{error}</p>}
            
        </div>
        
    )
}

export default SignUp