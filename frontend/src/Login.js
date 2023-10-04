import React from 'react'
import { useState, useRef } from 'react'
import EmailValidation from './EmailValidation'

function Login() {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (EmailValidation(formValues)) {
            // make POST request here
            console.log(formValues);
            resetForm();
        } else {
            // stay on same page
        }
    }

    const handleInput = (event) => {
        setFormValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const formRef = useRef(null);

    const resetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <main className="center">
            <div className="container">
                <div className="text">
                    Weather App Login
                </div>

                <form action="/login" method="post" ref={formRef} onSubmit={handleSubmit}>
                    <div className="data" id="email-container">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" onChange={handleInput} required />
                    </div>
                    <div className="data">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" onChange={handleInput} required />
                    </div>
                    <div className="forgot-pass">
                        {/* <a >Forgot Password?</a> */}
                    </div>
                    <div className="btn">
                        <button id="submitbutton" type="submit">login</button>
                    </div>
                </form>

                <div className="container-two">
                    <div className="img-container">
                        <img className="test-img"
                            src="https://cdn.icon-icons.com/icons2/2157/PNG/512/github_git_hub_logo_icon_132878.png"
                            alt="github logo" />
                    </div>
                    <form action="/auth/github" method="get">
                        <button id="github-button" type="submit">login via
                            Github</button>
                    </form>
                </div>

                <div className="signup-link">
                    <p> Not a member? </p> <a href="/register"> Signup now</a>
                </div>
            </div>
        </main>
    )
}

export default Login