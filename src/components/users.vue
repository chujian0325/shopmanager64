<template>
  <el-card class="box">
    <!-- 面包屑  -->
    <cus-bread level1="用户管理" level2="用户列表"></cus-bread>
    <!-- 搜索+添加 -->
    <el-row class="serachBox">
      <el-col>
        <el-input
          @clear="getAllUsers()"
          clearable
          class="searchInput"
          placeholder="请输入内容"
          v-model="query"
        >
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 添加按钮 -->
        <el-button @click="showDiaAddUsers()" type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table v-loading="loading" height="350px" :data="list" style="width: 100%">
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
      <el-table-column label="用户状态" width="140">
        <template slot-scope="scope">
          <!-- 外层有template，绑定了scope，可以传实参 -->
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- 一个布尔类型的值，如果不写属性值，默认是true -->
          <el-button
            @click="showDiaEditUser(scope.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="showDiaSetRole(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <!-- scope是绑定的外层数据，可以传scope.row ，把数组中的对象传过去 ，把当前的用户传过去user -->
          <el-button
            @click="showMsgBoxDele(scope.row)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页
     @size-change 每页条数改变时触发
     @current-change 页码改变时触发
     current-page 当前显示第几页
     page-sizes 每页条数的不同情况的数组
     page-size 每页几条
     layout 附加功能
     total 总条数
    -->
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
    <!-- 对话框--添加用户  因为对话框是单独的弹出一层，所以代码位置写在哪里都可以
    dialogFormVisibleAdd 因为有好多对话框，这里加个Add，所有使用dialogFormVisible的位置都加Add
    -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <!-- 登录写过表单，可以在文档中找表单  -->
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
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框--编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <!-- 登录写过表单，可以在文档中找表单  -->
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input disabled v-model="formdata.username"></el-input>
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
          <!--
            下拉框的特性
            v-model 绑定表单元素
            1. type="text"  一般的input
            2. 其他表单 textarea select+option
            下拉框的特点：
            1. 默认显示请选择->当v-model的数据selectVal与option中 的value值，相等
            2. 当选择某个option时，v-model数据的值等于选中的label的value的值
            3.

          -->
          {{selectVal}}
          <el-select v-model="selectVal" placeholder="请选择角色名">
            <el-option disabled label="请选择" :value="-1"></el-option>
            <!-- 第一类是写死的 请选择 -->
            <!-- 第二类数据是将来获取角色名称数据 用v-for遍历-->
            <!-- 5个角色都有自己的value
            value就是角色id
            [30,31,34,39,40]

            -->
            <el-option
              v-for="(item) in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      query: '',
      pagenum: 1,
      pagesize: 2,
      // 为了区分是后台返回的数据还是自己写的初始值，total设置为-1
      total: -1,
      // 表格数据
      list: [],
      // 对话框的数据
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,

      // 表单数据，将来要发post请求，需要请求体，请求体的数据根据接口文档写
      // username 用户名称 不能为空
      // password 用户密码 不能为空
      // email 邮箱 可以为空
      // mobile 手机号 可以为空
      formdata: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 下拉框中的数据
      selectVal: -1,
      currUserId: -1,
      // 角色数组
      roles: []
    }
  },
  //   所有的获取首屏数据的方法调用在created中
  created () {
    this.getTableData()
  },
  methods: {
    // 分配角色--发送请求，分配用户角色
    async setRole () {
      // :id是用户id，data中没有数据，也不能传递参数，在对话框里面，没有template，不能传实参，可以在data中提供一个id
      // currUserId -> -1
      // 显示对话框的时候，有用户，可以在 showDiaSetRole()方法中给currUserId赋值
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.selectVal
      })
      // console.log(res);
      const {
        meta: { status }
      } = res.data
      if (status === 200) {
        // 关闭对话框
        this.dialogFormVisibleRole = false
        this.getTableData()
      }
    },
    // 分配角色--打开对话框
    async showDiaSetRole (user) {
      // console.log(user);

      // 显示用户名
      this.formdata.username = user.username
      this.currUserId = user.id
      this.dialogFormVisibleRole = true
      // 获取角色名称
      const res = await this.$http.get(`roles`)
      // console.log(res);
      const {
        data
      } = res.data
      // 拿到数组，在data中声明roles，用v-for遍历
      this.roles = data
      // 给下拉框v-model绑定的数据值selectVal赋值
      // this.selectVal=当前用户的角色id，看返回的user中是否有角色id
      // 打印user ，发现没有
      // 查看文档 根据 ID 查询用户信息，可以看到有角色id
      const res2 = await this.$http.get(`users/${user.id}`)
      // console.log(res2); //返回的数据中有角色id ->rid

      this.selectVal = res2.data.data.rid
    },
    // 修改状态
    async changeState (user) {
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
      )
      console.log(res)
    },
    // 编辑--发送请求
    async editUser () {
      // 发送编辑请求
      // id ->user.id
      // 1. data 中没有user
      // 2. 方法调用的时候也不能传参数，因为scope只能在template中写，编辑按钮外层没有template包裹，可以考虑在data中写user
      // 上一步，打开对话框时，已经把user所有的数据赋值给了formdata,如果能来到这一步,说明对话框是打开的,可以直接使用formdata中的id
      // put请求和post请求一样，需要传请求体
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      )
      console.log(res)
      const {
        meta: { status }
      } = res.data
      if (status === 200) {
        // 关闭对话框
        this.dialogFormVisibleEdit = false
        // 重新加载表格
        this.getTableData()
      }
    },
    // 编辑--显示对话框
    async showDiaEditUser (user) {
      // 获取当前用户的数据
      // this.formdata = user;
      // 上行代码，两个指针指向了同一个内存空间，当操作formdata的数据时，user的数据也会改变
      // 可以这样写，下面这种写法不是指向同一个内存空间，而是给formdata加一个属性
      // this.formdata.username = user.username;
      // this.formdata.email = user.email;
      // this.formdata.mobile = user.mobile;
      // 或者
      // 该请求是传一个用户id，返回用户信息
      const res = await this.$http.get(`users/${user.id}`)
      console.log(res)
      // 返回的结果中有我们需要的用户信息（邮箱、电话、用户名）
      // 上面的赋值是用的已经存在的用户数据，下面的赋值和当前用户无关，是请求的数据
      this.formdata = res.data.data

      this.dialogFormVisibleEdit = true
    },
    // 删除--显示确认框
    showMsgBoxDele (user) {
      console.log(user)

      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // id是用户id ，想拿id,要先拿到用户，在方法中拿数据，数据的来源：
          // 1. data中提供，看看有没有
          // 2. 方法中传递参数，看看方法调用的时候能不能传 递参数
          const res = await this.$http.delete(`users/${user.id}`)
          // console.log(res);
          const {
            meta: { msg, status }
          } = res.data
          if (status === 200) {
            // 把页码重置为第一页
            this.pagenum = 1
            this.$message.success(msg)
            // 重新加载表格
            this.getTableData()
          }
        })
        .catch(() => {
          this.$message.warning('取消删除!')
        })
    },
    // 添加用户--发送请求
    async addUser () {
      const res = await this.$http.post('users', this.formdata)
      console.log(res)
      const {
        meta: { status }
      } = res.data
      if (status === 201) {
        // 关闭对话框
        this.dialogFormVisibleAdd = false
        // 重新加载表格
        this.getTableData()
        // 清空表单，在显示对话框的时候清空
      }
    },
    // 添加用户-显示对话框
    showDiaAddUsers () {
      // 清空表单
      // this.formdata.username = "";
      // this.formdata.password = "";
      // this.formdata.email = "";
      // this.formdata.mobile = "";
      // 或者  formdata设置成一个空对象，但是绑定表单的时候，可以通过点的方式给对象添加成员
      this.formdata = {}
      // 显示对话框
      this.dialogFormVisibleAdd = true
    },
    // 清空时获取所有用户
    getAllUsers () {
      this.getTableData()
    },
    // 搜索用户功能
    searchUser () {
      // 搜索结果从第一页开始展示
      this.pagenum = 1
      // 获取数据的方法能根据关键字查询数据，搜索框用v-model绑定了query,
      // 按照query关键字搜索
      // query的初始值是空""，会展示全部的用户列表
      this.getTableData()
    },
    // 分页相关的方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 按照新的pagesize发送请求
      // 当每页条数发生改变时，充值pagenum=1，从第一页开始展示数据
      this.pagenum = 1
      this.pagesize = val
      this.getTableData()
    },
    // 当前第2页，当点击3时，触发下面的方法，val=3
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 按照新页码发送请求
      this.pagenum = val
      this.getTableData()
    },
    //   获取表格数据
    async getTableData () {
      // 除了登录请求，其他所有请求都需要授权
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      // 在发送请求之前，先设置请求头{Authorization:token值}
      // {ContentType:text/html,Authorization:?}
      // 设置请求头,让axios去做,用的是axios发送请求,查axios文档,搜索headers,能不能设置请求头
      // 获取token
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )
      // console.log(res);
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.loading = false
        // res中有total总条数
        this.total = data.total

        this.list = data.users
        // console.log(this.list);
      }
    }
  }
}
</script>

<style scoped>
.box {
  height: 100%;
}
.serachBox {
  margin-top: 20px;
}
.searchInput {
  width: 350px;
}
.page {
  margin-top: 20px;
}
</style>
