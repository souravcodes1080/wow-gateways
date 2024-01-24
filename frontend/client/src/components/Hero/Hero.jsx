import React from "react";
import "./hero.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import a from "../../../public/pictures/a.jpg";
import b from "../../../public/pictures/b.jpg";
import c from "../../../public/pictures/c.jpg";
import d from "../../../public/pictures/d.jpg";

function Hero() {
  return (
    <>
      <div className="container">
        <div className="hero-main">
          <Carousel className="carousel" autoPlay={true} showThumbs={false} showStatus={false}>
            <div>
              <img src="https://t4.ftcdn.net/jpg/00/78/08/93/240_F_78089331_Gg57V2EkQ566wPisVY08N2PYNs319UhF.jpg" />
            </div>
            <div>
              <img src="https://t4.ftcdn.net/jpg/02/26/45/79/240_F_226457979_8znzrFVHCNNATB1jOcEGgGNLv18pnIzm.jpg" />{" "}
            </div>
            <div>
              <img src="https://t4.ftcdn.net/jpg/00/78/08/93/240_F_78089331_Gg57V2EkQ566wPisVY08N2PYNs319UhF.jpg" />{" "}
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Hero;
