import React from "react";
import axios from "axios";
import "./Home.scss";
import { Typography, Alert } from "antd";
import { Link } from "react-router-dom";
import TextLoop from "react-text-loop";
import {
  ThunderboltTwoTone,
  CloudUploadOutlined,
  LoginOutlined,
  ContainerTwoTone,
} from "@ant-design/icons";
import BasicButton from "../../Components/Buttons/BasicButton";
import ImageCarousel from "../../Containers/Carousel/MyCarousel.js";
import StatisticTable from "../../Components/Tables/StatisticTable";
const { Paragraph, Title, Text } = Typography;
class HomePage extends React.Component {
  state = {
    accounts: 0,
    uploads: 0,
  };

  getAccount = () => {
    if (this.state.accounts == 0) {
      axios
        .get("http://127.0.0.1:8000/account/quantity/")
        .then((respond) => {
          this.setState({ accounts: respond.data["accounts-quantity"] });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  getUploads = () => {
    if (this.state.uploads == 0) {
      axios
        .get("http://127.0.0.1:8000/upload/quantity/")
        .then((respond) => {
          this.setState({ uploads: respond.data["uploads-quantity"] });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  componentWillMount() {
    this.getUploads();
    this.getAccount();
  }

  render() {
    return (
      <>
        <div className="home-header-con">
          <Paragraph>
            <Title strong level={1} style={{ marginTop: "60px" }}>
              Welcome To Get That Text
            </Title>
            <Text className="home-paragraph">
              It is amazing to find out the power of Optical Character
              Recognition <Text mark={true}>(OCR)</Text>
              <br />
              Upload your image and see the magic!{" "}
              <ThunderboltTwoTone
                style={{ fontSize: "30px" }}
                twoToneColor="red"
              />
            </Text>
          </Paragraph>
          <BasicButton link="/about" type="primary">
            Read More
          </BasicButton>
        </div>
        <StatisticTable
          onClick={this.print}
          accounts={this.state.accounts}
          uploads={this.state.uploads}
        />
        <div className="image-carousel-con">
          <Title level={2} style={{ textAlign: "center" }}>
            Quick Demo {"&"} User Guide
          </Title>
          <Alert
            type="info"
            style={{ textAlign: "center" }}
            message="Guide Web Usage"
            showIcon
            message={
              <TextLoop interval={4500} mask>
                <>
                  <Title level={4}>
                    <LoginOutlined /> Log in/Sign up (1/3)
                  </Title>
                  <Text>Log In To Your Account/Sign Up</Text>
                </>
                <>
                  <Title level={4}>
                    <CloudUploadOutlined /> Upload Images (2/3)
                  </Title>
                  <Text>
                    On The Menu Click On
                    <Link to="/upload">
                      <strong> Magic Upload </strong>
                    </Link>
                    And Upload An Image
                  </Text>
                </>
                <>
                  <Title level={4}>
                    <ContainerTwoTone /> Visit My Profile (3/3)
                  </Title>
                  <Text>
                    After You Have Logged In Go To
                    <strong> My Profile</strong> And <br /> You Will See All
                    Your Uploads And Personal Info
                  </Text>
                </>
                <>
                  <Title level={4}>
                    <ThunderboltTwoTone
                      style={{ fontSize: "30px" }}
                      twoToneColor="red"
                    />
                    🥳 Hoooorrayy! 🥳
                    <ThunderboltTwoTone
                      style={{ fontSize: "30px" }}
                      twoToneColor="red"
                    />
                  </Title>
                  <Text>
                    Those are all the steps need to be done to enjoy the Magic
                  </Text>
                </>
              </TextLoop>
            }
          />
          <ImageCarousel active={true} />
        </div>
      </>
    );
  }
}

export default HomePage;
