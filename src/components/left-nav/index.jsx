import React, {Component}from 'react';
import { Menu, Icon, Button } from 'antd';
import './index.less'
import {NavLink,withRouter} from 'react-router-dom'
import Home from '../../pages/home'
import Category from '../../pages/home'
import User from '../../pages/home'
import Role from '../../pages/home'
import menuList from '../../config/menuConfig'

import logo from '../../assets/imgs/logo.png'
const Item=Menu.Item
const SubMenu = Menu.SubMenu;
class LeftNav extends Component {
    componentWillMount(){
         this.menu=this.creatMenu(menuList)
    }
    creatMenu=(menu)=>{
        return menu.map((item)=>{
            if(item.children){
                const {pathname}=this.props.location
                const result=item.children.find((item)=>item.key===pathname)
                if(result){
                this.openKey=item.key
                }
                return  <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                {
                        this.creatMenu(item.children)
                }
                </SubMenu>

            }
            else {
                return <Item key={item.key}>
                    <NavLink to={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                    </NavLink>
                    </Item>
            }
        })
    }

    render() {
        // const SubMenu = Menu.SubMenu;
        const {pathname}=this.props.location
        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h2>硅谷后台</h2>
                </header>
            <Menu
                 // defaultSelectedKeys={['sub1']}
                 defaultOpenKeys={[this.openKey]}
                selectedKeys={[pathname]}
                mode="inline"
                theme="dark"
                // inlineCollapsed={this.state.collapsed}
                >
                {/*<Menu.Item key='/home'>*/}
                    {/*<NavLink to='/home'>*/}
                        {/*<Icon type="home" />*/}
                        {/*<span>首页</span>*/}
                    {/*</NavLink>*/}
                {/*</Menu.Item>*/}
                {/*<SubMenu key="sub1" title={<span><Icon type="appstore" /><span>商品</span></span>}>*/}

                        {/*<Menu.Item key='/category'>*/}
                            {/*<NavLink to='/category'>*/}
                                 {/*<Icon type="qrcode" />商品管理*/}
                            {/*</NavLink>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key='/product'>*/}
                            {/*<NavLink to='/product'>*/}
                                {/*<Icon type="menu-fold" />品类管理*/}
                            {/*</NavLink>*/}
                        {/*</Menu.Item>*/}
                {/*</SubMenu>*/}
                {/*<Menu.Item key="2">*/}
                    {/*<NavLink to='/user'>*/}
                        {/*<Icon type="user" />*/}
                        {/*<span>用户管理</span>*/}
                    {/*</NavLink>*/}

                {/*</Menu.Item>*/}
                {/*<Menu.Item key="3">*/}
                    {/*<NavLink to='/role'>*/}
                        {/*<Icon type="safety" />*/}
                        {/*<span>权限管理</span>*/}
                    {/*</NavLink>*/}
                {/*</Menu.Item>*/}
                {/*<SubMenu key="sub2" title={<span><Icon type="area-chart" /><span>图形图标</span></span>}>*/}
                    {/*<Menu.Item key="9"> <Icon type="bar-chart" />柱形图</Menu.Item>*/}
                    {/*<Menu.Item key="10"><Icon type="line-chart" />折线图</Menu.Item>*/}
                    {/*<Menu.Item key="11"><Icon type="pie-chart" />饼图</Menu.Item>*/}
                {/*</SubMenu>*/}
                {
                    this.menu
                }
            </Menu>


            </div>
        )
    }
}

export default withRouter(LeftNav)