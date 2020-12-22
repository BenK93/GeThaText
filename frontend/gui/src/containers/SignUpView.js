import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { MailTwoTone,LockTwoTone,UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  

  state = {
    confirmDirty: false,
  };


  handleSubmit = (values) => {
    this.props.onAuth(
      values.username,
      values.email,
      values.password,
      values.confirm
    );
    if(!this.props.error){
      this.props.history.push('/');
    }
  }

  handleConfirmBlur = (e) => {
    // const value = e.target.value;
    return Promise.resolve();
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  strongPass = (password) =>{    
    let hasUpperCase = password.match(/[A-Z]+/) ? true : false;
    let hasLowerCase = password.match(/[a-z]+/) ? true : false;
    let hasNum = password.match(/[0-9]+/) ? true : false;
    return hasLowerCase && hasUpperCase && hasNum;
  }
  

  validatePassword = (values, pass) => {
    if(pass.length < 8 || !this.strongPass(pass)){
      return Promise.reject("Must be 8 characters long containing 1 UPPER-CASE & 1 lower-case");
    }else {
      return Promise.resolve();
    }
  }

  render() {    
    return (
    <div>
      <Form onFinish={this.handleSubmit} className="sign-up-form">
      <div className="header-form">
          Signup and Keep Track of your Uploads
      </div>
        <FormItem name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>            
                <Input prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />            
        </FormItem>
        
        <FormItem name="email" rules={[{
          type: 'email', message: 'The input is not valid E-mail!',
        }, {
          required: true, message: 'Please input your E-mail!',
        }]}>          
            <Input prefix={<MailTwoTone type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />          
        </FormItem>

        <FormItem name="password" rules={[{
          required: true, message: 'Please input your Password!',
        },{
          validator: this.validatePassword,
        }]} hasFeedback>          
            <Input prefix={<LockTwoTone type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />          
        </FormItem>

        <FormItem name="confirm" rules={[ {
          required: true, message: 'Please confirm your password!',
        },({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('password does not match!');
          },
        }),
      ]} hasFeedback>          
            <Input prefix={<LockTwoTone type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />        
        </FormItem>
        <FormItem>
            <ReCAPTCHA
                sitekey="6Ld-btkZAAAAAKsc2MhmB7nJ3hgr_2U77ygYE2jK"
                // onChange={onChange}
                />
        </FormItem>
        <FormItem>
          <Button  type="primary" htmlType="submit" style={{marginRight: '10px'}}>
              Sign Up
          </Button>
          Or 
          <NavLink 
              style={{marginRight: '10px'}} 
              to='/login/'> Login
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
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
