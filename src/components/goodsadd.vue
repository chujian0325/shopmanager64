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
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
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
          <el-form-item :label="item.attr_name" v-for="(item) in arrStatic" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <!--
            1. action 上传的服务器全路径（全路径网址）
            2. headers 请求头
            3. on-success 成功时的函数
            4. on-remove 移除时的函数
            注意：
            1. action全路径
            之前用axiosAPI设置baseUrl，当用axios发送请求时不用写baseUrl
            上传图片发请求不是axios发请求
            2. 任何非登录请求要授权，授权就要设置头部headers
            之前用了axios拦截器，里面的config.headers[]=token ,这个设置只针对axios请求有效
          -->
          <el-form-item label="商品图片">
            <el-upload
              multiple
              action="http://localhost:8888/api/private/v1/upload/"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <el-button @click="addGoods()">添加商品</el-button>
            <!-- 富文本编辑器 -->
            <quill-editor class="quill" v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
// 1. 根据包说明导入富文本编辑器的样式
// 2. 注册局部组件
// 3. 使用组件：通过组件名+短横线的方式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  // 2. 注册局部组件
  components: {
    quillEditor
  },
  data () {
    return {
      active: '1',
      // 添加商品的表单数据
      // goods_name 商品名称 不能为空
      // goods_price 价格 不能为空
      // goods_number 数量 不能为空
      // goods_weight 重量 不能为空
      // goods_introduce 介绍 可以为空

      // goods_cat 以为','分割的分类列表 不能为空[1,2,3]->"1,2,3"
      // pics 上传的图片临时路径（对象） 可以为空，根据接口文档的响应数据可以得知pics是一个数组，数组中放了对象，对象的值是临时路径 ->pics:[{pic:临时路径}]
      // attrs 商品的参数（数组） 可以为空->参数：动态参数+静态参数
      // ->[{attr_id:?,attr_value:?}] ?的来源->arrDy和arrStatic中每个对象的attr_id和attr_vals
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      // 级联选择器使用的数据
      options: [],
      selectedOptions: [1, 3, 6],
      defaultPro: {
        // label是我们能看到的名字，也就是分类的文本
        // value是唯一标识
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态参数数组
      arrDy: [],
      // 静态参数数组
      arrStatic: [],
      // 请求头
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getGoodsCate()
  },
  methods: {
    // 添加商品
    async addGoods () {
      // 发送请求之前处理之前未处理的数据
      // 1. 处理goods_cat 要的是"1,2,3"
      this.form.goods_cat = this.selectedOptions.join(',')
      // 2. this.form.pics->在图片上传方法中使用splice和push
      // 3. 处理attrs->[{attr_id:?,attr_value:?}]

      // 动态参数数组
      // 1. 能遍历
      // 2. 能返回数组
      // 3. return "abc"/obj  return 啥就能把啥放到数组中并返回
      // -> 数组方法map()
      const arr1 = this.arrDy.map(item => {
        // 要的是
        // item.attr_id
        // item.attr_vals
        // 把上面的两个值变成对象的形式
        // {attr_id:item.attr_id,attr_value:item.attr_vals}
        return { attr_id: item.attr_id, attr_value: item.attr_vals }
      })
      // console.log(arr1);
      // // 如果不知道map方法，可以采用其他遍历方法
      // const obj1 = { attr_id: "", attr_value: "" };
      // const arr1 = [];
      // this.arrDy.forEach(item => {
      //   // 给对象动态添加成员
      //   obj1.attr_id = item.attr_id;
      //   obj1.attr_value = item.attr_vals;
      //   arr1.push(obj1);
      // });
      // console.log(arr1);

      // 静态参数数组
      const arr2 = this.arrStatic.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals }
      })
      // console.log(arr2);
      this.form.attrs = [...arr1, ...arr2]
      // console.log(this.form.attrs);

      const res = await this.$http.post(`goods`, this.form)
      console.log(res)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 201) {
        // 提示
        this.$message.success(msg)
        // 返回列表页
        this.$router.push({
          name: 'goods'
        })
      } else {
        this.$message.error(msg)
      }
    },
    // 图片上传相关方法
    handleRemove (file, fileList) {
      // console.log("remove----");
      // console.log(file);
      // file.response.data.tmp_path 临时路径
      // 移除时，从pics数组中移除当前的图片的临时路径
      // splice()移除，
      // const Index=?;
      // 要找到数组中当前移除的元素，需要遍历
      // 1. 能遍历
      // 2. return 条件的
      // 3. 返回符合条件的索引
      // ->findIndex() ES6数组新增API
      const Index = this.form.pics.findIndex(item => {
        // item是数组中的每个对象 item.pic是临时路径
        // return item.pic=当前移除的图片的临时路径
        return (item.pic = file.response.data.tmp_path)
      })
      this.form.pics.splice(Index, 1)
      // console.log(this.form.pics);
    },
    handleSuccess (response, file, fileList) {
      // console.log("success----");
      // console.log(response);
      // 此时response的上传成功时假的，真正的上传成功应该是在点击添加商品的时候发送请求->上传
      // response.data.tmp_path 临时路径
      // 在有临时路径的地方给数组pics赋值
      this.form.pics.push({
        pic: response.data.tmp_path
      })
      // console.log(this.form.pics);
    },
    // 点任何tab都会触发该事件
    async changeTab () {
      // 判断点的是不是第二个tab
      if (this.active === '2' || this.active === '3') {
        // 判断是否选了三级分类,如果不是三级分类
        if (this.selectedOptions.length !== 3) {
          // 提示
          this.$message.error('请先选择三级分类！')
          // 如果点的是第二个tab，清空动态数组，如果是第三个清空静态数组
          if (this.active === '2') {
            this.arrDy = []
          } else {
            this.arrStatic = []
          }
          return
        }
        // 获取静态参数数据
        if (this.active === '3') {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          )
          // console.log(res);
          const {
            data,
            meta: { status }
          } = res.data
          if (status === 200) {
            this.arrStatic = data
            console.log('静态参数')

            console.log(this.arrStatic)
          }
        }

        // 获取动态参数数据
        if (this.active === '2') {
          // :id是分类id，这里是selectedOptions中的6
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=many`
          )
          // console.log(res);
          const {
            data,
            meta: { status }
          } = res.data
          if (status === 200) {
            // 此时data就是动态参数数据，在data中声明一个数组，接收
            this.arrDy = data
            console.log('动态参数')

            console.log(this.arrDy)
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
                  : item.attr_vals.trim().split(',')
              // console.log(item.attr_vals);
            })
          }
        }
      }
    },
    // 获取三级商品分类数据
    async getGoodsCate () {
      // get请求传参数通过查询字符串?传递，type传3表示显示三级分类
      const res = await this.$http.get(`categories?type=3`)
      // console.log(res);
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.options = data
      }
    },

    handleChange () {}
  }
}
</script>

<style scoped>
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
.ql-editor,
.ql-blank {
  min-height: 200px;
}
</style>
