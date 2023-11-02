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
      <el-button
        id="btnSearch"
        type="primary"
        size="small"
        @click="F_batchImport"
        ><el-icon class="el-icon--left"><Upload /></el-icon>批量导入
      </el-button>
      <el-button id="btnSearch" type="primary" size="small" @click="F_download"
        ><el-icon class="el-icon--left"> <Download /> </el-icon>模板下载
      </el-button>
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
              >批次上报</el-button
            > -->
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
  <BatchImport
    ref="batchImport"
    :flowId="flowId"
    :businessCode="businessCode"
    :type= importType
    :render="F_init"
  ></BatchImport>
  <PcAdd ref="pcAdd" @refresh="F_refresh"></PcAdd>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { getDaibanList } from "@/tdzz/api/workflow/workflow";
import { openTask } from "@/common/api/jtap/taskHandle";
import Pagination from "@/common/components/pagination/index";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import moment from "moment";
import {
  Upload,
  CirclePlus,
  Delete,
  ArrowDown,
  Back,
  Edit,
  Download,
} from "@element-plus/icons-vue";
import BatchImport from "@/common/components/workflow/batchImport";
import { ggDownLoadModel } from "@/common/api/jtap/download";
import PcAdd from "@/tdzz/pages/workflow/pcAdd";
import { del } from "@/tdzz/api/proj/proj-pcb";
import { ElMessage, ElMessageBox } from "element-plus";

//1.定义路由
const router = useRouter();
const route = useRoute();

//2.定义数据
const params = route.query;
const batchImport = ref(null);
const pcAdd = ref(null);
const data = reactive({
  flowId: params.flowId, //流程定义ID
  businessCode: params.businessCode, //业务编码
  importType: 1,
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
const { flowId, businessCode, importType, tableData, pages, queryParams } = toRefs(data);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getDaibanList();
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
 * 返回
 */
const F_back = () => {
  router.back();
};

/**
 * 批量导入
 */
const F_batchImport = () => {
  batchImport.value.handleOpen();
};

/**
 * 批量导入模板下载
 */
const F_download = () => {
  let path = "";
  if (data.businessCode == "10132101") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/zbphlx.zip";
  }
  if (data.businessCode == "10136101") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/zbphys.zip";
  }

  if (data.businessCode == "10132201") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/cxjslx.zip";
  }
  if (data.businessCode == "10136201") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/cxjsys.zip";
  }

  if (data.businessCode == "10132301") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/gkfqlx.zip";
  }
  if (data.businessCode == "10136301") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/gkfqys.zip";
  }

  if (data.businessCode == "10132401") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/hgslx.zip";
  }
  if (data.businessCode == "10136401") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/hgsys.zip";
  }
  if (data.businessCode == "10132701") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/jcphlx.zip";
  }
  if (data.businessCode == "10136701") {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/jcphys.zip";
  }
  if (data.businessCode.indexOf("10134") > -1) {
    path = "/usr/tdzzly/files/api-tdzz/templateFilePath/ssxx.zip";
  }
  if (path == "" || path.length == 0) {
    ElMessage.warning("当前流程暂未提供模板下载！");
  } else {
    ggDownLoadModel(path);
  }
};

/**
 * 新增
 */
const F_ADD = () => {
  pcAdd.value.F_ADD(data.flowId, data.businessCode);
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
    .catch(() => {});
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
 * 打开流程-批次上报
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row) => {
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
  window.addEventListener("message", function (e) {
    if (e.data == "tdzz-daiban-refresh") {
      F_getDaibanList();
    }
  });
});
</script>