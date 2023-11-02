<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon
        name="wz"
        title="位置：监测 > 耕地后备资源监测（按年度监测）"
      ></svg-icon>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="tlw-row">
    <el-col :span="12">
      <el-table :data="tableData" border>
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="xzqmc" label="行政区" />
        <el-table-column prop="zmj" label="资源总量" />
        <el-table-column prop="gdlrmj" label="耕地流入面积" />
        <el-table-column prop="symj" label="剩余资源" />
      </el-table>
    </el-col>
    <el-col :span="12">
      <div class="tlw-chart" ref="hbzy" style="height: 25rem"></div>
    </el-col>
  </el-row>
</template>
  
  <script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import * as echarts from "echarts";
import { getHbzyList } from "@/tdzz/api/yjjc/jc";

//1.定义数据
const hbzy = ref(null);
const data = reactive({
  tableData: [],
  chartList: [],
});
const { tableData } = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getTableData();
};

const F_getTableData = () => {
  getHbzyList().then((res) => {
    data.tableData = res.data.tableList;
    data.chartList = res.data.chartList;
    getChart();
  });
};

/**
 * 初始化折线图
 */
const getChart = () => {
  const hbzyChart = echarts.init(hbzy.value, null, {});
  const option = {
    grid: {
      top: "10%",
      bottom: "0",
      left: "1%",
      right: "1%",
      containLabel: true,
    },
    tooltip: {},
    dataset: {
      source: data.chartList,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        interval: 0,
        rotate: 45,
      },
    },
    yAxis: {
      name: "单位：公顷",
    },
    series: [
      {
        type: "line",
      },
    ],
  };
  hbzyChart.setOption(option);
};

//3.入口
onMounted(() => {
  F_init();
});
</script>