<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="选择行政区">
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
        <el-form-item label="操作时间">
          <el-date-picker
            v-model="queryParams.startTime"
            type="date"
            placeholder="请选择"
            clearable
            value-format="YYYY-MM-DD HH:mm:ss"
          />
          <span style="margin: 0 10px">至</span>
          <el-date-picker
            v-model="queryParams.endTime"
            type="date"
            placeholder="请选择"
            clearable
            value-format="YYYY-MM-DD 59:59:59"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="status" clearable @change="statusChange">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="F_getGhzbmxList">查询</el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="xzqdm" label="行政区名称" />
        <el-table-column prop="gdzb" label="耕地数量（公顷）" />
        <el-table-column prop="stzb" label="水田规模（公顷）" />
        <el-table-column prop="cnzb" label="粮食产能（公斤）" />
        <el-table-column prop="sfyx" label="状态" />
        <el-table-column prop="czr" label="操作人" />
        <el-table-column prop="czsj" label="操作时间" />
        <el-table-column prop="bz" label="备注" />
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
import { getTdzzGhzbmx } from "@/tdzz/api/zbgl/zbtj/ghzb/ghzb";
import { getTdzzRegionCode } from "@/tdzz/api/zbgl/public";
import Pagination from "@/common/components/pagination/index";

//1.定义数据
const data = reactive({
  tableData: [],
  options: [],
  xzqdm: "",
  status: "全部",
  statusList: [
    {
      value: "",
      label: "不限",
    },
    {
      value: "0",
      label: "有效",
    },
    {
      value: "1",
      label: "无效",
    },
  ],
  queryParams: {
    xzqdm: "",
    status: "",
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

const { tableData, options, status, statusList, queryParams, pages } =
  toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getGhzbmxList();
  F_getTdzzRegionCode();
};

const F_getGhzbmxList = () => {
  getTdzzGhzbmx(data.queryParams).then((res) => {
    data.tableData = res.data.content;
    data.pages.totalRows = res.data.totalElements;
    data.pages.totalPages = res.data.totalPages;
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

/**
 * 状态变更
 */
const statusChange = (val) => {
  data.queryParams.status = val;
};

//3.入口
onMounted(() => {
  F_init();
});
</script>


