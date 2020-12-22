import React from "react";
import { Route } from "react-router-dom";

import UploadView from "./containers/UploadView";

import HomePage from "./containers/HomeView";
import LoginView from "./containers/LoginView.js";
import SignUpView from "./containers/SignUpView";
import AboutView from "./containers/AboutView";
import UserInfoView from "./containers/UserInfoView";
import UserUploadsView from "./containers/UserUploadsView";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={HomePage} />{" "}
    <Route exact path="/upload/" component={UploadView} />{" "}
    <Route exact path="/about/" component={AboutView} />{" "}
    <Route exact path="/account-info/" component={UserInfoView} />{" "}
    <Route exact path="/account-uploads/" component={UserUploadsView} />{" "}
    <Route exact path="/login/" component={LoginView} />{" "}
    <Route exact path="/signup/" component={SignUpView} />{" "}
  </div>
);

export default BaseRouter;