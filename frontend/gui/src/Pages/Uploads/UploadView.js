import React from "react";
import axios from "axios";
import * as actions from "../../Shared/Redux/actions/auth";
import { connect } from "react-redux";
import "./Upload.scss";
import TextToCopy from "../../Containers/Upload/TextToCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  UploadOutlined,
  DeleteTwoTone,
  EyeTwoTone,
  CopyOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import BasicButton from "../../Components/Buttons/BasicButton.js";
import { Upload, message, Typography, Button } from "antd";
const { Paragraph } = Typography;

let fileList = [
  {
    uid: "-1",
    name: "Example-test.png/jpeg",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Example_01.png",
    status: "success",
  },
];
class UploadView extends React.PureComponent {
  state = {
    copied: false,
    uploads: {},
    chosenImageText: "Noise image to test Tesseract OCR",
  };

  fileUpload = ({ onSuccess, onError, file }) => {
    const checkInfo = () => {
      setTimeout(() => {
        if (!this.imageData) {
          checkInfo();
        } else {
          let formData = new FormData();
          let user = localStorage.getItem("username");
          if (user != null) {
            formData.set("user", user);
          } else {
            message.error("You Forgot To Login", 3);
            return onError("Not Authorized");
          }
          formData.set("image", this.imageData);
          axios
            .post("/api/upload/", formData)
            .then((respond) => {
              const uploads = {
                ...this.state.uploads,
                [this.imageData.name]: respond.data["img_content"],
              };
              this.setState(() => ({ uploads }));
              onSuccess("Upload Successfully", file);
            })
            .catch((e) => {
              if (e.response) {
                message.error(e.response.data.detail);
              }
              console.log(e);
              onError("Upload Error");
            });
        }
      }, 100);
    };
    checkInfo();
  };

  onChange = (info) => {
    this.imageData = info.file.originFileObj;
  };

  getImageName = (info) => {
    this.imageData = info.originFileObj;
  };

  getText = () => {
    this.setState({
      chosenImageText: this.state.uploads[this.imageData.name],
      copied: false,
    });
  };

  removeImg = () => {
    if (this.imageData !== undefined) {
      delete this.state.uploads[this.imageData.name];
    }
  };
  // for checking file size
  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return true;
  };

  render() {
    return (
      <div className="upload-container">
        <Upload
          beforeUpload={this.beforeUpload}
          listType="picture"
          accept=".png, .jpeg, .jpg"
          onDownload={this.getImageName}
          onChange={this.onChange}
          customRequest={this.fileUpload}
          defaultFileList={[...fileList]}
          showUploadList={{
            showDownloadIcon: true,
            downloadIcon: (
              <EyeTwoTone
                twoToneColor="#10d403"
                title="Get Text"
                onClick={this.getText}
                style={{ fontSize: "20px" }}
              ></EyeTwoTone>
            ),
            showRemoveIcon: true,
            removeIcon: (
              <DeleteTwoTone
                twoToneColor="#00000"
                onClick={this.removeImg}
                style={{ fontSize: "20px" }}
              />
            ),
          }}
        >
          <BasicButton
            title="Upload Image"
            type="primary"
            onSubmit={this.handleClick}
            icon={<UploadOutlined />}
          >
            Image Upload
          </BasicButton>
        </Upload>
        <TextToCopy text={this.state.chosenImageText} />
        <CopyToClipboard
          text={this.state.chosenImageText}
          onCopy={() => this.setState({ copied: true })}
        >
          <Button
            type="primary"
            shape="round"
            icon={<CopyOutlined />}
            size={10}
          >
            <strong>Copy Text</strong>
          </Button>
        </CopyToClipboard>
        {this.state.copied && (
          <Paragraph style={{ marginTop: "10px" }}>
            Copied!
            <CheckCircleTwoTone
              style={{ fontSize: "30px" }}
              twoToneColor="#52c41a"
            />
          </Paragraph>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (image) => dispatch(actions.authUploadImage(image)),
  };
};
// export default UploadView;
export default connect(mapStateToProps, mapDispatchToProps)(UploadView);
