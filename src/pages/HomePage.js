import React from "react";
import LoginIcon from '../res/Login-Icon.svg';
import '../css/HomePage.css';
import Logo from '../res/Logo.svg'


function HomePage(){
return(
<>
<img id="logo" src={Logo} alt="FFSmart_Logo"></img>
<h1>Eating Done Smarter</h1>
<hr></hr>
<p id="description">State of the art innovative smart concept for your fridge<br></br>to ensure lasting freshness!</p>
<div className="login_button">
    <p>Login</p>
    <img id="login_icon" src={LoginIcon} alt="login_icon"></img>
</div>
</>
)
}

export default HomePage;