import React from "react";
import "./TextToCopy.scss";
import { Typography } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;
class TextToCopy extends React.Component {
  state = {
    value: "Noise image to test Tesseract OCR",
  };

  changeText = (params) => {
    this.setState({ value: params.target.value });
  };

  render() {
    return (
      <div className="text-to-copy-container">
        <Text className="text-container">
          <div>
            <Title level={2} style={{ fontFamily: "Arial Black" }} mark={true}>
              Text Of The Image File{" "}
            </Title>
            <ArrowDownOutlined className="arrow-icon-upload" />
          </div>
          <textarea
            className="text-to-copy"
            value={this.props.text}
            onChange={({ target: { value } }) =>
              this.changeText({ target: { value } })
            }
            rows={10}
          />
        </Text>
      </div>
    );
  }
}

export default TextToCopy;
