/**
 * Created by Asus on 2019/2/26.
 */

import React ,{Component} from 'react';
// import {render} from 'react-dom'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
// import {Button,message} from 'antd'
import Login from './pages/login'
import Admin from './pages/admin'

import './assets/index.css'


export default class App extends Component{

    render(){
        return(
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    {/*<Route path='/' component={Admin}/>*/}
                    <Redirect to='/login'/>
                </Switch>
            </Router>
        )
    }
}