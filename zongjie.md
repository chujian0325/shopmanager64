## Vue 项目重点笔记

用户名admin  密码123456

### day07-项目-重点

#### 01-项目-准备-vue-cli 创建项目结构

1. 来到项目所希望的目录->打开 cmd

2. vue init webpack 项目名，该项目是vue init webpack shopmanager64

   1. 是否安装 vue-router -> Y
   2. 是否 use ESLint -> Y
   3. 编译方式 -> for most users
   4. unit tests->N
   5. e2e -> N
   6. npm/yarn -> npm

3. cd 项目目录，该项目是cd shopmanager64

4. npm run dev 启动开发模式

   > 注意: 默认不会打开浏览器

#### 02-项目-准备-项目目录说明

1. .eslintignore -> ESLint 检查 js 代码排除忽略文件
2. eslintrc-> ESLint 配置文件
3. .gitignore -> git 排除忽略文件，里面写了不需要git管理的文件或文件夹
4. build/ -> webpack 打包(src)的产物
5. conf/ -> 配置服务器 index.js 更改autoOpenBrowser: true,改成自动打开浏览器 ->修改了配置文件要重启项目 npm run dev
6. src/main.js 和之前不一样 ，之前是 render-> 现在是 template 和 components

#### 03-项目-准备-代码规范-自定义指令-lintfix

> ESlint 自动检查 js 代码规范
>
> 一键调整代码规范

1. 在package.json->scripts->用来写自定义指令，添加以下自定义指令

   > "lintfix": "eslint --ext .js,.vue src --fix",

2. npm run dev 重启让配置文件生效

3. npm run lintfix 修复不规范的代码(对于未使用的变量或常量 ，不能修复)

4. npm run dev

> 建议: 先感受 ESLint , 项目第三天 教如何禁用 eslint

#### 04-项目-准备-element-ui-文档分析

> vue 使用第三方 UI 库 饿了么 element-ui
>
> vuePC 项目:element-ui / iView
>
> vue 移动端项目: mint-ui

#### 05-项目-准备-element-ui-安装-引入

> npm i element-ui

`main.js`中导入和使用插件（根据element-ui文档---快速入手）

```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

> 在所有的.vue 文件 template 中就可以使用组件了!

#### 06-项目-准备-项目模板简化-调整

> 简化代码，删除无用的assets中的logo.png，测试组件HelloWorld，router->index.js中引入的helloworld，挂载的component:'helloWorld'，根组件app.vue中的图片，及样式

#### 07-项目-准备-git-版本控制

> git 管理项目代码
>
> gitbash-> git 指令可以任何 cmd 中执行->git 报错->git 是无效指令->
>
> 1. 找到 git 软件安装路径 bin
> 2. 找到计算机管理/属性//环境变量 path -> 修改编辑 path -> 把上一步路径放在 path 里面
> 3. 可以在任意 cmd 中 git 指令
> 4. 重启电脑
>
> [网址](https://blog.csdn.net/shanshan_blog/article/details/53645358)
>
> 继续 gitbash 软件

```shell
git init
git add .
git commit -m "初始化项目"
// 在github新建仓库
// 关联仓库
git remote add origin https://github.com/chujian0325/shopmanager64.git
// 推送
git push -u origin master
刷新github上的项目，可以看到推送的代码
```

> 后续再 使用git时，只需要

```shell
git add .
git commit -m "完成了功能1-登录"
git push
```

#### 08-项目-准备-git-分支管理

> 前提 git 管理代码/协同开发

> 项目 2 个人
>
> A 人->新建子分支 login->编写代码 ->git add. commit->把代码 A 合并到主分支 master
>
> B 人->新建子分支 home->编写代码 ->git add. commit->把代码 B 合并到主分支 master
>
> 在 master 主分支->git push

```shell
// 检查当前分支
git branch
// 新建分支并且切换到分支
git checkout -b 分支名 ，分支名以dev-开头，体现是开发功能的分支，这个项目是
git checkout -b dev-login
// git branch
// 结果: 接下来所有的操作(代码编写/add/commit)在当前的dev-login进行操作的->开发login功能
```

#### 09-项目-登录-新建分支-login 组件-配置路由

> 当前开发 login 登录 当前分支 dev-login

1. 新建 login.vue 组件，sca创建基本代码，`<template><div>login----</div></template>`用来测试是否能显示组件

2. 配置路由 router.js，导入组件和配置组件，

   1. 导入组件

      ```js
      // import Login from '../components/login.vue'
      // webpack提供了新功能，@符号表示src目录，所以导入组件的时候可以写@，会自动锁定为src目录
      import Login from '@/components/login.vue'
      ```

   2. 配置组件

      ```js
      export default new Router({
        routes: [{
          path: '/',
          name: ''
        }, {//配置组件
          name: 'login',
          path: '/login',
          component: Login
        }]
      })
      ```

   3. http://localhost:8080/#/login 在浏览器中查看是否能显示组件

```shell
// 在子分支完成小功能后,在子分支dev-login上
git add .
git commit -m "配置登录路由完毕"
// 功能完成后
// 切换到master
git checkout master
// git branch
// 把dev-login分支写的代码合并到master
git merge dev-login
// 在master主分支推送
git push
可以在github上看到登陆路由配置完毕
```

#### 10-项目-登录-引入表单组件

> 切换回 dev-login，git checkout dev-login，检查分支状态，git branch

1. 引入 el-form ，

   （1）在element官网找到From表单，选择适合项目的表单，点`显示代码`，复制代码，根据文档配置（冒号绑定的数据在data中声明，给组件提供数据），:model的作用是绑定表单数据,在data中提供表单数据formdata，属性根据接口文档中登录参数写，在标签中设置类名 ，方便调整样式

   （2）选择合适的登录按钮button

   ```vue
   // template返回唯一根元素
   <template>
     <!-- 在标签中设置类名 ，方便调整样式 -->
     <div class="login-wrap">
       <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
         <h2>用户登录</h2>
         <el-form-item label="用户名">
           <el-input v-model="formdata.username"></el-input>
         </el-form-item>
         <el-form-item label="密码">
           <el-input v-model="formdata.password"></el-input>
         </el-form-item>
         <el-button class="login-btn" type="success">登录</el-button>
       </el-form>
     </div>
   </template>
   ```

2. 添加类名

3. 提供组件要用的数据

   ```vue
   <script>
   export default {
     data () {
       return {
         formdata: {
           username: '',
           password: ''
         }
       }
     }
   }
   </script>
   ```

4. git 提交

```shell
git branch
git status
git add .
git commit -m "引入登录组件"
```

> 合并代码 不需要每次都做,可以完成一大功能 最后一起合并和推送

#### 11-项目-登录-样式调整

1. 设置背景色及宽度，大家都用的样式可以写在assets中，新建base.css（项目的重置层），base.css在main.js引入大家都要用的文件`import '../src/assets/base.css'`

   `base.css`

   ```css
   * {
     padding: 0;
     margin: 0;
   }
   
   html,
   body,
   h2 {
     height: 100%;
   }
   ```

`login.vue`

```css
.login-wrap {
  /* 注意: 百分比布局 父元素要有height，是一层一层设置的 */
  height: 100%;
  background-color: #324152;
  /* 以下三行代码是伸缩布局设置盒子垂直水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #ffffff;
  border-radius: 5px;
  /* 开发 */
  width: 400px;
  padding: 30px;
}
.login-btn {
  width: 100%;
}
```

> 1. 百分比布局
>    1. base.css html,body{height:100%}
>    2. App.vue #app{height:100%}，App.vue是用来展示其他组件的，所以height也要设置成100%
> 2. vue 项目重点不是 css 只要能写出来就可以

2. git提交

   ```bash
   git branch
   git add .
   git commmit -m "登录页面样式调整完成"
   ```

#### 12-项目-登录-axios 插件

1. npm i axios  安装

2. main.js 挂载原型 axios，因为每个组件都会发请求，获取数据，都需要导入axios，所以将axios作为Vue的插件，挂载到Vue的原型上

3. 配置 baseUrl

   ```js
   import axios from 'axios'
   axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'  // 接口基准地址（在接口文档中查看）
   Vue.prototype.$http = axios
   ```

4. this.\$http 可以发送请求了

5. 给登录页面的按钮注册事件

   ```vue
   <!-- 注册事件，阻止默认行为 -->
   <el-button @click.prevent="handleLogin()" class="login-btn" type="success">登录</el-button>
   methods中提供方法，发送请求时，在接口文档查看请求方式
   ```

#### 13-项目-登录-发送登录请求

用户名admin，密码123456

```js
handleLogin(){
    this.$http
      .post(`login`, this.formdata)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
}
```

> 服务器 cmd 卡死-> 回车->激活它
>
> 发请求时，api-server必须是一直处于启动状态 -> node app.js

#### 14-项目-登录-引入提示框组件

```js
this.$http.post(`login`, this.formdata).then(res => {
  console.log(res)
  const {
    data: {
      data,
      meta: { msg, status }
    }
  } = res
  if (status === 200) {
    console.log('success----')
  } else {
    // 提示框 -> UI,在element官网找提示按钮，根据文档
    this.$message.error(msg)
  }
})
```

> 提示: 对象解构赋值
>
> git提交

#### 15-项目-登录-登录成功-进入 home 组件

> 登录成功->渲染 home.vue

`login,vue`

```js
if (status === 200) {
    // console.log('success')
    // 登陆成功，渲染home组件，改标识，js改标识，编程式导航
    this.$router.push({
      name:'home'
    })
  } 
```

router中`index.js`，导入和配置组件

```js
import Home from '@/components/home.vue'

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
```

> git 提交

```bash
git add .
git commit -m "渲染home"
```

#### 16-项目-登录-简化登录请求代码-async 和 await

> 目的:让异步代码看起来像同步,好处没有函数嵌套，（http://es6.ruanyifeng.com/#docs/async）

```js
const res = await this.$http.post(`login`, this.formdata)
```

1. 找异步代码
2. 在异步代码前面加 await 同时接收异步的结果
3. 在异步代码外层最近的函数前面加 async

#### 17-项目-登录-保存 token 值

> 将来在其他组件中使用用户的数据信息中的 token 数据->保存 token(是一个加密的字符串，将来要在其他的页面中使用它)->
>
> 在login.vue 有了 token -> xxoo.vue 使用 token->
>
> A 页面有数据 a -> 将来在B 页面使用 a->
>
> 就要把 token 数据永久存储-> cookie/session/sessionStorage/localStorage 等->
>
> cookie存储小数据,小于4KB，session用于服务端存数据，sessionStorage会话存储，当把会话关闭，存储就没有了，localStorage本地存储，在浏览器检查->application中查看
>
> 使用 Html5 新特性 localStorage 保存 token

`login.vue`

```js
// 把正确的用户的token保存起来
// 存值
localStorage.setItem('token', token)
// 取值
// const aa = localStorage.getItem("token");
// console.log(aa);
```

> 浏览器调试->application->cookie/localStorage 保存的数据

#### 18-项目-首页-布局容器-使用-样式调整

> 引入布局容器，element文档Container 布局容器，找到需要的容器

`home.vue`

```html
<el-container class="container">
  <el-header>Header</el-header>
  <el-container>
    <el-aside class="aside" width="200px">Aside</el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>

```

> 调整样式

```css
.container {
  height: 100%;
  background-color: red;
}
.aside {
  background-color: yellow;
}

.main {
  background-color: green;
}
```

#### 19-项目-首页-头部-样式调整

> 引入 layout 布局(24 份),element文档，复制代码，根据需要设置份数
>
> el-row 一行
>
> el-col 一列

```html
<el-row>
  <el-col :span="4">
    <img src="@/assets/logo.png" alt="图片加载失败" />
  </el-col>
  <el-col :span="19" class="middle">
    <h2>电商后台管理系统</h2>
  </el-col>
  <el-col :span="1">
    <a href="#" class="logout">退出</a>
  </el-col>
</el-row>
```

#### 20-项目-合并代码-登录

```shell
// 子分支
git add .
git commit -m ""
// 切到主分支
git checkout master
// 合并代码
git merge dev-login
// 在master写代码
git status
git add .
git commit -m "test"
// 推送
git push
```

> 仓库地址链接
>
> 1. 下载
> 2. 使用 git 指令克隆项目仓库 git clone 项目网址
>
> 今天是git clone https://github.com/LL-1214/shopmanager64.git



### day08-项目-重点

#### 01-项目-首页-侧边栏-导航组件-阅读文档（element搜索导航）

> el-menu
>
> 组件的使用步骤：	
>
> 1. 粘代码
> 2. 配置该组件的属性和方法
>
> 复制代码，根据需要调整代码，删去不需要的代码，阅读导航组件的属性Menu Attribute和SubMenu Attribute，
>
> 导航组件写了四个样式：能展开的，激活的，禁用的，普通的不能展开的，没有下级菜单

1. router : 点击时 path 的值 index 值

2. unique-opened 控制是否只有一个子菜单打开

   > el-submenu 子菜单

#### 02-项目-首页-侧边栏-引入导航组件-调整

1. 设置图标，搜索icon，设置需要的类名`<i class="el-icon-menu"></i>`
2. 修改index
3. 设置只有一个展开`:unique-opened="true"`
4. 设置点击导航选项时，路由`:router="true"` 启用该模式会在激活导航时以 index 作为 path 进行路由跳转

```html
<el-menu
  :unique-opened="true"
  :router="true"
  default-active="2"
  class="el-menu-vertical-demo"
>
</el-menu>
```

#### 03-项目-首页-进入首页的权限验证

> 必须先登录,才显示 home.vue

```js
beforeMount() {
    if (!localStorage.getItem("token")) {
      this.$router.push({
        name: "login"
      });
      this.$message.warning("请先登录");
    }
  },
```

git 提交

```bash
git branch  //master上
git add .
git commit -m "权限验证"
```



#### 04-项目-首页-头部-退出功能

1. 注册事件

`<a class="logout" href="#" @click="handleLoginout()">退出</a>`

`home.vue`    ，methods中写方法

```js
// 退出
    handleLoginout() {
      // 1. 清除token
      localStorage.clear();
      // 2. 来到登录
      this.$router.push({
        name: "login"
      });
      // 3. 提示
      this.$message.warning("退出成功");
    }

