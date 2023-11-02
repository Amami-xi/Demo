<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="行政区" v-if="xzqQx">
          <el-select v-model="queryParams.xzqdm" filterable clearable>
            <el-option
              v-for="(item, index) in districtOptions"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目编号">
          <el-input
            v-model="queryParams.xmbh"
            placeholder="请输入项目编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            v-model="queryParams.xmmc"
            placeholder="请输入项目名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_init" size="small"
            >查询</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe @row-dblclick="openWorkbox">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column
          prop="xzqhdm"
          label="行政区"
          width="180"
          :formatter="xzqFormatter"
        />
        <el-table-column prop="xmbh" label="项目编号" />
        <el-table-column prop="xmmc" label="项目名称" />
        <el-table-column
          prop="updateTime"
          label="年度"
          width="180"
          :formatter="dateFormat"
        />
        <el-table-column prop="cfxj" label="总蓄积" />
        <el-table-column prop="cfmjSpl" label="商品林蓄积" />
        <el-table-column prop="cfmjGyl" label="公益林蓄积" />
        <el-table-column prop="isxe" label="是否占限额" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="F_hqgh(scope.row)"
              ><el-icon class="el-icon--left"> <Edit /> </el-icon
              >后期管护</el-button
            >
          </template>
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
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Pagination from "@/common/components/pagination/index";
import moment from "moment";
import { onMounted } from "@vue/runtime-core";
import { queryPage } from "@/ly/api/proj/cf";
import { getDistrictList } from "@/common/api/jtap/district";
import { findLastTask } from "@/ly/api/workflow/workflow";
import store from "@/common/store";

//1.定义路由
const router = useRouter();

//2.定义数据
const data = reactive({
  tableData: [],
  businessList: [],
  queryParams: {
    xzqhdm:
      store.state.user.organizationGrade == "市局"
        ? ""
        : store.state.user.regionCode, //行政区代码
    xmbh: "", //项目编号
    xmmc: "", //项目名称
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  xzqQx: store.state.user.organizationGrade == "市局" ? true : false, //行政区查询按钮权限
  pages: {
    totalRows: 0,
  },
  districtOptions: [], //行政区列表
});
const { tableData, districtOptions, pages, queryParams, businessList, xzqQx } =
  toRefs(data);

//3.定义方法

/**
 * 分页查询列表
 */
const F_init = () => {
  F_getDistrictList();
  queryPage(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  getDistrictList("320600").then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 时间格式转换
 *
 * @param {*} row
 * @param {*} column
 */
const dateFormat = (row, column) => {
  let date = row[column.property];
  if (date === undefined || date == null) {
    return "";
  }
  return moment(date).format("YYYY");
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_init();
};

/**
 * 行政区格式转换
 *
 * @param {*} row
 * @param {*} column
 */
const xzqFormatter = (row, column) => {
  let val = row[column.property] + "";
  let xzqdmList = val.split(",");
  let xzqdmcList = [];
  for (var i = 0; i < xzqdmList.length; i++) {
    let xzq = data.districtOptions.find((value) => value.code === xzqdmList[i]);
    if (xzq) {
      xzqdmcList.push(xzq.name);
    }
  }
  return xzqdmcList.toString();
};

/**
 * 打开后期管护页面
 */
 const F_hqgh = (row) => {
  router.push({
    name: "hqgh_main",
    query: { guid:row.flowinstid },
  });
};

/**
 * 打开已办
 */
const openWorkbox = (row, column, event) => {
  findLastTask(row.flowinstid).then((res) => {
    let lastStepInstId = res.data;
    if (lastStepInstId) {
      const newpage = router.resolve({
        name: "ly_runtime_main",
        query: {
          flowinstid: row.flowinstid,
          taskId: lastStepInstId,
          flowAction: "VIEW",
        },
      });
      window.open(newpage.href, "_blank");
    }
  });
};

//4.入口
onMounted(() => {
  F_init();
});
</script>