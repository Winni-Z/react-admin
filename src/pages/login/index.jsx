import React, {Component}from 'react';
import logo from './logo.png'
import bg from './bg.jpg'

import './index.less'
import Loginform from '../../components/login-form'

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
                    <Loginform/>
                </section>
            </div>
        )
    }
}