import React from 'react';
import { Button} from "antd";

const BasicButton = (props) => {
    return (         
        <>
        <Button className={props.className} type={props.type} href={props.link}>
            {props.children}
        </Button>
        </>
     );
}

export default BasicButton;