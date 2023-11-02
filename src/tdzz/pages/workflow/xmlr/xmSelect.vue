<template>
  <el-dialog
    v-model="dialogVisible"
    :title="data.rowdata.catalog + '项目选择'"
    :before-close="handleClose"
    fullscreen
    append-to-body
  >
    <el-form
      :inline="true"
      class="tlw-search tlw-search-more"
      label-width="8rem"
    >
      <el-row>
        <el-col :span="24">
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
          <el-form-item label="实施申请文件号">
            <el-input
              v-model="queryParams.pcSs"
              placeholder="请输入文件号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="实施申请文件名称">
            <el-input
              v-model="queryParams.pcSsName"
              placeholder="请输入文件名称"
              clearable
            ></el-input>
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
        <el-button type="primary" size="small" @click="F_batchSelect"
          >批量选择</el-button
        >
      </el-col>
    </el-row>
    <el-row class="tlw-row">
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          stripe
          @row-dblclick="openWorkbox"
          @selection-change="F_handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" type="index" width="80" />
          <el-table-column prop="jbxxXzqmc" label="行政区" width="180" />
          <el-table-column prop="businessName" label="项目类型" width="180" />
          <el-table-column prop="pcLx" label="立项申请文件号" width="260" />
          <el-table-column
            prop="pcLxName"
            label="立项申请文件名称"
            show-overflow-tooltip
          />
          <el-table-column prop="jbxxXmbh" label="项目编号" width="260" />
          <el-table-column
            prop="jbxxXmmc"
            label="项目名称"
            show-overflow-tooltip
          />
          <el-table-column label="操作" width="220">
            <template #default="scope">
              <el-button
                @click="openWorkbox(scope.row)"
                type="primary"
                size="small"
                ><el-icon><CircleCheck /></el-icon>选择录入</el-button
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
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { queryPage } from "@/tdzz/api/proj/proj-jbxx";
import { batchSelect } from "@/tdzz/api/proj/proj-jbxx";
import Pagination from "@/common/components/pagination/index";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { CircleCheck } from "@element-plus/icons-vue";

//1.定义路由
const router = useRouter();
const route = useRoute();
//2.定义数据
const data = reactive({
  tableData: [],
  dialogVisible: false,
  rowdata: {},
  businessCode: "",
  catalog: "",
  flowinstid: "",
  selection: [],
  queryParams: {
    pcLx: null,
    pcLxName: null,
    pcSs: null,
    pcSsName: null,
    jbxxXmbh: null,
    jbxxXmmc: null,
    businessCode: null,
    xmStatus: null,
    xmStatus_start: null,
    xmStatus_end: null,
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
  rowdata,
  flowinstid,
  catalog,
  dialogVisible,
  districtOptions,
  tableData,
  pages,
  queryParams,
} = toRefs(data);

//3.定义方法

/**
 * 初始化
 */
const F_init = (row) => {
  data.rowdata = row;
  switch (row.catalog) {
    case "实施阶段":
      data.businessCode = row.businessCode.replace("10134", "10132");
      data.queryParams.businessCode = row.businessCode.replace(
        "10134",
        "10132"
      );
      data.queryParams.xmStatus = 1.9;
      break;
    case "验收阶段":
      data.businessCode = row.businessCode.replace("10136", "10132");
      data.queryParams.businessCode = row.businessCode.replace(
        "10136",
        "10132"
      );
      data.queryParams.xmStatus = 2.9;
      break;
  }
  F_getTdzzXmcxList();
  data.dialogVisible = true;
};

/**
 * 获取项目查询列表
 */
const F_getTdzzXmcxList = () => {
  queryPage(data.queryParams).then((res) => {
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
 * 关闭弹窗
 */
const handleClose = () => {
  emit("refresh");
  data.dialogVisible = false;
};

/**
 * 复选框勾选事件
 *
 * @param {*} selection
 */
const F_handleSelectionChange = (selection) => {
  data.selection = [];
  selection.map((obj) => {
    data.selection.push(obj.jbxxSec);
  });
};

/**
 * 批量选择
 */
const F_batchSelect = () => {
  const params = {
    flowinstid: data.rowdata.flowinstid,
    catalog: data.rowdata.catalog,
    jbxxSecs: data.selection,
  };
  if (data.selection.length == 0) {
    ElMessage.error("请先勾选项目！");
  } else {
    batchSelect(params).then((res) => {
      F_getTdzzXmcxList();
      ElMessage.success(res.msg);
    });
  }
};

/**
 * 双击行（打开流程）
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row, column, event) => {
  const params = {
    flowinstid: data.rowdata.flowinstid,
    catalog: data.rowdata.catalog,
    jbxxSecs: [row.jbxxSec],
  };
  batchSelect(params).then((res) => {
    const newpage = router.resolve({
      name: "tdzz_runtime_main",
      query: {
        flowinstid: data.rowdata.flowinstid,
        taskId: data.rowdata.taskId,
        businessCode: data.rowdata.businessCode,
        businessName: data.rowdata.businessName,
        flowAction: "EDIT",
        catalog: data.rowdata.catalog,
        materialType: "项目材料",
        jbxxSec: row.jbxxSec,
      },
    });
    window.open(newpage.href, "_blank");
  });
};

//3.入口
onMounted(() => {
  //定义监听事件，刷新待办
  window.addEventListener("message", function (e) {
    if (e.data == "tdzz-daiban-refresh") {
      F_getTdzzXmcxList();
    }
  });
});
const emit = defineEmits(["refresh"]);
defineExpose({ F_init });
</script>