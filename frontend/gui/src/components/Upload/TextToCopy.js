import React from 'react';
import { Typography } from 'antd';
import {ArrowDownOutlined} from '@ant-design/icons';
const { Text, Paragraph, Title } = Typography;

class TextToCopy extends React.Component {
    render() {        
        return(
            <div >
                <Text className="text-container">
                    <div>
                        <Title level={2} style={{fontFamily:"Arial Black"}} mark={true}>Text Of The Image File </Title>
                        <ArrowDownOutlined />
                    </div>
                {
                    this.props.text ? 
                    <Paragraph className="text-to-copy" copyable>
                        {this.props.text}
                    </Paragraph>
                    :
                    <Paragraph className="text-to-copy" copyable>                        
                        Noise image to test Tesseract OCR                         
                    </Paragraph>
                    
                }   
                </Text>
            </div>
        );
    }
};


export default TextToCopy;