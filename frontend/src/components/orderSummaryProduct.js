import react from "react";
import styles from "../stylesheets/cart.css";

function OrderSummaryProduct(props){

    const {name,quantity,price,total,image} = props;

    return (
        <div style={{marginBottom:'5%'}} className="row">
            <div className="col-4">
                <img className="order-summary-image" src={image}/>
            </div>
            <div className="col-4">
                <h6>{name}</h6>
                <p>{quantity}</p>
            </div>
            <div className="col-4">
                <h6>{price}</h6>
            </div>
        </div>
    );
}

export default OrderSummaryProduct;