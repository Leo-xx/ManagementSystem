import { defineStore, storeToRefs } from "pinia";
import Cookies from "js-cookie";
// import { ref } from "vue";
export const useStore = defineStore('main', {
    state:() => ({
        menu: [],
        token: '',
        isCollapse:false,
        currentMenu:null,

        tabList:[
            {
                path:'/',
                name: 'home',
                label: '首页',
                icon:'home'
            }
        ]
    }),


    //计算
    getters:{
        
    },
    //methods 适合定义业务逻辑
    actions:{
        updateIsCollapse(){
            this.isCollapse = !this.isCollapse
        },

        selectMenu(val){
            if (val.name == 'home') {
                this.currentMenu = null
            } else {
                this.currentMenu = val
                let result = this.tabList.findIndex(item => item.name === val.name)
                result == -1 ? this.tabList.push(val) : ''
            }
        },
        reduceTablist(val){
            let res = this.tabList.findIndex(item => item.name === val.name)
            this.tabList.splice(res, 1)
        },
        setMenu(val){
            this.menu = val
            localStorage.setItem('menu', JSON.stringify(val))           
        },
        addMenu(router){
            if(!localStorage.getItem('menu')){
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'))
            this.menu = menu

            // const menuArray = []

            // menu.forEach(item => {
            //     if(item.children){
            //       item.children = item.children.map(item => {
            //         let url = '../views/${item.url}.vue'
            //         item.component = () => import(url)
            //         return item
            //       })
            //       menuArray.push(...item.children)   
            //     }else{
            //         let url = '../views/${item.url}.vue'
            //         item.component = () => import(url)
            //         menuArray.push(item)
            //     }
            // })
            // console.log(menuArray)
            // menuArray.forEach(item => {
            //     // console.log(item)
            //     router.addRoute( 'home1',item)
            // })
        },
        cleanMenu(){
            this.menu = []
            localStorage.removeItem('menu')
        },
        setToken(val){
            this.token = val
            Cookies.set('token', val)
        },
        cleanToken(){
            this.token = ''
            Cookies.remove('token')
        },
        getToken(){
            this.token = this.token || Cookies.get('token')
        }
        
    }
    //other options
})
