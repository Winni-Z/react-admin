import React, {Component}from 'react';
import { Card,Icon,Input,Form,Cascader,InputNumber,Button} from 'antd';

import './index.less'
const Item=Form.Item
const InputGroup = Input.Group;
export default class SaveUpdate extends Component {
    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };

        const options = [{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];

        return (
            <Card
                title={
                    <div className="add-title">
                        <Icon type="arrow-left"/>
                        <span>添加商品</span>
                    </div>
                }
            >

                <Form onSubmit={this.handleSubmit}>
                    <Item  {...formItemLayout}  label='商品名称'>
                        <Input placeholder='请输入商品名称'/>
                    </Item>
                    <Item  {...formItemLayout}  label='商品描述'>
                        <Input placeholder='请输入商品描述'/>
                    </Item>
                    <Item  {...formItemLayout}  label='所属分类'>
                        <Cascader style={{width:200}} options={options} placeholder='请选择......'/>
                    </Item>
                    <Item  {...formItemLayout}   label='商品价格'>
                        <InputGroup compact>
                            <InputNumber style={{width:155}}placeholder='请输入商品价格'/>
                            <Input style={{ width: '13%' }} defaultValue='元' />
                        </InputGroup>
                    </Item>
                    <Item  {...formItemLayout}  label='商品图片'>
                        xxxxx
                    </Item>
                    <Item  {...formItemLayout}  label='商品详情'>
                        xxxxx
                    </Item>
                    <Item  >
                        <Button type='primary' htmlType='submit' style={{width:100}}>提交</Button>
                    </Item>

                </Form>

            </Card>


        )
    }
}