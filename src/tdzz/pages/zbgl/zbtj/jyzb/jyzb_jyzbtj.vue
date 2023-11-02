<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="行政区选择">
          <el-select
            v-model="xzqdm"
            clearable
            @change="xzqdmChange"
            @clear="clearXzqdm"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统计方式">
          <el-select v-model="statistics" clearable @change="statisticsChange">
            <el-option
              v-for="item in statisticsWay"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-checkbox
          v-model="include"
          label="包含下级行政区指标"
          size="large"
          @change="checkChange"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="F_getJyzbtjList">统计</el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="" label="行政区名称" />
        <el-table-column prop="" label="行政区代码（账户）" />
        <el-table-column label="可借信用指标额度">
          <el-table-column prop="" label="耕地数量（公顷）" />
          <el-table-column prop="" label="水田规模（公顷）" />
          <el-table-column prop="" label="粮食产能（公斤）" />
        </el-table-column>
        <el-table-column label="已借信用指标">
          <el-table-column prop="" label="耕地数量（公顷）" />
          <el-table-column prop="" label="水田规模（公顷）" />
          <el-table-column prop="" label="粮食产能（公斤）" />
        </el-table-column>
        <el-table-column label="剩余可借信用指标额度">
          <el-table-column prop="" label="耕地数量（公顷）" />
          <el-table-column prop="" label="水田规模（公顷）" />
          <el-table-column prop="" label="粮食产能（公斤）" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { getTdzzJyzbtj } from "@/tdzz/api/zbgl/zbtj/jyzb/jyzb";
import { getTdzzRegionCode } from "@/tdzz/api/zbgl/public";
import Pagination from "@/common/components/pagination/index";

//1.定义数据
const data = reactive({
  tableData: [],
  options: [],
  xzqdm: "",
  statistics: "默认统计方式",
  statisticsWay: [
    {
      value: "0",
      label: "默认统计方式",
    },
    {
      value: "1",
      label: "按市级统计",
    },
    {
      value: "2",
      label: "按县级统计",
    },
  ],
  queryParams: {
    xzqdm: "",
    startTime: "",
    endTime: "",
    statisticsWay: "",
    include: "",
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  pages: {
    totalRows: 0,
    totalPages: 0,
  },
});

const {
  tableData,
  options,
  xzqdm,
  statistics,
  statisticsWay,
  queryParams,
  pages,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getJyzbtjList();
  F_getTdzzRegionCode();
};

const F_getJyzbtjList = () => {
  getTdzzJyzbtj(data.queryParams).then((res) => {
    data.tableData = res.data;
  });
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_init();
};

/**
 * 查询行政区代码
 */
const F_getTdzzRegionCode = () => {
  getTdzzRegionCode().then((res) => {
    data.options = res.data;
  });
};

/**
 * 行政区变更
 */
const xzqdmChange = (val) => {
  let map = data.options;
  for (var key in map) {
    if (map[key] == val) {
      data.queryParams.xzqdm = key;
    }
  }
};

const clearXzqdm = () => {
  data.queryParams.xzqdm = "";
};

const statisticsChange = (val) => {
  data.queryParams.statisticsWay = val;
};

const checkChange = (checked, val) => {
  if (checked) {
    data.queryParams.include = "0";
  } else {
    data.queryParams.include = "1";
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>


