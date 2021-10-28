import react from "react";
import styles from "../stylesheets/footer.css";
import logo from "../stylesheets/images/logow.svg";
import call from "../icons/call.svg";
import location from "../icons/location.svg";
import mail from "../icons/mail.svg";

import { Row , Col} from 'antd'

import { FaFacebookF } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiTwitterFill } from 'react-icons/ri';
import { RiInstagramFill } from 'react-icons/ri';

function Footer(){
    return (
        <div>
            <div className="row footer-div">
                <div className="col-md-4 footer-lists">
                    <img className="footer-logo" src={logo}/>
                    <p><img src={call}/> Bangalore,Karnataka,INDIA</p>
                    <p><img src={location}/> +91 012341567890</p>
                    <p><img src={mail}/> connect@modcrw.com</p>
                </div>
                <div className="col-md-2 footer-lists">
                    <h6> Browse by category</h6>
                    <ul>
                        <li>Home</li>
                        <li>Winners List</li>
                        <li>Contact Us</li>
                        <li>Cart</li>
                        <li>About</li>
                        <li>Help</li>
                    </ul>
                </div>
                <div className="col-md-2 footer-lists">
                    <h6> Resources</h6>
                    <ul>
                        <li>Clothing</li>
                        <li>Accessories</li>
                        <li>Detailing</li>
                        <li>Car Parts</li>
                        <li>Clearance</li>
                        <li>Sweepstakes</li>
                    </ul>
                </div>
                <div className="col-md-2 footer-lists">
                    <h6> Support</h6>
                    <ul>
                        <li>Feedback</li>
                        <li>Browse Support</li>
                        <li>Detailing</li>
                        <li>Car Parts</li>
                        <li>Clearance</li>
                        <li>Sweepstakes</li>
                    </ul>
                </div>
                <div className="col-md-2 footer-lists">
                    <h6> Connect @</h6>
                    <FaFacebookF size={20}className="white-color"/><a style={{color:'white'}} href=""> Facebook</a><br />
                    <IoLogoWhatsapp size={20} className="white-color"/><a style={{color:'white'}} href=""> Whatsapp</a><br />
                    <RiTwitterFill size={20} className="white-color"/><a style={{color:'white'}} href=""> Twitter</a><br />
                    <RiInstagramFill size={20} className="white-color"/><a style={{color:'white'}} href=""> Instagram</a>
                </div>
            </div>
            <div className="second-footer">
                <p>Copywright @ 2021, Webure. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;