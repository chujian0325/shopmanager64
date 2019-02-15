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
    <!-- 分页 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
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
.searchInput{
    width: 350px;
}
</style>
