<template>
  <el-card class="box">
    <!-- 面包屑  -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索+添加 -->
    <el-row class="serachBox">
      <el-col>
        <el-input class="searchInput" placeholder="请输入内容" v-model="query">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 添加按钮 -->
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="#" width="80"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="name" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="name" label="电话" width="140"></el-table-column>
      <el-table-column prop="name" label="创建日期" width="140"></el-table-column>
      <el-table-column prop="name" label="用户状态" width="140"></el-table-column>
      <el-table-column prop="name" label="操作" width="200"></el-table-column>
    </el-table>
    <!-- 分页 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      // 表格数据
      list: []
    };
  },
  //   所有的获取首屏数据的方法调用在created中
  created() {
    this.getTableData();
  },
  methods: {
    //   获取表格数据
    async getTableData() {
      // 除了登录请求，其他所有请求都需要授权
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      // 在发送请求之前，先设置请求头{Authorization:token值}
      // {ContentType:text/html,Authorization:?}
      // 设置请求头,让axios去做,用的是axios发送请求,查axios文档,搜索headers,能不能设置请求头
      // 获取token
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.serachBox {
  margin-top: 20px;
}
.searchInput {
  width: 350px;
}
</style>