```

#### 05-项目-首页-合并分支-新建用户分支

```shell
git checkout -b dev-users
git checkout master
// 复习
// 合并分支
git merge 分支名
```

#### 06-项目-用户管理-用户列表-新建组件-路由配置

> 嵌套路由
> 提供单独的 router-view
> users.vue 是在 home.vue 里面显示的

1. 点击用户列表，标识发生变化，改标识

   ```html
   <el-menu-item index="users">
     <i class="el-icon-menu"></i>用户列表
   </el-menu-item>
   ```

2. 标识发生变化时，显示新的组件，新建组件users.vue，配置路由

   1. 配置路由6步：

      1. 设置链接

      2. 写容器router-view。

      3. 写组件

      4. new Router()

      5. 配置路由

         1. index.js导入users.vue `import users from '@/components/users.vue'`

         2. 组件的嵌套：children:[]，在home组件展示的基础上，展示users组件。在home内写children，用法和外部routes用法一样

            ```js
            export default new Router({
              routes: [{
                path: '/',
                name: 'home',
                component: Home,
                children: [{
                  name: 'users',
                  path: '/users',
                  component: Users
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
            ```

      6. 挂载路由

      然后就可以在浏览器点击用户列表，看是否显示users.vue

   2. 目前的router-view显示的整个组件，users.vue是在home组件中显示的，所以要单独写容器router-view，home.vue中main的位置写`<router-view></router-view>`

#### 07-项目-用户管理-用户列表-面包屑和搜索框

1. Card 卡片：将信息聚合在卡片容器中展示。

   ```html
   <el-card class="box"></el-card>
   ```

2. 调整卡片样式，满屏显示

   ```css
   .box {
     height: 100%;
   }
   ```

3. 卡片功能划分

   ```html
   <!-- 面包屑  -->
   <!-- 搜索+添加 -->
   <!-- 表格 -->
   <!-- 分页 -->
   ```

> 面包屑

```html
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <!-- 首页/用户管理/用户列表 -->
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
```

> 搜索+添加，

1. 可以在写一行，一列，文档中input输入框找有放大镜的，删除不必要的标签结构

```html
<!-- 搜索+添加 -->
<el-row>
  <el-col>
    <el-input placeholder="请输入内容" v-model="query">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </el-col>
</el-row>
```

2. 在data中绑定数据

```js
export default {
  data() {
    return {
      query: ""
    };
  }
};
```

3. 设置样式 ，设置类名`<el-row class="serachBox">`

```css
.serachBox {
  margin-top: 20px;
}
```

4. 添加按钮

```html
<el-button type="success">添加用户</el-button>
```

5. 修改input样式

```css
.searchInput{
    width: 350px;
}
```

> el-card 带默认样式的div 
> el-row 行>el-col 列

#### 08-项目-用户管理-用户列表-引入表格组件

表格组件---文档

```html
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="日期" width="180"></el-table-column>
  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
  <el-table-column prop="address" label="地址"></el-table-column>
</el-table>
```

> el-table 表格 data 绑定数据[]，绑定一个数组
> el-table-column 控制的是列

1. label 控制的是当前列 的表头
2. prop 控制的是当前列单元格的数据,prop 的值来源于外层 data 绑定的数据 tableData 数组中对象的 key 名

#### 09-项目-用户管理-用户列表-表头处理

1. 调整表格格式，修改文字，width，不让它有滚动条

```html
<el-table :data="list" style="width: 100%">
  <el-table-column prop="name" label="#" width="80"></el-table-column>
  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
  <el-table-column prop="name" label="邮箱" width="140"></el-table-column>
  <el-table-column prop="name" label="电话" width="140"></el-table-column>
  <el-table-column prop="name" label="创建日期" width="140"></el-table-column>
  <el-table-column prop="name" label="用户状态" width="140"></el-table-column>
  <el-table-column prop="name" label="操作" width="200"></el-table-column>
</el-table>
```

2. 把假数据，改成真数据 list[]，data 中提供list:[]空数组，表格绑定数组`:data="list" `

#### 10-项目-用户管理-用户列表-请求数据

> 获取表格的数据

```js
async getTableData() {
  // 除了登录请求.其他所有请求都需要授权->
  // 在发送请求之前,先设置请求头{Authorization:token值}
  // 设置请求头headers -> 发送请求用的是axios->找axiosAPI有没有可以设置请求头->看文档->搜索headers
  // {
  //   ContentType:text/html,
  //   Authorization:?
  // }
  // 获取token
  const AUTH_TOKEN = localStorage.getItem("token");
  this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

  const res = await this.$http.get(
    `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
      this.pagesize
    }`
  );
   // console.log(res);
    const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.list = data.users;
        // console.log(data.users)
      }
}

```

> 接口说明,需要授权 API->除了登录接口,其他所有接口都需要授权,也就是设置头部
>
> 刷新http://localhost:8080/#/users可以在控制台看到数据res

#### 11-项目-用户管理-用户列表-渲染数据-一般数据

> 单元格的数据有 2 个不同情况

1. 直接就是 prop 属性值的值 比如 prop="id"
2. 单元格内容不是 prop 的值?

```html
<el-table-column prop="id" label="#" width="80"></el-table-column>
<el-table-column prop="username" label="姓名" width="120"></el-table-column>
<el-table-column prop="email" label="邮箱" width="140"></el-table-column>
<el-table-column prop="mobile" label="电话" width="140"></el-table-column>
<el-table-column
  prop="create_time"
  label="创建日期"
  width="140"
></el-table-column>
```

#### 12-项目-用户管理-用户列表-渲染数据-日期格式处理

用过滤器处理数据的格式

1. 全局过滤器
2. 使用过滤器

```js
过滤器的使用
fmtdate两个用法：
1. v-bind:
2. 插值表达式{{msg|fmtdate}}
```

日期格式处理->使用过滤器，两类+三步，因为别的地方也用过滤器，所以使用全局过滤器，写在main.js

`main.js`  安装moment  npm i moment

```js
// 导包
import moment from 'moment'
// 全局过滤器，处理日期格式
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
```

`users.vue`

```html
<!-- 日期格式处理->使用过滤器，两类+三步，因为别的地方也用过滤器，所以使用全局过滤器，写在main.js -->
  <!-- 过滤器的使用
  fmtdate
  1. v-bind:
  2. 插值表达式{{msg|fmtdate}}
  -->
  <!-- 思路1：尝试prop="create_time|fmtdate"  不行 -->
  <!-- <el-table-column prop="create_time|fmtdate" label="创建日期" width="140"></el-table-column> -->
  <!-- 思路2：使用插值表达式调用过滤器，{{create_time|fmtdate}}   报错 -->
  <!-- <el-table-column prop="create_time" label="创建日期" width="140">{{create_time|fmtdate}}</el-table-column> -->
  <!-- 思路3：单元格的值有两种情况：
  1. 要的是prop的值，
  2. 不是prop的值，
  下面这个单元格要的值，不是prop的值create_time的值，而是日期处理之后的结果，则
  1. 给单元格要显示的内容外层加标签template
  2. 给template设置属性slot-scope，slot-scope="scope"，属性值在开发中通常写成scope
  3. slot-scope的值，会自动绑定外层的数据结构，这里是el-table的data的值：list
  4. 在内容位置写scope.row，自动取出数组list中的每个对象，其中row是固定写法
  外层的prop属性不必写了，因为单元格的内容不需要prop属性的值去写了
   -->
<el-table-column  label="创建日期" width="140">
    <!-- <template slot-scope="list">
    {{list.row.create_time|fmtdate}}
    </template> -->
    <template slot-scope="scope">
    {{scope.row.create_time|fmtdate}}
    </template>
</el-table-column>
```

> 前提:当单元格内容不是 prop 控制的

1. 给单元格内容外层加 template

2. 设置 template 的属性 slot-scope="scope"

3. 在单元格内部通过 scope.row.属性 取值

   > 注意: 固定写法, row 固定, "scope"可以随便写

#### 13-项目-用户管理-用户列表-渲染数据-用户状态开关

组件：Switch开关

内容不是prop控制的，可以删掉`prop="name"`

```html
<!-- 内容不是prop控制的，可以删掉prop="name"，方法同过滤器的使用
    1. 给内容外层加template
    2. 给template设置属性slot-scope
    3. 设置数据
  -->
  <el-table-column label="用户状态" width="140">
    <template slot-scope="scope">
      <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </template>
  </el-table-column>
```

> 和创建日期的处理是一样的情况

1. 加 template
2. 设置slot-scope
3. 使用 scope.row.属性

#### 14-项目-用户管理-用户列表-渲染数据-操作

element按钮，组件的细节通过组件的属性控制，看文档关于按钮属性的部分

> 单元格内容不是 prop 的值的值，删除`prop="name"`，一个布尔类型的值，如果不写属性值，默认是true

```html
<el-table-column label="操作" width="200">
  <tempalte slot-scope="scope">
    <!-- plain ,是否朴素显示，值是一个布尔类型的值，如果不写属性值，只写一个单词，默认是true -->
    <el-button
      type="primary"
      icon="el-icon-edit"
      circle
      size="mini"
      plain  
    ></el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      circle
      size="mini"
      plain
    ></el-button>
    <el-button
      type="success"
      icon="el-icon-check"
      circle
      size="mini"
      plain
    ></el-button>
  </tempalte>
</el-table-column>
```

#### 15-项目-用户管理-用户列表-分页组件-文档-引入

分页组件：Pagination 分页

```html
<!-- 分页
    @size-change 每页条数改变时触发
    @current-change 页码改变时 (当前1页 点击2页 )
    current-page 当前显示第几页 页码
    page-sizes 每页条数的不同情况的数组
    layout 附加功能
    total 一共数据的条数
    -->
<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage4"
  :page-sizes="[100, 200, 300, 400]"
  :page-size="100"
  layout="total, sizes, prev, pager,  next, jumper"
  :total="400"
></el-pagination>
```

#### 16-项目-用户管理-用户列表-分页组件-配置数据

```html
<el-pagination
  class="page"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="pagenum"
  :page-sizes="[2,4,6,8]"
  :page-size="2"
  layout="total, sizes, prev, pager, next, jumper"
  :total="total"
></el-pagination>
```

> 页码总数total 后台已经返回

调整样式

```css
.page{
  margin-top: 20px;
}
```



#### 17-项目-用户管理-用户列表-分页组件-分页请求

1. 点击页码-> 按照新页码发送请求
2. 点击每页条数 -> 按照新的 pagesize 发送请求

```js
handleSizeChange(val) {
  console.log(`每页 ${val} 条`);

  // 按照新pagesize发送请求
  // 当每页条数发生改变时，重置pagenum=1，从第一页开始展示数据
  this.pagenum = 1;

  this.pagesize = val;
  this.getTableData();
},
// 当前2页 -> 点击3 ->触发下面的方法 ->val = 3
handleCurrentChange(val) {
  console.log(`当前页: ${val}`);
  // 按照新页码发送请求
  this.pagenum = val;
  // this.pagemnum = 1 this.pagesize=2 发送请求
  // this.pagenum=3 this.pagesize=2 发送请求
  this.getTableData();
},
```

> 测试,this.pagenum=1
>
> 如果希望表格有滚动条，可以设置表格的高

#### 18-项目-用户管理-用户列表-搜索用户

给搜索按钮绑定事件，设置样式可清空，在input文档中，可清空，通过属性clearable值配置

```html
<el-input clearable class="searchInput" placeholder="请输入内容" v-model="query">
    <el-button 
        @click="searchUser()" slot="append" icon="el-icon-search">
    </el-button>
</el-input>
```

文本框清空时，展示全部用户，查看input事件Input Events-->clear事件，注册事件

```html
<el-input
    @clear="getAllUsers()"
    clearable class="searchInput" placeholder="请输入内容" v-model="query">
      <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
</el-input>
```



```js
 // 搜索-清空时获取所有用户
    getAllUsers() {
      this.getTableData();
    },
    // 搜索用户
    searchUser() {
      // 搜索结果从第一页开始展示
      this.pagenum = 1;
      // 按照query关键字搜索
      // query="admin"
      this.getTableData();
    },
```

> 不要忘记重置 this.pagenum=1

#### 19-项目-用户管理-用户列表-添加用户-显示对话框

组件：Dialog 对话框，

1. 一点击按钮，属性dialogFormVisible 的值由false变成true。冒号绑定的数据，在data中声明

2. 表单 登录写过表单，可以在文档中找表单Form，复制表单结构el-form，model绑定的数据改成formdata，根据需要修改表单结构样式，在data中配置数据，

3. 根据接口文档，配置formdata

   ```js
   // 表单数据，将来要发post请求，需要请求体，请求体的数据根据接口文档写
   formdata: {
       username: "",
       password: "",
       email: "",
       mobile: ""
     }
   ```

4. 修改v-model绑定的数据

```html
<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
  <!-- 表单 登录写过表单，可以在文档中找表单 -->
  <el-form label-position="left" label-width="80px" :model="formdata">
    <el-form-item label="用户名">
      <el-input v-model="formdata.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formdata.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formdata.email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="formdata.mobile"></el-input>
    </el-form-item>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisibleAdd = false"
      >确 定</el-button
    >
  </div>
</el-dialog>
```

1. 点击按钮注册事件->在methods提供方法->改 bool值

   ```html
   <el-button @click="showDiaAddUsers()" type="success">添加用户</el-button>
   ```

   ```js
   showDiaAddUsers() {
     this.dialogFormVisibleAdd = true;
   },
   ```

2. 引入对话框

3. 配置数据(对话框和 form 数据)

   > 表单数据依据发送 post 请求体



### day09-项目-重点

#### 01-项目-用户管理-用户列表-添加用户-发送请求

> 点击确定->发送请求

1. 确定按钮注册事件

```html
<el-button type="primary" @click="addUser()">确 定</el-button>
```

2. users.vue发送请求

```js
 async addUser() {
      // 发送请求
      // this.formdata?
      const res = await this.$http.post(`users`, this.formdata);
      console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        // 关闭对话框
        this.dialogFormVisibleAdd = false;
        // 更新表格
        this.getTableData();
      }
    },
```

> 不要忘记清空,一打开对话框,this.formdata={}

清空表单，在显示对话框的时候清空

```js
// 添加用户-显示对话框
    showDiaAddUsers() {
      // 清空表单内容
      this.formdata = {};
      this.dialogFormVisibleAdd = true;
    },
```



#### 02-项目-用户管理-用户列表-删除用户-打开确认框

> 引入确认框  MessageBox 弹框

1. 删除按钮绑定事件

   ```html
   <el-button @click="showMsgBoxDele()" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
   ```

2. methods提供方法，下面的代码在MessageBox 弹框组件中找

```js
// 删除--显示确认框
    showMsgBoxDele() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.warning("取消删除!");
        });
    },
```

> 点击确定->执行.then
> 点击取消->执行.catch

#### 03-项目-用户管理-用户列表-删除用户-处理响应

> 点击确定->发送 delete 请求，看接口文档

在删除成功的.then()方法中发送delete请求，

```html
<!-- scope是绑定的外层数据，可以传scope.row ，把数组中的对象传过去 ，把当前的用户传过去user -->
          <el-button
            @click="showMsgBoxDele(scope.row)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
```

```js
 // 删除--显示确认框
    showMsgBoxDele(user) {
     // console.log(user);
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // id是用户id ，想拿id,要先拿到用户，在方法中拿数据，数据的来源：
          // 1. data中提供，看看有没有
          // 2. 方法中传递参数，看看方法调用的时候能不能传 递参数
          const res = await this.$http.delete(`users/${user.id}`);
          //  console.log(res);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.$message.success(msg);
            //  重新加载表格
            this.getTableData();
          }
        })
        .catch(() => {
          this.$message.warning("取消删除!");
        });
    },
