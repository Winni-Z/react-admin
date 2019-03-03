import React, {Component} from 'react';
import { Layout  } from 'antd';
import {Switch, Route,Redirect} from 'react-router-dom';
import MemoryUtils from '../../utils/memoryUtils'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Footer from '../../components/footer'


import Home from  '../home'
import Category from  '../category'
import Product from  '../product/product'
import User from  '../user'
import Role from  '../role'
import Bar from  '../charts/bar'
import Line from  '../charts/line'
import Pie from  '../charts/pie'


const {Sider, Content,} = Layout;

export default class Admin extends Component {
    render() {
        const user=MemoryUtils.user
        if(!user||!user._id){
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout >
                    <Header/>
                    <Content style={{ margin: '20px' }} >
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        )
    }
}
