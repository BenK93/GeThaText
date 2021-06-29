import React from "react";
import './Statistics.scss'
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
          />
          <BasicButton 
            link="/upload"
            className="button-link"
            type="primary"
          >
            Upload Image
          </BasicButton>
        </Col>
        <Col span={12}>
          <Statistic
            title={
              <Title strong level={3}>
                <DownloadOutlined /> Uploads So Far
              </Title>
            }
            value={props.uploads !== 0 ? props.uploads : "Loading"}
          />
          <BasicButton 
            link="/signup"
            className="button-link"
            type="primary"
          >
            Sign Up
          </BasicButton>
        </Col>
      </Row>
    </div>
  );
};
export default StatisticTable;
