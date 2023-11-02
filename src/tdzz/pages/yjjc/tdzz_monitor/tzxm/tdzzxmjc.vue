<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：监测 > 土地整治项目监测"></svg-icon>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-tabs
      type="border-card"
      v-model="activeName"
      style="width: 100%;"
    >
      <el-tab-pane label="未下发" name="first" v-if="grade == 1 || grade == 2">
        <Tdxmjc_wxf v-if="activeName == 'first'"></Tdxmjc_wxf>
      </el-tab-pane>
      <el-tab-pane label="未上报" name="first" v-if="grade == 3">
        <Tdxmjc_wbl v-if="activeName == 'first'"></Tdxmjc_wbl>
      </el-tab-pane>
      <el-tab-pane label="未审核" name="second" v-if="grade == 1 || grade == 2">
        <Tdxmjc_wbl v-if="activeName == 'second'"></Tdxmjc_wbl>
      </el-tab-pane>
      <el-tab-pane label="统计查询" name="fourth">
        <Tdxmjc_qb v-if="activeName == 'fourth'"></Tdxmjc_qb>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { ElMessage, ElMessageBox } from "element-plus";
import Tdxmjc_qb from "./tdzzxm_qb";
import Tdxmjc_wxf from "./tdzzxm_wxf";
import Tdxmjc_wbl from "./tdzzxm_wbl";

//1.定义数据
const dlck = ref(null);
const data = reactive({
  activeName: "first",
  grade: store.state.user.grade,
});

const { activeName, grade } = toRefs(data);

//2.定义方法

//3.入口
onMounted(() => {});
</script>