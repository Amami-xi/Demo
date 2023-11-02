<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="调出行政区">
          <el-select
            v-model="outCode"
            clearable
            @change="outXzqdmChange"
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
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="调入行政区">
          <el-select
            v-model="inCode"
            clearable
            @change="inXzqdmChange"
            @clear="clearIn"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调剂状态">
          <el-select v-model="tjStatus" clearable @change="statusChange">
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
        <el-button type="primary" @click="F_getZbhzmxList">查询</el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData">
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="outxzqdm" label="调出行政区" />
        <el-table-column prop="inxzqdm" label="调入行政区" />
        <el-table-column label="耕地数量（公顷）">
          <el-table-column prop="gdzb" label="调出" />
          <el-table-column prop="gdfy" label="单价（万元）" />
        </el-table-column>
        <el-table-column label="水田规模（公顷）">
          <el-table-column prop="stzb" label="调出" />
          <el-table-column prop="stfy" label="单价（万元）" />
        </el-table-column>
        <el-table-column label="粮食产能（公顷）">
          <el-table-column prop="cnzb" label="调出" />
          <el-table-column prop="cnfy" label="单价（万元）" />
        </el-table-column>
        <el-table-column prop="zfy" label="总金额（万元）" />
        <el-table-column
          prop="zbtjsts"
          label="状态"
          :formatter="statusFormat"
        />
        <el-table-column prop="zbtjer" label="操作人" />
        <el-table-column prop="zbtjdate" label="操作时间" />
        <el-table-column prop="remark" label="备注" />
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
import { getTdzzZbtzmx } from "@/tdzz/api/zbgl/zbtj/zbtz/zbtz";
import { getTdzzRegionCode } from "@/tdzz/api/zbgl/public";
import Pagination from "@/common/components/pagination/index";

//1.定义数据
const data = reactive({
  tableData: [],
  options: [],
  outCode: "",
  inCode: "",
  tjStatus: "全部",
  statusList: [
    {
      value: "",
      label: "全部",
    },
    {
      value: "0",
      label: "成功",
    },
    {
      value: "1",
      label: "撤销",
    },
  ],
  queryParams: {
    outXzqdm: "",
    inXzqdm: "",
    startTime: "",
    endTime: "",
    status: "",
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
  outCode,
  inCode,
  tjStatus,
  statusList,
  queryParams,
  pages,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getZbhzmxList();
  F_getTdzzRegionCode();
};

const F_getZbhzmxList = () => {
  getTdzzZbtzmx(data.queryParams).then((res) => {
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
 * 划出行政区变更
 */
const outXzqdmChange = (val) => {
  let map = data.options;
  for (var key in map) {
    if (map[key] == val) {
      data.queryParams.outXzqdm = key;
    }
  }
};

const clearOut = () => {
  data.queryParams.outXzqdm = "";
};

/**
 * 划入行政区变更
 */
const inXzqdmChange = (val) => {
  let map = data.options;
  for (var key in map) {
    if (map[key] == val) {
      data.queryParams.inXzqdm = key;
    }
  }
};

const clearIn = () => {
  data.queryParams.inXzqdm = "";
};

/**
 * 状态变更
 */
const statusChange = (val) => {
  if (val == "0") {
    data.queryParams.status = 0;
  } else if (val == "1") {
    data.queryParams.status = 1;
  } else {
    data.queryParams.status = "";
  }
};

const statusFormat = (row, column) => {
  var status;
  switch (row.zbtjsts) {
    case 0:
      status = "成功";
      break;
    case 1:
      status = "撤销";
      break;
  }
  return status;
};

//3.入口
onMounted(() => {
  F_init();
});
</script>