```



> 注意:async 位置,距离异步最近的外层函数

#### 04-项目-用户管理-用户列表-编辑用户-显示对话框

> 点击操作中的编辑按钮->显示对话框
> 使用的是之前的 formdata

```html
<el-button
  @click="showDiaEditUser()"
  size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
```

1. 复制之前的添加用户的对话框，修改格式

```html
<!-- 对话框--编辑用户 -->
<el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
  <!-- 登录写过表单，可以在文档中找表单  -->
  <el-form label-position="left" label-width="80px" :model="formdata">
    <el-form-item label="用户名">
      <el-input v-model="formdata.username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formdata.email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="formdata.mobile"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="editUser()">确 定</el-button>
  </div>
</el-dialog>
```

2. 显示对话框方法

```js
// 编辑--显示对话框
showDiaEditUser() {
  this.dialogFormVisibleEdit = true;
},
```

#### 05-项目-用户管理-用户列表-编辑用户-显示编辑数据

> 在打开对话框时,显示用户数据

```html
<!-- 传参 -->
<el-button
    @click="showDiaEditUser(scope.row)"
    size="mini"
    plain
    type="primary"
    icon="el-icon-edit"
    circle
  ></el-button>
```

方法中

```js
showDiaEditUser(user) {
  // 获取当前用户的数据
  this.formdata = user;
  this.dialogFormVisibleEdit = true;
},
```

#### 06-项目-用户管理-用户列表-编辑用户-发送请求

> 点击对话框的确定按钮->发送请求
> 注意: 发请求的参数 id->来源是上一步赋值的结果 this.formdata=user

```js
// 编辑--发送请求
    async editUser() {
      // 发送编辑请求
      // id ->user.id
      // 1. data 中没有user
      // 2. 方法调用的时候也不能传参数，因为scope只能在template中写，编辑按钮外层没有template包裹，可以考虑在data中写user
      // 上一步，打开对话框时，已经把user所有的数据赋值给了formdata,如果能来到这一步,说明对话框是打开的,可以直接使用formdata中的id
      // put请求和post请求一样，需要传请求体
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      );
      console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // 关闭对话框
        this.dialogFormVisibleEdit = false;
        // 重新加载表格
        this.getTableData();
      }
    },
```

编辑用户的时候，把页面重置为第一页显示

```js
// 把页码重置为第一页
this.pagenum = 1;
```

#### 06-1 修改用户列表-编辑-发送请求bug

现象：当点击编辑按钮时，修改了数据，点击取消，数据展示修改后的数据，是假改，刷新网页之后，还是修改前的数据

```js
// 编辑--显示对话框
    async showDiaEditUser(user) {
      // 获取当前用户的数据
      // this.formdata = user;
      // 上行代码，两个指针指向了同一个内存空间，当操作formdata的数据时，user的数据也会改变
      // 可以这样写，下面这种写法不是指向同一个内存空间，而是给formdata加一个属性
      // this.formdata.username = user.username;
      // this.formdata.email = user.email;
      // this.formdata.mobile = user.mobile;
      // 或者
      // 该请求是传一个用户id，返回用户信息
      const res = await this.$http.get(`users/${user.id}`);
      console.log(res);
      // 返回的结果中有我们需要的用户信息（邮箱、电话、用户名）
      // 上面的赋值是用的已经存在的用户数据，下面的赋值和当前用户无关，是请求的数据
      this.formdata = res.data.data;

      this.dialogFormVisibleEdit = true;
    },
```



#### 07-项目-用户管理-用户列表-修改用户状态

> el-switch v-model 绑定 -> 视图操作 View->被绑定数据变化

点击组件时，发送请求，看文档组件switch的状态发生变化时是否有自动触发的事件

change事件  ->switch 状态发生变化时的回调函数，回调参数：新状态的值

```html
<!-- 外层有template，绑定了scope，可以传实参 -->
          <el-switch
          @change="changeState(scope.row)"
           v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
```

方法

```js
// 修改状态
    async changeState(user) {
      // 改状态，就要改数据，改数据就要发请求。
      // 接口文档中写了参数写在url中，所以不用写请求体
      // 根据接口文档可知：
      // uId是用户的id
      // type是用户状态
      // 根据这个写url中的数据
      // 打印下user，看看有没有用户的id 和 状态
      // console.log(user);

      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      console.log(res);
      
    },
```

修改完用户状态之后，刷新，用户状态是修改之后的状态（el-switch 用v-model 绑定 -> 视图操作 View->被绑定数据变化），说明没问题

#### 08-项目-用户管理-用户列表-分配角色-功能演示

> 每个用户都有角色
> 每个角色能做的事儿是不同的,
> 用户可以做的操作称之为权限
> 给用户分配角色

1. 点按钮->打开对话框
2. 显示当前用户的信息(用户名+角色，如果没有角色，显示请选择)
3. 点击确定->修改用户角色

#### 09-项目-用户管理-用户列表-分配角色-显示对话框

> 点击操作中的 check 按钮->打开对话框

1. 注册事件

```html
<el-button
    @click="showDiaSetRole()"
    size="mini"
    plain
    type="success"
    icon="el-icon-check"
    circle
  ></el-button>
```

2. 找含有下拉框的对话框，复制结构，
   1. 修改数据，修改控制表单显示的属性dialogFormVisibleRole，并在data中提供数据
   2. 表单中要用到的数据是用户名和角色，data中提供的数据中有用户名，所以可以用之前的formdata
   3. label-width是宽度，两个表单都设置了label-width，之前写的表单是在父级元素上统一设置的，可以像之前那样设置，`label-position="left" label-width="80px"`
   4. 我们需要的不是输入框，而是普通的文本展示，所以可以改成span，或者直接写插值表达式` {{formdata.username}}`
   5. 下拉框绑定的数据，是需要发请求，遍历的，v-model绑定的数据，在data中提供`selectVal: 1`
   6. 方法提供显示对话框的方法

```html
    <!-- 对话框---分配角色 -->
    <el-dialog
      title="分配角色"
      label-position="left"
      label-width="80px"
      :visible.sync="dialogFormVisibleRole"
    >
      <el-form :model="formdata">
        <el-form-item label="用户名">{{formdata.username}}</el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectVal" placeholder="请选择角色名">
            <el-option label="请选择" value="shanghai"></el-option>
            <!-- 第一个是写死的 请选择 -->
            <!-- 第二类数据是将来获取角色名称数据 用v-for遍历-->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleRole = false">确 定</el-button>
      </div>
    </el-dialog>
```



```js
// 分配角色--打开对话框
showDiaSetRole() {
  // 显示用户名
  this.formdata.username = user.username;
  this.dialogFormVisibleRole = true;
},
```



#### 10-项目-用户管理-用户列表-分配角色-显示对话框-下拉框

> 1. 默认显示请选中->当 v-model 的数据值 selectVal 和 option 的请选择的 value 值相等, 此时显示请选择
> 2. 当选择某个 option 时,v-model 的数据的值等于选中的 label 的 value 值

```html
<el-form-item label="角色">
          <!-- 
            下拉框的特性
            v-model 绑定表单元素
            1. type="text"  一般的input
            2. 其他表单 textarea select+option
            下拉框的特点：
            1. 默认显示请选择->当v-model的数据selectVal与option中 的value值，相等
            2. 当选择某个option时，v-model数据的值等于选中的label的value的值
          -->
          {{selectVal}}
          <el-select v-model="selectVal" placeholder="请选择角色名">
            <el-option label="请选择" :value="1"></el-option>
            <!-- 第一类是写死的 请选择 -->
            <!-- 第二类数据是将来获取角色名称数据 用v-for遍历-->
            <el-option v-for="(item,i) in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
```

```js
// 分配角色--打开对话框
    async showDiaSetRole(user) {
      // 显示用户名
      this.formdata.username = user.username;
      this.dialogFormVisibleRole = true;
      // 获取角色名称
      const res = await this.$http.get(`roles`);
      console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      // 拿到数组，在data中声明roles，用v-for遍历
      this.roles = data;
    },
```



#### 11-项目-用户管理-用户列表-分配角色-显示当前用户角色

> 角色 id [30,31,34,39,40]
> 每个用户都有角色 v-model="searchVal"，显示请选择就让外部的v-model和option中的value的值一样，显示当前角色就是把v-model的值改成和value的值一样

```js
// 5个角色都有自己的value
// value就是角色id
// [30,31,34,39,40]
// 给下拉框v-model绑定的数据值selectVal赋值
// this.selectVal=当前用户的角色id，看返回的user中是否有角色id
// 打印user ，发现没有
// 查看文档 根据 ID 查询用户信息，可以看到有角色id
const res2 = await this.$http.get(`users/${user.id}`);
console.log(res2); //返回的数据中有角色id ->rid
// 给下拉框v-model绑定的数据值selectVal赋值
this.selectVal = res2.data.data.rid;
```

当用户没有角色时，显示的是-1，这个-1不是我们当初绑定的数据1，而是后台返回的数据，所以我们把selectVal的初始值改成-1，`:value="-1"`，让它显示请选择，然后禁用请选择`disabled`

#### 12-项目-用户管理-用户列表-分配角色-修改用户角色

> 点击确定->发送请求

```js
// 分配角色--发送请求，分配用户角色
    async setRole() {
      // :id是用户id，data中没有数据，也不能传递参数，在对话框里面，没有template，不能传实参，可以在data中提供一个id
      // currUserId -> -1
      // 显示对话框的时候，有用户，可以在 showDiaSetRole()方法中给currUserId赋值 ->  this.currUserId = user.id;
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.selectVal
      });
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // 关闭对话框
        this.dialogFormVisibleRole=false;
        this.getTableData()
      }
    },
```

#### 13-项目-用户管理-用户列表-合并分支-推送

```shell
// 在分支上
git status
// 切到主分支
git checkout master
// 在主分支
git status
git merge dev-users
git push

```

#### 14-项目-权限管理-新建分支-功能演示

1. 新建分支git checkout -b dev-rights

   > 功能拆分
   >
   > 1. 权限列表
   > 2. 角色列表
   >    面包屑+表格(展开+check 按钮)

#### 15-项目-权限管理-权限列表-新建组件-路由配置

> 新建rights.vue 组件，在router->index.js中导入和配置路由，在home.vue中配置路由

`index.js`

```js
import Rights from '@/components/rights.vue'
children: [{
      name: 'users',
      path: '/users',
      component: Users
    },{
      name: 'rights',
      path: '/rights',
      component: Rights
    }]
```

`home.vue`

```vue
<el-menu-item index="rights">
  <i class="el-icon-menu"></i>权限列表
</el-menu-item>
```



#### 16-项目-权限管理-权限列表-自定义面包屑组件

1. 外层写一个卡片容器`<el-card class="box"></el-card>` 设置高度`height:100%`
2. 复制user.vue中的面包屑
3. 在编码过程中发现了大量的重复代码，要进行封装，封装的产物是组件，新建一个组件cusBread.vue

```vue
<template>
  <!-- 在编码过程中发现了大量的重复代码，要进行封装，封装的产物是组件，新建一个组件 -->
  <!-- 面包屑组件 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!-- 变化的量属于数据，用插值表达式渲染，数据在data中声明 -->
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  //   data() {
  //     return {
  //       // 这样写的话，数据就写死了，我们希望给它传值，使用props
  //       level1: "权限管理",
  //       level2: "权限列表"
  //     };
  //   },
  // data中的数据特点：1. 响应式 2. 值只能来源于本身
  // 我们要的值不是来源于自己
  // 1. 如果数据的声明来源于外部，此时数据的声明不能写在data中，
  // 2. 应该把数据声明写在选项props中
  // 3. props的值可以是字符串数组
  // 4. props中的数据level1和level2的用法和data中的数据用法一样，可以使用插值渲染
  // 5. props中的数据是数据的声明
  // 6. props中的数据将来就是组件的属性,也就是自定义标签的属性
  // 7. props中的数据将来使用组件时，通过属性进行赋值<abc level1="权限管理"></abc>
  // 组件的名字应该由组件自己提供，而不是由使用者提供
  name: "CusBread",
  props: ["level1", "level2"]
};
</script>

<style>
</style>

```

4. 在main.js导入组件，因为其他组件都要用，在入口文件中导入

```js
// 组件->两类+三步，定义一个全局组件
// 全局自定义面包屑组件
// 参数1：组件名称
// 参数2：组件选项所在对象(因为导出的是组件选项所在对象，所以导入的也是组件选项所在对象，可以直接写CurBread)
// Vue.component('CusBread',CurBread)
// 导出的也是对象，name通过点的方式获得
Vue.component(CusBread.name,CusBread)
```

5. 在rights.vue中使用组件

```html
<cus-bread level1="权限管理" level2="权限列表"></cus-bread>
```

6. 修改user.vue中的面包屑

```html
<cus-bread level1="用户管理" level2="用户列表"></cus-bread>
```

> props 传值

1. 声明 props:[数据 a]

2. 赋值 使用组件时 <abc a="值">

3. 使用 {{a}}

   > 重复代码->封装组件

#### 17-项目-权限管理-权限列表-获取权限列表数据

> url 中 type=list
> 在当前组件中,没有设置头部,所以此时无法获取数据

```js
// 获取首屏数据在created中写
  created() {
    this.getTableData();
  },
  methods: {
    // 获取权限列表数据
    async getTableData() {
      const res = await this.$http.get(`rights/list`);
      console.log(res);
    }
  }
