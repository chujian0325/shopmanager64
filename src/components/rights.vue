<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <!-- 如果封装完毕，希望这样用
    <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
    -->
    <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
    <!-- 表格 -->
    <el-table height="350px" :data="list" style="width: 100%">
      <el-table-column type="index" label="#" width="160"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column label="层级" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  // 获取首屏数据在created中写
  created() {
    this.getTableData();
  },
  methods: {
    // 获取权限列表数据
    async getTableData() {
      const res = await this.$http.get(`rights/list`);
      //   console.log("请求发起了--");
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        //   拿到数据，把数据给表格就能赋值了，在data中提供一个接收者list
        this.list = data;
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
</style>
