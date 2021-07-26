import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadsTable from "../../Components/Tables/UploadsTable";
import { connect } from "react-redux";
import * as actions from "../../Shared/Redux/actions/auth";
import { Typography, Input, Tooltip, Row, Col } from "antd";
import {
  UserOutlined,
  InfoCircleOutlined,
  MailTwoTone,
} from "@ant-design/icons";
import "./UserInfo.scss";

const { Title } = Typography;

const UserInfoView = () => {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    date_joined: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      axios
        .get(`http://localhost:8000/account/user?user=${user}`)
        .then((response) => {
          setProfile(response.data.userInfo.personal);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div>
      <div className="profile-container">
        <div className="titles-container">
          <Title strong>Profile</Title>
          <Title level={5}>
            Account Created At:{" "}
            {profile.date_joined
              .split("T")[0]
              .replaceAll("-", "/")
              .split("/")
              .reverse()
              .join("/")}
          </Title>
        </div>
        <Input
          disabled
          addonBefore="Email :"
          value={profile.email}
          prefix={<MailTwoTone className="site-form-item-icon" />}
        />
        <Input
          disabled
          addonBefore="Username:"
          value={profile.username}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        {profile.first_name && (
          <Input
            disabled
            addonBefore="First Name:"
            onChange={(a, b) => console.log(a, b)}
            value={profile.first_name}
          />
        )}
        {profile.last_name && (
          <Input disabled addonBefore="Last Name:" value={profile.last_name} />
        )}
      </div>
      <UploadsTable />
    </div>
  );
};

export default UserInfoView;