```

根据接口文档，type的值是list或tree，返回的数据的结构不同，我们需要的是list

打印的结果是  ：请求能发送，没有拿到数据，无效的token，这个请求是非登录请求，（我们的请求除了登录请求，其他请求都需要授权）需要授权，授权就需要在头部设置token（因为换组件了，需要重新设置token，之前的users.vue组件只设置了一次头部，因为要想显示其他功能，列表要先拿到，然后再点按钮发请求，来到用户列表组件，先执行钩子函数created，created方法中调用了getTableData()，这个方法中设置了头部，之后所有的请求就都有头部）

```js
 data() {
    return {
      list: []
    };
  },
  // 获取首屏数据在created中写
  created() {
    this.getTableData();
  },
  methods: {
    // 获取权限列表数据
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(`rights/list`);
      console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // 拿到数据，把数据给表格就能赋值了，在data中提供一个接收者list
        this.list = data;
      }
    }
  }
```

#### 18-项目-权限管理-权限列表-axios-封装插件

1. 把头部设置封装起来，头部大部分需要设置，所以应该在main.js中写设置头部的代码

2. main.js 有 5 行代码是 axios 的，设置头部代码两行+main.js中(导入axios+设置基准地址+在Vue原型上挂载axios)

3. 把 5 行代码提取为 js 模块，新建http.js

   ```js
   // 插件要封装的代码
   // import axios from 'axios'
   // axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
   // Vue.prototype.$http = axios
   // const AUTH_TOKEN = localStorage.getItem("token");
   // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
   
   ```

4. 把 axios 变成了 Vue 插件，给原型上添加成员，看看vue中有没有关于如何写插件的内容，vue官网搜索插件->开发插件，看文档

```js
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
```

5. 在 main.js 中导入插件并且使用

```js
import HttpServer from './http.js'
Vue.use(HttpServer)
```

刷新权限列表，有数据，证明封装没有问题

6. 删除users.vue中的设置的头部代码

> 任何请求头部和 baseUrl 不需要写

#### 19-项目-权限管理-权限列表-axios-拦截器统一设置请求头

常见的拦截

// fetch.js 拦截
// axios.js 拦截
// jq \$.ajax 拦截

发请求，不是所有的请求都需要设置请求token，

> axios 请求拦截器

1. 所有请求发起之前,都会自动先进入拦截器
2. 在拦截器筛选请求 config.url=?
3. config.headers[]=token

```js
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

    console.log(config);
    // url是请求的全路径，因为设置了baseUrl，所以在代码中写url时，会自动取出后面的相对路径
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem("token");
      // 用axios设置头部
      // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // config中有headers，设置头部
      config.headers.common["Authorization"] = AUTH_TOKEN;
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  Vue.prototype.$http = axios
}
```

> 结果: 之后再也不用写请求头了





### day10-项目-重点

#### 00 修改用户列表-编辑-发送请求bug

现象：当点击编辑按钮时，修改了数据，点击取消，数据展示修改后的数据，是假改，刷新网页之后，还是修改前的数据

```js
// 编辑--显示对话框
    async showDiaEditUser(user) {
      // 获取当前用户的数据
      // this.formdata = user;
      // 上行代码，两个指针指向了同一个内存空间，当操作formdata的数据时，user的数据也会改变
      // 可以这样写，下面这种写法不是指向同一个内存空间，而是给formdata加一个属性
      // this.formdata.username = user.username;
      // this.formdata.email = user.email;
      // this.formdata.mobile = user.mobile;
      // 或者
      // 该请求是传一个用户id，返回用户信息
      const res = await this.$http.get(`users/${user.id}`);
      console.log(res);
      // 返回的结果中有我们需要的用户信息（邮箱、电话、用户名）
      // 上面的赋值是用的已经存在的用户数据，下面的赋值和当前用户无关，是请求的数据
      this.formdata = res.data.data;

      this.dialogFormVisibleEdit = true;
    },
```



#### 01-项目-权限管理-权限列表-表格展示

> 把 users.vue 的 el-table->修改
> el-table-column 属性 type="index" 序号从 1 自增

1. 赋值users.vue中的el-table，表格绑定的数据:data已经在data中声明了list
2. 调整表格宽度width（行内式）
3. 第一列要的不是id，不需要返回的数据，删掉prop="id"，表格中单元格的内容，找element文档表格中列的属性Table-column Attributes，->设置`type`属性为`index`即可显示从 1 开始的索引号。设置第一列 type="index"，手动刷新网页
4. 权限名称、路径、层级都来源于数组list，用prop绑定`prop="authName"`、`prop="path"` ，层级是0、1、2，这不是我们要的数据。参考下一步。

```html
<!-- 表格 -->
<el-table height="350px" :data="list" style="width: 100%">
  <el-table-column type="index" label="#" width="160"></el-table-column>
  <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
  <el-table-column prop="path" label="路径" width="200"></el-table-column>
  <el-table-column prop="level" label="层级" width="200">
  </el-table-column>
</el-table>
```

#### 02-项目-权限管理-权限列表-表格展示-层级显示

层级要的是汉字，返回的结果是0、1、2，

1. 层级要的不是直接level值，单元格的内容不是prop值控制的，删掉prop，就要给内容加一个容器template，绑定属性slot-scope="scope"，`<template slot-scope="scope"></template>`
2. 里面的内容是一级、二级、三级，某些条件渲染，v-if

> res 的数据中 level 是字符串'0'

```html
<!-- 表格 -->
<el-table height="350px" :data="list" style="width: 100%">
  <el-table-column type="index" label="#" width="160"></el-table-column>
  <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
  <el-table-column prop="path" label="路径" width="200"></el-table-column>
  <el-table-column label="层级" width="200">
    <template slot-scope="scope">
      <span v-if="scope.row.level==='0'">一级</span>
      <span v-if="scope.row.level==='1'">二级</span>
      <span v-if="scope.row.level==='2'">三级</span>
    </template>
  </el-table-column>
</el-table>
```

手动刷新

#### 03-项目-权限管理-角色列表-新建组件-配置路由

> 新建 roles.vue 组件+配置路由+home.vue 改标识

`roles.vue`

```html
<template>
    <div>------</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

`index.js`

```js
import Roles from '@/components/roles.vue'
{
  name: 'roles',
  path: '/roles',
  component: Roles
}
```

`home.vue`

```html
<el-menu-item index="roles">
  <i class="el-icon-menu"></i>角色列表
</el-menu-item>
```

#### 04-项目-权限管理-角色列表-面包屑和添加按钮

> 自定义面包屑+el-button

el-button的type控制按钮的颜色

```html
<el-card class="box">
	<cus-bread level1="权限管理" level2="角色列表"></cus-bread>
	<el-button class="btn" type="primary">添加角色</el-button>
</el-card>
```

```css
.box {
  height: 100%;
}
.btn {
  margin-top: 20px;
}
```



#### 05-项目-权限管理-角色列表-获取角色列表数据（先处理数据）

接口是角色管理---角色列表

> data中提供数据roles:[]
>
> created中调用方法（首屏加载数据）
>
> methods 中增加方法 getRoles()

```js
export default {
  data() {
    return {
      roles: []
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    async getRoles() {
      const res = await this.$http.get(`roles`);
      console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.roles = data;
      }
    }
  }
};
```

 

#### 06-项目-权限管理-角色列表-表格展示

> 把 user.vue 复制->修改

```html
<!-- 表格 -->
<el-table height="350px" :data="roles" style="width: 100%">
  <el-table-column type="index" label="#" width="180"></el-table-column>
  <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
  <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>

  <el-table-column label="操作" width="200">
    <template slot-scope="scope">
      <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
      <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
      <el-button
        @click="showDiaSetRights(scope.row)"
        size="mini"
        plain
        type="success"
        icon="el-icon-check"
        circle
      ></el-button>
    </template>
  </el-table-column>
</el-table>
```

```js
// 角色列表--设置角色
showDiaSetRights() {},
```

#### 07-项目-权限管理-角色列表-表格展示-展开行功能分析

文档el-table，找可以展开的表格

通过设置 type="expand" 和 `Scoped slot` 可以开启展开行功能，`el-table-column` 的模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 `Scoped slot` 相同。

1. 这一列中要展开的内容显示什么数据，要加一个<template slot-scope="props"></template>

2. 展开在序号前面写，增加一列

   ```html
   <el-table-column  type="expand"   width="80">
       <template slot-scope="scope">    
           我是展开后的内容
       </template>
   </el-table-column>
   ```

3. 展开的内容是行列布局，行列布局一共是24份

> 1. 所有行列布局->for 嵌套->v-for
> 2. el-row>(el-col>el-tag+el-col>(el-row>(el-col>el-tag+el-col>el-tag)))
> 3. 有颜色的标签el-tag（标记，文档中查）
> 4. 这里按照4:20划分份数  :span="4"

#### 08-项目-权限管理-角色列表-表格展示-展开行-一级权限

> 最外层 v-for 的位置是最外层 el-row

1. 一级权限的位置用v-for遍历，一级权限遍历得到的是5行，所以写在el-row位置

   ```html
   <template slot-scope="scope">
       <!-- 行列布局 -->
       <!-- 一级权限的位置用v-for遍历，一级权限遍历得到的是5行，所以写在el-row位置 
       scope.row取出的是数组里的对象
       -->
       <el-row class="level1" v-for="(item1,i) in scope.row.children" :key="item1.id">
           <el-col :span="4">
              <el-tag>{{item1.authName}}</el-tag>
           </el-col>
           <el-col :span="20">
               <el-row>
                   <el-col :span="4">
                       <el-tag></el-tag>
                   </el-col>
                   <el-col :span="20">
                       <el-tag></el-tag>
                   </el-col>
               </el-row>
           </el-col>
       </el-row>
   </template>
   ```

2. 调整样式

   ```css
   .level1{
       margin-bottom: 10px;
   }
   ```

#### 09-项目-权限管理-角色列表-表格展示-展开行-二级三级权限

1. 遍历
2. 修改el-tag的颜色，通过type属性控制

```html
<template slot-scope="scope">
  <!-- 行列布局 -->
  <!-- 一级权限的位置用v-for遍历，一级权限遍历得到的是5行，所以写在el-row位置 
    scope.row取出的是数组里的对象
  -->
  <el-row class="level1" v-for="(item1,i) in scope.row.children" :key="item1.id">
    <el-col :span="4">
      <el-tag>{{item1.authName}}</el-tag>
    </el-col>
    <el-col :span="20">
      <el-row class="level2" v-for="(item2) in item1.children" :key="item2.id">
        <el-col :span="4">
          <el-tag type="success">{{item2.authName}}</el-tag>
        </el-col>
        <!-- 三级整体是一列，所以v-for不能写在el-col，而是写在el-tag -->
        <el-col :span="20">
          <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
```

> 最里层的 v-for 写在 el-tag 位置

#### 10-项目-权限管理-角色列表-展开行-样式调整-处理无权限

1. 属性closeable控制 el-tag的 X `<el-tag closable>标签一</el-tag>`
2. 大于号，通过图标 i 标签的 class=""控制，位置在一级权限的后面
3. 处理无权限

```html
<!-- 如果数组长度为0，显示未分配权限 -->
<el-row v-if="scope.row.children.length===0">
  <el-col>
      <span>未分配权限</span>
  </el-col>
</el-row>

```

#### 11-项目-权限管理-角色列表-展开行-取消权限

> 删除角色指定权限

> 点击 el-tag 的 X->取消权限 通过文档查询得到事件名close
> @close="deleRights(scope.row,itemX)"

```js
//  角色列表--删除权限
async deleteRights(role, rights) {
  // 发送请求
  // roleId ->角色id
  // rightId ->权限id
  //   console.log(role);
  //   console.log(rights);

  const res = await this.$http.delete(
    `roles/${role.id}/rights/${rights.id}`
  );
  console.log(res);
  const {
    data,
    meta: { msg, status }
  } = res.data;
  if (status === 200) {
    // 提示成功
    this.$message.success(msg);
    // 更新表格
    // 会返回当前角色的剩余权限
    this.getRoles()
  }
},
```



#### 12-项目-权限管理-角色列表-展开行-取消权限-优化

取消权限应该局部更新，而不是整个表格都刷新

```js
// 取消权限
async deleRights(role, rights) {
  // console.log(role, rights);

  // roleId->角色id
  // rightId->权限id
  const res = await this.$http.delete(
    `roles/${role.id}/rights/${rights.id}`
  );
  console.log(res);
  const {
    meta: { msg, status },
    data
  } = res.data;
  if (status === 200) {
    // 提示
    this.$message.success(msg);
    // 更新
    // this.getRoles();
    // 会返回当前角色的剩余权限
    // 只更新当前的角色权限
    role.children = data;
  }
},
```

> 取消成功后,res 返回的是当前角色的剩余 权限

#### 13-项目-权限管理-角色列表-修改权限-显示对话框

> 点击操作中 check 按钮->打开对话框

1. 注册事件

   ```html
   <el-button
       @click="showDiaSetRights(scope.row)"
       size="mini"
       plain
       type="success"
       icon="el-icon-check"
       circle
     ></el-button>
   ```

2. 复制对话框结构，我们不需要表单，可以把内部的el-form删除

   ```html
   <!-- 对话框 分配角色-->
   <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
     <span>我是对话框内容</span>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">取 消</el-button>
       <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
     </div>
   </el-dialog>
   ```

3. 在data中提供数据，对话框的布尔值

   ```js
   dialogFormVisible: false
   ```

4. methods中更改data的数据，变成true

   ```js
   // 分配权限---打开对话框
   showDiaSetRights() {
     this.dialogFormVisible = true;
   },
   ```

   下一步就是把文本换成树形结构

#### 14-项目-权限管理-角色列表-修改权限-树形结构-文档分析

element文档 Tree树形控件，基础用法

```html
1. 文档---基本用法
<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
1. el-tree的数据用data声明
2. :props，冒号绑定的数据在data中声明，由文档可知:props属性的值是一个对象，这两个key是固定写法，
	label控制的是树形结构中每个节点的文本内容，该值是一个字符串，字符串来自树形结构中绑定的数据data的key名，
	children是该label对应的子节点的key名，来自树形结构绑定的数据中的key（data数据中的children）
2. 文档---可选择
树形结构的特点：内层被选中，外层会出现选中或半选状态（如果内层都被选中，则外层是选中状态，否则外层是半选状态）
3. 文档---默认展开和默认选中
	node-key="id"   每个节点要提供一个唯一标识，字符串id来自data中绑定数据中的key名
	:default-expanded-keys="[2, 3]" 默认展开，数组中是默认展开的id
    :default-checked-keys="[5]" 默认选中  数组中是默认选中的id
4  props 配置选项
5. show-checkbox	节点是否可被选择

```

