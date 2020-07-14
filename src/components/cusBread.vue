<template>
  <!-- 在编码过程中发现了大量的重复代码，要进行封装，封装的产物是组件，新建一个组件 -->
  <!-- 面包屑组件 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!-- 变化的量属于数据，用插值表达式渲染，数据在data中声明 -->
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  //   data() {
  //     return {
  //       // 这样写的话，数据就写死了，我们希望给它传值，使用props
  //       level1: "权限管理",
  //       level2: "权限列表"
  //     };
  //   },
  // data中的数据特点：1. 响应式 2. 值只能来源于本身
  // 我们要的值不是来源于自己
  // 1. 如果数据的声明来源于外部，此时数据的声明不能写在data中，
  // 2. 应该把数据声明写在选项props中
  // 3. props的值可以是字符串数组
  // 4. props中的数据level1和level2的用法和data中的数据用法一样，可以使用插值渲染
  // 5. props中的数据是数据的声明
  // 6. props中的数据将来就是组件的属性,也就是自定义标签的属性
  // 7. props中的数据将来使用组件时，通过属性进行赋值<abc level1="权限管理"></abc>
  // 组件的名字应该由组件自己提供，而不是由使用者提供
  name: 'CusBread',
  props: ['level1', 'level2']
}
</script>

<style>
</style>
