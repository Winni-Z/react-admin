import React, {Component}from 'react';
import {Form, Icon, Input, Button,message} from 'antd';

const  Item=Form.Item

 class Loginform extends Component {

     handlePassword=(rule, value, callback)=>{
         const { getFieldValue } = this.props.form
         if(!value){
             callback('请输入密码')
         }else if(value.length<6){
             callback('密码长度要大于6位数')
         }else if(value.length>15){
             callback('密码长度不能大于15位数')
         }else if((!/^[a-zA-Z0-9_]+$/.test(value))){
             callback('密码必须是大小写、数字或者下划线')
         }else{
             callback()
         }

     }
     handleSubmit = (e) => {
         const {validateFields,resetFields,getFieldsValue}=this.props.form;
         e.preventDefault();
         validateFields((err, values) => {
             if (!err) {
                 console.log('收集的表单数据: ', values);
             }else{
                 resetFields(['password'])
                 const errmsg=Object.values(err).reduce((prev,current)=>prev+current.errors[0].message+'','')
                 message.error(errmsg)
             }
         });
     }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' },
                            {min:5,message:'用户名长度要大于5!'},
                            {max:12,message:'用户名长度不能超过12位!'},
                            {pattern:/^[a-zA-Z0-9_]{5,12}$/,message:'用户名必须是大小写、数字或者下划线'},{}],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="用户名" />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('password', {
                        rules: [
                            {validator:this.handlePassword}
                        ],
                    })(
                        <Input type="password" prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                    )}
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" className="login-form-butto">登录</Button>
                </Item>

            </Form>
        )
    }
}

const WrappedLoginForm = Form.create()(Loginform);
export default WrappedLoginForm