我们要的是默认展开，默认选中的树形结构

```html
<el-tree
    :data="data2"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="[5]"
    :props="defaultProps"
    ></el-tree>
```

> 1. data  数据来源
> 2. show-checkbox  节点是否可被选择
> 3. node-key 每个节点唯一标识，通常是data数据中的id名
> 4. default-expanded-keys 默认展开，数组类型，数组中是id
> 5. default-checked-keys 默认选中 数组类型，数组中是id
> 6. props 配置选项{label、children} 来源于data绑定的数据源​        

> 实现树形结构前提:res 返回的数据格式是树形结构

#### 15-项目-权限管理-角色列表-修改权限-树形结构-配置数据

> 1. treelist 每个权限的唯一标识 id->node-key="id"
> 2. :default-expanded-keys="[2, 3]"  数组不能写死，定义一个arrExpand在data中声明，default-checked-keys同理
> 3. 配置props 配置选项{label：'',children:''}，数据来源于treelist中的数据
> 4. 接口---所有权限列表，请求在点击对勾方法中发请求
> 5. 返回的结果res.data.data赋值给treelist，data中的defaultProps的children要的是treelist中的children，label是treelist中的authName
> 6. label="authName"
> 7. pid->上一/二级节点 id

```js
  data() {
    return {
      roles: [],
      dialogFormVisible: false,
      // 树形结构相关数据
      treelist: [],
      arrCheck: [],
      arrExpand: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
```

```js
// 分配权限---打开对话框
    async showDiaSetRights() {
      this.dialogFormVisible = true;
      // 发送请求，获取树形结构的数据
      const res = await this.$http.get(`rights/tree`);
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.treelist = data;
        console.log(data);
      }
    },
```



#### 16-项目-权限管理-角色列表-修改权限-树形结构-显示已有权限

1. 默认展开 default-expand-all

   把所有节点的id，放到默认展开的数组中，treelist中有所有节点的id，for嵌套遍历，取出每一级的id

   ```js
   if (status === 200) {
           this.treelist = data;
           // console.log(data);
           console.log(this.treelist);
           // 声明临时数组，保存id
           const temp = [];
           // for嵌套遍历，取出每一级的id
           this.treelist.forEach(item1 => {
             temp.push(item1.id);
             item1.children.forEach(item2 => {
               temp.push(item2.id);
               item2.children.forEach(item3 => {
                 temp.push(item3.id);
               });
             });
           });
           // 得到所有的展开的数组id
           console.log(temp);
           this.arrExpand = temp;
         }
   ```

   组件效果，默认全展开，设置属性default-expand-all，可以不用写上层的遍历，删除属性:default-checked-keys="arrExpand"及data中的数据arrExpand: [],

2. 默认选中（放当前角色所拥有的权限的id）
   2.1 获取当前角色有的权限数据 role.children
   2.2 遍历 forEach
   2.3 arrCheck=temp2

3. 如果外层打钩，内层的权限都打钩，内层打钩时，外层自动打钩，所以只需要内层的id就可以，应该把内层的id放在数组中

   ```js
   // 获取当前角色所拥有的权限id <- 拿到当前角色
   // console.log(role);
   const temp2 = [];
   role.children.forEach(item1 => {
     // temp2.push(item1.id);
     item1.children.forEach(item2 => {
       // temp2.push(item2.id);
       item2.children.forEach(item3 => {
         temp2.push(item3.id);
       });
     });
   });
   console.log(temp2);
   this.arrCheck = temp2;
   
   ```

   > 注意:只加最里层的 id

#### 17-项目-权限管理-角色列表-修改权限-树形结构-分配权限-分析

> 1. 获取全选 id 数组
>
> 2. 获取半选 id 数组
>
> 3. 看el-tree组件中是否提供属性或方法来获取两类节点，看文档
>
>    1. getCheckedKeys  ：若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点的 key 所组成的数组
>    2. getHalfCheckedKeys ：若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点的 key 所组成的数组
>
>    这里节点的key就是id

```js
// 分配权限-发送请求
async setRights() {
  // 看el-tree组件中是否提供属性或方法来获取两类节点
  // 获取全选节点的id->getCheckedKeys->方法作用/方法形参/方法返回值(返回一个数组)->调用者->el-tree调用方法
  // 把el标签变成DOM元素->DOM元素.js方法->在js中操作DOM元素->ref操作DOM
  // 1. 给要操作的标签设置一个ref值
  // 2. 在js中通过this.$refs.ref值.js方法
  // console.log(this.$refs);//DOM元素

  const arr1 = this.$refs.treeDom.getCheckedKeys();
  console.log(arr1);
  // 获取半选节点的id
   const arr2 = this.$refs.treeDom.getHalfCheckedKeys();
  console.log(arr2);

},
```

> ref 操作 dom
>
> 1. 给要操作的标签设置 ref 值
> 2. 在 js 中 this.\$refs.ref 值.js 方法()

#### 18-项目-权限管理-角色列表-修改权限-树形结构-分配权限-实现

接口---角色授权

```js
// 分配权限-发送请求
    async setRights() {
      // 看el-tree组件中是否提供属性或方法来获取两类节点
      // 获取全选节点的id->getCheckedKeys->方法作用/方法形参/方法返回值(返回一个数组)->调用者->el-tree调用方法
      // 把el标签变成DOM元素->DOM元素.js方法->在js中操作DOM元素->ref操作DOM
      // 1. 给要操作的标签设置一个ref值
      // 2. 在js中通过this.$refs.ref值.js方法
      // console.log(this.$refs);//DOM元素

      const arr1 = this.$refs.treeDom.getCheckedKeys();
      // console.log(arr1);
      // 获取半选节点的id
      const arr2 = this.$refs.treeDom.getHalfCheckedKeys();
      // console.log(arr2);
      // :roleId是 角色id
      // 在data中声明一个当前角色id :currRoleId，在打开对话框的时候，已经获取了当前的角色，可以给currRoleId赋值this.currRoleId = role.id;
      // rids 权限id列表（全选的和半选的）
      // 把两个数组变成一个数组
      // const arr = concat(arr1, arr2);
      // 或者 ES6 展开操作运算符 ...是固定写法，后面是容器的名字。容器可以是数组或对象，所用：会把后面的数组中的元素一个一个展开，放在定义的arr中
      const arr = [...arr1, ...arr2];
      // console.log(arr);
      // 根据接口文档，需要的是数组以逗号分隔

      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(",")
      });
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // 关闭对话框
        this.dialogFormVisible = false;
        // 提示
        this.$message.success(msg);
        // 刷新列表
        this.getRoles();
      }
    },
```

> 1. ...arr或者 obj     (ES6展开操作符)    
> 2. rids:以,分割的 id 列表 arr arr.join(",")
>    并不是所有数据都是提供好的

#### 19-项目-首页-侧边栏-动态导航

> ESLint关闭->build/webpack.base.conf.js->42行->注释
> 效果: 每个不同角色的用户->登录之后->应该显示拥有权限的对应导航，home组件导航部分不应该写死（不应该显示所有的权限）
> 看接口文档---左侧菜单权限

1. 删掉home.vue组件导航，保留一个用来遍历
2. 在methods中提供getMenus()方法，created中调用该方法
3. 在data中声明数据menus，接收值

```js
// 动态导航
async getMenus() {
  const res = await this.$http.get(`menus`);
  console.log(res);
  const {
    data,
    meta: { msg, status }
  } = res.data;
  if (status === 200) {
    this.menus = data;
  }
},
```

4. v-for遍历，之前的index是控制导航有几个的，这里使用item1.order，因为是变化的，要加冒号
5. 二级导航遍历的时候，index是标识，这里是path
6. 报错，期待是一个字符串，我们给了一个数字，数字转字符串-> 可以用字符串拼接+''

```html
<!-- 1   
	报错，期待是一个字符串，我们给了一个数字，数字转字符串-> 可以用字符串拼接+''
-->
<el-submenu :index="item1.order+''" v-for="(item1,i) in menus" :key="item1.id">
<template slot="title">
  <i class="el-icon-location"></i>
  <span>{{item1.authName}}</span>
</template>
<el-menu-item :index="item2.path" v-for="(item2,i) in item1.children" :key="item2.id">
  <i class="el-icon-menu"></i>{{item2.authName}}
</el-menu-item>
</el-submenu>
```

> 结果: 在实现之后的功能时,路由配置的path不能随便写了!因为是后台返回的path

#### 20-项目-效果演示-不同角色用户登录-显示对应权限

没写代码，演示完成的效果

测试左侧导航显示对应权限

> 1. 不同用户登录后,权限不一样
> 2. 超管登录只能显示用户管理和数据统计

#### 21-项目-不同角色用户登录-显示对应权限-导航守卫

判断token有没有这件事不想放在home主页中，

// 判断token有没有这件事不想放在home主页中，想放在另外的位置，当标识发生变化时，代码的位置不是先来到组件，代码是先来到路由的位置index.js，看路由中有没有/，如果有/，才去执行home.vue（如果 路由匹配成功，才去渲染组件）所以在路由位置加一个筛选

// 之前效果效果：当标识变化时，->如原来的Login变成了/->代码先来到router里的index.js，如果匹配成功->来到home.vue->beforeMount()

// 现在是把beforeMount()方法放在路由中

// 在某个路由配置生效前，判断token，看看router插件中，有没有API让你去做这件事，vue官网--生态系统-router--进阶--导航守卫

```js
// const router = new VueRouter({
//   // 这个代码是创建new router，前面导出的代码是实例化router并导出
// export default new Router({})
// 可以写成
//   // const router = new Router(){}
//   // export default router
// 下面就可以直接使用router了
// })
router.beforeEach((to, from, next) => {
  // ...
})
export default router
```



> 标识改变->路由配置->配置生效前->守卫->next()->配置生效
>
> 1. to->要去的
> 2. from->当前
> 3. next next()->继续执行之前的配置

```js
// 路由导航守卫
// 任何路由标识变化->来到路由配置->配置生效前->路由守卫->配置生效
// 对象 to 要去的路由配置对象(name)
// 对象 from 当前的路由配置对象(name)
// next() 让路由配置继续生效
router.beforeEach((to, from, next) => {
  console.log('路由守卫执行-----')
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
```

> 注意: router/index.js中this不是Vue实例
>
> 1. this.$router->rotuer
> 2. 提示框->单独导入Message
> 3. 之前的home.vue的beforeMount不用写了

#### 22-项目-权限管理-合并分支-推送-新建分支

```bash
git add .
git commit -m "导航守卫"
git checkout master
git merge dev-rights
```



商品管理--git checkout -b dev-goods

1. 新建路由goodslist.vue
2. 设置路由 index.js
3. 测试路由
4. 面包屑导航
5. 搜索和添加商品按钮
6. 表格
7. 分页
8. 4、5、6、7可以复制users.vue中的结构

商品列表页面提前准备好







### day11-项目-重点

#### 01-项目-商品管理-功能演示-新建分支

功能：

1. 列表->添加商品
2. 分类参数->动态+静态参数编辑（动态：属性名的值可以有多个，静态：属性名的值只有一个）
3. 商品分类->表格展开后的树形结构

#### 02-项目-商品管理-商品列表-显示(提前准备)

> 02-其他资源/goodslist.vue

1. 面包屑 名称cus-bread
2. fmtdate
3. loading删掉
4. 配置路由时(path不能随便写了)

#### 03-项目-商品管理-添加商品-新建组件-配置路由-布局

点击添加商品，要显示新的组件，新建组件

1. 新建组件goodsadd.vue
2. 配置路由

> path可以随便写，因为不是后台返回的path

3. 面包屑

4. 灰色的提示框 ----Alert 警告

   ```html
   <el-alert class="alert" title="添加商品信息" type="info" center show-icon></el-alert>
   ```

5. 调整样式

   ```css
   .alert{
       margin-top: 20px;
       margin-bottom: 20px;
   }
   ```

#### 04-项目-商品管理-添加商品-步骤条

element文档--Steps 步骤条--居中的步骤条

1. 复制代码
2. 改数据
   1. active不能是写死的，得是一个变量，在data中提供，报错提示是需要一个数字类型，->active*1或者data中声明数据的时候写数字
   2. title的数据和左侧的数据一样

```html
<!-- el-steps步骤条 --> 
<el-steps :active="active*1" align-center>
  <el-step title="基本信息"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="商品属性"></el-step>
  <el-step title="商品图片"></el-step>
  <el-step title="商品内容"></el-step>
</el-steps>
```

> active控制的是当前完成了第几步

#### 05-项目-商品管理-添加商品-Tabs 标签页（tab切换）

> 标签页:表单元素  v-model绑定，v-model绑定的数据是双向绑定，操作视图时，视图变化，数据变化
> v-model 绑定的数据一定是表单元素，我们要的是element文档--Tabs标签页--位置---左侧结构

1. 复制标签页结构，位置改成左侧left，去掉冒号，类样式不需要，删除

```html
<!-- 标签页 
    我们希望它能变，点的时候有反应，
    1. 用v-model绑定数据，双向数据绑定，v-model需要一个data数据
    2. 根据标签页el-tag：v-model绑定数据，需要设置name属性，如果active的值和el-tab的name值一样，就默认显示那个
    1. 默认active的初始值和name属性一样时，默认显示
    2. 点击某个tab时，被选中的tab的name值会赋值给v-model的值。
-->
<el-tabs
v-model="active"
 tab-position="left">
  <el-tab-pane name="1" label="商品参数">商品参数-----</el-tab-pane>
  <el-tab-pane name="2" label="商品属性">商品属性-----</el-tab-pane>
  <el-tab-pane name="3" label="基本信息">基本信息-----</el-tab-pane>
  <el-tab-pane name="4" label="商品图片">商品图片-----</el-tab-pane>
  <el-tab-pane name="5" label="商品内容">商品内容-----</el-tab-pane>
</el-tabs>
```

#### 06-项目-商品管理-添加商品-基本信息-绑定表单数据

添加商品，post请求，需要请求体，请求体中需要 表单数据，请求体的数据在接口文档--商品管理--添加商品

把每个元素的值都变成表单数据，点击添加商品按钮时，发送表单数据，把每个表单元素都放到对应的el-tab里面

