import React, {Component}from 'react';
import {withRouter} from 'react-router-dom'
import { Row, Col } from 'antd';
import  MemoryUtils from '../../utils/memoryUtils'
import { Modal, Button,message} from 'antd'
import {removeUser} from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import dayjs from 'dayjs'
import './index.less'
import {reqWeater} from  '../../api/index'

const confirm = Modal.confirm;
class Header extends Component {
    state={
        sysTime:dayjs().format('YYYY/MM/DD HH:mm:ss'),
        dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
        weather:'晴转多云'
    }
    componentDidMount(){
        this.upDateTimeFinal()
        this.getWeather()
    }

    upDateTimeFinal=()=>{
        const upDateTime=setInterval(()=>{
            this.setState({
                sysTime: dayjs().format('YYYY/MM/DD HH:mm:ss')
            })
        },1000)
    }

     getWeather=()=>{
         reqWeater('北京')
             .then((resolve)=>{
             this.setState({
                 dayPictureUrl: resolve.dayPictureUrl,
                 weather:resolve.weather
             })
         })
             .catch((err)=>{
             message.error(err)
             })
    }

    componentDidUpdate(){
        clearInterval(this.upDateTime)
    }

    loginOut =()=>{
        confirm({
            title: '您确认要退出登录吗?',
            okText: '确认',
            cancelText: '取消',
            onOk:()=> {
                removeUser()
                MemoryUtils.user={}
                this.props.history.replace('/login')
            },
        });

    }

    getTille=(menu)=>{
        const {pathname}=this.props.location;
        for (let i = 0; i < menu.length; i++) {

            let item = menu[i];
            if(item.children){
                const title=this.getTille(item.children)
                if(title){
                    // console.log(title);
                    return title
                }
            } else {
                if(item.key===pathname){
                    // console.log(item.key);
                    return item.title
                }
            }
        }
    }

    render() {
        const {sysTime,dayPictureUrl,weather}=this.state
        const {username}=MemoryUtils.user
        const title=this.getTille(menuList)
        // console.log(title);
        return (
            <div className="header">
                <Row className='header-top'>
                    <span>欢迎, {username}</span>
                    <a onClick={this.loginOut} href="javascript:void(0);" style={{color:'green'}}>退出</a>
                </Row>
                <Row className='header-bottom'>
                    <Col span={6} className='header-bottom-left'>{title}</Col>
                    <Col span={18} className='header-bottom-right'>
                        <span>{sysTime}</span>
                        <img  src={dayPictureUrl} alt="天气"/>
                        <span style={{marginRight:'20px'}}>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Header)