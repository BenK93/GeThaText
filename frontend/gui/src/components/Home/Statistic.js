import React from 'react';
import { Typography,Statistic, Row, Col, Button } from 'antd';
import {DownloadOutlined, UserOutlined } from '@ant-design/icons';
const {Title} = Typography;

const StatisticComp = (props) =>{
    return (
        <div className="statistics">
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title={<Title strong 
                     level={3}><UserOutlined/> Active Users</Title>}
                     value={(props.accounts !== 0) ? props.accounts : "Loading"} />
                    <Button href="/upload" style={{ marginTop: 16 }} type="primary">
                        Upload Image
                    </Button>
                </Col>
                <Col span={12}>
                    <Statistic title={<Title strong 
                     level={3}><DownloadOutlined/>Uploads So Far</Title>} 
                     value={(props.uploads !== 0 ? props.uploads : "Loading")}  />
                    <Button href="/signup" style={{ marginTop: 16 }} type="primary">
                        Sign Up
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
export default StatisticComp;