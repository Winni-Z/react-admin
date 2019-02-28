/**
 * Created by Asus on 2019/2/28.
 */
import store from 'store'

const USER_KEY='user'

export const setUser=(value)=>{
    if(value&&typeof value!=='function'){
        store.set(USER_KEY,value)

    } else {
        console.log('保存失败：数据为空或者是函数')
    }
}

export const getUser=()=>{
    const value=store.get(USER_KEY)
    return value||''
}
export const removeUser=()=>{
    const value=store.remove(USER_KEY)

}