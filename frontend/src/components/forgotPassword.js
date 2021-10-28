import react,{useState} from "react";
import styles from "../stylesheets/login.css";

import LoginNavbar from "./loginNavbar.js";
import LoginFooter from "./loginFooter.js";
import axios from "axios";
import { useCookies } from 'react-cookie';

function ForgotPassword(){

    const [emailForgot,setEmailForgot] = useState("");
    
    return (
        <div>
            <LoginNavbar />
            <div className="login-greeting">
                <h3>Reset Password</h3>
                <p>Enter the email associated with your account<br /> and we’ll send an email with instructions to <br />reset your password.</p>
            </div>
            <div className="login-div">
                <form>
                    <input onChange={(e)=>{setEmailForgot(e.target.value)}} className="login-input" type="email" placeholder="E-mail Id"></input>
                    <button className="sign-in" type="submit">Send Notifcation</button>
                </form>
            </div>
            <span className="remember-pw">Remember Password? <a href="/login">Login</a></span>
            <LoginFooter />
        </div>
    );
}

export default ForgotPassword;