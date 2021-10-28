import react from "react";
import styles from "../stylesheets/cartProduct.css";

function CartProduct(props){

    const {name,quantity,price,total,image} = props;
    return (
        <div>
            <div className="row" >
                <div className="col-6 cart-product-details">
                    <img src={image} className="cart-image"/>
                    <div>
                        <h6>{name}</h6>
                        <button className="remove">Remove</button>
                    </div>
                </div>
                <div className="col-2 cart-entries">
                    <p>{quantity}</p>
                </div>
                <div className="col-2 cart-entries">
                    <h6>₹{price}/-</h6>
                </div>
                <div className="col-2 cart-entries">
                    <h6>₹{total}/-</h6>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;