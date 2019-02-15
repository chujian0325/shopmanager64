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
      <!-- 注册事件，阻止默认行为 -->
      <el-button @click.prevent="handleLogin()" class="login-btn" type="success">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // method中提供方法
    // 发送请求的前提是启动了api-server->node app.js
    // 服务器支持跨域，（api-server和项目代码不一定放在同级目录下）
    handleLogin () {
      this.$http
        .post(`login`, this.formdata)
        .then(res => {
          // console.log(res)
          const {
            data: {
              data,
              meta: { msg, status }
            }
          } = res
          if (status === 200) {
            console.log('success')
          } else {
            // 提示框
            // console.log('err')
            this.$message.error(msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  /* 伸缩布局设置盒子垂直水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #fff;
  border-radius: 5px;
  /* 开发中宽度、字号等是设计图中标明的 */
  width: 400px;
  padding: 30px;
}
.login-btn {
  width: 100%;
}
</style>
