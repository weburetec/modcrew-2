import react, { useEffect, useState } from "react";
import styles from "../stylesheets/productPage.css";
import axios from "axios";

import Navbar from "./navbar.js";
import Footer from "./footer.js";
import Admiration from "./admiration.js";
import ThirdNavbar from "./ThirdNavbar.js";
import ProductInfo from "./productInfo.js";
import Product from "./product.js";

function ProductPage(props){

    const [productData,setProductData] = useState(null);
    const [similarProducts,setSimilarProducts] = useState(null);

    useEffect(()=>{
        const id = props.match.params.productId;
        axios.get(`https://modcrew-dev.herokuapp.com/api/v1/products/${id}`)
            .then((response)=>{
                const fetchedProductData = response.data.data;
                setProductData(fetchedProductData);
            });
    },[]);

    useEffect(()=>{
        const category = productData?.category[0];
        console.log("category",category);
        axios.get(`https://modcrew-dev.herokuapp.com/api/v1/products/?category=${category}`)
            .then((response)=>{
                const similarCategoryProducts = response.data.data;
                // console.log("similar",similarCategoryProducts);
                setSimilarProducts(similarCategoryProducts);
            });
    },[productData]);

    function renderSimilar(){
        if(similarProducts!==null){
            return similarProducts.map((product)=>{
                if(product._id!==productData._id)
                {
                    console.log("humara kam",product._id);
                    return (
                        <Product 
                            id={product._id+"3"}
                            avgRating={product.avgRating} 
                            title={product.title} 
                            sellingPrice={product.sellingPrice}
                            mrp={product.mrp}
                            img={product.images[0]}
                            productId = {product._id}
                        /> 
                    );
                } 
            })
        }
    }

    return (
        <div className="productPage">
            <Navbar />
            <ThirdNavbar />
            <div className="row ">
                <div className="col-xs-12 col-md-6 productPage-img-div">
                    <img className="product-image" src={productData?.images[0]}/>
                </div>
                <div className="col-xs-12 col-md-6 description-div">
                    <ProductInfo 
                        id={productData?._id}
                        title={productData?.title}
                        sellingPrice={productData?.sellingPrice}
                        images={productData?.images}
                        description={productData?.description}
                        reviews={productData?.reviews}
                        variations={productData?.variations}
                    />
                </div>
            </div>
            <hr />
            <h2 style={{textAlign:'center'}}>Similar Products</h2>
            <div className="row product-div">
                {renderSimilar()}
            </div>
            <Admiration />
            <Footer />
        </div>
    );
}

export default ProductPage;