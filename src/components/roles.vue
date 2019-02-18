<template>
  <el-card class="box">
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <el-button class="btn" type="primary">添加角色</el-button>
    <!-- 表格 -->
    <el-table height="350px" :data="roles" style="width: 100%">
      <el-table-column type="expand" width="80">
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
      </el-table-column>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>

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
  </el-card>
</template>

<script>
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
    // 角色列表--设置角色
    showDiaSetRights() {},
    // 获取权限列表
    async getRoles() {
      const res = await this.$http.get(`roles`);
      //   console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.roles = data;
        console.log(this.roles);
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.btn {
  margin-top: 20px;
}
.level1{
    margin-bottom: 10px;
}
</style>

// 分析布局->行列布局
// 问题：请在控制台输出以下图形
//     *
//   *   *
// *   *   *
// 所有的行列问题->for嵌套（外层for3次，内层for5次，外层输出米字，内层输出空格）
