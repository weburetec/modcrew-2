import react from "react";

function Carousel(props){
    const {id,img1,img2,img3} = props;
    return (
        <div>
            <div id={`carousel-${id}`} className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target={`#carousel-${id}`} data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target={`#carousel-${id}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target={`#carousel-${id}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img style={{height:'60vh'}} src={img1} class="d-block w-100 carousel-offer-img" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img style={{height:'60vh'}} src={img2} class="d-block w-100 carousel-offer-img" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img style={{height:'60vh'}} src={img3} class="d-block w-100 carousel-offer-img" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;