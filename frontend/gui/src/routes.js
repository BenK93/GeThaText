import React from "react";
import { Route } from "react-router-dom";

import UploadView from "./Containers/UploadView";

import HomePage from "./Containers/HomeView";
import LoginView from "./Containers/LoginView.js";
import SignUpView from "./Containers/SignUpView";
import AboutView from "./Containers/AboutView";
import UserInfoView from "./Containers/UserInfoView";
import UserUploadsView from "./Containers/UserUploadsView";

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
