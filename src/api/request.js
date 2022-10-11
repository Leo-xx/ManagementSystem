
import axios from "axios"

// axios.interceptors.request.use((req) => {
//     return req
// })
const instance = axios.create();

// 封装的核心函数

function request(options){
    if(options.method.toLowerCase() == 'get'){
        options.params = options.data
    }
    return instance(options)
}

export default request