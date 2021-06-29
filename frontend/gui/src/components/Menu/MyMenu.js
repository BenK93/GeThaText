import React from "react";
import { connect } from "react-redux";
import * as actions from "../../Shared/Redux/actions/auth";
import "./Menu.scss";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  EyeTwoTone,
  CloudUploadOutlined,
  BulbTwoTone,
  MenuOutlined,
  ContainerTwoTone,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import MyLogo from "../Logo/Logo";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MyMenu extends React.Component {
  state = {
    token: false,
  };
  userLogout = () => {
    this.props.logout();
    this.setState({ token: false });
    this.props.history.push("/");
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(
      "🚀 ~ file: MyMenu.js ~ line 29 ~ MyMenu ~ componentWillUnmount ~ token",
      token
    );
    if (token != null) {
      this.setState({ token: true });
    }
  }

  // componentWillUnmount() {}

  render() {
    return (
      <Menu
        className="menu menu-size"
        theme="light"
        expandIcon={<MenuOutlined />}
        forceSubMenuRender={false}
        mode="horizontal"
        subMenuOpenDelay={0.3}
        subMenuCloseDelay={0.3}
        defaultSelectedKeys={["1"]}
        overflowedIndicator={<MenuOutlined />}
      >
        <Menu.Item className="logo-item" key="1">
          <Link to="/">
            <MyLogo />
            <EyeTwoTone className="eye-icon"> </EyeTwoTone>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/upload">
            <CloudUploadOutlined /> <strong>Simple Upload</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/about">
            <BulbTwoTone /> <strong>About Us</strong>
          </Link>
        </Menu.Item>

        {this.props.isAuthenticated | this.state.token ? (
          <SubMenu
            className="right-item"
            title={
              <span>
                <UserOutlined type="user" className="account-icon" />{" "}
                <strong>Account</strong>
              </span>
            }
          >
            <MenuItemGroup title="Menu Options">
              <Menu.Item key="setting:3">
                <Link to="/account-info">
                  <ContainerTwoTone /> <strong>My Profile</strong>
                </Link>
              </Menu.Item>
              <Menu.Item onClick={this.userLogout} key="setting:1">
                <LogoutOutlined /> <strong>Logout</strong>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        ) : (
          <Menu.Item className="right-item" key="10">
            <Link to="/login">
              <LoginOutlined /> <strong>Login</strong>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(MyMenu);
