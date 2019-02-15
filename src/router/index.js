import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login.vue'
// webpack提供了新功能，@符号表示src目录，所以导入组件的时候可以写@，会自动锁定为src目录
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: ''
  }, {
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/home',
    component: Home
  }]
})
