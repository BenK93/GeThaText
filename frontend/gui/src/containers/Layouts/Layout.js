import React from "react";
import "./Layout.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Shared/Redux/actions/auth";
import { Layout } from "antd";
import MyMenu from "../../Components/Menu/MyMenu";
import MyFooter from "../../Components/Footer/MyFooter";
const { Header, Content } = Layout;

class CustomLayout extends React.Component {
  componentDidMount(){
    console.log("CustomLayout props-----",this.props)
  }

  render() {
    return (
      <Layout className="layout" theme="light">
        <Header theme="light" className="layout-header">
          <MyMenu {...this.props}/>
        </Header>
        <Content className="layout-content">{this.props.children}</Content>
        <MyFooter />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      token: state.token,
  }
}



export default withRouter(connect(mapStateToProps, null)(CustomLayout));
