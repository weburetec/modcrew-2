import react, { useEffect,useState } from "react";
import styles from "../stylesheets/profile.css";
import Avatar from 'react-avatar';
import { useCookies} from 'react-cookie';
import axios from "axios";

import Navbar from "./navbar.js";
import ThirdNavbar from "./ThirdNavbar.js";
import Admiration from "./admiration.js";
import Carousel from "./carousel.js";
import Footer from "./footer.js";

import offer from "../stylesheets/images/offer.jpg";
import coupon1 from "../stylesheets/images/coupon1.jpg";
import coupon2 from "../stylesheets/images/coupon2.jpg";

import personal from "../icons/profile.svg";
import community from "../icons/community.svg";
import chat from "../icons/chat.svg";
import stuff from "../icons/stuff.svg";
import orders from "../icons/orders.svg";
import settings from "../icons/settings.svg";
import logout from "../icons/logout.svg";

import insta from "../icons/insta.svg";
import fb from "../icons/fb.svg";
import pintrest from "../icons/pintrest.svg";

import gold from "../icons/gold.svg"

import { Row, Col } from "antd";
function Profile(){

    const [cookies, setCookie, removeCookie,get] = useCookies(['token']);
    const loggedInToken = cookies.token;
    const [userInfo,setUserInfo] = useState(null);
    const [current,setCurrent] = useState("personal details");

    function Logout(){
        removeCookie("token");
        window.location.href="/";
    }

    useEffect(()=>{
        axios.get("https://modcrew-dev.herokuapp.com/api/v1/auth/me",{
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${loggedInToken}`,
                    },
                  },
                  {
                    withCredentials: true,
                  }
                )
                  .then((response)=>{
                    const data1 = response.data.data;
                    console.log("response",data1);
                    setUserInfo(data1);
                });
    },[]);
    
    function renderPersonalDetails(){
        return (
            <div className="col-md-9 col-xs-12 profile-section">
                    <h4 style={{marginBottom:'3%'}}>Personal Details</h4>
                    <div className="row personal-first-div">
                        <div className="col-md-3 personal-info">
                            <span className="personal-info-top">
                                <Avatar style={{float:'left'}} round={true} size="80" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" />
                                <h5>{userInfo?.firstName}</h5>
                                <br/>
                                <p>Title</p>
                                <button>Edit</button>
                            </span>  
                            <hr />
                            <div className="row posts-info">
                                <div className="col-4">
                                    <h6>34</h6>
                                    <p>Posts</p>
                                </div>
                                <div className="col-4">
                                    <h6>34</h6>
                                    <p>Followers</p>
                                </div>
                                <div className="col-4">
                                    <h6>34</h6>
                                    <p>Following</p>
                                </div>
                            </div>
                            <hr style={{margin:'0 0 2% 0'}}/>
                            <div className="row">
                                <p className="connected-platforms">Connected Platforms</p>
                                <div className="col-4">
                                    <img src={insta} />&nbsp;
                                    name
                                </div>
                                <div className="col-4">
                                    <img src={fb} />&nbsp;
                                    name
                                </div>
                                <div className="col-4">
                                    <img src={pintrest} />
                                    &nbsp;
                                    name
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 personal-order-history">
                            <div className="order-history-heading">
                                <h5>Order History</h5>
                                <a href="">View All</a>
                            </div>
                            <hr style={{margin:'2% 0 5% 0'}}/>
                            <div>
                                <div className="profile-order-prdct">
                                    <Avatar style={{float:'left'}} round={true} size="40" src={userInfo?.orders[0]?.order_items[0].image} />
                                    <div className="profile-order-info">
                                        <h6>{userInfo?.orders[0]?.order_items[0]?.name.substring(0,10)}</h6>
                                        <p style={{fontSize:'0.8rem'}}>{userInfo?.orders[0]?.status}</p>
                                        
                                    </div>
                                    <button className="profile-order-share">Share</button>
                                </div>
                                <div className="profile-order-prdct">
                                    <Avatar style={{float:'left'}} round={true} size="40" src={userInfo?.orders[1]?.order_items[0]?.image} />
                                    <div className="profile-order-info">
                                        <h6>{userInfo?.orders[1]?.order_items[0]?.name.substring(0,10)}</h6>
                                        <p style={{fontSize:'0.8rem'}}>{userInfo?.orders[1]?.status}</p>
                                        
                                    </div>
                                    <button className="profile-order-share">Share</button>
                                </div>
                                <div className="profile-order-prdct">
                                    <Avatar style={{float:'left'}} round={true} size="40" src={userInfo?.orders[2]?.order_items[0]?.image} />
                                    <div className="profile-order-info">
                                        <h6>{userInfo?.orders[2]?.order_items[0]?.name.substring(0,10)}</h6>
                                        <p style={{fontSize:'0.8rem'}}>{userInfo?.orders[2]?.status}</p>
                                        
                                    </div>
                                    <button className="profile-order-share">Share</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 personal-share-profile">
                            <h5 style={{marginBottom:'10%'}}>Share your profile</h5>
                            <button className="share insta"><img src={insta} /> &nbsp; &nbsp; Post Feed on Instagram</button>
                            <button className="share"><img src={fb} /> &nbsp; &nbsp; Post on Facebook</button>
                            <button className="share"><img src={pintrest} /> &nbsp; &nbsp; Save with Pintrest</button>
                        </div>
                    </div>
                    <div className="super-and-recent">
                        <h5>My Supercoins</h5>
                        <div style={{display:'flex',justifyContent:'space-between',width:'26%'}}>
                            <h5>Recent Activity</h5>
                            <a href="" style={{textDecoration:'none'}}>View All</a>
                        </div>
                    </div>
                    <div className="row" style={{marginBottom:'4%'}}>
                        <div className="col-md-7 membership-div">
                            <Avatar src={gold} round={true} style={{float:'left'}} />
                            <div className="row">
                            <div className="membership-info col-5">
                                    <h3>{userInfo?.membership ? "Gold" : "No"} Membership</h3>
                                    <a href="">Change Membership</a>
                                    <br />
                                    <p>Valid till Jun 8th 2022</p>
                                </div>
                                <div className="col-3">
                                    <p className="loyalty-balance">Balance: {userInfo?.loyaltyCoins}</p>
                                </div>
                                <div className="col-4">
                                    <button className="offers-btn">Offers</button>
                                    <br />
                                    <br />
                                    <button className="coins">Coins</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4 recent-activity">
                            <div className="profile-order-prdct">
                                <Avatar style={{float:'left'}} round={true} size="40" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" />
                                <div className="profile-order-info">
                                    <h6>Name of product</h6>
                                    <p>Delivered</p>    
                                </div>
                                <button className="profile-order-share">Share</button>
                            </div>
                            <div className="profile-order-prdct">
                                <Avatar style={{float:'left'}} round={true} size="40" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" />
                                <div className="profile-order-info">
                                    <h6>Name of product</h6>
                                    <p>Delivered</p>    
                                </div>
                                <button className="profile-order-share">Share</button>
                            </div>
                        </div>
                    </div>
                </div> 
        );
    }

    function renderCommunity(){
        return (
            <div>

            </div>
        );
    }

    function renderChat(){
        return (
            <div>
                
            </div>
        );
    }

    function renderMyStuff(){
        return (
            <div>
                
            </div>
        );
    }

    function renderOrders(){
        return (
            <div>
                
            </div>
        );
    }

    function renderSettings(){
        return (
            <div>
                
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <ThirdNavbar />
            <div style={{marginTop:'1%',backgroundColor:'#FFFFFF'}}> 
                <a href="/" className="profile-anchor">Home </a>
                &gt;
                <a href="/profile" className="home-anchor"> Profile</a>
            </div>
            <hr style={{marginBottom:'0',height:'3px'}} />
            <div className="row">
                <div className="col-md-3 col-sm-12 menu">
                    <button className="new-post">New Post</button>
                    <button onClick={()=>{setCurrent("personal details")}} className={current==="personal details" ? "menu-btns profile-menu-btn-clicked" : "menu-btns"}><img src={personal} /> &nbsp; &nbsp; &nbsp; Personal Details</button><br />
                    <button onClick={()=>{setCurrent("community")}} className={current==="community" ? "menu-btns profile-menu-btn-clicked" : "menu-btns"}><img src={community} /> &nbsp; &nbsp; &nbsp; Community</button><br />
                    <button onClick={()=>{setCurrent("chat")}} className={current==="chat" ? "menu-btns profile-menu-btn-clicked" : "menu-btns"}><img src={chat} /> &nbsp; &nbsp; &nbsp; Chat</button><br />
                    <button onClick={()=>{setCurrent("my stuff")}} className={current==="my stuff" ? "menu-btns profile-menu-btn-clicked" : "menu-btns"}><img src={stuff} /> &nbsp; &nbsp; &nbsp; My Stuff</button><br />
                    <button onClick={()=>{setCurrent("orders")}} className={current==="orders" ? "menu-btns profile-menu-btn-clicked" : "menu-btns"}><img src={orders} /> &nbsp; &nbsp; &nbsp; My Orders</button><br />
                    <button onClick={()=>{setCurrent("settings")}} className={current==="settings" ? "menu-btns profile-menu-btn-clicked" : "menu-btns"}><img src={settings} /> &nbsp; &nbsp; &nbsp; Settings</button><br />
                    <button className="menu-btns" onClick={Logout}><img src={logout} /> &nbsp; &nbsp; &nbsp; Logout</button>
                </div>

                {current==="personal details" && renderPersonalDetails()}
                {current==="community" && renderCommunity()}
                {current==="chat" && renderChat()}
                {current==="my stuff" && renderMyStuff()}
                {current==="orders" && renderOrders()}
                {current==="settings" && renderSettings()}

            </div>
            <hr />
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

export default Profile;