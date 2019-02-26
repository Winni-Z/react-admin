/**
 * Created by Asus on 2019/2/26.
 */

import React ,{Component} from 'react';
import {render} from 'react-dom'
import {Button,message} from 'antd'
import Login from './pages/login'
import Admin from './pages/admin'


export default class App extends Component{
    handleClick=()=>{
        message.info('点击按钮',1);
    }
    render(){
        return(
            <div>
                <Button onClick={this.handleClick} type='primary'>按钮</Button>
            </div>
        )
    }
}