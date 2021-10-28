import react from "react";
import styles from "../stylesheets/about.css";

import Navbar from "./navbar.js";
import Footer from "./footer.js";
import Admiration from "./admiration.js";
import ThirdNavbar from "./ThirdNavbar.js";
import Carousel from "./carousel.js";

import offer from "../stylesheets/images/offer.jpg";
import coupon1 from "../stylesheets/images/coupon1.jpg";
import coupon2 from "../stylesheets/images/coupon2.jpg";

function About(){
    return (
        <div>
            <Navbar />
            <ThirdNavbar />
            <h1 style={{color:'red',marginLeft:'2%',marginTop:'4%'}}>About Us</h1>
            <hr className="rule"/>
            <h4 style={{color:'red',marginLeft:'2%',marginTop:'2%'}}>What is MODCREW?</h4>
            <p
                style={{textAlign:'center',marginTop:'1%'}}>
                With a vision of having a merchandise brand totally focussed towards the
                automobile enthusiasts, to all the racing fans out there, we bring you
                MODCREW.
                Modcrew is all about speed, race, gears, and everything that excites you
                about the adventurous sport. We understand the thrill coursing through
                your veins and the desire to take a part of this excitement back home, and
                we enable you with all the merchandise that you need for your collection
                as a fan.
            </p>
            <h4 style={{color:'red',marginLeft:'2%',marginTop:'2%'}}>MODCREW</h4>
            <p
                style={{textAlign:'center',marginTop:'1%'}}>
                The logo was designed keeping the race tracks in mind with a dodger
                italic font. Modcrew kicks off with a start-up track followed by lap dots
                and ends with the finish line. The focus has been mainly on building
                up the thrill for speed, infusing energy, and letting out the excitement
                in the air.
            </p>
            <h2 
                className="top-selling" 
                style={{textAlign:'center',marginTop:'4%'}}>
                Check us out on Social Media:
            </h2>
            <p 
                style={{textAlign:'center'}}>
                 Official Company Instagram: @Modcrew <br />
                 Official FaceBook Page: @Modcrew_FB</p>
            <hr className="rule"/>
            {/* <h3 
                className="top-selling" 
                style={{textAlign:'center',marginTop:'2%'}}>
                Top Selling of the Week
            </h3> */}
            <Carousel 
                id={2}
                img1={offer}
                img2={coupon1}
                img3={coupon2}
            />
            <Admiration />
            <Footer />
        </div>
    );
}

export default About;