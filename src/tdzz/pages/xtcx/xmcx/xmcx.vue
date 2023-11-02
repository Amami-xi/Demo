<template>
  <el-form :inline="true" class="tlw-search tlw-search-more" label-width="8rem">
    <el-row>
      <el-col :span="24">
        <el-form-item label="行政区">
          <el-select
            v-model="queryParams.jbxxXzqdm"
            filterable
            clearable
            placeholder="请选择项目行政区"
          >
            <el-option
              v-for="(item, index) in districtOptions"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目年度">
          <el-date-picker
            v-model="queryParams.jbxxNd"
            type="year"
            placeholder="请选择项目年度"
            value-format="YYYY"
            format="YYYY"
            clearable
          />
        </el-form-item>
        <el-form-item label="项目类型">
          <el-select
            v-model="queryParams.businessCode"
            filterable
            clearable
            placeholder="请选择项目类型"
          >
            <el-option
              v-for="(item, index) in businessOptions"
              :key="index"
              :label="item.codeName"
              :value="item.codeValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目阶段">
          <el-select
            v-model="queryParams.catalog"
            filterable
            clearable
            placeholder="请选择项目阶段"
          >
            <el-option
              v-for="(item, index) in xmjdOptions"
              :key="index"
              :label="item.codeName"
              :value="parseInt(item.codeValue)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目状态">
          <el-select
            v-model="queryParams.xmEndStatus"
            filterable
            clearable
            placeholder="请选择项目状态"
          >
            <el-option
              v-for="(item, index) in xmStatusOptions"
              :key="index"
              :label="item.codeName"
              :value="item.codeValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目编号">
          <el-input
            v-model="queryParams.jbxxXmbh"
            placeholder="请输入项目编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            v-model="queryParams.jbxxXmmc"
            placeholder="请输入项目名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="立项申请文件号">
          <el-input
            v-model="queryParams.pcLx"
            placeholder="请输入文件号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="立项申请文件名称">
          <el-input
            v-model="queryParams.pcLxName"
            placeholder="请输入文件名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="验收申请文件号">
          <el-input
            v-model="queryParams.pcYs"
            placeholder="请输入文件号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="验收申请文件名称">
          <el-input
            v-model="queryParams.pcYsName"
            placeholder="请输入文件名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_reset"
            >重置</el-button
          >
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
        <el-table-column label="序号" type="index" width="100">
          <template #default="scope">
            <div style="position: relative">
              <div>{{ scope.$index + 1 }}</div>
              <div class="tlw-shuiy" v-if="scope.row.spzt == 2">立项不通过</div>
              <div class="tlw-shuiy" v-if="scope.row.ysSpzt == 2">
                验收不通过
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="jbxxXzqmc" label="行政区" width="140" />
        <el-table-column prop="businessName" label="项目类型" width="120" />
        <el-table-column prop="jbxxXmbh" label="项目编号" width="120" />
        <el-table-column
          prop="jbxxXmmc"
          label="项目名称"
          width="250"
          show-overflow-tooltip
        />
        <el-table-column
          prop="pcLx"
          label="立项申请文件号"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="pcLxName"
          label="立项申请文件名称"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column prop="lxTimeStart" label="立项受理时间" :formatter="dateFormat" width="120" />
        <el-table-column
          prop="pcYs"
          label="验收申请文件号"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="pcYsName"
          label="验收申请文件名称"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column prop="ysTimeStart" label="验收受理时间" :formatter="dateFormat" width="120" />
        <el-table-column prop="catalog" label="项目阶段" width="100"   fixed="right" />
        <el-table-column
          prop="ssjd"
          label="实施进度"
          width="90"
          fixed="right"
        />
        <!-- <el-table-column label="操作" width="70" v-if="queryParams.xmEndStatus == '3'">
          <el-button>后期管护</el-button>
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
import { reactive, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { getTdzzXmcxList } from "@/tdzz/api/xtcx/xmcx";
import { getDistrictList } from "@/common/api/jtap/district";
import Pagination from "@/common/components/pagination/index";
import { getFlowInstance } from "@/common/api/jtap/workbox";
import store from "@/common/store";
import { useRouter } from "vue-router";
import { getDictList } from "@/common/api/jtap/dict";
import moment from "moment";

//1.定义路由
const router = useRouter();

//2.定义数据
const data = reactive({
  xzqdm: store.state.user.regionCode, //行政区代码
  businessOptions: [], //业务类型列表
  districtOptions: [], //行政区列表
  //项目状态
  xmStatusOptions: [
    {
      codeName: "立项通过",
      codeValue: 1,
    },
    {
      codeName: "立项不通过",
      codeValue: 2,
    },
    {
      codeName: "验收通过",
      codeValue: 3,
    },
    {
      codeName: "验收不通过",
      codeValue: 4,
    },
  ],
  //项目阶段
  xmjdOptions: [],
  tableData: [],
  queryParams: {
    jbxxXzqdm: null,
    businessCode: null,
    jbxxNd: new Date().getFullYear().toString(),
    catalog: null,
    xmEndStatus: null,
    jbxxXmbh: null,
    jbxxXmmc: null,
    pcLx: null,
    pcLxName: null,
    pcYs: null,
    pcYs: null,
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
  businessOptions,
  xmjdOptions,
  districtOptions,
  xmStatusOptions,
  tableData,
  pages,
  queryParams,
} = toRefs(data);

//3.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getDict();
  F_getDistrictList();
  F_getTdzzXmcxList();
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  getDictList("土地整治查询业务类型").then((res) => {
    data.businessOptions = res.data;
  });
  getDictList("项目阶段").then((res) => {
    data.xmjdOptions = res.data.filter((obj) => obj.codeValue != 4);
  });
};

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  getDistrictList(data.xzqdm).then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 获取项目查询列表
 */
const F_getTdzzXmcxList = () => {
  getTdzzXmcxList(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_getTdzzXmcxList();
};

/**
 * 搜索
 */
const F_search = () => {
  data.queryParams.pagination.pageIndex = 1;
  F_getTdzzXmcxList();
};

/**
 * 重置
 */
const F_reset = () => {
  data.queryParams = {
    jbxxXzqdm: null,
    businessCode: null,
    jbxxNd: new Date().getFullYear().toString(),
    catalog: null,
    xmEndStatus: null,
    jbxxXmbh: null,
    jbxxXmmc: null,
    pcLx: null,
    pcLxName: null,
    pcYs: null,
    pcYs: null,
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  };
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
  return moment(date).format("YYYY-MM-DD");
};

/**
 * 双击行（打开流程）
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row, column, event) => {
  let guid = row.flowinstid;
  if (row.flowinstidSs) {
    guid = row.flowinstidSs;
  }
  if (row.flowinstidYs) {
    guid = row.flowinstidYs;
  }
  getFlowInstance(guid).then((res) => {
    const flowInstance = res.data;
    const newpage = router.resolve({
      name: "tdzz_runtime_main",
      query: {
        flowinstid: flowInstance.id,
        taskId: flowInstance.taskId,
        businessCode: row.businessCode,
        businessName: row.businessName,
        flowAction: "VIEW",
        catalog: row.catalog,
        materialType: "项目材料",
        jbxxSec: row.jbxxSec,
      },
    });
    window.open(newpage.href, "_blank");
  });
};

//3.入口
onMounted(() => {
  F_init();
});
</script>