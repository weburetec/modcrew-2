import react, { useEffect,useState } from "react";
import axios from "axios";
import { useCookies} from 'react-cookie';
import styles from "../stylesheets/orderSummary.css";

import OrderSummaryProduct from "./orderSummaryProduct.js";
import Navbar from "./navbar.js";
import ThirdNavbar from "./ThirdNavbar.js";

function OrderSummary(){

    const [cookies, setCookie, removeCookie,get] = useCookies(['token']);
    const loggedInToken = cookies.token;
    const [items,setItems] = useState(null);
    const [subTotal,setSubTotal] = useState(null);

    useEffect(()=>{
        axios.get("https://modcrew-dev.herokuapp.com/api/v1/cart",{
            headers:{
                'Content-Type':'application/json',
                "Authorization" :`Bearer ${loggedInToken}`
            }
        },{
            withCredentials: true
        })
            .then((response)=>{
                console.log(response.data.data.items); 
                setSubTotal(response.data.data.sub_total);
                setItems(response.data.data.items);
            });
    },[]);

    return (
        <div>
            <Navbar />
            <ThirdNavbar />
            <div className="col-4 order-success">
                <h3 style={{textAlign:'center'}}>Order Summary</h3>
                <hr />
                {items?.map((product)=>{
                        return (
                            <OrderSummaryProduct
                                name={product.name}
                                quantity={product.units}
                                price={product.selling_price}
                                total={product.total}
                                image={product.image}
                            />
                        );
                })}
                <hr />
                <div className="order-summary-heading">
                    <p>Total Cost</p>
                    <h6>₹{subTotal}/-</h6>
                </div>
            </div>
            <button className="button-cont" onClick={()=>{window.location.href="/"}}>Continue Shopping</button>
        </div>
    );
}

export default OrderSummary;