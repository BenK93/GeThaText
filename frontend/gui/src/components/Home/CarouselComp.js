import React from 'react';
import {Typography, Divider, Button , Carousel, Row, Col} from 'antd';
// import Paragraph from 'antd/lib/skeleton/Paragraph';
import { RightCircleTwoTone, LeftCircleTwoTone, ThunderboltTwoTone } from '@ant-design/icons';
const { Paragraph, Text, Title} =Typography;

function onChange(a, b, c) {
  console.log(a, b, c);
}
const contentStyle = {
    height: '100%',
    width: '100%',
    color: '#41aaff',
    // lineHeight: '460px',
    textAlign: 'center',
    fontSize:'25px',
  };
const CarouselComp = (props) =>{

    let carousel = React.createRef();
    const right = () => {
        carousel.next();
    }
    const left = () => {
        carousel.prev();
    }

    return (
        <div className="carousel-parent">
            <Row>
            <Col style={{lineHeight:"460px", fontSize:"30px"}} span={1}>
                <LeftCircleTwoTone onClick={left}/>
            </Col>
            <Col span={22}>
                <Carousel ref={node => (carousel = node)} autoplay={props.active}  dotPosition="buttom" afterChange={onChange} style={contentStyle}>
                <div className="before-steps">
                    <Paragraph>
                        <Title strong level={2} style={{marginTop:"100px"}}>Welcome To Get That Text</Title> 
                        <Text>It is amazing to find out the power of Optical Character Recognition (OCR) 
                            <br/>
                            Upload your image and see the magic! <ThunderboltTwoTone />
                        </Text>
                    </Paragraph>
                    <Button  href="/about" type="primary">
                        Read More
                    </Button>
                </div>
                <div className="carousel first">
                    <div className="carousel-title">
                    <Divider ></Divider>
                    <Paragraph>
                        <Title  keyboard type="success" level={2}>Step 1 - Upload File</Title>                    
                    </Paragraph>
                    </div>
                </div>
                <div className="carousel second">   
                    <div className="carousel-title">
                    <Divider ></Divider>
                    <Title  keyboard type="success" level={2}>Step 2 - Click on Icon</Title>
                    </div>
                </div>
                <div className="carousel third">
                    <div className="carousel-title">
                    <Divider ></Divider>
                    <Title  keyboard type="success" level={2}>Step 3 - Get Text</Title>
                    </div>
                </div>
                <div className="carousel fourth">
                    <div className="carousel-title">
                    <Divider ></Divider>
                    <Title  keyboard type="success" level={2}>Step 4 - Copy Text</Title>
                    </div>
                </div>
            </Carousel>
            </Col>
            <Col style={{lineHeight:"460px", fontSize:"30px"}} span={1}>
                <RightCircleTwoTone onClick={right}/>
            </Col>
            </Row>
            
            
            
            {/* <div className="middle-home-page">
                middle page part to do
            </div> */}
        </div>


    );
};

export default CarouselComp;