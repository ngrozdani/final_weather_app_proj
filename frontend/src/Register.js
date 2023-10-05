import React from 'react'
import axios from 'axios'
import { useState, useRef } from 'react'
import EmailValidation from './EmailValidation'
import { useNavigate } from 'react-router-dom';
import NonAuthCSS from './login_register.module.css'

function Register() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Reg Submit");
        if (EmailValidation(formValues)) {
            console.log(formValues);
            axios.post('http://localhost:8080/register', formValues)
                .then(response => {
                    if (response.status === 200) {
                        resetForm();
                        navigate('/login');
                    } else {
                        // Handle the case where the response status is not 200
                        // You can log an error message or perform other actions here
                        console.error('Signup was not successful. Status code:', response.status);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const handleInput = (event) => {
        setFormValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const formRef = useRef(null);

    const resetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <main className={NonAuthCSS.center}>
            <div className={NonAuthCSS.container}>
                <div className={NonAuthCSS.text}>
                    Weather App Register
                </div>

                <form className="regform" action="/register" method="post" ref={formRef} onSubmit={handleSubmit}>
                    <div className={NonAuthCSS.data} id="username-container">
                        <label htmlFor='username'>Username</label>
                        <input id="username" type="text" name="username" placeholder="Ex: JohnDoe123" onChange={handleInput} required />
                    </div>
                    <div className={NonAuthCSS.data}>
                        <label htmlFor='email'>Email</label>
                        <input id="email" type="email" name="email" placeholder="Ex: jdoe@yahoo.com" onChange={handleInput} required />
                    </div>
                    <div className={NonAuthCSS.data}>
                        <label htmlFor='password'>Password</label>
                        <input id="password" type="password" name="password" placeholder="Ex: password123" onChange={handleInput} required />
                    </div>
                    <div className={NonAuthCSS.forgot_pass}>
                        {/* <a>Forgot Password?</a> */}
                    </div>
                    <div className={NonAuthCSS.btn}>
                        <div className="inner"></div>
                        <button id="submitbutton" type="submit">Sign Up</button>
                    </div>
                    <div className={NonAuthCSS.signup_link}>
                        <p>Already a member?</p> <a href="/login">Login now</a>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Register