1. 整个el-tabs的所有内容，外层包裹一个表单元素el-form，因为要发送表单提交

   - 修改el-form绑定的数据：对齐方式top，:model绑定的数据在data中提供（请求体）

   表单元素特点：分析文档--对齐方式--顶部对齐的代码

2. el-form内部的input表单的外层包裹了一个有label的el-form-item

   - 基本信息中，是label和input
   - 根据请求体修改input绑定的数据

3. 修改样式

   ```css
   .form {
     height: 350px;
     overflow: auto;
   }
   ```

   

```html
<el-tab-pane name="1" label="基本信息">
  <el-form-item label="商品名称">
    <el-input v-model="form.goods_name"></el-input>
  </el-form-item>
  <el-form-item label="商品价格">
    <el-input v-model="form.goods_price"></el-input>
  </el-form-item>
  <el-form-item label="商品重量">
    <el-input v-model="form.goods_weight"></el-input>
  </el-form-item>
  <el-form-item label="商品数量">
    <el-input v-model="form.goods_number"></el-input>
  </el-form-item>
  <el-form-item label="商品分类">
    <!-- 表单元素 -->
  </el-form-item>
</el-tab-pane>

```

```json
form: {
    goods_name: "",
    goods_cat: "",
    goods_price: "",
    goods_number: "",
    goods_weight: "",
    goods_introduce: "",
    pics: "",
    attrs: ""
  }
```

4. 商品分类单独处理---见07

#### 07-项目-商品管理-添加商品-基本信息-级联选择器-文档-引入

Cascader 级联选择器的使用方法参照树形结构

1. 对数据有要求

2. 参数

   - options 是级联选择器的数据源，通过级联选择器中options进行数据绑定，类型是数组
     - label 是能看到的值
     - value 是要提交的值，看不到的
     - children是下一级数据结构
   - props配置选项
   - 事件change

   3. 级联选择器是表单元素，因为它用了v-model绑定数据，类型是数组，视图中选中选项之后，会把选中的三个label的value值放在数组中

> 级联选择器表单元素 v-model="数组"
>
> 1. [1,2,3]
> 2. 当选择某个label->[value值]

```html
  <el-form-item label="商品分类">
    <!-- 级联选择器 --表单元素 
    options 数据源
    selectedOptions2 []可以有初始值
    -->
    <el-cascader
      expand-trigger="hover"
      :options="options"
      v-model="selectedOptions2"
      @change="handleChange"
    ></el-cascader>
  </el-form-item>
```

#### 08-项目-商品管理-添加商品-基本信息-级联选择器-获取分类数据

数据是点击基本信息之后就准备好了，页面一进来就把数据准备好了，created中调用方法

接口--商品分类管理--商品数据列表

1. methods提供方法

```js
// 获取三级商品分类数据
async getGoodsCate() {
  // get请求传参数通过查询字符串?传递，type传3表示显示三级分类
  const res = await this.$http.get(`categories?type=3`);
  console.log(res);
  const {
    data,
    meta: { msg, status }
  } = res.data;
  this.options = data;
},
```

2. created中调用方法

3. data中提供数据

   ```js
   defaultPro: {
       // label是我们能看到的名字，也就是分类的文本
       // value是唯一标识
       label: "cat_name",
       value: "cat_id",
       children: "children"
     }
   ```

4. 默认选中selectedOptions: [1,3,6],可以为空，也可以设置

5. 设置表单样式是可清空的clearable  是否支持清空选项

> const res = await this.$http.get(`categories?type=3`);
> :props="{label/value/children}"

#### 09-项目-商品管理-添加商品-基本信息-级联选择器-配置数据

```html
 <el-cascader
      clearable
      expand-trigger="hover"
      :options="options"
      :props="defaultProp"
      v-model="selectedOptions"
      @change="handleChange"
    ></el-cascader>
```

```json
// label/value/children默认值是同名字符串，不写就是取默认值
defaultProp: {
    label: "cat_name",
    value: "cat_id"
  }
```

#### 10-项目-商品管理-添加商品-商品参数-获取动态参数数据

效果：当基本信息中选择了三级分类，点第二个tab时商品参数才显示信息

1. 文档---Tabs标签页----一点tab就会触发的事件：tab-click
2. 接口文档--分类参数管理--参数列表

> 选择第二个tab&&三级分类->发送请求(获取动态参数)
> 测试选择三级分类(打印res)和不选三级分类的效果(提示请选择)

```js
// 点任何tab都会触发该事件
async changeTab() {
  // 判断点的是不是第二个tab
  if (this.active === "2") {
    // 判断是否选了三级分类,如果不是三级分类
    if (this.selectedOptions.length !== 3) {
      // 提示
      this.$message.error("请先选择三级分类！");
      return;
    }
    // 获取动态参数数据
    // :id是分类id，这里是selectedOptions中的6
    const res = await this.$http.get(
      `categories/${this.selectedOptions[2]}/attributes?sel=many`
    );
    console.log(res);
    const {
      data,
      meta: { msg, status }
    } = res.data;
    if (status === 200) {
      // 此时data就是动态参数数据，在data中声明一个数组arrDy，接收
      this.arrDy = data;
    }
  }
},
```

#### 11-项目-商品管理-添加商品-商品参数-复选框组-文档-引入

Checkbox 多选框---多选框组，表单元素v-model绑定布尔值

> el-checkbox-group->v-model="[]" 表单元素

```html
<el-tab-pane name="2" label="商品参数">
  <!--复选框组
     v-model绑定了数据，说明是表单元素，表单元素外层包裹el-form-item 
     保留一个结构，用v-for遍历
  -->
  <el-form-item label="写死一个">
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</el-tab-pane>
```

#### 12-项目-商品管理-添加商品-商品参数-配置复选框

v-for要遍历的数据是动态参数数据arrDy

> 处理数据arrDy->item.attr_Vals""->[]

```html
<el-tab-pane name="2" label="商品参数">
  <!--复选框组
     v-model绑定了数据，说明是表单元素，表单元素外层包裹el-form-item 
     保留一个结构，用v-for遍历
  -->
  <el-form-item v-for="(item1) in arrDy" :key="item1.attr_id" :label="item1.attr_name">
    <el-checkbox-group v-model="item1.attr_vals">
      <!-- attr_vals:"aa,bb,cc,ee"是字符串，不是数组，所以遍历的第一个item2是a ,是items的每个字符
      item2中没有唯一标识id，:key就写i
	  border设置边框
      -->
      <el-checkbox border v-for="(item2,i) in item1.attr_vals" :key="i" :label="item2"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</el-tab-pane>
```

```js
if (status === 200) {
          // 此时data就是动态参数数据，在data中声明一个数组，接收
          this.arrDy = data;
          console.log(this.arrDy);
          // this.arrDy中的attr_vals是字符串，我们要的是数组
          // 可以遍历
          this.arrDy.forEach(item => {
            // item.attr_vals = item.attr_vals.split(",");
            // console.log(item.attr_vals);
            // 如果后台返回的数据中有空格，还要去掉空格
            // "  a,b,c,d  "
            // 如果后台返回的是空字符串""，空字符串中没有逗号，不能调用split方法，要判断一下
            // if (item.attr_vals.length === 0) {
            //   // 返回一个空数组，空数组是可以遍历的
            //   item.attr_vals = [];
            // } else {
            //   item.attr_vals = item.attr_vals.trim().split(",");
            // }
            // 三元表达式形式
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
             console.log(item.attr_vals);
          });
        }
```

> 1. border设置边框
> 2. v-model="item1.attr_val"

默认选中，看文档，v-model="checkList"，checkList是数组，数组中是默认选中的label值，所以v-model绑定的是有全部label的数组，即item1.attr_vals

#### 13-项目-商品管理-添加商品-商品属性-获取静态参数数据

商品属性显示的前提也是选中了三级分类

> 点击第三个tab && 分类数组长度===3->发送only请求

```js
if (this.active === "3") {
  const res = await this.$http.get(
    `categories/${this.selectedOptions[2]}/attributes?sel=only`
  );
  const {
    meta: { msg, status },
    data
  } = res.data;
  if (status === 200) {
    this.arrStatic = data;
    console.log(this.arrStatic);
  }
}
```

#### 14-项目-商品管理-添加商品-商品属性-布局

复制基本信息中的表单，设置数据

```html
<el-tab-pane name="3" label="商品属性">
  <el-form-item :label="item.attr_name" v-for="(item,i) in arrStatic" :key="item.attr_id">
    <el-input v-model="item.attr_vals"></el-input>
  </el-form-item>
</el-tab-pane>
```

#### 15-项目-商品管理-添加商品-图片上传-文档-引入

商品图片上传不用选三级分类

Upload上传

1. 参数：
   - action="https://jsonplaceholder.typicode.com/posts/"，最终上传的图片要放在的服务器的路径，必须是全路径
   - :on-success="handleSuccess"  图片预览时自动触发的函数
   - :on-remove="handleRemove"  图片移除时自动触发的函数

> 1. action全路径网址
> 2. headers请求头

#### 16-项目-商品管理-添加商品-图片上传-配置属性

> 1. action全路径网址
> 2. headers请求头
>    之前的只针对axios
> 3. 图片上传也是请求，找到接口文档--图片上传，请求路径拼上baseUrl就是全路径，之前配置的baseUrl是axios发送请求配置的

```js
// data
headers: {
    Authorization: localStorage.getItem("token")
  }

// methods
// 图片上传方法
    handleRemove(file, fileList) {
      // console.log("remove----");
      console.log(file);
      //  临时路径
      //  file.response.data.tmp_path;
    },
    handleSuccess(response, file, fileList) {
      // console.log("success----");
      console.log(response);
      // response.data.tmp_path -> 临时路径
    },
```

#### 17-项目-商品管理-添加商品-商品内容-富文本编辑器

1. 添加按钮注册事件

   ```html
   <el-form-item>
       <el-button @click="addGoods()">添加商品</el-button>
     </el-form-item>
   ```

2. element-UI库搜索没有富文本，vue官网--生态系统--vue资源--翻译成中文--富文本

   - vue-quill-editor - Vue2的Quill编辑器组件。
   - vue-quill-editor是包名，打开npm官网，搜索包名
   - 找for vue的，哪个都可以
   - 找安装方式中的npm： npm install vue-quill-editor --save（https://www.npmjs.com/package/vue-quill-editor）
   - 由介绍可知，可以全局挂载或局部挂载，这里使用局部挂载（项目只有这一个地方使用富文本编辑器）安装--导入--配置--使用
   - 富文本是一个表单元素，要用v-model绑定form.goods_introduce
   - 调整富文本编辑器的样式，起类名，发现不起作用，可能是类名的权重不高，被覆盖掉了，可以在页面上审查元素，看类名，改样式

```html
<el-tab-pane name="5" label="商品内容">
      <el-form-item>
        <el-button @click="addGoods()">添加商品</el-button>
        <!-- 富文本编辑器 -->
        <quill-editor
        class="quill"
        v-model="form.goods_introduce"
        ></quill-editor>
      </el-form-item>
    </el-tab-pane>
```

```js
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

  // 2. 注册局部组件
  components: {
    quillEditor
  },
```

```css
.ql-editor,.ql-blank{
  min-height: 200px;
}
```

> 1. quill-editor是表单元素 v-model
> 2. 富文本编辑器适用于两个方向：SPA和SSR
>    扩展: vue适合SPA->SPA缺点
>    1. 首屏加载慢 -> 写完项目可以按需加载
>    2. 不利于SEO -> 服务端渲染SSR<-可以使用Nuxt.js框架

#### 18-项目-商品管理-添加商品-表单数据分析

1. 添加商品按钮注册事件 addGoods()
2. 发送请求
3. 测试，状态码是400，根据接口文档可知，400表示请求地址不存在或者包含不支持的参数
   1. 请求体this.form中只用了一部分数据，分类数据goods_cat虽然声明了，但是没有使用--pics---attrs，三个属性的数据没有处理，需要单独处理
   2. goods_cat：以为','分割的分类列表，分类列表我们有，是selectedOptions[1,3,6]，要的是以逗号分隔的列表->"1,2,3"
   3. pics：上传的图片临时路径（对象）可能的类型
      - pics:tmp_path
      - pics:{tmp_path:?}
      - pics是一个容器，容器的里面是对象->{tmp_path:?}，数组中可以放对象，对象中也可以放对象，根据接口文档的响应结果可以得知pics是数组，数组中放了对象
      - attrs  商品的参数（数组）参数：动态参数+静态参数，数组中放了什么数据看接口文档->->[{attr_id:?,attr_value:?}] ?的来源->->arrDy和arrStatic中每个对象的attr_id和attr_vals

> 1. goods_cat [1,2,3]->"1,2,3"
> 2. pics:[{pic:临时路径}]
> 3. attrs:[{attr_id:?,attr_value:?}]
>    来源arrDy和arrStatic中每个对象的attr_id和attr_vals

#### 19-项目-商品管理-添加商品-表单数据处理-分类和图片

发送请求，请求数据失败，就在发请求之前处理数据

> 1. this.form.goods_cat = this.selectedOptions.join(",");

> 2. 处理this.form.pics

```js
    // 图片上传相关方法
    handleRemove(file, fileList) {
      // console.log("remove----");
      // console.log(file);
      // file.response.data.tmp_path 临时路径
      // 移除时，从pics数组中移除当前的图片的临时路径
      // splice()移除，
      // const Index=?;
      // 要找到数组中当前移除的元素，需要遍历
      // 1. 能遍历
      // 2. return 条件的
      // 3. 返回符合条件的索引
      // ->findIndex() ES6数组新增API
      const Index = this.form.pics.findIndex(item => {
        // item是数组中的每个对象 item.pic是临时路径
        // return item.pic=当前移除的图片的临时路径
        return (item.pic = file.response.data.tmp_path);
      });
      this.form.pics.splice(Index, 1);
      console.log(this.form.pics);
      
    },
    handleSuccess(response, file, fileList) {
      // console.log("success----");
      // console.log(response);
      // 此时response的上传成功时假的，真正的上传成功应该是在点击添加商品的时候发送请求->上传
      // response.data.tmp_path 临时路径
      // 在有临时路径的地方给数组pics赋值
      this.form.pics.push({
        pic: response.data.tmp_path
      });
      console.log(this.form.pics);
    },

```

#### 20-项目-商品管理-添加商品-表单数据处理-attrs

