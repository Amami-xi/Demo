<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="项目类型">
          <el-select v-model="queryParams.businessCode" filterable clearable>
            <el-option
              v-for="(item, index) in businessOptions"
              :key="index"
              :label="item.businessName"
              :value="item.businessCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请文件号">
          <el-input
            v-model="queryParams.xmbh"
            placeholder="请输入申请文件号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="申请文件名称">
          <el-input
            v-model="queryParams.xmmc"
            placeholder="请输入申请文件名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_search"
            >搜索</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe @row-dblclick="openWorkbox">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="businessName" label="项目类型" width="180" />
        <el-table-column
          prop="xmbh"
          label="申请文件号"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="xmmc"
          label="申请文件名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="incomingTime"
          label="办结时间"
          width="180"
          :formatter="dateFormat"
        />
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
import { getBanjieList } from "@/tdzz/api/workflow/workflow";
import Pagination from "@/common/components/pagination/index";
import moment from "moment";
import { onMounted } from "@vue/runtime-core";
import { getBusinessList } from "@/common/api/jtap/business";

//1.定义路由
const router = useRouter();

//2.定义数据
const data = reactive({
  businessOptions: [], //业务类型
  tableData: [],
  queryParams: {
    appCodes: import.meta.env.VITE_APP_TDZZ_NAME, //业务子代码
    businessCode: "", //业务类型
    xmbh: "", //项目编号
    xmmc: "", //项目名称
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  pages: {
    totalRows: 0,
  },
});
const { businessOptions, tableData, pages, queryParams } = toRefs(data);

//3.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getBusinessList();
  F_getBanjieList();
};

/**
 * 获取业务类型列表
 */
const F_getBusinessList = () => {
  getBusinessList(data.queryParams.appCodes).then((res) => {
    data.businessOptions = res.data;
  });
};

/**
 * 获取办结列表
 */
const F_getBanjieList = () => {
  getBanjieList(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
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
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_getBanjieList();
};

/**
 * 搜索
 */
const F_search = () => {
  F_getBanjieList();
};

/**
 * 打开办结
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row, column, event) => {
  const newpage = router.resolve({
    name: "tdzz_runtime_main",
    query: {
      flowinstid: row.flowInstId,
      taskId: row.lastStepInstId,
      businessCode: row.businessCode,
      businessName: row.businessName,
      flowAction: "VIEW",
      catalog: row.catalog,
    },
  });
  window.open(newpage.href, "_blank");
};

//4.入口
onMounted(() => {
  F_init();
});
</script>