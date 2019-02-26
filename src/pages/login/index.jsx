import React, {Component}from 'react';
import logo from './logo.png'
import bg from './bg.jpg'
import './index.less'
import {Form, Icon, Input, Button} from 'antd';
const  Item=Form.Item
export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>react项目：后台管理项目</h1>
                </header>
                <section className="login-form-container">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        </Item>
                        <Item>
                            <Input prefix={<Icon type="safety"  style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                        </Item>
                        <Button className='login-button' type="primary">登录</Button>
                    </Form>

                    {/*<form className="login-form-contain">*/}
                        {/*<input placeholder="用户名" type="text"/>*/}
                        {/*<input placeholder="密码" type="text"/>*/}
                        {/*<button>登录</button>*/}
                    {/*</form>*/}
                </section>

            </div>
        )
    }
}