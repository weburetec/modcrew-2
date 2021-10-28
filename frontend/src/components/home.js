import react, { useEffect,useState } from "react";
import Navbar from "./navbar.js";
import ThirdNavbar from "./ThirdNavbar.js";
import Admiration from "./admiration.js";

import styles from "../stylesheets/home.css";
import axios from "axios";
import offer from "../stylesheets/images/offer.jpg";
import coupon1 from "../stylesheets/images/coupon1.jpg";
import coupon2 from "../stylesheets/images/coupon2.jpg";
import cover from "../stylesheets/images/cover.jpg";
import Footer from "./footer.js";
import Product from "./product.js";
import Carousel from "./carousel.js";

import accessoriesActive from "../icons/accessories-inactive.svg";
import activewearActive from "../icons/activewear-active.svg";
import bottomwearActive from "../icons/bottomwear-active.svg";
import topwearActive from "../icons/topwear-active.svg";
import collectablesActive from "../icons/collectables-active.svg";

import Loading from "./loading.js"

import { IoMdCopy } from 'react-icons/io';

import { Card } from 'antd';

function Home(){
    
    const limit = 2;
    const [pageno,setPageno] = useState(1);

    const [typeOfProducts,setTypeOfProducts] = useState(1);

    const [specificCategoryData,setSpecificCategoryData] = useState(null);

    const [categoryData,setCategoryData] = useState(null);
    const [data,setData] =  useState(null);
    const [selectedCategory,setSelectedCategory] = useState('all');

    const [clickedBtn,setClickedBtn] = useState(1);
    
    const [currentCategory,setCurrentCategory] = useState('Select Category');

    // const [cartQuantity,setCartQuantity] = useState(0);

    //const [loading,setLoading] = useState(false);

    useEffect(()=>{
        axios.get("https://modcrew-dev.herokuapp.com/api/v1/products")
            .then((response)=>{
                setData(response.data.data);

                setCategoryData(response.data.data);
            });
    },[]);

    useEffect(()=>{
        if(selectedCategory==='all'){
            axios.get(`https://modcrew-dev.herokuapp.com/api/v1/products?limit=${limit}&page=${pageno}`)
        .then((response)=>{
            setSpecificCategoryData(response.data.data);
        });
        }
        else{
            axios.get(`https://modcrew-dev.herokuapp.com/api/v1/products?category=${selectedCategory}&limit=${limit}&page=${pageno}`)
            .then((response)=>{
                setSpecificCategoryData(response.data.data);
            });
        }
    },[pageno,selectedCategory]);

    useEffect(()=>{
        const btn = document.getElementById(`btn-${pageno}`);
        console.log(btn,pageno);
        
        // btn?.classList.add("highlight-page-no");
    },[pageno]);

    function handleClick1(e){
        setTypeOfProducts(1);
    }

    function handleClick2(){
        setTypeOfProducts(2);
    }

    function handleClick3(){
        setTypeOfProducts(3);
    }
    /* can return a custom component as a function return value. */
    function renderLatest(){
        if(data!==null){
            return data.map((product)=>{ 
                return (
                    <Product 
                        id={product._id}
                        avgRating={product.avgRating} 
                        title={product.title} 
                        sellingPrice={product.sellingPrice}
                        mrp={product.mrp}
                        img={product.images[0]}
                        productId = {product._id}
                    /> 
                );
            })
        }
    }

    function renderFeatured(){
        if(data!==null){
            return data.map((product)=>{
                if(product.isFeatured===true){
                    return (
                        <Product 
                            id={product._id}
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

    function renderBestSelling(){
        if(data!==null){
            return data.map((product)=>{
                if(product.isBestSelling===true){
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

    function renderCategoryData(){
        if(categoryData!==null){
            console.log("specificCategoryData",specificCategoryData);
            return specificCategoryData?.map((product)=>{ 
                return (
                    <Product 
                        id={product._id+"2"}
                        avgRating={product.avgRating} 
                        title={product.title} 
                        sellingPrice={product.sellingPrice}
                        mrp={product.mrp}
                        img={product.images[0]}
                        productId = {product._id}
                    /> 
                );
            })
        }
    }

    function makingPaginationButtons(){
        if(categoryData?.length>0){
            let noOfPages = 0;
            noOfPages = Math.ceil(categoryData.length/limit);

            var pagination = [];
            for(var i=1;i<=noOfPages;i++){
                pagination.push(
                    <button className="highlight-page-no" id={`btn-${i}`} value={i} onClick={(e)=>{setPageno(parseInt(e.target.value))}}>{i}</button>
                );
            }
        }
        return pagination;
    }

    function mouseOverEffectCoupon(id){
        const element = document.getElementById(`coupon-copy-btn-${id}`);
        element.classList.remove("d-none");
    }

    function mouseOutEffectCoupon(id){
        const element = document.getElementById(`coupon-copy-btn-${id}`);
        element.classList.add("d-none");
    }

    function handleOverHover(id){
        const element = document.getElementById(`coupon-copy-btn-${id}`);
        element.classList.remove("d-none");
    }

    function handleOutHover(id){
        const element = document.getElementById(`coupon-copy-btn-${id}`);
        element.classList.add("d-none");
    }

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

    function handleSubCategoryClick(category){

        //setLoading(true);

        setSelectedCategory(category);
            axios.get(`https://modcrew-dev.herokuapp.com/api/v1/products?category=${category}`)
            .then((response)=>{
                setCategoryData(response.data.data);
                //setLoading(false);
            });
    }

    var selectedSubCategories = [];
    /* mantaining an array for selected subCategories. */

    function handleCheckboxCLick(e){
        console.log(selectedSubCategories);
        const checkBox = e.target;
        const subcategory = checkBox.value;
        if (checkBox.checked == true){
            selectedSubCategories.push(subcategory);
        }
        else {
            //standard removal of an element from the array.
            selectedSubCategories = selectedSubCategories.filter(function(item) {
                return item !== subcategory;
            })
        }
        console.log(selectedSubCategories);
    }

    function handleFilterBtn(){
        
        var categoriesForApi = ""; 
        selectedSubCategories.forEach((i,idx)=>{
            if(idx===selectedSubCategories.length-1){
                categoriesForApi = categoriesForApi + i;
            }
            else{
                categoriesForApi = categoriesForApi + i + ",";
            }
            
        });
        console.log(categoriesForApi);
        handleSubCategoryClick(categoriesForApi);
        setCurrentCategory(categoriesForApi);
    }
    return (
        <div>
            <Navbar />
            <div className="third-navbar">
                <span onClick={()=>{handleSubCategoryClick("active-wear")}} className="third-navbar-spans">
                    <img src={activewearActive}/> 
                    <a href="#category-section">Active Wear</a>
                </span>
                <span className="vertical"></span>
                <span onClick={()=>{handleSubCategoryClick("top-wear")}} className="third-navbar-spans"><img src={topwearActive}/> <a href="#category-section">Top Wear</a></span><span className="vertical"></span>
                <span onClick={()=>{handleSubCategoryClick("bottom-wear")}} className="third-navbar-spans"><img src={bottomwearActive}/> <a href="#category-section">Bottom Wear</a></span><span className="vertical"></span>
                <span onClick={()=>{handleSubCategoryClick("accessories")}} className="third-navbar-spans"><img src={accessoriesActive}/> <a href="#category-section">Accessories</a></span><span className="vertical"></span>
                <span onClick={()=>{handleSubCategoryClick("collectables")}} className="third-navbar-spans"><img src={collectablesActive}/> <a href="#category-section">Collectibles</a></span>
            </div>
            <Carousel 
                id={1}
                img1={cover}
                img2={coupon1}
                img3={coupon2}
            />
                {/* <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card> */}
            <div className="row">
                <div className="col-6 content">
                    <img className="col-12 sale-img" src={coupon1} />
                    <button className="coupon-btns" onMouseOver={()=>mouseOverEffectCoupon(1)} onMouseOut={()=>mouseOutEffectCoupon(1)}><span className="use-coupon">Use Coupon </span><br/><span className="coupon-code">L657YUOP</span></button>
                    <button onMouseOver={()=>{handleOverHover(1)}} onMouseOut={()=>{handleOutHover(1)}} id="coupon-copy-btn-1" className="coupon-code-copy d-none"><IoMdCopy size={25} style={{color:'#EE0405'}}/></button>
                </div>
                <div className="col-6 content">
                    <img className="col-12 sale-img" src={coupon2} />
                    <button className="coupon-btns" onMouseOver={()=>mouseOverEffectCoupon(2)} onMouseOut={()=>mouseOutEffectCoupon(2)}><span className="use-coupon">Use Coupon </span><br/><span className="coupon-code">L657YUOP</span></button>
                    <button onMouseOver={()=>{handleOverHover(2)}} onMouseOut={()=>{handleOutHover(2)}} id="coupon-copy-btn-2" className="coupon-code-copy d-none"><IoMdCopy size={25} style={{color:'#EE0405'}}/></button>
                </div>
            </div>
            <div className="row landing-buttons-tray">
                {/* classic conditional redering */}
                <button id="landing-1" value={1} onClick={(e) => {handleClick1(e)}} className={typeOfProducts===1 ? "landing-page-button landing-page-red col" : "landing-page-button col"} >New Arrivals </button>
                <button id="landing-2" value={2} onClick={(e) => {handleClick2(e)}} className={typeOfProducts===2 ? "landing-page-button landing-page-red col" : "landing-page-button col"} > Featured Products</button>
                <button id="landing-3" value={3} onClick={(e) => {handleClick3(e)}} className={typeOfProducts===3 ? "landing-page-button landing-page-red col" : "landing-page-button col"} >Best Selling </button>
            </div>
            <div className="row product-div">
                {typeOfProducts===1 && renderLatest()}
                {typeOfProducts===2 && renderFeatured()}
                {typeOfProducts===3 && renderBestSelling()}
            </div>
            <hr />

            <div id="category-section" class="dropdown category-dropdown-trnsprnt">
            <button class="btn btn-secondary dropdown-toggle select-categories-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Select categories
            </button>
            <ul class="dropdown-menu list-categories" aria-labelledby="dropdownMenuButton1">
                <div className="all-categories">
                    <div className="sub-category-div">
                        <h3>Active Wear</h3>
                            <label for="jogger">Jogger</label>
                            <input style={{color:'red'}} type="checkbox" id="jogger" name="vehicle1" value="jogger" onClick={(e)=>{handleCheckboxCLick(e)}}/>
                            <label for="jersey">Jersey</label>
                            <input type="checkbox" id="jersey" name="vehicle1" value="jersey" onClick={(e)=>{handleCheckboxCLick(e)}}/>
                    </div>
                    <div className="sub-category-div">
                        <h3>Top Wear</h3>
                            <label for="henley">Henley</label>
                            <input type="checkbox" id="henley" name="vehicle1" value="henley" onClick={(e)=>{handleCheckboxCLick(e)}}/>
                            <label for="crop-top">Crop-top</label>
                            <input type="checkbox" id="crop-top" name="vehicle1" value="crop-top" onClick={(e)=>{handleCheckboxCLick(e)}} onClick={(e)=>{handleCheckboxCLick(e)}} />
                            <label for="round-neck">Round-neck</label>
                            <input type="checkbox" id="round-neck" name="vehicle1" value="round-neck" onClick={(e)=>{handleCheckboxCLick(e)}} />
                    </div>
                    <div className="sub-category-div">
                        <h3>Accessories</h3>
                            <label for="cap">Cap</label>
                            <input type="checkbox" id="cap" name="vehicle1" value="cap" onClick={(e)=>{handleCheckboxCLick(e)}}/>
                            <label for="bag">Bag</label>
                            <input type="checkbox" id="bag" name="vehicle1" value="bag"  onClick={(e)=>{handleCheckboxCLick(e)}}/>
                            <label for="bandana">Bandana</label>
                            <input type="checkbox" id="bandana" name="vehicle1" value="bandana"  onClick={(e)=>{handleCheckboxCLick(e)}}/>
                    </div>
                    <div className="sub-category-div">
                        <h3>Bottom Wear</h3>
                            <label for="shorts">Shorts</label>
                            <input type="checkbox" id="shorts" name="vehicle1" value="shorts" onClick={(e)=>{handleCheckboxCLick(e)}}/>
                    </div>
                <div className="sub-category-div">
                    <h3>Collectibles</h3>
                        <label for="diary">Diary</label>
                        <input type="checkbox" id="diary" name="vehicle1" value="diary" onClick={(e)=>{handleCheckboxCLick(e)}}/>
                        <label for="sticker">Sticker</label>
                        <input type="checkbox" id="sticker" name="vehicle1" value="sticker" onClick={(e)=>{handleCheckboxCLick(e)}} />
                        <label for="badge">Badge</label>
                        <input type="checkbox" id="badge" name="vehicle1" value="badge" onClick={(e)=>{handleCheckboxCLick(e)}} />
                        <label for="key-chain">Key-chain</label>
                        <input type="checkbox" id="key-chain" name="vehicle1" value="key-chain" onClick={(e)=>{handleCheckboxCLick(e)}} />
                        <label for="poster">Poster</label>
                        <input type="checkbox" id="posterd" name="vehicle1" value="poster" onClick={(e)=>{handleCheckboxCLick(e)}} />
                </div>
                <button onClick={()=>{handleFilterBtn()}} className="filter-btn">Apply</button>
            </div>
            </ul>
            </div>
            <div className="row product-div">
                {/* {loading ? <Loading/> : renderCategoryData()} */}
                {renderCategoryData()}
            </div>
            <div className="pagination-btns" key={categoryData?.length}>
                {makingPaginationButtons()}
            </div>
            <div>
                <h3 className="top-selling" style={{textAlign:'center',marginTop:'7%'}}>Top Selling of the Week</h3>
            </div>
            <div className="row product-div" style={{marginBottom:'3%'}}>
                {renderBestSelling()}
            </div>
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

export default Home;