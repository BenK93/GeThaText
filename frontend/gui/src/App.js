import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import "antd/dist/antd.css";
import * as actions from "./Shared/Redux/actions/auth";
import CustomLayout from "./Containers/Layouts/Layout";

//  need to go to .env file
// client_secret = zgPLmSmW9iaOTAjYEMDhq8YlYdHkdmIZyYQMwufFKo30Hit9P8iBeNGorM5AFotSw9xb4Jl5fQZU7lbqlGfsMnXlHITSlXiZibxsd5HYzTHmdv96UhOsuv9m9n6RfdWN
// client_id = oYIodrxo3fN6ENys67lZI5gBaI02n78A0q3vqlq6

class App extends Component {
  state = {
    title: "",
    content: "",
    image: null,
  };

  componentDidMount() {
    // this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter {...this.props} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
