import React from 'react';
import ReactDOM from 'react-dom';
import {getUser} from './utils/storageUtils'
import MemoryUtils from './utils/memoryUtils'
// import './index.css';
import App from './App';

const user=getUser()
if(user&&user._id){
    MemoryUtils.user=user
}
// const user=MemoryUtils.user
// if(!user||!user._id){
//     return <Redirect to='/login'/>
// }

ReactDOM.render(<App />, document.getElementById('root'));
