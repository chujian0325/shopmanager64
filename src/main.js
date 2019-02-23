// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/base.css'
import moment from 'moment'
import CusBread from './components/cusBread.vue'
import HttpServer from './http.js'
Vue.config.productionTip = false

// 组件->两类+三步，定义一个全局组件
// 全局自定义面包屑组件
// 参数1：组件名称
// 参数2：组件选项所在对象(因为导出的是组件选项所在对象，所以导入的也是组件选项所在对象，可以直接写CurBread)
// Vue.component('CusBread',CurBread)
// 导出的也是对象，name通过点的方式获得
Vue.component(CusBread.name, CusBread)
// 所有的Vue插件都是这样用
// 希望这样使用axios，就是把axios变成Vue的插件
Vue.use(HttpServer)
Vue.use(ELEMENT)

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
