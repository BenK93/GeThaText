import React from "react";
import { Button } from "antd";

const BasicButton = (props) => {
  return (
    <>
      <Button
        shape={props.shape}
        size={props.size}
        icon={props.icon}
        className={props.className}
        type={props.type}
        href={props.link}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
    </>
  );
};

export default BasicButton;
