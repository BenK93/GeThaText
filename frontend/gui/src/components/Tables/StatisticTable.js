import React from "react";
import "./Statistics.scss";
import { Typography, Statistic, Row, Col } from "antd";
import { DownloadOutlined, UserOutlined } from "@ant-design/icons";
import BasicButton from "../Buttons/BasicButton";
const { Title } = Typography;

const StatisticTable = (props) => {
  return (
    <div className="statistics">
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title={
              <Title strong level={3}>
                <UserOutlined /> Active Users
              </Title>
            }
            value={props.accounts !== 0 ? props.accounts : "Loading"}
            valueRender={(val) => {
              return (
                <Title strong level={2}>
                  {val}
                </Title>
              );
            }}
          />
          <div className="statistic-table-con-buttons">
            <BasicButton link="/signup" className="button-link" type="primary">
              Sign up
            </BasicButton>
            <div>Or</div>
            <BasicButton link="/login" className="button-link" type="primary">
              Login
            </BasicButton>
          </div>
        </Col>
        <Col span={12}>
          <Statistic
            title={
              <Title strong level={3}>
                <DownloadOutlined /> Total Uploads
              </Title>
            }
            value={props.uploads !== 0 ? props.uploads : "Loading"}
            valueRender={(val) => {
              return (
                <Title strong level={2}>
                  {val}
                </Title>
              );
            }}
          />
          <BasicButton link="/upload" className="button-link" type="primary">
            Upload Image
          </BasicButton>
        </Col>
      </Row>
    </div>
  );
};
export default StatisticTable;
