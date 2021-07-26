import React from "react";
import { Form, Input, Button } from "antd";

const FormItemInput = (props) => {
  return (
    <Form.Item
      style={{ display: "inline-block" }}
      className="input"
      name={props.name}
      rules={props.rules}
      hasFeedback
    >
      <Input
        prefix={props.icon}
        type={props.inputType}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
      />
    </Form.Item>
  );
};

export default FormItemInput;
