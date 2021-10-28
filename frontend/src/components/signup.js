import React,{useState} from "react";
import styles from "../stylesheets/signup.css";

import LoginNavbar from "./loginNavbar.js";
import LoginFooter from "./loginFooter.js";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Row, Col } from "antd";


function Signup(){

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    
    function onSubmitLoginForm(e){
        e.preventDefault();
        if(email!=="" && password!==""){
            axios.post("https://modcrew-dev.herokuapp.com/api/v1/auth/register",{
                    "firstName": name,
                    "age": age,
                    "phone": phone,
                    "email": email,
                    "password": password
                }
            )
            .then((response)=>{
                if(response.data.success===true){
                    console.log(response.data);
                    setCookie("token", response.data.token);
                    setCookie("testToken","test1234");
                    window.location.href="./";
                }else{
                    console.log("not logged in");
                }
            })
        }
    }

    const [name,setName] = useState("");
    const [age,setAge] = useState(null);
    const [phone,setPhone] = useState(null);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    return (
        <div>
            <LoginNavbar />
            <div className="signup-greeting">
                <h3>Join our Community</h3>
                <h6>Sign up and grab your Prize now</h6>
            </div>
            <div className="signup-div">
                <form>
                    <input onChange={(e)=>{setName(e.target.value)}} className="signup-input" type="text" placeholder="Name"></input>
                    <input onChange={(e)=>{setAge(e.target.value)}} className="signup-input" type="number" placeholder="Age"></input>
                    <input onChange={(e)=>{setPhone(e.target.value)}} className="signup-input" type="number" placeholder="Phone"></input>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className="signup-input" type="email" placeholder="E-mail Id"></input>
                    <input onChange={(e)=>{setPassword(e.target.value)}} className="signup-input" type="password" placeholder="Password"></input>
                    <input onChange={(e)=>{setConfirmPassword(e.target.value)}} className="signup-input" type="password" placeholder="Confirm Password"></input>
                    <br/>
                    <span>
                        <Row>
                            <Col><input id="remember-me" type="checkbox"></input> </Col>
                           <Col>  <label for="remember-me" className="terms">  I have read and accepted the <a href="">Terms and Conditions</a></label></Col>
                            </Row>
                        
                    </span>
                    <br />
                    <button onClick={(e)=>{onSubmitLoginForm(e)}} className="sign-in" type="submit">Create my account</button>
                </form>
            </div>
            <span className="already-here">Already have an account? <a href="/login">Login Here</a></span>
            {/* <LoginFooter /> */}
        </div>
    );
}

export default Signup;