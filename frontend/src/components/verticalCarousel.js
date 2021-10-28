import react from "react";
import styles from "../stylesheets/verticalCarousel.css";

import coupon1 from "../stylesheets/images/coupon1.jpg";
import coupon2 from "../stylesheets/images/coupon2.jpg";
import cover from "../stylesheets/images/cover.jpg";

function VerticalCarousel(){
    return (
        <div>
            <div class="container">
                <div id="carouselExample" class="carousel vert slide" data-ride="carousel" data-interval="1000">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <ul>
                    <li><img class="d-block mx-auto img-fluid" src={coupon2} alt="Third slide" /></li>
                    <li><img class="d-block mx-auto img-fluid" src={cover} alt="First slide" /></li>
                </ul>
            </div>
            <div class="carousel-item">
                <img class="d-block mx-auto img-fluid" src={coupon1} alt="Second slide" />
            </div>
            <div class="carousel-item">
                <img class="d-block mx-auto img-fluid" src={coupon2} alt="Third slide" />
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon  rounded-circle" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExample" role="button" data-slide="next">
            <span class="carousel-control-next-icon  rounded-circle" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
        </div>
    );
}

export default VerticalCarousel;