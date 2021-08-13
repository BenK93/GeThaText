import React from "react";
import './Footer.scss'
import { Typography, Layout } from "antd";
const { Text } = Typography;
const { Footer } = Layout;

const MyFooter = () => {
  return (
      <Footer
        className="site-footer"
      >
        <Text strong={true}>Copyright © Designed & Developed by Ben K</Text>
      </Footer>
  );
};
export default MyFooter;
