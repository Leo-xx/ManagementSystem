import request from './request'
export default {
    getUserData(params){
        return request({
            url:'/user/getUser',
            method: 'get',
            data: params,
        })
    },
    addUser(params){
        return request({
            url:'/user/add',
            method: 'post',
            data: params,
        })
    },
    editUser(params){
        return request({
            url:'/user/edit',
            method: 'post',
            data: params,
        })
    },
    deleteUser(params){
        return request({
            url: '/user/delete',
            method: 'get',
            data: params,
        })
    },
    //根据用户名的不同返回不一样的菜单列表
    getMenu(params){
        return request({
            url: '/permission/getMenu',
            method: 'post',
            data: params,
        })
    }
}