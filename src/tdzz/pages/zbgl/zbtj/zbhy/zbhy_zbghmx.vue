<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="归还行政区">
          <el-select
            v-model="queryParams.ghxzqdm"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in districtOptions"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接收行政区">
          <el-select
            v-model="queryParams.jsxzqdm"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in districtOptions"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in status"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_init">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column prop="ghxzq" label="归还行政区" width="120" />
        <el-table-column prop="ghxzqdm" label="归还行政区代码" width="80" />
        <el-table-column prop="gdzb" label="划出耕地数量（公顷）" />
        <el-table-column prop="stzb" label="划出水田规模（公顷）" />
        <el-table-column prop="cnzb" label="划出粮食产能（万公斤）" />
        <el-table-column prop="jsxzq" label="接收行政区" width="120" />
        <el-table-column prop="jsxzqdm" label="接收行政区代码" width="80" />
        <el-table-column prop="status" label="状态" :formatter="statusFormat" />
        <el-table-column prop="operator" label="操作人" />
        <el-table-column
          prop="operationTime"
          label="操作时间"
          :formatter="dateFormat"
          width="90"
        />
        <el-table-column prop="verifier" label="审核人" />
        <el-table-column
          prop="checkTime"
          label="审核时间"
          :formatter="dateFormat"
          width="90"
        />
        <el-table-column prop="checkRemark" label="审核备注" show-overflow-tooltip />
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
</template>
  
<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import Pagination from "@/common/components/pagination/index";
import { getDistrictList } from "@/common/api/jtap/district";
import { getPageList } from "@/tdzz/api/zbgl/zbtj/zbhy/zbghmx";

//1.定义数据
const data = reactive({
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00",
  districtOptions: [],
  tableData: [
    { codeName: "南通市", codeValue: 320600, gdzb: 10, stzb: 20, cnzb: 30 },
    { codeName: "崇川区", codeValue: 320602, gdzb: 10, stzb: 20, cnzb: 30 },
    { codeName: "通州区", codeValue: 320612, gdzb: 10, stzb: 20, cnzb: 30 },
    { codeName: "海安市", codeValue: 320621, gdzb: 10, stzb: 20, cnzb: 30 },
    { codeName: "如东县", codeValue: 320623, gdzb: 10, stzb: 20, cnzb: 30 },
    { codeName: "启东市", codeValue: 320681, gdzb: 10, stzb: 20, cnzb: 30 },
    { codeName: "如皋市", codeValue: 320682, gdzb: 10, stzb: 20, cnzb: 30 },
    { codeName: "海门区", codeValue: 320684, gdzb: 10, stzb: 20, cnzb: 30 },
    { codeName: "高新区", codeValue: 320687, gdzb: 10, stzb: 20, cnzb: 30 },
    {
      codeName: "经济技术开发区",
      codeValue: 320604,
      gdzb: 10,
      stzb: 20,
      cnzb: 30,
    },
    { codeName: "苏锡通园区", codeValue: 320688, gdzb: 10, stzb: 20, cnzb: 30 },
    {
      codeName: "通州湾示范区",
      codeValue: 320699,
      gdzb: 10,
      stzb: 20,
      cnzb: 30,
    },
  ],
  status: [
    { label: "待确认", value: 0 },
    { label: "成功", value: 1 },
    { label: "失败", value: 2 },
  ],
  queryParams: {
    ghxzqdm: "",
    jsxzqdm: "",
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
  hcxzqdm,
  hrxzqdm,
  districtOptions,
  tableData,
  status,
  queryParams,
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
  getPageList(data.queryParams).then((res) => {
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