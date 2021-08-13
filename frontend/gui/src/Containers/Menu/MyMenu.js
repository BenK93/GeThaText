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
import MyLogo from "../../Components/Logo/Logo";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MyMenu extends React.Component {
  state = {
    token: false,
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  userLogout = () => {
    this.props.logout();
    this.setState({ token: false });
    this.props.history.push("/");
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ token: true });
    }
  }

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
            <CloudUploadOutlined /> <strong>Magic Upload</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/about">
            <BulbTwoTone /> <strong>About</strong>
          </Link>
        </Menu.Item>

        {this.props.isAuthenticated | this.state.token ? (
          <SubMenu
            key="4"
            icon={<UserOutlined type="user" className="account-icon" />}
            className="right-item"
            title={<strong>Account</strong>}
          >
            <MenuItemGroup title={`Hey ${this.props.user}`}>
              <Menu.Item key="setting:3">
                <Link to="/account-info">
                  <ContainerTwoTone /> <strong>My Profile</strong>
                </Link>
              </Menu.Item>
              <Menu.Item
                icon={<LogoutOutlined />}
                onClick={this.userLogout}
                key="setting:1"
              >
                <strong>Logout</strong>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        ) : (
          <Menu.Item key="10" className="right-item">
            <Link to="/login">
              <LoginOutlined /> <strong>Login</strong>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

const maxStateToProps = (state) => {
  return {
    user: state.user,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(maxStateToProps, mapDispatchToProps)(MyMenu);
