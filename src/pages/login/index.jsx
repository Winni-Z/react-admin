import React, {Component}from 'react';
import Loginform from '../../components/login-form'
import logo from '../../assets/imgs/logo.png'
import bg from './bg.jpg'
import {reqLogin} from '../../api/index'
import MemoryUtils from '../../utils/memoryUtils'
import {setUser} from '../../utils/storageUtils'

import './index.less'


export default class Login extends Component {

    login=async(username,password)=>{
        const result = await reqLogin(username,password)
        console.log(result);
        if(result.status===0){
// 保存用户信息，保存到loacalStoryge,sesionStoryge浏览器本地存储
            setUser(result.data)
            MemoryUtils.user=result.data

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