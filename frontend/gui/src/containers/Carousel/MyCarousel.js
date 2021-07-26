import React from "react";
import { Row, Image } from "antd";
import "./MyCarousel.scss";

const image1 = require("../../Assets/image1.png");
const image2 = require("../../Assets/image2.png");
const image3 = require("../../Assets/image3.png");
const image6 = require("../../Assets/image6.png");
export const ImageCarousel = (props) => {
  return (
    <div className="carousel-parent">
      <Row align="middle" className="row-con">
        <Image.PreviewGroup>
          <div className="image-div">
            <Image width={300} src={image1} />
          </div>
          <div className="image-div">
            <Image width={300} src={image2} />
          </div>
          <div className="image-div">
            <Image width={300} src={image3} />
          </div>
          <div className="image-div">
            <Image width={300} src={image6} />
          </div>
        </Image.PreviewGroup>
      </Row>
    </div>
  );
};

export default ImageCarousel;
