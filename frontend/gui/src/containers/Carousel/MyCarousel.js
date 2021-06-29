import React from "react";
import { Typography, Divider, Carousel, Row, Col } from "antd";
import {
  RightCircleTwoTone,
  LeftCircleTwoTone,
  ThunderboltTwoTone,
} from "@ant-design/icons";
import "./MyCarousel.scss";
import BasicButton from "../../Components/Buttons/BasicButton";
const { Paragraph, Text, Title } = Typography;

export const MyCarousel = (props) => {
  let carousel = React.createRef();

  const afterChange = (number) => {
    console.log(number);
  };

  return (
    <div className="carousel-parent">
      <Row>
        <Col span={24}>
          <Carousel
            ref={(node) => (carousel = node)}
            autoplay={props.active}
            dotPosition="top"
            afterChange={afterChange}
            className="carousel-content"
          >
            <div className="before-steps">
              <Paragraph>
                <Title strong level={2} style={{ marginTop: "100px" }}>
                  Welcome To Get That Text
                </Title>
                <Text>
                  It is amazing to find out the power of Optical Character
                  Recognition (OCR)
                  <br />
                  Upload your image and see the magic! <ThunderboltTwoTone />
                </Text>
              </Paragraph>
              <BasicButton link="/about" type="primary">
                Read More
              </BasicButton>
            </div>
            <div className="carousel first">
              <div className="carousel-title">
                <Divider></Divider>
                <Paragraph>
                  <Title keyboard type="success" level={2}>
                    Step 1 - Upload File
                  </Title>
                </Paragraph>
              </div>
            </div>
            <div className="carousel second">
              <div className="carousel-title">
                <Divider></Divider>
                <Title keyboard type="success" level={2}>
                  Step 2 - Click on Icon
                </Title>
              </div>
            </div>
            <div className="carousel third">
              <div className="carousel-title">
                <Divider></Divider>
                <Title keyboard type="success" level={2}>
                  Step 3 - Get Text
                </Title>
              </div>
            </div>
            <div className="carousel fourth">
              <div className="carousel-title">
                <Divider></Divider>
                <Title keyboard type="success" level={2}>
                  Step 4 - Copy Text
                </Title>
              </div>
            </div>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default MyCarousel;
