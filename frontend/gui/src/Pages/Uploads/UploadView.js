import React from "react";
import "./Upload.scss";
import axios from "axios";
import { connect } from "react-redux";
import TextToCopy from "../../Containers/Upload/TextToCopy";
import * as actions from "../../Shared/Redux/actions/auth";
import { Upload, Button, message } from "antd";
import { UploadOutlined, DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";

class UploadView extends React.PureComponent {
  state = {
    copied: false,
    uploads: {},
    chosenImageText: "Noise image to test Tesseract OCR",
  };
  fileList = [
    {
      uid: "-1",
      name: "Example-test.png/jpeg",
      url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Example_01.png",
      status: "success",
    },
  ];

  fileUpload = ({ onSuccess, onError, file }) => {
    const checkInfo = () => {
      setTimeout(() => {
        if (!this.imageData) {
          checkInfo();
        } else {
          let formData = new FormData();
          let user = localStorage.getItem("username");
          let token = localStorage.getItem("token");
          if (!token) {
            message.error("You forgot to Login", 3);
            return onError("Not Authorized");
          }
          if (user != null) {
            formData.set("user", user);
          }
          formData.set("image", this.imageData);
          message.loading("Uploading");
          axios
            .post("http://127.0.0.1:8000/upload/", formData, {
              headers: {
                Authorization: "Token " + token,
              },
            })
            .then((respond) => {
              const uploads = {
                ...this.state.uploads,
                [this.imageData.name]: respond.data["img_content"],
              };
              this.setState(() => ({ uploads }));
              onSuccess(null, file);
            })
            .catch((e) => {
              message.error(e.response.data.detail);
              console.log(e);
              onError();
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
    this.setState({ chosenImageText: this.state.uploads[this.imageData.name] });
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
      <div style={{ padding: "30px 30px", textAlign: "center" }}>
        <Upload
          beforeUpload={this.beforeUpload}
          onDrop={() => console.log("-----dropped-------")}
          maxCount={5}
          listType="picture"
          accept=".png, .jpeg, .jpg"
          onDownload={this.getImageName}
          onChange={this.onChange}
          customRequest={this.fileUpload}
          defaultFileList={[...this.fileList]}
          showUploadList={{
            showDownloadIcon: true,
            downloadIcon: (
              <EyeTwoTone
                title="Get Text"
                onClick={this.getText}
                style={{ fontSize: "20px" }}
              >
                {/* {" "} */}
              </EyeTwoTone>
            ),
            showRemoveIcon: true,
            removeIcon: (
              <DeleteTwoTone
                onClick={this.removeImg}
                style={{ fontSize: "20px" }}
              />
            ),
          }}
        >
          <Button
            title="Upload Image"
            type="primary"
            onSubmit={this.handleClick}
            icon={<UploadOutlined />}
          >
            Image Upload
          </Button>
        </Upload>
        <TextToCopy
          copied={this.state.copied}
          text={this.state.chosenImageText ? this.state.chosenImageText : null}
        />
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
