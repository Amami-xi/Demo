<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：系统管理 > 项目意见类型配置"></svg-icon>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="占补平衡" name="first">
          <xmyj_list
            v-if="activeName == 'first'"
            name="土整项目意见-占补平衡"
          ></xmyj_list>
        </el-tab-pane>
        <el-tab-pane label="旱改水" name="second">
          <xmyj_list
            v-if="activeName == 'second'"
            name="土整项目意见-旱改水"
          ></xmyj_list>
        </el-tab-pane>
        <el-tab-pane label="增减挂钩" name="third">
          <xmyj_list
            v-if="activeName == 'third'"
            name="土整项目意见-增减挂钩"
          ></xmyj_list>
        </el-tab-pane>
        <el-tab-pane label="工矿废弃地" name="fourth">
          <xmyj_list
            v-if="activeName == 'fourth'"
            name="土整项目意见-工矿废弃地"
          ></xmyj_list>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
    
<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import xmyj_list from "./xmyj_list.vue";

//1.定义数据
const data = reactive({
  activeName: "first",
});

const { activeName } = toRefs(data);

//2.定义方法

//3.入口
onMounted(() => {});
</script>