<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cus-bread level1="商品管理" level2="分类参数"></cus-bread>
    <!-- 提示框 -->
    <el-alert class="alert" title="注意：只允许为第三级分类设置参数" type="warning" show-icon></el-alert>
    <!-- 级联选择器 -->
    <el-form class="form" label-position="left" label-width="120px" :model="form">
      <el-form-item label="请选择商品分类">
        {{selectedOptions}}
        <el-cascader
          :show-all-levels="false"
          clearable
          expand-trigger="hover"
          :options="options"
          :props="defaultPro"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- tab切换 -->
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <el-button disabled>设置动态参数</el-button>
        <!-- 表格 -->
        <el-table border stripe :data="arrDy" style="width: 100%">
          <!-- 展开
            展开要的不是prop的内容，加个template,设置slot-scope="scope"
          -->
          <el-table-column type="expand" width="100">
            <template slot-scope="scope">
              <!-- 动态tag编辑 
              scope.row 是动态数组中的每个对象
              -->
              <el-tag
                :key="i"
                v-for="(item,i) in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,item)"
              >{{item}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <!-- 序号 -->
          <el-table-column type="index" label="#" width="120"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      form: {},
      // 级联选择器使用的数据
      options: [],
      selectedOptions: [],
      defaultPro: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数数据
      arrDy: [],
      // 静态参数数据
      arrStatic: [],
      // 动态tag数据
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 动态tag编辑相关方法
    // 删除
    async handleClose(obj, item) {
      // obj是scope.row，即动态数组中的每个对象，对象点数组attr_vals是要遍历的tag数组
      obj.attr_vals.splice(obj.attr_vals.indexOf(item), 1);
      // 删除发送请求
      // :id	分类 ID	这里是三级分类id，是selectedOptions数组中下标为2的元素
      // :attrId	属性 ID->attr_id
      //状态码400--> msg: "参数 attr_sel 类型必须为 only 或 many"
      // put请求修改数据要做两件事：1. 找到要修改的数据（分类id+属性id）2. 告诉他新数据是谁
      // put请求需要请求体
      // {
      //   attr_name:'',
      //   attr_sel:'',
      //   attr_vals:''
      // }
      // attr_name	属性名	分类名，数据中每个对象的attr_name
      // attr_sel	many或only
      // attr_vals	属性值
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
        {
          attr_name: obj.attr_name,
          attr_sel: obj.attr_sel,
          attr_vals: obj.attr_vals.join(",")
        }
      );
      // console.log(res);
      //数据库错误-> sql: "UPDATE `sp_attribute` SET `cat_id` = '6', `attr_vals` = ('aa', 'bb', 'cc') WHERE `attr_id` = 3077"
      // 数据库操作里面都是字符串，不能写数组，而我们的obj.attr_vals是数组，给它转成以逗号分隔的字符串
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 添加
    async handleInputConfirm(obj) {
      let inputValue = this.inputValue;
      if (inputValue) {
        obj.attr_vals.push(inputValue);
        // 按照新数组发送添加的请求
        const res = await this.$http.put(
          `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
          {
            attr_name: obj.attr_name,
            attr_sel: obj.attr_sel,
            attr_vals: obj.attr_vals.join(",")
          }
        );
        console.log(res);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleClick() {},
    // 级联的label改变时触发该事件
    async handleChange() {
      // 如果级联的数组的长度是不是3
      if (this.selectedOptions.length !== 3) {
        // 提示
        this.$message.warning("请先选择三级分类！");
        return;
      }
      // 获取动态参数数据
      if (this.active === "1") {
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
          this.arrDy = data;
          console.log("动态参数");

          console.log(this.arrDy);
          this.arrDy.forEach(item => {
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
            // console.log(item.attr_vals);
          });
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
    }
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
