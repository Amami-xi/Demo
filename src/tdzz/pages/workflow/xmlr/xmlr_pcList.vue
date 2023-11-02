<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
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
            >搜索
          </el-button>
        </el-form-item>
        <el-button @click="F_back" class="tlw-back">
          <el-icon class="el-icon--left"> <Back /> </el-icon>返回
        </el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-button id="btnSearch" type="primary" size="small" @click="F_ADD"
        ><el-icon class="el-icon--left" :size="14"> <CirclePlus /> </el-icon
        >添加批次
      </el-button>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe @row-dblclick="openWorkbox">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="businessName" label="项目类型" width="260" />
        <el-table-column prop="xmbh" label="申请文件号" width="260" />
        <el-table-column prop="xmmc" label="申请文件名称" />
        <el-table-column prop="catalog" label="项目阶段" width="180" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button @click="F_UPDATE(scope.row)" type="primary" size="small"
              ><el-icon class="el-icon--left"><Edit /></el-icon>编辑</el-button
            >
            <el-button @click="F_DELETE(scope.row)" type="danger" size="small"
              ><el-icon class="el-icon--left"> <Delete /> </el-icon>删除
            </el-button>
            <!-- <el-button
              @click="openWorkbox(scope.row)"
              type="primary"
              size="small"
              >项目录入<el-icon class="el-icon--right">
                <Edit />
              </el-icon>
            </el-button> -->
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
  <PcAdd ref="pcAdd" @refresh="F_refresh"></PcAdd>
  <xmSelect ref="selectxm"></xmSelect>
</template>
<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { getDaibanList } from "@/tdzz/api/workflow/workflow";
import { openTask } from "@/common/api/jtap/taskHandle";
import Pagination from "@/common/components/pagination/index";
import { onMounted } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import moment from "moment";
import {
  CirclePlus,
  Delete,
  ArrowDown,
  Back,
  Edit,
} from "@element-plus/icons-vue";
import PcAdd from "@/tdzz/pages/workflow/pcAdd";
import { del } from "@/tdzz/api/proj/proj-pcb";
import { ElMessage, ElMessageBox } from "element-plus";
import { save } from "@/tdzz/api/proj/proj-jbxx.js";
import xmSelect from "./xmSelect.vue";

//1.定义路由
const router = useRouter();
const route = useRoute();

//2.定义数据
const params = route.query;
const pcAdd = ref(null);
const data = reactive({
  flowId: params.flowId, //流程定义ID
  businessCode: params.businessCode, //业务编码
  catalog: 1, //项目阶段
  tableData: [],
  queryParams: {
    appCodes: import.meta.env.VITE_APP_TDZZ_NAME, //业务子代码
    businessCode: params.businessCode, //业务类型
    xmbh: "", //申请文件号
    xmmc: "", //申请文件名称
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  pages: {
    totalRows: 0,
  },
});
const { flowId, businessCode, catalog, tableData, pages, queryParams } =
  toRefs(data);
const selectxm = ref(null);
//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getDaibanList();
};

/**
 * 获取批次列表
 */
const F_getDaibanList = () => {
  getDaibanList(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 返回
 */
const F_back = () => {
  router.back();
};

/**
 * 新增
 */
const F_ADD = () => {
  pcAdd.value.F_ADD(data.flowId, data.businessCode);
};

/**
 * 实施、验收项目选择页面初始化
 */
const F_xmSelect = (row) => {
  selectxm.value.F_init(row);
};

/**
 * 编辑
 *
 * @param {Object} row
 */
const F_UPDATE = (row) => {
  pcAdd.value.F_UPDATE(row.flowInstId);
};

/**
 * 删除
 *
 * @param {Object} row
 */
const F_DELETE = (row) => {
  ElMessageBox.confirm("是否确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      del(row.flowInstId).then((res) => {
        ElMessage.success(res.msg);
        F_init();
      });
    })
    .catch();
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
  F_getDaibanList();
};

const F_refresh = () => {
  F_getDaibanList();
};

/**
 * 打开待办-录入项目
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row) => {
  switch (row.businessCode) {
    case "10132101":
    case "10132201":
    case "10132301":
    case "10132401":
    case "10132701":
      openpageLx(row);
      break;
    case "10134101":
    case "10134201":
    case "10134301":
    case "10134401":
    case "10134701":
      openpageQt(row);
      break;
    case "10136101":
    case "10136201":
    case "10136301":
    case "10136401":
    case "10136701":
      openpageQt(row);
      break;
  }
};

/**
 * 立项-先生成一条项目基本信息
 */
const openpageLx = (row) => {
  save(row.flowInstId).then((res) => {
    const newpage = router.resolve({
      name: "tdzz_runtime_main",
      query: {
        flowinstid: row.flowInstId,
        taskId: row.stepInstId,
        stepIdentity: row.stepIdentity,
        businessCode: row.businessCode,
        businessName: row.businessName,
        flowAction: "EDIT",
        catalog: row.catalog,
        materialType: "项目材料",
        jbxxSec: res.data,
      },
    });
    window.open(newpage.href, "_blank");
  });
};

/**
 * 实施、验收
 */
const openpageQt = (row) => {
  const newpage = router.resolve({
    name: "tdzz_runtime_main",
    query: {
      flowinstid: row.flowInstId,
      taskId: row.stepInstId,
      stepIdentity: row.stepIdentity,
      businessCode: row.businessCode,
      businessName: row.businessName,
      flowAction: "EDIT",
      catalog: row.catalog,
    },
  });
  window.open(newpage.href, "_blank");
};

//3.入口
onMounted(() => {
  F_init();
});
</script>