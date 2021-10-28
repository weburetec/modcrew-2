import react from "react";
import styles from "../stylesheets/product.css";
import cover from "../stylesheets/images/cover.jpg";
import cart from "../icons/cart.svg";
import view from "../icons/view.svg";
import {Link} from "react-router-dom";

function Product(props){

    function mouseOverEffect(id){
        const element = document.getElementById(`hover-${id}`);
        element.classList.remove("d-none");
    }

    function mouseOutEffect(id){
        const element = document.getElementById(`hover-${id}`); 
        element.classList.add("d-none");
    }

    function transparentOverEffect(id){
        const element = document.getElementById(`product-img-trnsprnt-${id}`);
        element.classList.add("card-img-trnsprnt");
    }

    function transparentOutEffect(id){
        const element = document.getElementById(`product-img-trnsprnt-${id}`);
        element.classList.remove("card-img-trnsprnt");
    }

    function handleEyeColourOver(id){
        // const element = document.getElementById("eye-btn");
        // element.classList.add("eye-colour");
        const element = document.getElementById(`product-img-trnsprnt-${id}`);
        element.classList.add("card-img-trnsprnt");
    }

    function handleEyeColourOut(id){
        // const element = document.getElementById("eye-btn");
        // element.classList.remove("eye-colour");
        const element = document.getElementById(`product-img-trnsprnt-${id}`);
        element.classList.remove("card-img-trnsprnt");
    }

    return (
            <div className="card product-card col-3">
                <div onMouseOver={()=>mouseOverEffect(props.id)} onMouseOut={()=>mouseOutEffect(props.id)}>
                    <div 
                        className="hover-div-btns d-none" 
                        id={`hover-${props.id}`}
                        onMouseOver={()=>{handleEyeColourOver(props.id)}} 
                        onMouseOut={()=>{handleEyeColourOut(props.id)}}
                    >
                    
                        <Link to={`/productPage/${props.productId}`}><button id="eye-btn" 
                        className="landing-page-button" ><img className="hover-btns view-btn" src={view} /></button></Link>
                        <Link to={"/cart"}>
                            <button className="landing-page-button">
                                <img className="hover-btns view-btn" src={cart} />
                            </button>
                        </Link>
                    </div>
                    <img 
                        id={`product-img-trnsprnt-${props.id}`} 
                        onMouseOver={()=>{transparentOverEffect(props.id)}} 
                        onMouseOut={()=>{transparentOutEffect(props.id)}}
                        className="card-img-product" 
                        src={props.img} 
                        alt={props.img}
                    />
                </div>

                <hr />
                <div className="card-body product-body row">
                    <div className="col-10">
                        <span className="star-icon"><i className="fas fa-star"></i> {props.avgRating}</span>
                        <p className="card-text product-name">{props.title}</p>
                        <span className="discnt-price">₹{props.sellingPrice}/-</span>
                        <span className="original-price">₹{props.mrp}/-</span>
                    </div>
                    <div className="col-2">
                        <button className="landing-page-button like-btn"> <i class="far fa-heart"></i> </button>
                        <span className="sold-qty-div">
                            <span className="sold-qty">900</span>
                            <span className="sold">Sold</span>
                        </span>
                    </div>
                </div>
            </div>
    );
}

export default Product;