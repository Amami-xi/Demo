<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon
        name="wz"
        title="位置：监测 > 耕地质量等别（按年度监测）"
      ></svg-icon>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="tlw-row">
    <el-col :span="12">
      <el-table
        class="tlw-clear-rowstyle"
        :data="tableData"
        border
        :row-style="F_rowStyle"
        @row-click="F_getChart"
      >
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="xzqmc" label="行政区" />
        <el-table-column prop="zldb" label="平均质量等别" />
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
import { getGdzldbList, getGdzldbByYear } from "@/tdzz/api/yjjc/jc";

//1.定义数据
const hbzy = ref(null);
const data = reactive({
  tableData: [],
  chartList: [],
  currentSelectRow: "",
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
  getGdzldbList().then((res) => {
    data.tableData = res.data.tableList;
    F_getChart(data.tableData[0]);
  });
};

const F_getChart = (row) => {
  data.currentSelectRow = row.xzqmc;
  getGdzldbByYear().then((res) => {
    data.chartList = res.data;
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
      name: "                     单位：质量等别",
    },
    series: [
      {
        type: "line",
      },
    ],
  };
  hbzyChart.setOption(option);
};

/**
 * 表格行样式
 *
 * @param {Object} param0
 */
const F_rowStyle = ({ row }) => {
  if (data.currentSelectRow == row.xzqmc) {
    return { backgroundColor: "#f3d19e" };
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>