import react from "react";
import styles from "../stylesheets/cart.css";

function CartSummary(props){

    const {items,subTotal} = props;
    
    function handleCheckOut(e){
        const element = e.target;
        e.target.innerHTML = "Purchase";
    }

    return (
        <div>
            <h3>Order Summary</h3>
                    <hr />
                    <div className="order-summary-heading">
                        <p>{items?.length} items</p>
                        <h6>₹{subTotal}/-</h6>
                    </div>
                    <h5>Shipping</h5>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle cart-dropdowns" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Delivery Type - ₹80
                        </button>
                        <ul class="dropdown-menu cart-li" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Delivery Type - ₹80</a></li>
                        </ul>
                    </div>
                    <h5>Promo Code</h5>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle cart-dropdowns" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Enter Promo Code
                        </button>
                        <ul class="dropdown-menu cart-li" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Promo Code-1</a></li>
                            <li><a class="dropdown-item" href="#">Promo Code-2</a></li>
                            <li><a class="dropdown-item" href="#">Promo Code-3</a></li>
                        </ul>
                    </div>
                    <button className="cart-coupon-code">Apply</button>
                    <hr />
                    <div className="order-summary-heading">
                        <p>Total Cost</p>
                        <h6>₹{subTotal !==0 ? subTotal+80 : 0}/-</h6>
                    </div>
                    <button onClick={(e)=>{handleCheckOut(e)}} className="checkout">Check Out</button>
        </div>
    );
}

export default CartSummary;