<template>
  <!-- 在标签中设置类名 ，方便调整样式 -->
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <el-form-item label="名称">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="success">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  }
};
</script>

<style>
</style>
