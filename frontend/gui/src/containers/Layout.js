import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Typography, Layout, Menu } from "antd";
import {
  UserOutlined,
  EyeTwoTone,
  CloudUploadOutlined,
  BulbTwoTone,
  MenuOutlined,
  ContainerTwoTone,
  LogoutOutlined,
  LoginOutlined,
  FolderOpenTwoTone,
} from "@ant-design/icons";
const { Text } = Typography;
const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class CustomLayout extends React.Component {
  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <Layout className="layout" theme="light">
        <Header
          theme="light"
          style={{ position: "fixed", zIndex: 1, width: "100%" }}
        >
          <div className="logo" />
          <Menu
            theme="light"
            forceSubMenuRender={true}
            mode="horizontal"
            subMenuOpenDelay={0.3}
            subMenuCloseDelay={0.3}
            defaultSelectedKeys={["1"]}
            overflowedIndicator={<MenuOutlined />}
          >
            <Menu.Item style={{ fontSize: "20px" }} key="1">
              <Link to="/">
                <strong>G</strong>e<strong>T</strong>ha<strong>T</strong>ext
              </Link>
              <EyeTwoTone style={{ margin: "10px", fontSize: "20px" }}>
                {" "}
              </EyeTwoTone>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/upload">
                <CloudUploadOutlined />
                Simple Upload
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/about">
                <BulbTwoTone />
                About Us
              </Link>
            </Menu.Item>

            {this.props.isAuthenticated ? (
              <SubMenu
                style={{ float: "right" }}
                title={
                  <span>
                    <UserOutlined
                      type="user"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                    Account
                  </span>
                }
              >
                <MenuItemGroup title="Options">
                  <Menu.Item key="setting:2">
                    <Link to="/account-uploads">
                      <FolderOpenTwoTone />
                      My Uploads
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="setting:3">
                    <Link to="/account-info">
                      <ContainerTwoTone />
                      My Info
                    </Link>
                  </Menu.Item>
                  <Menu.Item onClick={this.logout} key="setting:1">
                    <LogoutOutlined />
                    Logout
                  </Menu.Item>
                </MenuItemGroup>
              </SubMenu>
            ) : (
              <Menu.Item style={{ float: "right" }} key="10">
                <Link to="/login">
                  <LoginOutlined />
                  Login
                </Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 0px", marginTop: 64 }}
        >
          {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 480 }}> */}
          {this.props.children}
          {/* </div> */}
        </Content>
        <Footer
          className="site-layout-foot"
          style={{ backgroundColor: "#b1c2dc", textAlign: "center" }}
        >
          <Text strong={true}>Copyright © Designed & Developed by B-K</Text>
        </Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
