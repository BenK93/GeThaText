import React from "react";
import "./Login.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { LockTwoTone, MailTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Typography } from "antd";
import * as actions from "../../Shared/Redux/actions/auth";
import MyLogo from "../../Components/Logo/Logo";
import axios from "axios";

const { Text } = Typography;

const FormItem = Form.Item;

class LoginView extends React.Component {
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
      this.props.history.push(path);
    } else {
      message.error("Login details were incorrect, Please try again!", 3);
    }
  };

  handleSubmit = (values) => {
    this.props.onAuth(values.email, values.password);
    setTimeout(() => {
      this.loginRedirect("/upload");
    }, 2000);
  };

  checkUserRegistered = (response, user, email, facebook) => {
    this.props.authStart();
    // true for Facebook false for Google
    axios
      .get(`http://localhost:8000/account/user?user=${user}`)
      .then((res) => {
        console.log("success");
        this.props.socialUserLogin(res.data, email);
      })
      .catch((e) => {
        console.log("fail");
        if (facebook) {
          this.props.facebookRegistration(response);
        } else {
          this.props.googleRegistration(response);
        }
      });
    setTimeout(() => {
      this.loginRedirect("/upload");
    }, 2000);
  };

  responseFacebook = async (response) => {
    console.table(response);
    let user = response["name"].split(" ").join("");
    this.checkUserRegistered(response, user, response.email, true);
  };

  responseGoogle = async (response) => {
    let user = response.profileObj.email.split("@")[0];
    this.checkUserRegistered(response, user, response.profileObj.email, false);
  };

  loginFailed = (response) => {
    message.error("Social Login Fails", 3);
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
                <div className="social-login">
                  <FacebookLogin
                    onFailure={this.loginFailed}
                    cssClass="facebook-btn"
                    redirectUri="/upload"
                    textButton="Login"
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    autoLoad={false}
                    icon="fa-facebook"
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                  />
                  <GoogleLogin
                    disabledStyle={{}}
                    className="social-btn"
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.loginFailed}
                    cookiePolicy={"single_host_origin"}
                  />
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
    authStart: () => dispatch(actions.authStart()),
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
    facebookRegistration: (response) =>
      dispatch(actions.facebookRegistration(response)),
    googleRegistration: (response) =>
      dispatch(actions.googleRegistration(response)),
    socialUserLogin: (data, email) =>
      dispatch(actions.socialUserLogin(data, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
