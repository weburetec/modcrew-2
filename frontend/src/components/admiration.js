import react from "react";

import safe from "../icons/safe.svg";
import satisfaction from "../icons/satisfaction.svg";
import exchange from "../icons/exchange.svg";

function Admiration(){
    return (
        <div className="row admire-buttons">
                <button className="admiration-buttons col-md-3 col-xs-6" style = {{marginBottom : 10}}>
                    <img src={safe} /><br/>
                    Safe and Secure  Checkout
                </button>
                <button className="admiration-buttons col-md-3 col-xs-6"  style = {{marginBottom : 10}}>
                    <img src={exchange}/><br/>
                    NO-HASSLE
                    RETURNS AND EXCHANGES
                </button>
                <button className="admiration-buttons col-md-3 col-xs-6"  style = {{marginBottom : 10}}>
                    <img src={satisfaction}/><br/>
                    100% SATISFACTION GUARANTEED
                </button>
        </div>
    );
}

export default Admiration;