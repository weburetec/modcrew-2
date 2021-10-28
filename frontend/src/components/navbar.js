import react from "react";
import {Link} from "react-router-dom";
import { useCookies} from 'react-cookie';

import styles from "../stylesheets/navbar.css";

import { FaFacebookF } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiTwitterFill } from 'react-icons/ri';
import { RiInstagramFill } from 'react-icons/ri';
import { IoIosCall } from 'react-icons/io';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';

import cart from "../icons/cart.svg";
import logow from "../stylesheets/images/logow.svg";

const availableCatagories = [
    'collectibles',
    'diary',
    'sticker',
    'badge',
    'key-chain',
    'poster',
    'fashion',
    'active-wear',
    'jogger',
    'jersey',
    'top-wear',
    'henley',
    'round-neck',
    'crop-top',
    'bottom-wear',
    'shorts',
    'accessories',
    'cap',
    'bandana',
    'bag'
]

function getLoginPage(){
    window.location.href="/login";
}

function goToCart(){
    console.log("go to cart");
    window.location.href="/cart";
}

function getProfilePage(){
    window.location.href="/profile";
}

function Navbar(props){

    // const {cartQuantity} = props;

    const [cookies, setCookie, removeCookie,get] = useCookies(['token']);
    const loggedInToken = cookies.token;

    function Logout(){
        removeCookie("token");
        window.location.href="/";
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand logo" href="./"><img src={logow} /></a>
                        <div className="main-div">
                            <div className="row upper-navbar">
                                <ul className="navbar-nav col-lg-6 me-auto ">
                                    <li className="nav-item upper-nav-list">
                                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                                    </li>
                                    <li className="nav-item upper-nav-list">
                                        <a className="nav-link" href="#">Winners List</a>
                                    </li>
                                    <li className="nav-item upper-nav-list">
                                        <a className="nav-link" href="/contact">Contact Us</a>
                                    </li>
                                    <li className="nav-item upper-nav-list">
                                        <a className="nav-link" href="/about">About</a>
                                    </li>
                                    <li className="nav-item upper-nav-list">
                                        <a className="nav-link" href="#">Help</a>
                                    </li>
                                </ul>
                                <div className="col social-icons">
                                    <button><FaFacebookF size={20}className="white-color"/></button>
                                    <button><IoLogoWhatsapp size={20} className="white-color"/></button>
                                    <button><RiTwitterFill size={20} className="white-color"/></button>
                                    <button><RiInstagramFill size={20} className="white-color"/></button>
                                    <button><IoIosCall size={20} className="white-color"/></button>
                                    {loggedInToken ?  <button className="login-btn" onClick={()=>{Logout()}}>Logout</button> : <button className="login-btn" onClick={()=>{getLoginPage()}}>Login/Signup</button>}
                                    {loggedInToken && <button className="login-btn" onClick={()=>getProfilePage()}>Profile</button>}
                                </div>
                            </div>
                            <div className="navbar-search">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle navbar-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        All Categories
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {availableCatagories.map((category)=>{
                                        return (<li><a class="dropdown-item" href="#">{category.charAt(0).toUpperCase() + category.slice(1)}</a></li>);
                                    })}
                                    </ul>
                                </div>
                                <form>
                                    <input type="search" placeholder="Search entire store here" aria-label="Search" />
                                    <button className="search-btn" type="submit">Search<BsSearch size={15} className="white-color"/></button>
                                </form>
                                <div className="button-tray">
                                    <button className="navbar-buttons"><AiOutlineHeart size={25} className="white-color"/></button>
                                    <button className="navbar-buttons" onClick={()=>{goToCart()}}><img src={cart} /> Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;