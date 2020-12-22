import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { LockTwoTone,MailTwoTone,LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Typography } from 'antd';
import * as actions from '../store/actions/auth';

const { Text } = Typography;

const FormItem = Form.Item;
const antIcon = <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {

    state = {
        LoginFailed : false
    }

  handleSubmit = (values) => {
    this.props.onAuth(values.email, values.password);
    if(!this.props.error){
        this.props.history.push('/');
    }else{
        this.setState({LoginFailed: true});
    }
  }

  render() {
    
    return (
        <div className="login-form-comp">
            {
                this.props.loading ?
                    <Spin className="col-xs-8" indicator={antIcon} />
                :
                
                <Form onFinish={this.handleSubmit} className="login-form col-xs-8">
                    
                    <div>
                        <div className="header-form">
                            <h2 >
                                Log in to Your GeThaText Account
                            </h2>
                        </div>
                        <div>

                        { this.state.LoginFailed ? <Text type="danger">Incorrect Email or Password </Text> : null}
                        </div>
                    </div>

                    <FormItem name="email" rules={[{
                        type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                        required: true, message: 'Please input your E-mail!',
                        }]}>          
                        <Input prefix={<MailTwoTone type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />          
                    </FormItem>

                    <FormItem name="password" rules={[{ 
                        required: true, message: 'Please input your Password!' }]}>                
                    <Input prefix={<LockTwoTone  type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />                    
                    </FormItem>
                    <FormItem>
                        <ReCAPTCHA
                            sitekey="6Ld-btkZAAAAAKsc2MhmB7nJ3hgr_2U77ygYE2jK"
                            // onChange={onChange}
                            />
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                          Login
                      </Button>
                      Or 
                      <NavLink 
                          style={{marginRight: '10px'}} 
                          to='/signup/'> Sign Up
                      </NavLink>
                    </FormItem>
                </Form>
            }
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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);