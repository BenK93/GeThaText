import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TextToCopy from '../components/Upload/TextToCopy';
import * as actions from '../store/actions/auth';
import { Upload, Button, Divider } from 'antd';
import { UploadOutlined,DeleteTwoTone, EyeTwoTone } from '@ant-design/icons';

class UploadView extends React.PureComponent {
  
  state = {
    uploads: {},
    chosenImg : "",
  }
  fileList = [
    {
      uid: '-1',
      name: 'Example-test.png/jpeg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Example_01.png',
      status: 'success',
    }
  ];

  
  fileUpload = ({ onSuccess, onError, file }) => {
    const checkInfo = () => {
      setTimeout(() => {
        if (!this.imageData) {
          checkInfo();
        } else {
          let formData = new FormData();
          let user = localStorage.getItem('username');
          if(user != null){
            formData.set('user', user);
          }
          formData.set('image', this.imageData);
          axios.post('http://127.0.0.1:8000/upload/',formData)
          .then((respond) => {     
              const uploads = { ...this.state.uploads, [this.imageData.name]: respond.data['img_content'] }
              this.setState(() => ({ uploads }))               
              onSuccess(null, file);
            })
            .catch((e) => {
              console.log(e)
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
  
  getImageName= (info) => {
    this.imageData = info.originFileObj;  
  }
  getText = () => {
    this.setState({chosenImg : this.state.uploads[this.imageData.name]})
  }
  
  removeImg = () =>{
    if(this.imageData !== undefined){
      delete this.state.uploads[this.imageData.name];
    }
  }

  render() {
    return (
      <div style={{padding:'30px 30px',textAlign:'center'}}>
        <Upload
          listType="picture"
          accept=".png, .jpeg, .jpg"
          onDownload= {this.getImageName}
          onChange={this.onChange}
          customRequest={this.fileUpload}
          defaultFileList={[...this.fileList]}
          showUploadList={{
            showDownloadIcon: true,
            downloadIcon: <EyeTwoTone  title="Get Text" onClick={ this.getText} style={{fontSize:"20px"}}> </EyeTwoTone>,
            showRemoveIcon: true,
            removeIcon: <DeleteTwoTone onClick={this.removeImg} style={{fontSize:"20px"}} />,
          }}
          >
          <Button title="Upload Image" type="primary" onSubmit={this.handleClick} icon={<UploadOutlined />}>Image Upload</Button>
        </Upload>
        <Divider></Divider>
        <TextToCopy text={this.state.chosenImg ? this.state.chosenImg : null} style={{ textAlign: 'center'}}/>
      </div>
    )
  }

};

// const mapStateToProps = (state) => {
//   return {
//       loading: state.loading,
//       error: state.error
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//       onAuth: (image) => dispatch(actions.authUploadImage(image)) 
//   }
// }
export default UploadView;
// export default connect(mapStateToProps, mapDispatchToProps)(UploadComp);
