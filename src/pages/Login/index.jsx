import { Link } from 'react-router-dom';
import './index.css';

function Login() {
    const onCreateNewAccount = () => {

    }
    return (
        <div className="login-box">
            <div className='login-content'>
                <div className='login-content-left'>
                    <p>Registered User</p>
                    <div className='login-content-left-option'>Login</div>
                    <div className='login-content-left-tip'>Username(email address you registered with)</div>
                    <input></input>
                    <div className='login-content-left-forget'>Forgot username?</div>
                    <div className='login-content-left-option'>Password</div>
                    <input type="password"></input>
                    <div className='login-content-left-forget'>Forgot password?</div>
                    <link to="/Home">
                        Login
                    </link>
                </div>
                <div className='divider'></div>
                <div className='login-content-right'>
                    <div className='login-content-right-part'>New to Question Bank</div>
                    <div className='login-content-right-content'>Only create a new account if you are new to Question Bank. During registration, we will ask you minimal personal information sowe can confirm you as a unique user.</div>
                    <Link to="/signUp">
                        <div className='login-content-create' onClick={onCreateNewAccount}>Create new account</div>
                    </Link>
                    <div className='login-content-right-part'>Need help?</div>
                    <div className='login-content-right-content'>If you have trouble logging in, or if you need to update your personal information or school/organization affiliation, please contact us.</div>
                </div>
            </div>
        </div>
    )
}

export default Login