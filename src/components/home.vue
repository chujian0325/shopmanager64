<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a class="logout" href="#" @click="handleLoginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          @select="fn"
          :unique-opened="true"
          :router="true"
          :default-active="$route.name"
          class="el-menu-vertical-demo"
        >
          <!-- 1 -->
          <el-submenu :index="item1.order+''" v-for="(item1) in menus" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2) in item1.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              {{item2.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  // 如果用户没登录，if(!token)->改标识->this.$router.push()显示login.vue组件,
  // 代码位置：beforeMount，组件渲染完成之前
  // 如果用户登录了，显示home.vue
  // beforeMount () {
  //   if (!localStorage.getItem('token')) {
  //     this.$router.push({
  //       name: 'login'
  //     })
  //     this.$message.warning('请先登录！')
  //   }
  // },
  // 写在beforeCreate也可以，一般写在beforeCreate，页面加载之前
  beforeCreate () {
    // 判断token有没有这件事不想放在home主页中，想放在另外的位置，当标识发生变化时，代码的位置不是先来到组件，代码是先来到路由的位置index.js，看路由中有没有/，如果有/，才去执行home.vue（如果 路由匹配成功，才去渲染组件）所以在路由位置加一个筛选
    // if (!localStorage.getItem("token")) {
    //   this.$router.push({
    //     name: "login"
    //   });
    //   this.$message.warning("请先登录！");
    // }
  },
  mounted () {},
  created () {
    this.getMenus()
  },
  methods: {
    // 导航激活事件
    fn (index, indexPath) {
      // console.log(index); // 标识goods
      // console.log(indexPath);//数组，第一个是控制的是第几个导航，第二个时标识即index  [1,goods]
      // fn触发时，要获取当前点击的路由数据
      console.log(this.$route.name)
      // this.$route路由配置对象，里面有当期的标识
      // this.$route.name就是当前点击的路由标识，绑定给el-menu
      //  default-active="$route.name"
    },
    // 动态导航
    async getMenus () {
      const res = await this.$http.get(`menus`)
      // console.log(res);
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.menus = data
      }
    },
    // 退出功能
    handleLoginout () {
      // 1. 清除token
      localStorage.clear()
      // 2. 来到登录组件
      this.$router.push({
        name: 'login'
      })
      // 3. 提示
      this.$message.warning('退出成功')
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #b3c0d1;
  height: 100%;
}
.aside {
  background-color: yellow;
}

.middle {
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.logout {
  text-decoration: none;
  line-height: 60px;
}
</style>
