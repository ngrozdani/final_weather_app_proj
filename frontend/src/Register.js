import React from 'react'
import { useState, useRef } from 'react'
import EmailValidation from './EmailValidation'

function Register() {

    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Reg Submit");
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
                    Weather App Register
                </div>

                <form className="regform" action="/register" method="post" ref={formRef} onSubmit={handleSubmit}>
                    <div className="data" id="username-container">
                        <label htmlFor='username'>Username</label>
                        <input id="username" type="text" name="username" placeholder="Ex: JohnDoe123" onChange={handleInput} required />
                    </div>
                    <div className="data">
                        <label htmlFor='email'>Email</label>
                        <input id="email" type="email" name="email" placeholder="Ex: jdoe@yahoo.com" onChange={handleInput} required />
                    </div>
                    <div className="data">
                        <label htmlFor='password'>Password</label>
                        <input id="password" type="password" name="password" placeholder="Ex: password123" onChange={handleInput} required />
                    </div>
                    <div className="forgot-pass">
                        {/* <a>Forgot Password?</a> */}
                    </div>
                    <div className="btn">
                        <div className="inner"></div>
                        <button id="submitbutton" type="submit">Sign Up</button>
                    </div>
                    <div className="signup-link">
                        <p>Already a member?</p> <a href="/login">Login now</a>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Register