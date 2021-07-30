import React, { PureComponent } from "react";
import './About.scss'
import "antd/dist/antd.css";
import { Image, Divider, Typography } from "antd";
import {
  GithubOutlined,
  QuestionOutlined,
  DownloadOutlined,
  EyeTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import myImage from "../../Assets/AI-pic.jpg";
const { Title, Text, Paragraph } = Typography;

const stylesList = {
    textShadow: "3px 2px 4px #188fff",
    fontSize: "45px",
    color: "#0c6486",
  };

export default class AboutView extends PureComponent {
  render() {
    return (
      <div>
        <Image
          preview={false}
          height={400}
          width={"100%"}
          src={myImage}
        />
        <div className="about-page-content">
          <Title strong level={1} className="about-title" style={stylesList}>
            Get That Text
          </Title>
          <Paragraph>
            <Text strong>This website is free of use for everyone</Text>
            <Divider style={{ margin: "10px 0" }}></Divider>
            <Text>
              Easy to manage platform for uploading your files, and get the text
              out of them.<br></br>
              We use open software technology to developed by HP cooperation
              <a href="https://github.com/tesseract-ocr/tesseract">
                <strong>
                  {" "}
                  Tesseract <GithubOutlined />
                </strong>
              </a>{" "}
              since 2006 it is developed by Google Inc.<br></br>
              It uses Optical Character Recognition (OCR) which is focused on
              line recognition
            </Text>
          </Paragraph>
          <Title level={2}>
            How to Use
            <QuestionOutlined />
          </Title>
          <Paragraph>
            <Text>
              Click on the Image Upload Button{" "}
              <DownloadOutlined/>  after a few moments you
              will see two more icons: <br></br>
              <EyeTwoTone /> - Click to See the file text<br></br>
              <DeleteTwoTone /> - Click To Delete your file <br></br>
              <Paragraph copyable>
                When you see the text click on the
              </Paragraph>{" "}
              Enjoy!
            </Text>
          </Paragraph>
          <Divider></Divider>
        </div>
      </div>
    );
  }
}
