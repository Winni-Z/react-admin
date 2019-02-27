/**
 * Created by Asus on 2019/2/27.
 */
import ajax from './ajax'

// const  urldata = 'http://localhost:5000';
const urldata = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000';
export const reqLogin=(username,password)=>{
    return ajax(urldata+'/login',{username,password},'POST')
}
export const reqAddUser=(user)=>{
    ajax(urldata+'/manage/user/add',user,'POST')
}

