<template>
  <el-card class="box">
    <cus-bread level1="数据统计" level2="数据报表"></cus-bread>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 600px;height:400px; margin-top:20px"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    this.initEcharts()
  },
  methods: {
    async initEcharts () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main'))
      // 发送请求，获取数据
      // :type 接口文档没写type是什么
      // 1. reports/type=1
      // 2. reports/1
      // 3. reports/type/1
      // 测试打印结果是第三种能得到res
      const res = await this.$http.get(`reports/type/1`)
      const option2 = res.data.data
      //   console.log(option2);

      // 指定图表的配置项和数据
      const option1 = {
        title: {
          text: '数据报表'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }
      // 操作运算符...也能操作对象
      const option = { ...option1, ...option2 }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.box {
  height: 100%;
}
</style>
