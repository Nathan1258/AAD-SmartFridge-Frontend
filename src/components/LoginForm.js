import React from "react";
import '../css/LoginForm.css'

function LoginInput(){
    return(
        <form className="login_form">
                <p id="message">Welcome Back! Please Login to Your Account.</p>
                <input type='text'placeholder="Username"></input>
                <input type='password' placeholder="Password"></input>
                <p id='forgotten_password'>Forgotten Password?</p>
                <button id="button">Login</button>
        </form>
    )
};

function SignUpInput(){
    return(
        <form className="login_form">
                <p id="message">Welcome! Please create your account.</p>
                <input type='text'placeholder="Username"></input>
                <input type='text' placeholder="Password"></input>
                <input type='text' placeholder="Confirm Password"></input>
                <button id='button'>Create</button>
                
        </form>
    )
};

export default function LoginForm(){
    return(
        <SignUpInput/>
    )
};