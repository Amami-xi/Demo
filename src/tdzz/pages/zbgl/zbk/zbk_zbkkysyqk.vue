<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：指标库 > 指标库可用剩余情况"></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="指标所在地">
          <el-select
            v-model="codeValue"
            clearable
            @change="changeCode"
            @clear="clearOut"
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
          <el-select v-model="statisticsWay" clearable @change="wayChange">
            <el-option
              v-for="item in statisticsWays"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="负值">
          <el-select v-model="negative" clearable @change="negativeChange">
            <el-option
              v-for="item in negatives"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_getTdzzZbkkysyqkList"
            >查询</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData">
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="codeName" label="行政区名称" />
        <el-table-column prop="codeValue" label="行政区代码（账户）" />
        <el-table-column label="可用剩余指标库">
          <el-table-column prop="syGdzb" label="耕地数量（公顷）" />
          <el-table-column prop="syStzb" label="水田规模（公顷）" />
          <el-table-column prop="syCnzb" label="粮食产能（公顷）" />
        </el-table-column>
        <el-table-column label="入库指标库">
          <el-table-column prop="rkGdzb" label="耕地数量（公顷）" />
          <el-table-column prop="rkStzb" label="水田规模（公顷）" />
          <el-table-column prop="rkCnzb" label="粮食产能（公顷）" />
        </el-table-column>
        <el-table-column label="出库指标库">
          <el-table-column prop="ckGdzb" label="耕地数量（公顷）" />
          <el-table-column prop="ckStzb" label="水田规模（公顷）" />
          <el-table-column prop="ckCnzb" label="粮食产能（公顷）" />
        </el-table-column>
      </el-table>
      <pagination
        :total="pages.totalRows"
        :pagesize="queryParams.pagination.pageSize"
        :pageIndex="queryParams.pagination.pageIndex"
        :render="render"
      ></pagination>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import Pagination from "@/common/components/pagination/index";
import { getTdzzRegionCode } from "@/tdzz/api/zbgl/public";
import { getTdzzZbkkysyqkList } from "@/tdzz/api/zbgl/zbk/zbk_zbkkysyqk";

//1.定义数据
const data = reactive({
  tableData: [],
  options: [],
  codeValue: "",
  statisticsWay: "默认统计方式",
  statisticsWays: [
    { value: "0", label: "默认统计方式" },
    { value: "1", label: "按市级" },
    { value: "2", label: "按区/县/市" },
  ],
  negative: "不限",
  negatives: [
    { value: "0", label: "不限" },
    { value: "1", label: "三类指标含负值" },
    { value: "2", label: "耕地数量含负值" },
    { value: "3", label: "水田规模含负值" },
    { value: "4", label: "粮食产能含负值" },
  ],
  queryParams: {
    xzqdm: "",
    statisticsWay: "",
    negative: "",
    startTime: "",
    endTime: "",
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
  codeValue,
  statisticsWay,
  statisticsWays,
  negative,
  negatives,
  queryParams,
  pages,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  //   F_getTdzzZbkkysyqkList();
  F_getTdzzRegionCode();
};

/**
 *
 */
const F_getTdzzZbkkysyqkList = () => {
  getTdzzZbkkysyqkList(data.queryParams).then((res) => {
    data.tableData = res.data;
  });
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
 * 划出行政区变更
 */
const changeCode = (val) => {
  let map = data.options;
  for (var key in map) {
    if (map[key] == val) {
      data.queryParams.xzqdm = key;
    }
  }
};

const clearOut = () => {
  data.queryParams.xzqdm = "";
};

const wayChange = (val) => {
  if (val == "0") {
    data.queryParams.statisticsWay = 0;
  } else if (val == "1") {
    data.queryParams.statisticsWay = 1;
  } else {
    data.queryParams.statisticsWay = 2;
  }
};

const negativeChange = (val) => {
  if (val == "0") {
    data.queryParams.negative = 0;
  } else if (val == "1") {
    data.queryParams.negative = 1;
  } else if (val == "2") {
    data.queryParams.negative = 2;
  } else if (val == "3") {
    data.queryParams.negative = 3;
  } else {
    data.queryParams.negative = 4;
  }
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_init();
};

//3.入口
onMounted(() => {
  F_init();
});
</script>