```js
// 3. 处理attrs->[{attr_id:?,attr_value:?}]
     // const res = await this.$http.post(`goods`, this.form);
      // console.log(res);

      // 动态参数数组
      // 1. 能遍历
      // 2. 能返回数组
      // 3. return "abc"/obj  return 啥就能把啥放到数组中并返回
      // -> 数组方法map()
      const arr1 = this.arrDy.map(item => {
        // 要的是
        // item.attr_id
        // item.attr_vals
        // 把上面的两个值变成对象的形式
        // {attr_id:item.attr_id,attr_value:item.attr_vals}
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      console.log(arr1);
      // // 如果不知道map方法，可以采用其他遍历方法
      // const obj1 = { attr_id: "", attr_value: "" };
      // const arr1 = [];
      // this.arrDy.forEach(item => {
      //   // 给对象动态添加成员
      //   obj1.attr_id = item.attr_id;
      //   obj1.attr_value = item.attr_vals;
      //   arr1.push(obj1);
      // });
      // console.log(arr1);


      // 静态参数数组
      const arr2 = this.arrStatic.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      console.log(arr2);
      this.form.attrs = [...arr1, ...arr2];
      console.log(this.form.attrs);
```

#### 21-项目-商品管理-添加商品-发送请求-回到商品列表页

```js
const res = await this.$http.post(`goods`, this.form);
  console.log(res);
  const {
    data,
    meta: { msg, status }
  } = res.data;
  if (status === 201) {
    // 提示
    this.$message.success(msg);
    // 返回列表页
    this.$router.push({
      name: "goods"
    });
  } else {
    this.$message.error(msg);
  }
```

> 回到列表

> 解决了bug：先选三级分类，再点商品参数，此时显示商品参数，在此基础上，清空三级分类，再点商品参数，仍显示参数，应该不显示
> 解决：应该在出现请先选择三级分类的提示框的位置，清空数组

```js
// 如果点的是第二个tab，清空动态数组，如果是第三个清空静态数组
  if (this.active === "2") {
    this.arrDy = [];
  } else {
    this.arrStatic = [];
  }
```



### day12-项目-重点

#### 01-项目-商品管理-分类参数-新建组件-路由配置

1. 新建组件cateparams.vue

2. index.js挂载

3. 面包屑

4. 提示框（修改样式，type="warning"，center删掉，默认是left）

5. 级联选择器，是一个表单元素，任何表单元素外层有一个el-form-item，最外层是el-form，v-model绑定的数据在data中声明

6. 根据级联选择器的数据和方法复制goodsadd.vue中用到的data数据和方法

7. 级联选择器要展示的是商品的三级分类，要发送请求，获取三级分类，同goodsadd.vue的方法一样，这个方法在created中调用，默认不选则，selectedOptions不设置初始值，选择的时候只显示最后一项，根据element文档可知设置属性:show-all-levels="false"

   ```html
    <el-card class="box">
       <!-- 面包屑 -->
       <cus-bread level1="商品管理" level2="分类参数"></cus-bread>
       <!-- 提示框 -->
       <el-alert class="alert" title="注意：只允许为第三级分类设置参数" type="warning" show-icon></el-alert>
       <!-- 级联选择器 -->
       <el-form class="form" label-position="left" label-width="120px" :model="form">
         <el-form-item label="请选择商品分类">
           {{selectedOptions}}
           <el-cascader
             :show-all-levels="false"
             clearable
             expand-trigger="hover"
             :options="options"
             :props="defaultPro"
             v-model="selectedOptions"
             @change="handleChange"
           ></el-cascader>
         </el-form-item>
       </el-form>
       <!-- tab切换 -->
       <el-tabs v-model="active" @tab-click="handleClick">
         <el-tab-pane label="动态参数" name="1">动态参数</el-tab-pane>
         <el-tab-pane label="静态参数" name="2">静态参数</el-tab-pane>
       </el-tabs>
     </el-card>
   ```

   

功能演示：

> 分类参数.vue
> 级联+tabs+动态el-tag编辑(删除/添加)
> cateparams.vue

#### 02-项目-商品管理-分类参数-动态参数-布局-配置级联选择器

> goodsadd.vue的级联完全一样
> 仅显示最后一级label :show-all-levels="false"

#### 03-项目-商品管理-分类参数-动态参数-获取动态参数数据

tab切换，

1. 将来要tab切换，tab切换是表单元素，用v-model绑定active，在data中声明，设置name属性，切换时active属性值和被点击的name属性值一样
2. 效果：当级联中选择了分类（label改变时触发handleChange事件），并且分类是三级分类(selectedOptions数组长度是3)的时候才显示动态参数和静态参数
3. handleChange()->判断是否选择了三级分类->提供获取动态参数和静态参数的方法

> 点击级联选择器且是三级分类->获取动态参数数组(goodsadd.vue)

```js
    // 级联的label改变时触发该事件
    async handleChange() {
      // 如果级联的数组的长度是不是3
      if (this.selectedOptions.length !== 3) {
        // 提示
        this.$message.warning("请先选择三级分类！");
        return;
      }
      // 获取动态参数数据
      if (this.active === "1") {
        // :id是分类id，这里是selectedOptions中的6
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        // console.log(res);
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.arrDy = data;
          console.log("动态参数");

          console.log(this.arrDy);
          this.arrDy.forEach(item => {
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
            // console.log(item.attr_vals);
          });
        }
      }
    },
```



#### 04-项目-商品管理-分类参数-动态参数-表格渲染

把动态数据放到表格里

1. 按钮el-button
2. el-table
   1. el-table绑定的数据是动态参数数组arrDy
   2. 展开type="expand"，展开要的不是prop的内容，加个template,设置slot-scope="scope"

> goodslist的el-table->修改

```html
  <el-tab-pane label="动态参数" name="1">
    <el-button disabled>设置动态参数</el-button>
    <!-- 表格 -->
    <el-table height="450px" border stripe :data="arrDy" style="width: 100%">
      <!-- 展开
        展开要的不是prop的内容，加个template,设置slot-scope="scope"
      -->
      <el-table-column type="expand" width="100">
        <template slot-scope="scope">123123</template>
      </el-table-column>
      <!-- 序号 -->
      <el-table-column type="index" label="#" width="120"></el-table-column>
      <el-table-column prop="attr_name" label="属性名称"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
```

#### 05-项目-商品管理-分类参数-动态参数-动态编辑-文档-引入

展开的数据，用v-for遍历，能移除也能添加->el-tag文档->动态编辑->看文档->属性及方法

1. el-tag文档->动态编辑

   1. el-tag

   - v-for 遍历数组，数组在data中声明
   - closable 关闭
   - :disable-transitions="false" 过渡效果
   - @close="handleClose(tag)" 点关闭的时候调用该方法，把当前选中的tag从数组中根据当前索引移除元素，tag是当前点中的元素

   2. el-input

   - v-if="inputVisible"    input的显示和隐藏是变化的，通过v-if设置，值是布尔值，输入框和按钮不会同时显示，是完全相反的v-else
   - v-model="inputValue"   input是表单元素，用v-model绑定，数据inputValue在data声明
   - ref="saveTagInput"  当在js中操作DOM元素调用方法时，设置ref
   - @keyup.enter.native="handleInputConfirm"  键盘按下enter键时触发
   - @blur="handleInputConfirm"  输入框失去焦点时触发
   - handleInputConfirm()
     - 获取了输入框的值
     - 判断值有没有，如果不是空字符串就往之前的数组中添加一个元素
     - 隐藏input，把条件渲染v-if布尔类型的值改成了false
     - 清空输入框

   3. el-button

   - v-else 显示与隐藏和input是相反的
   - @click="showInput"
     - 点击按钮显示input
     - 操作表单元素input，获取焦点

2. 复制结构，css，data，js三个方法

> el-tag文档->动态编辑
> 标签+css+data+js三个方法

#### 06-项目-商品管理-分类参数-动态参数-动态编辑-配置-完成

> 把动态tag编辑的dynamicTags换成自己的arrDy中每个对象的attr_vals

```html
<template slot-scope="scope">
      <!-- 动态tag编辑 
      scope.row 是动态数组中的每个对象
      -->
      <el-tag
        :key="i"
        v-for="(item,i) in scope.row.attr_vals"
        closable
        :disable-transitions="false"
        @close="handleClose(scope.row,item)"
      >{{item}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm(scope.row)"
        @blur="handleInputConfirm(scope.row)"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </template>
```

handleInputConfirm()是判断input有没有值，如果有，就向数组中添加input的值，所以可以在调用方法的时候，把数组里的对象传进来，改成自己的数组

```js
// 动态tag编辑相关方法
// 删除
handleClose(obj,item) {
    // obj是scope.row，即动态数组中的每个对象，对象点数组attr_vals是要遍历的tag数组
  obj.attr_vals.splice(obj.attr_vals.indexOf(item), 1);
},

showInput() {
  this.inputVisible = true;
  this.$nextTick(_ => {
    this.$refs.saveTagInput.$refs.input.focus();
  });
},

handleInputConfirm(obj) {
  let inputValue = this.inputValue;
  if (inputValue) {
    obj.attr_vals.push(inputValue);
  }
  this.inputVisible = false;
  this.inputValue = "";
},
```



#### 07-项目-商品管理-分类参数-动态参数-动态编辑-发送请求

接口文档---编辑提交参数(这里既能添加也能删除)

1. 删除请求在点击"X"的时候发送

> 删除/添加属性值

```js
// 删除
async handleClose(obj, item) {
  // obj是scope.row，即动态数组中的每个对象，对象点数组attr_vals是要遍历的tag数组
  obj.attr_vals.splice(obj.attr_vals.indexOf(item), 1);
  // 删除发送请求
  // :id	分类 ID	这里是三级分类id，是selectedOptions数组中下标为2的元素
  // :attrId	属性 ID->attr_id
  //状态码400--> msg: "参数 attr_sel 类型必须为 only 或 many"
  // put请求修改数据要做两件事：1. 找到要修改的数据（分类id+属性id）2. 告诉他新数据是谁
  // put请求需要请求体
  // {
  //   attr_name:'',
  //   attr_sel:'',
  //   attr_vals:''
  // }
  // attr_name	属性名	分类名，数据中每个对象的attr_name
  // attr_sel	many或only
  // attr_vals	属性值
  const res = await this.$http.put(
    `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
    {
      attr_name: obj.attr_name,
      attr_sel: obj.attr_sel,
      attr_vals: obj.attr_vals.join(',')
    }
  );
  console.log(res);
  //数据库错误-> sql: "UPDATE `sp_attribute` SET `cat_id` = '6', `attr_vals` = ('aa', 'bb', 'cc') WHERE `attr_id` = 3077"
  // 数据库操作里面都是字符串，不能写数组，而我们的obj.attr_vals是数组，给它转成以逗号分隔的字符串
},
    
