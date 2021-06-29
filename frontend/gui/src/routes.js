import React from "react";
import { Redirect, Route } from "react-router-dom";

import UploadView from "./Pages/Uploads/UploadView";

import HomePage from "./Pages/Home/HomeView";
import LoginView from "./Pages/Login/LoginView.js";
import SignUpView from "./Pages/SignUp/SignUpView";
import AboutView from "./Pages/About/AboutView";
import UserInfoView from "./Pages/UserPanel/UserInfoView";
import UserUploadsView from "./Containers/UserUploadsView";

const BaseRouter = (props) => (
  <div>
    <Route exact path="/" component={HomePage} />{" "}
    <Route exact path="/upload/" component={UploadView} />{" "}
    <Route exact path="/about/" component={AboutView} />{" "}
    <Route
      exact
      path="/account-info/"
      render={() =>
        props.isAuthenticated ? <UserInfoView /> : <Redirect to="/login" />
      }
    />{" "}
    <Route exact path="/account-uploads/" component={UserUploadsView} />{" "}
    <Route exact path="/login/" component={LoginView} />{" "}
    <Route exact path="/signup/" component={SignUpView} />{" "}
  </div>
);

export default BaseRouter;
