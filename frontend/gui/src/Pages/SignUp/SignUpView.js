import React from "react";
import "./SignUp.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { MailTwoTone, LockTwoTone, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Shared/Redux/actions/auth";

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    reCaptchaResponse: null,
  };

  handleSubmit = (values) => {
    this.props.onAuth(
      values.username,
      values.email,
      values.password,
      values.confirm
    );
    if (!this.props.error) {
      this.props.history.push("/");
    }
  };

  handleConfirmBlur = (e) => {
    return Promise.resolve();
  };

  strongPass = (password) => {
    let hasUpperCase = password.match(/[A-Z]+/) ? true : false;
    let hasLowerCase = password.match(/[a-z]+/) ? true : false;
    let hasNum = password.match(/[0-9]+/) ? true : false;
    return hasLowerCase && hasUpperCase && hasNum;
  };

  validatePassword = (values, pass) => {
    if (pass.length < 8 || !this.strongPass(pass)) {
      return Promise.reject(
        "Must be 8 characters long containing 1 UPPER-CASE & 1 lower-case"
      );
    } else {
      return Promise.resolve();
    }
  };
  verifyCallback = (response) => {
    this.setState({
      reCaptchaResponse: response,
    });
  };

  render() {
    return (
      <div>
        <Form onFinish={this.handleSubmit} className="sign-up-form">
          <h3>Signup and Keep Track of your Uploads</h3>
          <FormItem
            style={{ display: "inline-block" }}
            className="input"
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </FormItem>

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
            <Input prefix={<MailTwoTone type="mail" />} placeholder="Email" />
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
              {
                validator: this.validatePassword,
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockTwoTone type="lock" />}
              type="password"
              placeholder="Password"
            />
          </FormItem>

          <FormItem
            style={{ display: "inline-block" }}
            className="input"
            name="confirm"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("password does not match!");
                },
              }),
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockTwoTone type="lock" />}
              type="password"
              placeholder="Confirm Password"
              onBlur={this.handleConfirmBlur}
            />
          </FormItem>
          <FormItem style={{ display: "inline-block" }} className="input">
            <ReCAPTCHA
              sitekey="6Ld-btkZAAAAAKsc2MhmB7nJ3hgr_2U77ygYE2jK"
              onChange={this.verifyCallback}
            />
          </FormItem>
          <FormItem>
            <Button
              disabled={!this.state.reCaptchaResponse}
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Sign Up
            </Button>
            Or
            <NavLink style={{ marginRight: "10px" }} to="/login/">
              {" "}
              Login
            </NavLink>
          </FormItem>
        </Form>
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
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
