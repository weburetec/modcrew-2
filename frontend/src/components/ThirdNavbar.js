import react from "react";

import accessoriesActive from "../icons/accessories-active.svg";
import activewearActive from "../icons/activewear-active.svg";
import bottomwearActive from "../icons/bottomwear-active.svg";
import topwearActive from "../icons/topwear-active.svg";
import collectablesActive from "../icons/collectables-active.svg";

function ThirdNavbar(){
    return (
        <div className="third-navbar">
            <span className="third-navbar-spans">
                <img src={activewearActive}/> 
                <a href="#category-section">Active Wear</a>
            </span>
            <span className="vertical"></span>
            <span className="third-navbar-spans"><img src={topwearActive}/> <a href="#category-section">Top Wear</a></span><span className="vertical"></span>
            <span className="third-navbar-spans"><img src={bottomwearActive}/> <a href="#category-section">Bottom Wear</a></span><span className="vertical"></span>
            <span className="third-navbar-spans"><img src={accessoriesActive}/> <a href="#category-section">Accessories</a></span><span className="vertical"></span>
            <span className="third-navbar-spans"><img src={collectablesActive}/> <a href="#category-section">Collectibles</a></span>
        </div>
    );
}

export default ThirdNavbar;