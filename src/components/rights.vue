<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <!-- 如果封装完毕，希望这样用
    <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
    -->
    <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
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
      console.log(res);
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
