<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cus-bread level1="商品管理" level2="商品列表"></cus-bread>
    <!-- 提示框 -->
    <el-alert class="alert" title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- 步骤条 el-steps
        商品参数
        商品属性
        基本信息
        商品图片
        商品内容
    -->
    <el-steps :active="active*1" align-center>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="基本信息"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 
        我们希望它能变，点的时候有反应，
        1. 用v-model绑定数据，双向数据绑定，v-model需要一个data数据
        2. 根据标签页el-tag：v-model绑定数据，需要设置name属性，如果active的值和el-tab的name值一样，就默认显示那个
        1. 默认active的初始值和name属性一样时，默认显示
        2. 点击某个tab时，被选中的tab的name值会赋值给v-model的值。
    -->
    <el-form class="form" label-position="top" label-width="80px" :model="form">
      <el-tabs v-model="active" @tab-click="changeTab()" tab-position="left">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联选择器 --表单元素 
            options 数据源 []
            selectedOptions []可以有初始值
            -->
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              :props="defaultPro"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="商品参数">
          <!--复选框组
             v-model绑定了数据，说明是表单元素，表单元素外层包裹el-form-item 
             保留一个结构，用v-for遍历
          -->
          <!-- v-model="checkList"，checkList是数组，数组中是默认选中的label值，所以v-model绑定的是有全部label的数组，即item1.attr_vals -->
          <el-form-item v-for="(item1) in arrDy" :key="item1.attr_id" :label="item1.attr_name">
            <el-checkbox-group v-model="item1.attr_vals">
              <!-- attr_vals:"aa,bb,cc,ee"是字符串，不是数组，所以遍历的第一个item2是a ,是items的每个字符
              item2中没有唯一标识id，:key就写i
              -->
              <el-checkbox border v-for="(item2,i) in item1.attr_vals" :key="i" :label="item2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="3" label="商品属性">
           <el-form-item :label="item.attr_name" v-for="(item,i) in arrStatic" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片-----</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容-----</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      // 添加商品的表单数据
      // goods_name	商品名称	不能为空
      // goods_cat	以为','分割的分类列表	不能为空
      // goods_price	价格	不能为空
      // goods_number	数量	不能为空
      // goods_weight	重量	不能为空
      // goods_introduce	介绍	可以为空
      // pics	上传的图片临时路径（对象）	可以为空
      // attrs	商品的参数（数组）	可以为空
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
      // 级联选择器使用的数据
      options: [],
      selectedOptions: [1, 3, 6],
      defaultPro: {
        // label是我们能看到的名字，也就是分类的文本
        // value是唯一标识
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数数组
      arrDy: [],
      // 静态参数数组
      arrStatic: []
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 点任何tab都会触发该事件
    async changeTab() {
      // 判断点的是不是第二个tab
      if (this.active === "2" || this.active == "3") {
        // 判断是否选了三级分类,如果不是三级分类
        if (this.selectedOptions.length !== 3) {
          // 提示
          this.$message.error("请先选择三级分类！");
          return;
        }
        // 获取静态参数数据
        if (this.active === "3") {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          // console.log(res);
          const {
            data,
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.arrStatic = data;
            console.log(this.arrStatic);
            
          }
        }

        // 获取动态参数数据
        if (this.active === "2") {
          // :id是分类id，这里是selectedOptions中的6
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=many`
          );
          // console.log(res);
          const {
            data,
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            // 此时data就是动态参数数据，在data中声明一个数组，接收
            this.arrDy = data;
            // console.log(this.arrDy);
            // this.arrDy中的attr_vals是字符串，我们要的是数组
            // 可以遍历
            this.arrDy.forEach(item => {
              // item.attr_vals = item.attr_vals.split(",");
              // console.log(item.attr_vals);
              // 如果后台返回的数据中有空格，还要去掉空格
              // "  a,b,c,d  "
              // 如果后台返回的是空字符串""，空字符串中没有逗号，不能调用split方法，要判断一下
              // if (item.attr_vals.length === 0) {
              //   // 返回一个空数组，空数组是可以遍历的
              //   item.attr_vals = [];
              // } else {
              //   item.attr_vals = item.attr_vals.trim().split(",");
              // }
              // 三元形式
              item.attr_vals =
                item.attr_vals.trim().length === 0
                  ? []
                  : item.attr_vals.trim().split(",");
              // console.log(item.attr_vals);
            });
          }
        }
      }
    },
    // 获取三级商品分类数据
    async getGoodsCate() {
      // get请求传参数通过查询字符串?传递，type传3表示显示三级分类
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.options = data;
      }
    },

    handleChange() {}
  }
};
</script>

<style>
.box {
  height: 100%;
}
.alert {
  margin-top: 20px;
  margin-bottom: 20px;
}
.form {
  height: 350px;
  overflow: auto;
}
</style>
