import React, { useState } from 'react'
import './login.css'
import faculty from './faculty.png'
import student from './student.svg'
import Header from '../components/header'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Login() {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [isSignUpMode2, setIsSignUpMode2] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    const handleSignUpClick2 = () => {
        setIsSignUpMode2(true);
    };

    const handleSignInClick2 = () => {
        setIsSignUpMode2(false);
    };

    return (
        <div className="parent-div">
            <div className="header-div">
                <Header />
            </div>
            <div className="overall">

                <div className={`container ${isSignUpMode ? "sign-up-mode" : ""} ${isSignUpMode2 ? "sign-up-mode2" : ""}`}>
                    <div class="signin-signup">
                        <form action="" class="sign-in-form ">
                            <h2 class="title">STUDENT LOGIN</h2>
                            <div class="input-field">
                                <FontAwesomeIcon icon={faUser} className="fontawesome" />
                                <input type="text" placeholder="Username" pattern="[A-Za-z0-9]+" />
                            </div>
                            <div class="input-field">
                                <FontAwesomeIcon icon={faLock} className="fontawesome" />
                                <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" class="btn" />
                            <p class="social-text">Forgot Password ?</p>
                        </form>
                        <form action="" class="sign-up-form">
                            <h2 class="title">FACULTY LOGIN</h2>
                            <div class="input-field">
                                <FontAwesomeIcon icon={faUser} className='fontawesome' />
                                <input type="text" placeholder="Username" pattern="[A-Za-z0-9]+" />
                            </div>
                            <div class="input-field">
                                <FontAwesomeIcon icon={faLock} className='fontawesome' />
                                <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" class="btn" />
                            <p class="social-text">Forgot Password ?</p>
                        </form>
                    </div>
                    <div class="panels-container">
                        <div class="panel left-panel">
                            <div class="content">
                                <h3>Are you a student ?</h3>
                                <p>Click here to continue to student login</p>
                                <button class="btn" id="sign-in-btn" onClick={handleSignInClick}>Student</button>
                            </div>
                            <img src={student} alt="" class="image left" />
                        </div>
                        <div class="panel right-panel">
                            <div class="content">
                                <h3>Are you a faculty member ?</h3>
                                <p>Click here to continue to faculty login</p>
                                <button class="btn" id="sign-up-btn" onClick={handleSignUpClick}>Faculty</button>
                            </div>
                            <img src={faculty} alt="" class="image right" />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );

}


export default Login;