import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login.vue'
// webpack提供了新功能，@符号表示src目录，所以导入组件的时候可以写@，会自动锁定为src目录
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from '@/components/rights.vue'
import Roles from '@/components/roles.vue'
import { Message } from 'element-ui'
import Goodslist from '@/components/goodslist.vue'
import Goodsadd from '@/components/goodsadd.vue'
import Cateparams from '@/components/cateparams.vue'
import Goodscate from '@/components/goodscate.vue'


Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: Users
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    }, {
      name: 'roles',
      path: '/roles',
      component: Roles
    }, {
      name: 'goods',
      path: '/goods',
      component: Goodslist
    }, {
      name: 'goodsadd',
      path: '/goodsadd',
      component: Goodsadd
    }, {
      name: 'params',
      path: '/params',
      component: Cateparams
    },{
      name: 'categories',
      path: '/categories',
      component: Goodscate
    }]
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

// 之前效果效果：当标识变化时，->如原来的Login变成了/->代码先来到router里的index.js，如果匹配成功->来到home.vue->beforeMount()
// 现在是把beforeMount()方法放在路由中
// 在某个路由配置生效前，判断token，看看router插件中，有没有API让你去做这件事，vue官网--生态系统-router--进阶--导航守卫

// const router = new VueRouter({
//   // 这个代码是创建new router，前面导出的代码是实例化router并导出
// export default new Router({})
// 可以写成
//   // const router = new Router(){}
//   // export default router
// 下面就可以直接使用router了
// })

// 路由导航守卫
// 任何路由标识变化->来到路由配置->配置生效前->路由守卫->配置生效
// 对象 to 要去的路由配置对象(name)
// 对象 from 当前的路由配置对象(name)
// next() 让路由配置继续生效
router.beforeEach((to, from, next) => {
  // console.log('路由守卫执行-----')
  // console.log(to)
  // console.log(from)
  // 1. 如果要去的是login->next()
  if (to.name === 'login') {
    next()
  } else {
    // 如果要去的不是login
    // 取出token
    const token = localStorage.getItem('token')
    // 2.1 !token ->login
    if (!token) {
      // 提示
      // 之前写的是this.message.warning('请先登录！')
      // 这里this不是vm。所以也不能这样写，看element文档提示有么有别的用法---message--单独引用，可以导入一个组件单独引入 Message
      // import { Message } from 'element-ui';
      // 此时调用方法为 Message(options)。我们也为每个 type 定义了各自的方法，如 Message.success(options)。并且可以调用 Message.closeAll() 手动关闭所有实例。
      Message.warning('请先登录！')
      // 去登录->js改标识
      // 之前写的是
      // this.$router.push({
      //   name: 'login'
      // })
      // 这里不能使用this，this是vue中methods内部的关键字，这个文件没有引入vue，this不是vm
      // $router是路由的实例化对象
      // $route是路由的配置对象
      // 能找到路由的实例化对象，就能点push()，这里路由的实例化对象是router
      router.push({
        name: 'login'
      })
      // 为了省去一个else
      return
    }
    next()
  }
})
export default router
/**
  beforeCreate() {
  if (!localStorage.getItem("token")) {
      this.$router.push({
        name: "login"
      });
      this.$message.warning("请先登录！");
    }
  }
 */
