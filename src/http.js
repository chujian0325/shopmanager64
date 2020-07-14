// 插件要封装的代码
// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// Vue.prototype.$http = axios
// const AUTH_TOKEN = localStorage.getItem("token");
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

import axios from 'axios'
import {
  Message
} from 'element-ui'
// 提供一个空对象
const HttpServer = {}
// 添加成员
HttpServer.install = function (Vue) {
  // 插件要封装的代码
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 所有请求发起之后，进行筛选
  // 请求的标识是login时，不用设置请求头->请求继续发起
  // 当请求的标识不是login时，先设置头部，再发请求
  // 目前的头部设置是axios做，所以交给axios拦截->查axios文档
  // 添加请求拦截器，请求发起之前自动跳到拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log('请求拦截器被触发了');

    // console.log(config);
    // url是请求的全路径，因为设置了baseUrl，所以在代码中写url时，会自动取出后面的相对路径
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      // 用axios设置头部
      // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // config中有headers，设置头部
      config.headers['Authorization'] = AUTH_TOKEN
    }

    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  // 添加响应拦截器，统一处理非200和201的情况
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log("res拦截器-----");
    // console.log(response);
    const {
      meta: {
        msg,
        status
      }
    } = response.data
    // 统一处理非200和201的情况
    if (status !== 200 && status !== 201) {
      // 提示
      Message.warning(msg)
    }
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}
// 导出
export default HttpServer
