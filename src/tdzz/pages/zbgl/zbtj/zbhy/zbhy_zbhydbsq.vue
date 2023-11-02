<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="行政区">
          <el-select v-model="queryParams.xzqdm" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in districtOptions"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_getPageList">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column prop="xzq" label="行政区" width="100" />
        <el-table-column prop="xzqdm" label="行政区代码" width="80" />
        <el-table-column prop="hyqgdzb" label="还原前耕地数量（公顷）" />
        <el-table-column prop="hyqstzb" label="还原前水田规模（公顷）" />
        <el-table-column prop="hyqcnzb" label="还原前粮食产能（万公斤）" />
        <el-table-column prop="hyhgdzb" label="还原后耕地数量（公顷）" />
        <el-table-column prop="hyhstzb" label="还原后水田规模（公顷）" />
        <el-table-column prop="hyhcnzb" label="还原后粮食产能（万公斤）" />
        <el-table-column prop="status" label="状态" :formatter="statusFormat" />
        <el-table-column prop="operator" label="操作人" />
        <el-table-column
          prop="operationTime"
          label="操作时间"
          :formatter="dateFormat"
        />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" v-if="data.grade == '市局'" width="200">
          <template #default="scope">
            <el-button
              size="small"
              @click="handlePass(scope.row)"
              type="success"
              >通过</el-button
            >
            <el-button
              size="small"
              @click="handleNoPass(scope.row)"
              type="danger"
              >不通过</el-button
            >
          </template>
        </el-table-column>
        <!-- <template #default="scope"> </template> -->
        <!-- <el-table-column label="指标明细" width="100">
              </el-table-column> -->
      </el-table>
      <pagination
        :total="pages.totalRows"
        :pagesize="queryParams.pagination.pageSize"
        :pageIndex="queryParams.pagination.pageIndex"
        :render="render"
      ></pagination>
    </el-col>
  </el-row>
  <BZ ref="bz" @handleOk="handleOk"></BZ>
</template>
    
    <script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import Pagination from "@/common/components/pagination/index";
import { getDistrictList } from "@/common/api/jtap/district";
import { confirmToHy } from "@/tdzz/api/zbgl/zbtj/zbhy/zbk";
import { getPageWait } from "@/tdzz/api/zbgl/zbtj/zbhy/zbhymx";
import BZ from "./zbhy_bz";

//1.定义数据
const bz = ref(null);
const data = reactive({
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00",
  grade: store.state.user.organizationGrade,
  districtOptions: [],
  tableData: [],
  status: [
    { label: "待确认", value: 0 },
    { label: "成功", value: 1 },
    { label: "失败", value: 2 },
  ],
  row: {},
  queryParams: {
    xzqdm: "",
    status: 0,
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  params: {
    zbhymxSec: "",
    status: 1,
    checkRemark: "",
  },
  pages: {
    totalRows: 0,
    totalPages: 0,
  },
});

const {
  xzqdm,
  grade,
  districtOptions,
  tableData,
  status,
  row,
  queryParams,
  params,
  pages,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getTdzzRegionCode();
  F_getPageList();
};

/**
 * 查询行政区代码
 */
const F_getTdzzRegionCode = () => {
  getDistrictList(data.xzqdm).then((res) => {
    data.districtOptions = res.data;
  });
};

const F_getPageList = () => {
  getPageWait(data.queryParams).then((res) => {
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
 * 通过
 * @param {*} row
 */
const handlePass = (row) => {
  data.params.zbhymxSec = row.sec;
  data.params.status = 1;
  confirmToHy(data.params).then((res) => {
    F_getPageList();
  });
};

/**
 * 弹框
 * @param {*} row
 */
const handleNoPass = (row) => {
  data.row = row;
  bz.value.handleOpen();
};

/**
 * 不通过
 * @param {*} row
 */
const handleOk = (remark) => {
  data.params.zbhymxSec = data.row.sec;
  data.params.status = 2;
  data.params.checkRemark = remark;
  confirmToHy(data.params).then((res) => {
    F_getPageList();
  });
};

const statusFormat = (row, column) => {
  if (column.property == "status") {
    if (row.status == 0) {
      return "待确认";
    } else if (row.status == 1) {
      return "成功";
    } else if (row.status == 2) {
      return "失败";
    }
  } else {
    return row[column.property];
  }
};

/**
 * 时间转换
 * @param {*} row
 * @param {*} column
 * @param {*} cellValue
 * @param {*} index
 */
const dateFormat = (row, column, cellValue, index) => {
  console.log(row, column, cellValue, index);
  const daterc = row[column.property];
  if (daterc != null) {
    var date = new Date(daterc);
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始，11结束，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return (
      year + "-" + month + "-" + day
      // " " +
      // hours +
      // ":" +
      // minutes +
      // ":" +
      // seconds
    );
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>