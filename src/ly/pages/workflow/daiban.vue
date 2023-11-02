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
        <el-table-column prop="businessName" label="项目类型" width="300" />
        <el-table-column prop="xmbh" label="项目编号" width="220" />
        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip />
        <el-table-column
          prop="currentStepName"
          label="当前环节"
          show-overflow-tooltip
          width="400"
        />
        <el-table-column
          prop="incomingTime"
          label="转入时间"
          width="220"
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
import { getDaibanList } from "@/ly/api/workflow/workflow";
import { openTask } from "@/common/api/jtap/taskHandle";
import Pagination from "@/common/components/pagination/index";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import moment from "moment";
import { getBusinessList } from "@/common/api/jtap/business";

//1.定义路由
const router = useRouter();

//2.定义数据
const data = reactive({
  businessOptions: [], //业务类型
  tableData: [],
  queryParams: {
    appCodes: import.meta.env.VITE_APP_LYSP_NAME, //业务子代码
    businessCode: "", //业务编码
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

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getBusinessList();
  F_getDaibanList();
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
const F_getDaibanList = () => {
  getDaibanList(data.queryParams).then((res) => {
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
  F_getDaibanList();
};

/**
 * 搜索
 */
const F_search = () => {
  F_init();
};

/**
 * 打开待办
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row, column, event) => {
  //1.先激活任务
  openTask(row.flowInstId, row.stepInstId).then((res) => {
    //2.进入流程主页
    const newpage = router.resolve({
      name: "ly_runtime_main",
      query: {
        flowinstid: row.flowInstId,
        taskId: row.stepInstId,
        businessCode: row.businessCode,
        flowAction: "EDIT",
      },
    });
    window.open(newpage.href, "_blank");
  });
};

//3.入口
onMounted(() => {
  F_init();
  //定义监听事件，刷新待办
  window.addEventListener("message", function (e) {
    if (e.data == "ly-daiban-refresh") {
      F_getDaibanList();
    }
  });
});
</script>

