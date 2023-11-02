<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon
        name="wz"
        title="位置：预警 > 土地整治项目实施完成率"
      ></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="所属区" v-if="grade == 1">
          <el-select
            v-model="xzqdm"
            placeholder="请选择区"
            filterable
            clearable
            @change="F_xzqChange"
          >
            <el-option
              :label="item.name"
              :value="item.code"
              v-for="(item, index) in districtOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属镇" v-if="grade == 1 || grade == 2">
          <el-select
            v-model="xzqdmFull"
            placeholder="请选择镇"
            filterable
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.code"
              v-for="(item, index) in districtFullOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_search"
            >搜索</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row" :gutter="20">
    <el-col :span="12">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="name" label="项目类型" />
        <el-table-column prop="value" label="完成率(%)" width="160" />
        <el-table-column label="预警" width="100">
          <template #default="scope">
            <el-tag
              v-if="scope.row.value < 90"
              type="danger"
              effect="dark"
              round
              size="small"
              class="tlw-point"
            ></el-tag>
            <el-tag
              v-else
              type="success"
              effect="dark"
              round
              size="small"
              class="tlw-point"
            ></el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12">
      <div class="tlw-chart" ref="sswclChart" style="height: 25rem"></div>
    </el-col>
  </el-row>
</template>
  
<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { getDistrictList } from "@/common/api/jtap/district";
import { getSslylYjList } from "@/tdzz/api/yjjc/yj";
import store from "@/common/store";
import { useRoute } from "vue-router";
import * as echarts from "echarts";

//1.定义数据
const sswclChart = ref(null);
const data = reactive({
  districtOptions: [], //行政区列表
  districtFullOptions: [], //镇列表
  selection: [],
  xzqdm: "",
  xzqdmFull: "",
  user: store.state.user,
  grade: store.state.user.grade,
  tableData: [],
  queryParams: {
    xzqdm: null,
  },
});
const {
  grade,
  xzqdm,
  xzqdmFull,
  districtOptions,
  districtFullOptions,
  tableData,
  pages,
  queryParams,
} = toRefs(data);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  if (data.grade == 1) {
    F_getDistrictList();
  } else if (data.grade == 2) {
    F_getCountrySideList(data.user.regionCode);
  }
  F_getTableData();
};

/**
 * 行政区change事件
 *
 * @param {*} val
 */
const F_xzqChange = (val) => {
  if (val.length > 0) {
    F_getCountrySideList(val);
  } else {
    data.xzqdmFull = null;
    data.districtFullOptions = [];
  }
};

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  getDistrictList(data.user.regionCode).then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 获取镇列表
 */
const F_getCountrySideList = (val) => {
  getDistrictList(val).then((res) => {
    data.districtFullOptions = res.data;
  });
};

/**
 * 面积格式化（保留4位小数）
 * @param {*} row
 * @param {*} column
 */
const floatFormatter = (row, column) => {
  var mj = row[column.property];
  if (mj === undefined || mj == null) {
    mj = 0;
  }
  return Number.parseFloat(mj).toFixed(4);
};

/**
 * 获取数据
 */
const F_getTableData = () => {
  if (data.xzqdmFull) {
    data.queryParams.xzqdm = data.xzqdmFull;
  } else {
    data.queryParams.xzqdm = data.xzqdm;
  }
  getSslylYjList(data.queryParams).then((res) => {
    data.tableData = res.data;
    getChart();
  });
};

const getChart = () => {
  const chart = echarts.init(sswclChart.value, null, {});
  const option = {
    grid: {
      top: "10%",
      bottom: "0",
      left: "1%",
      right: "1%",
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "axis",
      formatter: (params) => {
        return params[0].data.name + "   " + params[0].data.value + "%";
      },
    },
    dataset: {
      source: data.tableData,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        interval: 0,
        rotate: 45,
      },
    },
    yAxis: {
      name: "单位：%",
    },
    series: [
      {
        type: "line",
      },
    ],
  };
  chart.setOption(option);
};

/**
 * 搜索
 */
const F_search = () => {
  F_getTableData();
};

//3.入口
onMounted(() => {
  F_init();
});
</script>