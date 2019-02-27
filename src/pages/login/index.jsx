import React, {Component}from 'react';
import Loginform from '../../components/login-form'
import logo from '../../assets/imgs/logo.png'
import bg from './bg.jpg'
import {reqLogin} from '../../api/index'

import './index.less'


export default class Login extends Component {

    login=async(username,password)=>{
        const result = await reqLogin(username,password)
        console.log(result);
        if(result.status===0){
            this.props.history.replace('/')
        } else {
            this.setState({
                errMsg:result.msg
            })
        }
    }

    render() {
        // const {errMsg}=this.state
        // const height=errMsg?
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>react项目：后台管理项目</h1>
                </header>
                <section className="login-form-container">
                    <div className='err-msg'></div>
                    <h2>用户登录</h2>
                    <Loginform login={this.login}/>
                </section>
            </div>
        )
    }
}