/**
 * Created by Asus on 2019/2/27.
 */
import ajax from './ajax'
import jsonp from 'jsonp'
// const  urldata = 'http://localhost:5000';
const urldata = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000';
export const reqLogin=(username,password)=>{
    return ajax(urldata+'/login',{username,password},'POST')
}

export const reqAddUser=(user)=>{
    ajax(urldata+'/manage/user/add',user,'POST')
}

export const reqWeater=(city)=>{
    return new Promise((resolve,reject)=>{
        jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
            {},
            (err,data)=>{
                if(!err){
                    resolve(data.results[0].weather_data[0])
                } else {
                    console.log(err)
                    reject('天气请求失败~~~')
                }
            })
    })
}

export const reqCategory=(parentId)=>ajax(urldata+'/manage/category/list',{parentId},'GET')

export const reqAddCategory=(parentId,categoryName)=>ajax(urldata+'/manage/category/add',{parentId,categoryName},'POST')

export const reqUpdateCategoryName=(categoryId,categoryName)=>ajax(urldata+'/manage/category/update',{categoryId,categoryName},'POST')

export const reqProductsLists=(pageNum,pageSize)=>ajax(urldata+'/manage/product/list',{pageNum,pageSize},'GET')

export const reqSearchProductsLists=(pageNum,pageSize,searchType,searchName)=>ajax(urldata+'/manage/product/list',{pageNum,pageSize,[searchType]:searchName},'GET')