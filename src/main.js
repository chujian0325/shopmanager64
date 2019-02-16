// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/base.css'
import moment from 'moment'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 所有的Vue插件都是这样用
Vue.use(ElementUI)

// 全局过滤器，处理日期格式
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
  // 同render的作用一样，把根组件的内容，和el所管理的视图内容替换
  // 完整写法如下：
  // components: { App:App },
  // template: '<App><App/>'
  // 可以只写闭合标签
})
