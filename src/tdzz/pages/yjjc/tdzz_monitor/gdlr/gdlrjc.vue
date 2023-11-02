<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：监测 > 耕地流入监测"></svg-icon>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-tabs
      type="border-card"
      v-model="activeName"
      style="width: 100%;"
    >
      <el-tab-pane label="未下发" name="first" v-if="grade == 1 || grade == 2">
        <Gdlrjc_wxf v-if="activeName == 'first'"></Gdlrjc_wxf>
      </el-tab-pane>
      <el-tab-pane label="未上报" name="first" v-if="grade == 3">
        <Gdlrjc_wxf v-if="activeName == 'first'"></Gdlrjc_wxf>
      </el-tab-pane>
      <el-tab-pane label="未审核" name="second" v-if="grade == 1 || grade == 2">
        <Gdlrjc_wbl v-if="activeName == 'second'"></Gdlrjc_wbl>
      </el-tab-pane>
      <el-tab-pane label="统计查询" name="fourth">
        <Gdlrjc_qb v-if="activeName == 'fourth'"></Gdlrjc_qb>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { ElMessage, ElMessageBox } from "element-plus";
import Gdlrjc_qb from "./gdlrjc_qb";
import Gdlrjc_wxf from "./gdlrjc_wxf";
import Gdlrjc_wbl from "./gdlrjc_wbl";

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