<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：监测 > 耕地流出监测"></svg-icon>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-tabs
      type="border-card"
      v-model="activeName"
      style="width: 100%;"
    >
      <el-tab-pane label="未下发" name="first" v-if="grade == 1 || grade == 2">
        <Gdlcjc_wxf v-if="activeName == 'first'"></Gdlcjc_wxf>
      </el-tab-pane>
      <el-tab-pane label="未上报" name="first" v-if="grade == 3">
        <Gdlcjc_wbl v-if="activeName == 'first'"></Gdlcjc_wbl>
      </el-tab-pane>
      <el-tab-pane label="未审核" name="second" v-if="grade == 1 || grade == 2">
        <Gdlcjc_wbl v-if="activeName == 'second'"></Gdlcjc_wbl>
      </el-tab-pane>
      <el-tab-pane label="统计查询" name="fourth">
        <Gdlcjc_qb v-if="activeName == 'fourth'"></Gdlcjc_qb>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { ElMessage, ElMessageBox } from "element-plus";
import Gdlcjc_qb from "./gdlcjc_qb";
import Gdlcjc_wxf from "./gdlcjc_wxf";
import Gdlcjc_wbl from "./gdlcjc_wbl";

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