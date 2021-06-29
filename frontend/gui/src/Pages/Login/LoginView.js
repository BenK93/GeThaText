import React from "react";
import "./Login.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { LockTwoTone, MailTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Button, Divider } from "antd";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Typography } from "antd";
import * as actions from "../../Shared/Redux/actions/auth";
import MyLogo from "../../Components/Logo/Logo";

const { Text } = Typography;

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    LoginFailed: false,
    reCaptchaResponse: null,
  };

  verifyCallback = (response) => {
    this.setState({
      reCaptchaResponse: response,
    });
  };

  loginRedirect = (path) => {
    if (!this.props.error) {
      setTimeout(() => {
        this.props.history.push(path);
      }, 3000);
    } else {
      this.setState({ LoginFailed: true });
    }
  };

  handleSubmit = (values) => {
    if (this.state.reCaptchaResponse) {
      this.props.onAuth(values.email, values.password);
      this.loginRedirect("/upload");
    }
  };

  responseFacebook = async (response) => {
    console.log(
      "🚀 ~ file: LoginView.js ~ line 48 ~ NormalLoginForm ~ responseFacebook= ~ response",
      response
    );
    // await this.props.facebookLogin(response);
    // this.loginRedirect("/upload");
  };

  responseGoogle = async (response) => {
    await this.props.googleLogin(response);
    this.loginRedirect("/upload");
  };

  render() {
    return (
      <div className="">
        <>
          <div className="login-form col-xs-8">
            <div className="header-form">
              <h3>
                Login To Your <MyLogo /> Account
              </h3>
            </div>
            <div>
              {this.state.LoginFailed ? (
                <Text type="danger">Incorrect Email or Password </Text>
              ) : null}
            </div>
            {this.props.loading ? (
              <div>
                <LoadingOutlined className="loading-icon" />
              </div>
            ) : (
              <Form
                layout="vertical"
                className="login-inner-form"
                onFinish={this.handleSubmit}
              >
                <FormItem
                  style={{ display: "inline-block" }}
                  className="input"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailTwoTone type="mail" className="mail-icon" />}
                    placeholder="Email"
                  />
                </FormItem>
                <FormItem
                  style={{ display: "inline-block" }}
                  className="input"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockTwoTone type="lock" className="lock-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </FormItem>
                <div className="social-login">
                  <FacebookLogin
                    cssClass="facebook-btn"
                    redirectUri="/upload"
                    textButton="Login"
                    appId="2934158403463904"
                    autoLoad={false}
                    icon="fa-facebook"
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                  />
                  <GoogleLogin
                    disabledStyle={{}}
                    className="social-btn"
                    clientId="536411313406-37g1genpkpiplf1767frmm7mitbqnoi4.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <FormItem
                  style={{ display: "inline-block" }}
                  rules={[
                    {
                      type: "ReCAPTCHA",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <ReCAPTCHA
                    sitekey="6Ld-btkZAAAAAKsc2MhmB7nJ3hgr_2U77ygYE2jK"
                    onChange={this.verifyCallback}
                  />
                </FormItem>
                <div className="login-buttons">
                  <Button
                    className="login-btn"
                    disabled={this.state.reCaptchaResponse ? false : true}
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                  <div>
                    Or
                    <NavLink style={{ marginRight: "10px" }} to="/signup/">
                      {" "}
                      Sign Up
                    </NavLink>
                  </div>
                </div>
              </Form>
            )}
          </div>
        </>
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
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
    facebookLogin: (response) => dispatch(actions.facebookLogin(response)),
    googleLogin: (response) => dispatch(actions.googleLogin(response)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
