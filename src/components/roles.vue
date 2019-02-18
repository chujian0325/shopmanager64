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
              <el-tag @close="deleteRights(scope.row,item1)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row class="level2" v-for="(item2) in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag
                    @close="deleteRights(scope.row,item2)"
                    closable
                    type="success"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级整体是一列，所以v-for不能写在el-col，而是写在el-tag -->
                <el-col :span="20">
                  <el-tag
                    @close="deleteRights(scope.row,item3)"
                    closable
                    type="warning"
                    v-for="(item3) in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 如果数组长度为0，显示未分配权限 -->
          <el-row v-if="scope.row.children.length===0">
            <el-col>
              <span>未分配权限</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
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
        // this.getRoles()
        // 会返回当前角色的剩余权限
        // 只更新当前的角色权限，方法中有当前角色，
        role.children = data;
      }
    },
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
        // console.log(this.roles);
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
.level1,
.level2 {
  margin-bottom: 10px;
}
</style>

// 分析布局->行列布局
// 问题：请在控制台输出以下图形
//     *
//   *   *
// *   *   *
// 所有的行列问题->for嵌套（外层for3次，内层for5次，外层输出米字，内层输出空格）
