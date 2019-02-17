// 插件要封装的代码
// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// Vue.prototype.$http = axios
// const AUTH_TOKEN = localStorage.getItem("token");
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

import axios from 'axios'
// 提供一个空对象
const HttpServer = {};
// 添加成员
HttpServer.install = function (Vue) {
  // 4. 添加实例方法
  // 插件要封装的代码
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  const AUTH_TOKEN = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  Vue.prototype.$http = axios
}
// 导出
export default HttpServer;
