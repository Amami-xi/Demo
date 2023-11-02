<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="handleClose"
    width="60%"
    destroy-on-close
  >
    <el-form :inline="true" class="tlw-search" label-width="5rem">
      <el-row>
        <el-col :span="24">
          <el-form-item label="行政区">
            <el-select v-model="queryParams.jbxxXzqdm" clearable>
              <el-option
                v-for="(item, index) in districtOptions"
                :key="index"
                :label="item.superName + '.' + item.name"
                :value="item.code"
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
        <el-table
          :data="tableData"
          border
          :row-class-name="rowClassName"
          @row-click="rowClick"
          @row-dblclick="openWorkbox"
        >
          <el-table-column label width="35">
            <template #default="scope">
              <el-radio :label="scope.row.jbxxXmbh" v-model="selectRow"
                >&nbsp;</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="80" />
          <el-table-column prop="jbxxXzqmc" label="行政区" width="180" />
          <el-table-column prop="businessName" label="项目类型" width="180" />
          <el-table-column prop="jbxxXmbh" label="项目编号" width="180" />
          <el-table-column
            prop="jbxxXmmc"
            label="项目名称"
            show-overflow-tooltip
          />
          <el-table-column prop="jbxxPch" label="批次号" />
        </el-table>
        <pagination
          :total="pages.totalRows"
          :pagesize="queryParams.pagination.pageSize"
          :pageIndex="queryParams.pagination.pageIndex"
          :render="render"
        ></pagination>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, toRefs, defineExpose } from "vue";
import { onMounted } from "@vue/runtime-core";
import { queryPage } from "@/tdzz/api/proj/proj-jbxx";
import Pagination from "@/common/components/pagination/index";
import { getDistrictList } from "@/common/api/jtap/district";
import { getFlowInstance } from "@/common/api/jtap/workbox";
import store from "@/common/store";
import { useRouter } from "vue-router";

//1.定义路由
const router = useRouter();

//2.定义数据
const data = reactive({
  dialogVisible: false,
  xzqdm: store.state.user.regionCode, //行政区代码
  tableData: [],
  selectRow: "", //选择行项目编号
  districtOptions: [], //行政区列表
  queryParams: {
    businessCode: null,
    jbxxXzqdm: null,
    jbxxXmbh: null,
    jbxxXmmc: null,
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  pages: {
    totalRows: 0,
  },
});
const {
  dialogVisible,
  tableData,
  selectRow,
  districtOptions,
  pages,
  queryParams,
} = toRefs(data);

//3.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getTableData();
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
const F_getTableData = () => {
  queryPage(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 分页
 */
const render = () => {
  data.queryParams.pagination = val;
  F_init();
};

/**
 * 搜索
 */
const F_search = () => {
  F_init();
};

/**
 * 行样式
 */
const rowClassName = ({ row, rowIndex }) => {
  return "tlw-pointer";
};

/**
 * 点击行
 */
const rowClick = (row) => {
  data.selectRow = row.jbxxXmbh;
};

/**
 * 双击行（打开流程）
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row, column, event) => {
  getFlowInstance(row.flowinstid).then((res) => {
    const flowInstance = res.data;
    const newpage = router.resolve({
      name: "tdzz_runtime_main",
      query: {
        flowinstid: flowInstance.id,
        taskId: flowInstance.taskId,
        businessId: flowInstance.businessId,
        flowId: flowInstance.flowId,
        flowAction: "VIEW",
        catalog: "验收阶段",
      },
    });
    window.open(newpage.href, "_blank");
  });
};

/**
 * 打开弹框
 */
const handleOpen = (businessCode, xmbh) => {
  data.tableData = [];
  data.queryParams.businessCode = businessCode;
  data.selectRow = xmbh;
  F_init();
  data.dialogVisible = true;
};

/**
 * 关闭弹框
 */
const handleClose = () => {
  data.dialogVisible = false;
  data.tableData = [];
};

/**
 * 确认
 */
const confirm = () => {
  emits("show", {
    businessCode: data.queryParams.businessCode,
    selectRow: data.selectRow,
  });
  handleClose();
};

//3.入口
onMounted(() => {
  F_getDistrictList();
});

const emits = defineEmits(["show"]);
defineExpose({ handleOpen });
</script>