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
          <el-row class="level1" v-for="(item1) in scope.row.children" :key="item1.id">
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
    <!-- 对话框 分配角色-->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <!-- 
        data  数据来源
        show-checkbox  节点是否可被选择
        node-key 每个节点唯一标识，通常是data数据中的id名
        default-expanded-keys 默认展开，数组类型，数组中是id
        default-checked-keys 默认选中 数组类型，数组中是id
        props 配置选项{label、children} 来源于data绑定的数据源
      -->
      <!-- 
        :default-expanded-keys="[2, 3]"  数组不能写死，定义一个arrExpand在data中声明
        组件效果，默认全展开，设置属性default-expand-all，可以不用写for遍历
      -->
      <el-tree
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrCheck"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      dialogFormVisible: false,
      // 树形结构相关数据
      treelist: [],
      // arrExpand: [],
      arrCheck: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
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
    // 分配权限---打开对话框
    async showDiaSetRights(role) {
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
        // console.log(data);
        // console.log(this.treelist);
        // 声明临时数组，保存id
        // const temp = [];
        // // for嵌套遍历，取出每一级的id
        // this.treelist.forEach(item1 => {
        //   temp.push(item1.id);
        //   item1.children.forEach(item2 => {
        //     temp.push(item2.id);
        //     item2.children.forEach(item3 => {
        //       temp.push(item3.id);
        //     });
        //   });
        // });
        // 组件效果，默认全展开，设置属性default-expand-all，可以不用写上层的遍历
        // 得到所有的展开的数组id
        // console.log(temp);
        // this.arrExpand = temp;
        // 获取当前角色所拥有的权限id <-拿到当前角色
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
      }
    },
    // 获取角色列表
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
