import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import "antd/dist/antd.css";
import CustomLayout from "./Containers/Layouts/Layout";

class App extends Component {
  state = {
    token: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ token: true });
    }
  }

  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
		<BaseRouter token={this.state.token} {...this.props} />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps, null)(App);
