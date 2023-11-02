<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：系统管理 > 新增耕地来源地类"></svg-icon>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="占补平衡" name="first">
          <lydl_xzgd
            v-if="activeName == 'first'"
            name="占补平衡-地类编码"
          ></lydl_xzgd>
        </el-tab-pane>
        <el-tab-pane label="旱改水" name="second">
          <lydl_xzgd
            v-if="activeName == 'second'"
            name="旱改水-地类编码"
          ></lydl_xzgd>
        </el-tab-pane>
        <el-tab-pane label="增减挂钩" name="third">
          <lydl_xzgd
            v-if="activeName == 'third'"
            name="增减挂-地类编码"
          ></lydl_xzgd>
        </el-tab-pane>
        <el-tab-pane label="工矿废弃地" name="fourth">
          <lydl_xzgd
            v-if="activeName == 'fourth'"
            name="工矿复垦-地类编码"
          ></lydl_xzgd>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
    
<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import lydl_xzgd from "./lydl_xzgd";

//1.定义数据
const data = reactive({
  activeName: "first",
});

const { activeName } = toRefs(data);

//2.定义方法

//3.入口
onMounted(() => {});
</script>