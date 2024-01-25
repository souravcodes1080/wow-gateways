import React, { useState } from "react";
import "./item.css";
import { FaStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Item({ image1, image2, image3, name, review, place, price }) {
 
  return (
    <>
      <div className="item-wrapper">
        <div className="item-img">
          <Carousel
            className="carousel"
            autoPlay={false}
            infiniteLoop={true}
            showStatus={false}
            showArrows={true}
            showIndicators={false}
            showThumbs={false}
            
          >
            <div>
              <img src={image1} alt="Slide 1" />
            </div>
            <div>
              <img src={image2} alt="Slide 2" />
            </div>
            <div>
              <img src={image3} alt="Slide 3" />
            </div>
          </Carousel>
        </div>
        <div className="item-name-wrapper">
          <div className="item-name">
            <p>{name}</p>
          </div>
          <div className="item-review">
            <FaStar /> {review}
          </div>
        </div>
        <div className="item-place">
          <p>{place}</p>
        </div>
        <div className="item-cost">
          <MdCurrencyRupee /> <p>{price}/night</p>
        </div>
      </div>
    </>
  );
}

export default Item;
