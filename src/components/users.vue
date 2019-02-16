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
      <!-- 
        id: 500
        username: "admin"
        email: "adsfad@qq.com"
        mobile: "12345678"
        create_time: 1486720211
        mg_state: true
        role_name: "主管"
      -->
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
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
      <el-table-column label="创建日期" width="140">
        <!-- <template slot-scope="list">
        {{list.row.create_time|fmtdate}}
        </template>-->
        <template slot-scope="scope">{{scope.row.create_time|fmtdate}}</template>
      </el-table-column>
      <!-- 内容不是prop控制的，可以删掉prop="name"，方法同过滤器的使用
        1. 给内容外层加template
        2. 给template设置属性slot-scope
        3. 设置数据
      -->
      <el-table-column  label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
 
      </el-table-column>
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
      pagesize: 10,
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
      //   console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.list = data.users;
        console.log(data.users);
      }
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