// 添加（和删除的请求一样） 
// 添加
async handleInputConfirm(obj) {
  let inputValue = this.inputValue;
  if (inputValue) {
    obj.attr_vals.push(inputValue);
    // 按照新数组发送添加的请求
    const res = await this.$http.put(
      `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
      {
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel,
        attr_vals: obj.attr_vals.join(",")
      }
    );
    console.log(res);
  }
  this.inputVisible = false;
  this.inputValue = "";
},
```

#### 08-项目-商品管理-分类参数-静态参数-布局-获取数据

选级联选择器中的label时要拿数据，点击动态参数和静态参数时也要拿数据，->选级联选择器中的label时，要拿动态数据和静态数据

先选三级分类，再点动态参数和静态参数的时候也要拿数据

> 1. 级联选择器@change->获取动态or静态
> 2. el-tabs@tab-click->获取动态or静态
> 3. 封装方法getDyOrStatic()

```html
<el-button disabled>设置静态参数</el-button>
<el-table height="350px" border stripe :data="arrStatic" style="width: 100%">

  <!-- 序号 -->
  <el-table-column type="index" label="#" width="120"></el-table-column>
  <el-table-column prop="attr_name" label="属性名称"></el-table-column>
   <el-table-column prop="attr_vals" label="属性值"></el-table-column>
  <el-table-column label="操作" width="100">
    <template slot-scope="scope">
      <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
      <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
    </template>
  </el-table-column>
</el-table>
```



#### 09-项目-商品管理-商品分类-组件(提前准备)-路由配置

> 02-其他资源/goodscate.vue(商品分类组件)->cus-bread
> 功能

1. 添加分类
2. 表格的列展开后类树形结构

#### 10-项目-商品管理-商品分类-element-tree-grid-文档-引入

> el-table展开之后没有类树形结构

1. 不用element->不好
2. 找一个element这个插件的插件x-table(扩展el-table)->替换了整个el-table，之前的el-table就不能用了，需要改大量代码
3. 找el-table的插件->替换el-table-column->推荐->xxx-table-column

> npm->npm install element-tree-grid --save

#### 11-项目-商品管理-商品分类-element-tree-grid-配置

根据npm中element-tree-grid的文档引入和配置



```html
  <!-- 表格树形结构
  prop 表格的内容，要的是分类的名字，在list中找分类的类名，根据接口文档的商品数据列表->cat_name
  label 表格头部
  treeKey 每个节点唯一标识通常是数据中的id值
  parentKey 父级数据中的key名
  childKey 子级数据的key->children
  levelKey 当前自己的层级

  cat_deleted: false
  cat_id: 1
  cat_level: 0
  cat_name: "大家电"
  cat_pid: 0
  children: Array(4)
   -->
  <el-tree-grid
  prop="cat_name"
  label="分类名称"
  width="120"
  treeKey="cat_id"
  parentKey="cat_pid"
  childKey="children"
  levelKey="cat_level"
  ></el-tree-grid>
```

#### 12-项目-商品管理-商品分类-添加分类-打开对话框

添加分类，如果不选分类的层级，就是添加到一级分类上，

如果选了一级->添加到二级分类

如果选了二级->添加到三级分类

> 获取type=2前两级分类即可

#### 13-项目-商品管理-商品分类-添加分类-发送请求

```js
async addCate() {
  // 请求体参数
  // cat_pid	分类父 ID	不能为空
  // cat_name	分类名称	不能为空
  // cat_level	分类层级	不能为空
  // 选的分类不同，请求体不同，要判断一下
  // 三个情况：
  // 添加一级分类->级联的数组为空->cat_pid=0,cat_level=0
  // 添加二级分类->级联的数组长度为1->cat_pid->上一级id->this.selectedOptions[0],cat_level=1
  // 添加三级分类->级联的数组长度为2->cat_pid->上一级id->this.selectedOptions[1],cat_level=2
  if (this.selectedOptions.length === 0) {
    this.form.cat_pid = 0;
    this.form.cat_level = 0;
  }
  if (this.selectedOptions.length === 1) {
    this.form.cat_pid = this.selectedOptions[0];
    this.form.cat_level = 1;
  }
  if (this.selectedOptions.length === 2) {
    this.form.cat_pid = this.selectedOptions[1];
    this.form.cat_level = 2;
  }
  const res = await this.$http.post(`categories`, this.form);
  console.log(res);
  const {
    meta: { status, msg }
  } = res.data;
  if (status === 201) {
    // 关闭对话框
    this.dialogFormVisibleAdd = false;
    // 更新数据列表
    this.getGoodsCate();
  }
},
```

#### 14-项目-合并分支-推送分支-新建分支

> dev-order

#### 15-项目-订单管理-订单列表-组件(提前准备)-路由配置

> 02-其他资源/order.vue订单组件
> 给级联提供省市区的数据

#### 16-项目-订单管理-订单列表-省市区引入

1. 引入省市区(可以百度搜索省市区文件)city_data2017_element.js文件，github上也可以找

2. 这个js文件是资源，不是业务逻辑，放在assets中

3. 在order.vue中导入

4. 给级联的数据使用catlist，赋值

5. 级联选择器需要配置选项:props="defaultProp"，defaultProp是一个对象

   ```js
    // 也可以不写，默认是同名的 ，不写时:props也不用写 
   defaultProp:{
       value:'value',
       label:'label',
       children:'children'
     }
   ```

   

> 省市区(联动)
> 客户端:网站web/安卓/苹果->省市区->.json或者.js
> 在.vue中可以使用之前用过的.js模块
> 比如:wow.js(做整屏滚动动画)  iscroll.js(移动端下拉上拉动画) swiper.js(写轮播图的) 等
> vue-swiper.js

#### 17-项目-数据统计-数据报表-Echarts-文档-引入

1. 新建分支dev-data
2. 新建reports.vue，配置路由

> 数据可视化:

1. flash画图
2. H5->canvas标签(画布)->W3C(http://www.w3school.com.cn/html/html5_canvas.asp)

> 3D建模

3. D3.js
4. three.js
5. WebGL
6. Echarts.js(百度的一个产品)

> mounted(){方法调用}

Echarts(https://echarts.baidu.com/examples/)->实例->官方实例(2D的)，GL实例(3D的)

文档---教程

3. 安装：**在 webpack 中使用 ECharts**  npm install echarts --save
4. 导包
5. **5 分钟上手 ECharts**
6. 如果不知道js代码写在哪里，可以写在方法中，然后考虑方法在哪里调用，这里写在mounted中(代码中操作了DOM元素，created中没有DOM元素，created是vm实例之后，mounted中才有DOM元素)

#### 18-项目-数据统计-数据报表-Echarts-配置

1. 官方实例中找到想要的图表，每个图表有自己的option，复制对应的option
2. 发送请求，获取真实数据
3. 我们得到的res中有legend，series，xAxis，yAxis删除官方实例中的相同选项，最终的option就是res的option和删除选项之后的option合成的option

> url->  "reports/type/1"

```js
<script>
import echarts from "echarts";
export default {
  mounted() {
    this.initEcharts();
  },
  methods: {
    async initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById("main"));
      // 发送请求，获取数据
      // :type 接口文档没写type是什么
      // 1. reports/type=1
      // 2. reports/1
      // 3. reports/type/1
      // 测试打印结果是第三种能得到res
      const res = await this.$http.get(`reports/type/1`);
      const option2 = res.data.data;
      console.log(option2);

      // 指定图表的配置项和数据
      const option1 = {
        title: {
          text: "数据报表"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
      // 操作运算符...也能操作对象
      const option = { ...option1, ...option2 };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
```

#### 19-项目-优化-加载动画

> 动画可以用gif图片->img src="xxoo.gif"->数据请求之前给图片的src赋值，数据请求成功之后，给图片的src清空
> element-ui中Loading加载->给users.vue  的el-table设置 v-loading="loading"，在data中声明，请求成功之后，修改loading的值为false

#### 20-项目-优化-拦截器统一处理响应

> 统一处理status非200和201的情况->提示框

axios响应拦截器，查看axios官网

`http.js`

```js
// 导入单独的Message
import { Message } from 'element-ui'

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
return response;
}, function (error) {
// 对响应错误做点什么
return Promise.reject(error);
});

```

> 项目优化+打包
> vue传值:(子传父+兄弟传递)+vuex插件(面试重点)
> webpack手动配置





### day13-项目-重点

#### 00-反馈-补充-修复bug

常见的云服务器：阿里云/百度云/新浪云/腾讯云等->问客服如何使用

1. AuthorizationAuthorization分类参数.vue(cateparams.vue)->动态tag编辑->el-input->同时变，用户体验不好，实际发请求的时候只会添加当前的input，因为发送请求的时候，id不同。
   - 思路1:绑定不同的数据->动态v-model="obj[scope.$index]"赋值
   - 思路2:只打开一个

- 思路2代码：在权限管理， 角色列表roles.vue修改测试，展开第二个时，把上一个的展开关闭，找表格的事件中有没有一点击就触发的事件
- expand-change---当用户对某一行展开或者关闭的时候会触发该事件--参数row, expandedRows，打印下row, expandedRows分析结果

```html
el-table @expand-change="fn"
```

```js
// 当表格展开或关闭某一行时触发
fn(row, expandedRows) {
  // console.log(row);
  // console.log(expandedRows);
  // 分析可得：row是当前点击的角色，类型是对象
  // expandedRows是所有当前展开的行所绑定的数据，类型是数组
  // 只想展开一个，那么数组长度永远为1
  // 第一次点击，长度=1，不会进到判断，第二次点击时，判断>1，删除第一个元素
  if (expandedRows.length > 1) {
    // 当展开第二个时，删除第一个元素
    expandedRows.shift();
  }
},
```

- 思路1代码：cateparams.vue，实现多个el-input绑定不同的数据->给它提供不同的数据，每个三级分类的el-input的个数不同，跟动态数组的长度不同有关，所以el-input的值有好几个，找一个容器，存放，可以用一个对象或数组存放，这里用对象inputVals: {}

  - 找到动态数组arrDy赋值的地方，这时候动态数组有长度了，动态v-model="obj[scope.$index]"赋值

  ```html
  <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputVals[scope.$index]"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input> 
  ```

  

  ```js
  // data 
   // 存放不同的el-input绑定的数据
        inputVals: {}
  
  
  // 这时候动态数组有长度了，而且是根据三级分类的不同而不同
            // inputVals: {}给它赋值
            // 根据数组长度赋值,for循环
            for (let index = 0; index < this.arrDy.length; index++) {
              // 可以利用每次循环的索引，让里面的数据不一样
              // 给对象添加key，初始值是空
              this.inputVals["inputvalue" + index] = "";
              console.log(this.inputVals);
              // 得到的结果绑定给v-model
            }
  ```

  

2. 补充:侧边栏刷新时->回到之前激活状态
   1. 当点某个导航时，标识改变，记录上次记录刷新前点击时路由参数(name/path等)，再刷新的时候还是这个name或path
   2. 找导航激活时的事件 @select="fn"

> 我是谁?我在哪?我要做什么?
> 侧边栏home.vue+el-menu(属性方法事件)+记录刷新前点击时路由参数(name/path等)
> el-menu :dafault-active="$route.name"
> 前提 路由配置中name和path中

```html
<el-menu
  @select="fn"
  :unique-opened="true"
  :router="true"
  :default-active="$route.name"
  class="el-menu-vertical-demo"
>
```

事件也可以不写，或者使用事件的参数

```js
// 导航激活事件
fn(index, indexPath) {
  // console.log(index); // 标识goods
  // console.log(indexPath);//数组，第一个是控制的是第几个导航，第二个时标识即index  [1,goods]
  // fn触发时，要获取当前点击的路由数据
  console.log(this.$route.name);
  // this.$route路由配置对象，里面有当期的标识
  // this.$route.name就是当前点击的路由标识，绑定给el-menu
  //  default-active="$route.name"
},
```



#### 01-项目-补充-nextTick方法，是vm实例的方法

```js
  this.$nextTick(() => {
    // 操作dom的代码
    console.log(this.$refs.txt.innerText);
  })
```

#### 02-项目-打包-演示

> 打包前->开发模式->npm run dev
> vuecli创建->目录->包含.vue文件+.css+.js等
> 打包后:项目目录包含(.html+.css+.js+字体)

> webpack:提供了打包的指令
> 来到项目所在目录->npm run build

> 产物
> dist/(index.html+static)
> static/(js+css+font)
> js/ 

1. app.xxx.js 自己的js代码(组件自己的js+公共的js)
2. manifest.js 给用户做页面缓存的，再次访问网页时，从缓存获取 
3. vender.xxx.js 第三方的js
4. app.xxx.css 所有组件的样式
5. index.html网站的主页，入口

> 目前.map不用关心
> 小问题 vender.xxx.js很大->1.99M
> app.xxx.js->153K

> 上线：项目服务器:把dist目录放在服务器路径下，就会有网址了，别人就能看到，
>
> 1. cd  dist 
> 2. http-server -o     ，用http-server服务器打开，-o是open的意思



#### 03-项目-优化-路由懒加载

> 目前效果
> 任何组件显示->点network查看发送的请求->加载了所有资源(app.xxx.js等)，应该是点对应的路由，加载对应的js/css等

> 解决：改一下index.js中路由的导入方法(vue-生态系统-router-路由懒加载)->如何定义一个能够被 Webpack 自动代码分割的异步组件->`const Foo = () => import('./Foo.vue')`

> 处理之后(router/index.js)

```js
const Login = () => import('@/components/login.vue')
```

> 看效果需要重新打包，重新打包npm run build，重新打包时，会把之前打包的内容全部清理掉，重新载入

> js/
>
> 1. app.xx.js ->公共的js代码-.变小  7.66KB

2. 序号.xx.js -> 每个组件自己的js代码

> 页面中显示某个组件->只加载了对应的.js->SPA首屏加载变快

#### 04-项目-优化-cdn-配置

> vender.xxx.js->961K(第三方的js)
> 第三方.js在本地的vender.xx.js中->CDN(网址加载)

> 找项目中所有的第三方包，改成CDN加载

1. 按照package.json找项目依赖的第三方包*dependencies*，找对应的CDN

2. 找cdn资源(官网+bootcdn网站(https://www.bootcdn.cn/))->在index.html引入CDN资源->多了好多链接

   1. 在bootcdn网站搜索依赖的包名，就是package.json中dependencies的key名，找到压缩版，点击复制script标签，因为之后要看一下包的源码，所以这里采用非压缩版(一般压缩版和非压缩版在一起放着)

      ```json
        "dependencies": {
          "vue": "^2.5.2",
          "vue-router": "^3.0.1",
          "element-ui": "^2.5.4",
          "axios": "^0.18.0",
          "moment": "^2.24.0",
          "echarts": "^4.1.0",
          "element-tree-grid": "^0.1.3",
          "vue-quill-editor": "^3.0.6"
        },
      ```

   2. 之前引入`element-ui`时，引入了css和js，所以要找两个css的CDN 和js的CDN，可以在element-ui的官网找

   3. axios->beta是测试的意思，最好不用，用版本0.18.0的

   4. 因为*element-tree-grid*和*vue-quill-editor*是插件，体积很小，不是框架，bootcdn网站没有相关的CDN，可以不写CDN

   `index.html`

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width,initial-scale=1.0">
       <title>shopmanager64</title>
       <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
     </head>
     <body>
       <div id="app"></div>
       <!-- built files will be auto injected -->
       <script src="https://cdn.jsdelivr.net/npm/vue@2.6.6/dist/vue.js"></script>
       <script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.js"></script>
       <script src="https://unpkg.com/element-ui/lib/index.js"></script>
       <script src="https://cdn.bootcss.com/axios/0.18.0/axios.js"></script>
       <script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.js"></script>
       <script src="https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.simple.js"></script>
     </body>
   </html>
   
   ```

3. 配置cdn(告诉加载来源cdn)->用webpack->修改webpack配置(可以看webpack官网)->搜索CDN->根据官网，**webpack.config.js**中的module.exports写了新代码

   `webpack.base.conf.js`的module.exports

   - key是要配置的包名->package.json中
   - value值是该包暴露给全局作用域内的变量名，变量名看包的源码，通过包的CDN网址查看
     - vue->global.Vue = factory()   global后面的
     - element-ui->define("ELEMENT",["vue"],t):  define定义
     - axios->root["axios"] = factory();

```json
externals: {
    // jquery: 'jQuery'

    // key->js的包名->package.json
    // value->该包暴露给全局作用域内的变量名
    "vue": "Vue",
    "vue-router": "VueRouter",
    "element-ui": "ELEMENT",
    "axios": "axios",
    "moment": "moment",
    "echarts": "echarts"
  },
```

3. 改变量名-->main.js和index.js中导包的变量名改为上一步的全局变量名
   3.1 main.js Vue+ELEMENT(改导入和使用) + element样式文件引入(删除)
   3.2 router/index.js->VueRouter(导包、使用、实例化都要改)
   3.3 报表/echarts

> 4 重新打包npm run build
> 对比vender.xx.js的大小961K->19.4K

#### 05-项目-打包(优化后)

> npm run build->
> index.html->用户访问的首页
> js/里面的文件

1. app.xx.js->自己的公共js
2. 序号.xx.js->组件的对应js
3. vender.xx.js->第三方的js
   css/->希望每个组件的css代码在当前组件内生效

> **在所有的写了样式的.vue文件的style开始标签位置设置scoped**  -><style scoped>...</style>

4. .map文件作用:用来调试->用户不需要->可以在打包时通过webpack配置，不生成.map文件

   ```js
   new UglifyJsPlugin({
     uglifyOptions: {
       compress: {
         warnings: false
       }
     },
     // sourceMap: config.build.productionSourceMap,
     parallel: true
   }),
   ```

   打包npm run build-->js中就没有.map文件了

> 在webpack.prod.conf.js->注释掉

5. 随机数问题app.xxx.js解释

> 1版本打包->1.xx1.js->用户浏览网页->2版本打包->1.xx2.js->用户浏览网页1.xx2.js
>
> 6. dist/->放在项目上线服务器index.html   www.xx.com/index.html

