import React from "react";
import "./TextToCopy.scss";
import { Typography, Input, Button, Divider } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ArrowDownOutlined, CopyOutlined } from "@ant-design/icons";
const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;
class TextToCopy extends React.Component {
  state = {
    value: "Noise image to test Tesseract OCR",
    copied: false,
  };

  changeText = (params) => {
    this.setState({ value: params.target.value, copied: false });
  };

  componentDidMount() {
    this.setState({ copied: false });
  }

  render() {
    return (
      <div className="text-to-copy-container">
        <Text className="text-container">
          <div>
            <Title level={2} style={{ fontFamily: "Arial Black" }} mark={true}>
              Text Of The Image File{" "}
            </Title>
            <ArrowDownOutlined style={{ fontSize: "36px", color: "#08c" }} />
          </div>
          <TextArea
            className="text-to-copy"
            value={this.props.text}
            onChange={({ target: { value } }) =>
              this.changeText({ target: { value } })
            }
            autoSize={{ minRows: 7, maxRows: 15 }}
          />
          <Divider></Divider>
          <CopyToClipboard
            text={this.props.text}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button
              type="primary"
              shape="round"
              icon={<CopyOutlined />}
              size={10}
            >
              Copy Text
            </Button>
          </CopyToClipboard>
          {this.state.copied ? <Paragraph>Coppied!</Paragraph> : null}
        </Text>
      </div>
    );
  }
}

export default TextToCopy;
