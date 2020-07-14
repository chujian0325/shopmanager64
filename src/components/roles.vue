<template>
  <el-card class="box">
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <el-button @click="showDiaAddRole()" class="btn" type="primary">添加角色</el-button>
    <!-- 表格 -->
    <el-table @expand-change="fn" height="350px" :data="roles" style="width: 100%">
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
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showDiaEditRole(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDiaDeleRole(scope.row)"
          ></el-button>
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
        ref="treeDom"
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrCheck"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框-添加角色 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="角色名称">
          <el-input v-model="formdata.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formdata.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框-编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="角色名称">
          <el-input disabled v-model="formdata.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formdata.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      roles: [],
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // 树形结构相关数据
      treelist: [],
      // arrExpand: [],
      arrCheck: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 当前角色id
      currRoleId: -1,
      // 添加角色数据
      formdata: {
        roleName: '',
        roleDesc: '',
        roleId: -1
      }
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    // 当表格展开或关闭某一行时触发
    fn (row, expandedRows) {
      // console.log(row);
      // console.log(expandedRows);
      // 分析可得：row是当前点击的角色，类型是对象
      // expandedRows是所有当前展开的行所绑定的数据，类型是数组
      // 只想展开一个，那么数组长度永远为1
      // 第一次点击，长度=1，不会进到判断，第二次点击时，判断>1，删除第一个元素
      if (expandedRows.length > 1) {
        // 当展开第二个时，删除第一个元素
        expandedRows.shift()
      }
    },
    // 编辑角色--发送请求
    async editRole () {
      // 展示对话框得到的this.formdata中的角色id属性名是roleId
      const res = await this.$http.put(
        `roles/${this.formdata.roleId}`,
        this.formdata
      )
      // console.log(res);
      const {
        meta: { status }
      } = res.data
      if (status === 200) {
        // 关闭对话框，
        this.dialogFormVisibleEdit = false
        // 重新加载表格
        this.getRoles()
      }
    },
    // 编辑角色--显示对话框
    async showDiaEditRole (role) {
      // console.log(role);

      // 获取当前角色
      // this.formdata = role;
      // console.log(this.formdata);
      // 根据id查询角色
      const res = await this.$http.get(`roles/${role.id}`)
      // console.log(res);
      this.formdata = res.data.data

      // console.log(this.formdata);

      this.dialogFormVisibleEdit = true
    },
    // 添加角色--发送请求
    async addRole () {
      const res = await this.$http.post(`roles`, this.formdata)
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data
      if (status === 201) {
        // 消息提示
        this.$message.success(msg)
        // 关闭对话框
        this.dialogFormVisibleAdd = false
        // 更新表格
        this.getRoles()
      }
    },
    // 添加角色--显示对话框
    showDiaAddRole () {
      // 一打开对话框，就清空表单
      this.formdata = {}
      this.dialogFormVisibleAdd = true
    },
    // 删除角色--显示删除确认框
    showDiaDeleRole (role) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async () => {
          const res = await this.$http.delete(`roles/${role.id}`)
          // console.log(res);
          const {
            meta: { msg, status }
          } = res.data
          if (status === 200) {
            this.$message.success(msg)
            this.getRoles()
          }
        })
        .catch(() => {
          this.$message.warning('取消删除!')
        })
    },
    // 分配权限-发送请求
    async setRights () {
      // 看el-tree组件中是否提供属性或方法来获取两类节点
      // 获取全选节点的id->getCheckedKeys->方法作用/方法形参/方法返回值(返回一个数组)->调用者->el-tree调用方法
      // 把el标签变成DOM元素->DOM元素.js方法->在js中操作DOM元素->ref操作DOM
      // 1. 给要操作的标签设置一个ref值
      // 2. 在js中通过this.$refs.ref值.js方法
      // console.log(this.$refs);//DOM元素

      const arr1 = this.$refs.treeDom.getCheckedKeys()
      // console.log(arr1);
      // 获取半选节点的id
      const arr2 = this.$refs.treeDom.getHalfCheckedKeys()
      // console.log(arr2);
      // :roleId是 角色id
      // 在data中声明一个当前角色id :currRoleId，在打开对话框的时候，已经获取了当前的角色，可以给currRoleId赋值this.currRoleId = role.id;
      // rids 权限id列表（全选的和半选的）
      // 把两个数组变成一个数组
      // const arr = concat(arr1, arr2);
      // 或者 ES6 展开操作运算符 ...是固定写法，后面是容器的名字。容器可以是数组或对象，所用：会把后面的数组中的元素一个一个展开，放在定义的arr中
      const arr = [...arr1, ...arr2]
      // console.log(arr);
      // 根据接口文档，需要的是数组以逗号分隔

      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join()
      })
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        // 关闭对话框
        this.dialogFormVisible = false
        // 提示
        this.$message.success(msg)
        // 刷新列表
        this.getRoles()
      }
    },
    //  角色列表--删除权限
    async deleteRights (role, rights) {
      // 发送请求
      // roleId ->角色id
      // rightId ->权限id
      //   console.log(role);
      //   console.log(rights);

      const res = await this.$http.delete(
        `roles/${role.id}/rights/${rights.id}`
      )
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        // 提示成功
        this.$message.success(msg)
        // 更新表格
        // this.getRoles()
        // 会返回当前角色的剩余权限
        // 只更新当前的角色权限，方法中有当前角色，
        role.children = data
      }
    },
    // 分配权限---打开对话框
    async showDiaSetRights (role) {
      this.currRoleId = role.id
      this.dialogFormVisible = true
      // 发送请求，获取树形结构的数据
      const res = await this.$http.get(`rights/tree`)
      // console.log(res);
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.treelist = data
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
        const temp2 = []
        role.children.forEach(item1 => {
          // temp2.push(item1.id);
          item1.children.forEach(item2 => {
            // temp2.push(item2.id);
            item2.children.forEach(item3 => {
              temp2.push(item3.id)
            })
          })
        })
        // console.log(temp2);
        this.arrCheck = temp2
      }
    },
    // 获取角色列表
    async getRoles () {
      const res = await this.$http.get(`roles`)
      //   console.log(res);
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.roles = data
        // console.log(this.roles);
      }
    }
  }
}
</script>

<style scoped>
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
