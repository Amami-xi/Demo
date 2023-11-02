<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="所属镇">
          <el-select
            placeholder="请选择"
            v-model="queryParams.jbxxXzqdm"
            style="width: 100%"
            filterable
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.code"
              v-for="(item, index) in districtOptions"
              :key="index"
            >
            </el-option>
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
        <el-form-item label="审核状态" v-if="data.catalog == '立项阶段'">
          <el-select
            v-model="queryParams.spzt"
            filterable
            clearable
            @change="F_spztChange"
          >
            <el-option
              v-for="(item, index) in spztOptions"
              :key="index"
              :label="item.codeName"
              :value="item.codeValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态" v-if="data.catalog == '验收阶段'">
          <el-select
            v-model="queryParams.ysSpzt"
            filterable
            clearable
            @change="F_spztChange"
          >
            <el-option
              v-for="(item, index) in spztOptions"
              :key="index"
              :label="item.codeName"
              :value="item.codeValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_search"
            >搜索</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <!-- 发起环节-首次发起-->
  <el-row class="tlw-row" v-if="F_sfFq() && showDelBtn">
    <el-col :span="24">
      <el-button type="danger" size="small" @click="F_batchDelete"
        ><el-icon class="el-icon--left"> <Delete /> </el-icon>批量删除
      </el-button>
      <el-button
        id="btnSearch"
        type="primary"
        size="small"
        @click="F_batchImport"
        ><el-icon class="el-icon--left"><Upload /></el-icon>批量导入
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="F_AddLx"
        v-if="data.catalog == '立项阶段'"
        ><el-icon class="el-icon--left"> <CirclePlus /> </el-icon>添加项目
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="F_batchSelect"
        v-if="data.catalog != '立项阶段'"
        ><el-icon class="el-icon--left"> <CircleCheck /> </el-icon>批量选择
      </el-button>
      <el-button type="primary" size="small" @click="F_batchExportYj"
        >批量导出审批意见</el-button
      >
      <el-tooltip content="删除当前环节项目的可操作附件" placement="bottom" effect="light">
        <el-button type="primary" size="small" @click="F_batchDeleteFj"
        >批量删除项目附件</el-button
      >
        </el-tooltip>
      
    </el-col>
  </el-row>
  <!-- 发起环节-退回来的 -->
  <el-row class="tlw-row" v-else-if="F_sfFq() && showRemoveBtn">
    <el-button type="danger" size="small" @click="F_batchRemove"
      ><el-icon class="el-icon--left"> <Delete /> </el-icon>批量移除不通项目
    </el-button>
    <el-button id="btnSearch" type="primary" size="small" @click="F_batchImport"
      >批量导入
    </el-button>
    <el-button
        type="primary"
        size="small"
        @click="F_AddLx"
        v-if="data.catalog == '立项阶段'"
        ><el-icon class="el-icon--left"> <CirclePlus /> </el-icon>添加项目
      </el-button>
    <el-button type="primary" size="small" @click="F_batchExportYj"
      >批量导出审批意见</el-button
    >
    <el-tooltip content="删除当前环节项目的可操作附件" placement="bottom" effect="light">
        <el-button type="primary" size="small" @click="F_batchDeleteFj"
        >批量删除项目附件</el-button
      >
        </el-tooltip>
  </el-row>
  <!-- 复垦中心审核、复垦中心验收 -->
  <el-row class="tlw-row" v-else-if="F_sfFksh()">
    <el-col :span="24">
      <el-button type="primary" size="small" @click="F_batchPass"
        >批量通过</el-button
      >
      <el-button type="danger" size="small" @click="F_batchNoPass"
        >批量不通过</el-button
      >
      <el-button
        v-if="F_Fkzxys()"
        type="primary"
        size="small"
        @click="F_batchImportSjkjMjTemplate"
        ><el-icon class="el-icon--left"> <Download /> </el-icon>模板下载
      </el-button>
      <el-button
        v-if="F_Fkzxys()"
        type="primary"
        size="small"
        @click="F_batachImportMj"
        ><el-icon class="el-icon--left"><Upload /></el-icon>批量导入
      </el-button>
      <el-button type="primary" size="small" @click="F_batchExportYj"
        >批量导出审批意见</el-button
      >
      <el-tooltip content="删除当前环节项目的可操作附件" placement="bottom" effect="light">
        <el-button type="primary" size="small" @click="F_batchDeleteFj"
        >批量删除项目附件</el-button
      >
        </el-tooltip>
    </el-col>
  </el-row>
  <!-- 县级确认、县级填写省厅扣减面积 -->
  <el-row class="tlw-row" v-else-if="F_xjqr()">
    <el-col>
      <el-button
        type="primary"
        size="small"
        @click="F_batchImportXjqrMjTemplate"
        ><el-icon class="el-icon--left"> <Download /> </el-icon>模板下载
      </el-button>
      <el-button
        id="btnSearch"
        type="primary"
        size="small"
        @click="F_batchImport"
        ><el-icon class="el-icon--left"><Upload /></el-icon>批量导入
      </el-button>
      <el-button type="primary" size="small" @click="F_batchExportYj"
        >批量导出审批意见</el-button
      >
      <el-tooltip content="删除当前环节项目的可操作附件" placement="bottom" effect="light">
        <el-button type="primary" size="small" @click="F_batchDeleteFj"
        >批量删除项目附件</el-button
      >
        </el-tooltip>
    </el-col>
  </el-row>
  <el-row class="tlw-row" v-else>
    <el-col>
      <el-button type="primary" size="small" @click="F_batchExportYj"
        >批量导出审批意见</el-button
      >
      <el-tooltip content="删除当前环节项目的可操作附件" placement="bottom" effect="light">
        <el-button type="primary" size="small" @click="F_batchDeleteFj"
        >批量删除项目附件</el-button
      >
        </el-tooltip>
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px" v-if="F_sfFq() && showDelBtn">
    <el-col :span="24">
      <span style="color: red"
        >注：项目列表中的批量导入支持项目信息表、批次材料、项目材料、坐标的单独和组合导入;
        其中项目信息表、坐标支持覆盖和增量导入,附件（批次材料、项目材料）只支持增量导入（每次导入的附件都会保存）</span
      >
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px" v-if="F_sfFq() && showDelBtn">
    <el-col :span="24">
      <span style="color: red"
        >提示：单独导入基本信息表格式：项目信息表.xlxs；批次材料、项目材料、坐标的单独导入格式（zip）请参照模板</span
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
        <el-table-column
          type="selection"
          width="55"
          :selectable="canSelect"
        />
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="jbxxXzqmc" label="行政区" width="180" />
        <el-table-column prop="businessName" label="项目类型" width="180" />
        <el-table-column prop="jbxxXmbh" label="项目编号" width="220" />
        <el-table-column
          prop="jbxxXmmc"
          label="项目名称"
          show-overflow-tooltip
        />
        <el-table-column
          label="审核状态"
          width="120"
          v-if="data.catalog == '立项阶段'"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.spzt == 0" type="warning">待审核</el-tag>
            <el-tag v-if="scope.row.spzt == 1" type="success">通过</el-tag>
            <el-tag v-if="scope.row.spzt == 2" type="danger">不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          width="120"
          v-if="data.catalog == '验收阶段'"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.ysSpzt == 0" type="warning">待审核</el-tag>
            <el-tag v-if="scope.row.ysSpzt == 1" type="success"> 通过 </el-tag>
            <el-tag v-if="scope.row.ysSpzt == 2" type="danger">不通过</el-tag>
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
  <xmSelect ref="selectxm" @refresh="F_getXmlist"></xmSelect>
  <fjSelect ref="Selectfj"></fjSelect>
  <MjImport
    ref="mjImport"
    :flowinstid="flowinstid"
    :businessCode="businessCode"
    :render="F_search"
  ></MjImport>
  <BatchImport
    ref="batchImport"
    :flowinstid="flowinstid"
    :taskId="taskId"
    :businessCode="businessCode"
    :type="importType"
    :render="F_search"
  ></BatchImport>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import {
  queryPageByPc,
  batchRemove,
  batchDelete,
} from "@/tdzz/api/proj/proj-jbxx";
import { batchPass, batchNoPass } from "@/tdzz/api/workflow/workflow";
import {
  batchImportSjkjMjTemplate,
  batchImportXjqrMjTemplate,
  exportDtOptionList,
} from "@/tdzz/api/download/download";
import Pagination from "@/common/components/pagination/index";
import store from "@/common/store";
import { useRouter, useRoute } from "vue-router";
import {
  Upload,
  Delete,
  CircleCheck,
  Download,
  CirclePlus,
} from "@element-plus/icons-vue";
import { getTask } from "@/common/api/jtap/taskHandle";
import { getDistrictList } from "@/common/api/jtap/district.js";
import { ElMessage, ElMessageBox } from "element-plus";
import xmSelect from "@/tdzz/pages/workflow/xmlr/xmSelect";
import fjSelect from "@/tdzz/pages/workflow/xmlr/fjSelect";
import { getDetail } from "@/tdzz/api/proj/proj-pcb";
import { save } from "@/tdzz/api/proj/proj-jbxx.js";
import MjImport from "./mjImport.vue";
import BatchImport from "@/common/components/workflow/batchImport";

//1.定义路由
const router = useRouter();
const route = useRoute();
let params = route.query;
//2.定义数据
const selectxm = ref(null);
const Selectfj = ref(null);

const mjImport = ref(null);
const batchImport = ref(null);
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  catalog: params.catalog,
  businessCode: params.businessCode,
  businessName: params.businessName,
  stepIdentity: params.stepIdentity,
  showDelBtn: true, //是否显示删除按钮
  showRemoveBtn: false, //是否显示移除按钮
  tableData: [],
  importType: 2, //导入类型
  queryParams: {
    flowinstid: params.flowinstid,
    taskId: params.taskId,
    jbxxXzqdm: null,
    jbxxXmbh: null,
    jbxxXmmc: null,
    spzt: null,
    ysSpzt: null,
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  districtOptions: [],
  spztOptions: [
    {
      codeName: "待审核",
      codeValue: 0,
    },
    {
      codeName: "通过",
      codeValue: 1,
    },
    {
      codeName: "不通过",
      codeValue: 2,
    },
  ],
  selection: [],
  selectionList: [],
  pages: {
    totalRows: 0,
    totalPages: 0,
  },
});
const {
  flowinstid,
  taskId,
  businessCode,
  stepFlag,
  showDelBtn,
  showRemoveBtn,
  catalog,
  spztOptions,
  businessOptions,
  districtOptions,
  tableData,
  importType,
  pages,
  queryParams,
} = toRefs(data);

//3.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getPcb();
  F_getXmlist();
  F_getXmFjList();
  if (F_sfFq()) {
    data.importType = 2;
  } else {
    data.importType = 3;
  }
};

/**
 * 获取批次信息
 */
const F_getPcb = () => {
  getDetail(data.flowinstid).then((res) => {
    getDistrictList(res.data.xzqdm).then((res) => {
      data.districtOptions = res.data;
    });
  });
};

/**
 * 获取项目查询列表
 */
const F_getXmlist = () => {
  queryPageByPc(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
    setBtnQx();
  });
};

/**
 * 获取项目当前环节可操作附件
 */
const F_getXmFjList = () => {
  

};

/**
 * 设置按钮权限
 */
const setBtnQx = () => {
  //立项阶段
  if (data.catalog == "立项阶段") {
    for (const obj of data.tableData) {
      //审核过
      if (obj.spzt !=0) {
        data.showRemoveBtn = true;
        break;
      }
    }
    for (const obj of data.tableData) {
      if (obj.spzt != 0) {
        data.showDelBtn = false;
        break;
      }
    }
  }
  //验收阶段
  else if (data.catalog == "验收阶段") {
    for (const obj of data.tableData) {
      if (obj.ysSpzt!=0) {
        data.showRemoveBtn = true;
        break;
      }
    }
    for (const obj of data.tableData) {
      if (obj.ysSpzt != 0) {
        data.showDelBtn = false;
        break;
      }
    }
  }
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_getXmlist();
};

/**
 * 搜索
 */
const F_search = () => {
  data.queryParams.pagination.pageIndex = 1;
  F_getXmlist();
};

/**
 * 审核状态选择事件
 */
const F_spztChange = () => {
  F_getXmlist();
};

/**
 * 发起环节
 */
const F_sfFq = () => {
  if (
    data.flowAction == "EDIT" &&
    (data.stepIdentity.indexOf("LXJD_XJFQ") != -1 ||
      data.stepIdentity.indexOf("SSJD_XJFQ") != -1 ||
      data.stepIdentity.indexOf("YSJD_XJFQ") != -1)
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * 【立项阶段复垦中心审核】、【验收阶段复垦中心验收】环节显示 批量通过、批量不通过按钮
 */
const F_sfFksh = () => {
  if (
    data.flowAction == "EDIT" &&
    (data.stepIdentity.indexOf("LXJD_FKZXSH") > -1 ||
      data.stepIdentity.indexOf("YSJD_FKZXYS") > -1)
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * 【县级确认环节】、【县级填写省厅扣减面积环节】
 */
const F_xjqr = () => {
  if (
    data.flowAction == "EDIT" &&
    (data.stepIdentity.indexOf("YSJD_XJQR") > -1 ||
      data.stepIdentity.indexOf("YSJD_XJTX") > -1)
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * 【复垦中心验收】
 */
const F_Fkzxys = () => {
  if (
    data.flowAction == "EDIT" &&
    data.stepIdentity.indexOf("YSJD_FKZXYS") != -1
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * 复选框勾选事件
 *
 * @param {*} selection
 */
const F_handleSelectionChange = (selection) => {
  data.selection = [];
  data.selectionList = selection;
  selection.map((obj) => {
    data.selection.push(obj.jbxxSec);
  });
};

/**
 * 批量通过
 */
const F_batchPass = () => {
  if (data.selection.length == 0) {
    ElMessage.warning("请先勾选项目！");
  } else {
    let errMsg = "";
    data.selectionList.map((s) => {
      if (
        (s.catalog == "立项阶段" && s.spzt == 1) ||
        (s.catalog == "验收阶段" && s.ysSpzt == 1)
      ) {
        errMsg += s.jbxxXmbh + ",";
      }
    });
    if (errMsg.length > 0) {
      errMsg = errMsg.substring(0, errMsg.length - 1);
      ElMessageBox.alert("项目" + errMsg + "已被标记为通过", "提示", {
        type: "warning",
      })
        .then()
        .catch();
    } else {
      const params = {
        taskId: data.taskId,
        catalog: data.catalog,
        jbxxSecs: data.selection,
      };
      batchPass(params).then((res) => {
        F_getXmlist();
        ElMessage.success(res.msg);
      });
    }
  }
};

/**
 * 批量不通过
 */
const F_batchNoPass = () => {
  if (data.selection.length == 0) {
    ElMessage.warning("请先勾选项目！");
  } else {
    let errMsg = "";
    data.selectionList.map((s) => {
      if (
        (s.catalog == "立项阶段" && s.spzt == 2) ||
        (s.catalog == "验收阶段" && s.ysSpzt == 2)
      ) {
        errMsg += s.jbxxXmbh + ",";
      }
    });
    if (errMsg.length > 0) {
      errMsg = errMsg.substring(0, errMsg.length - 1);
      ElMessageBox.alert(errMsg + "项目已被标记为不通过", "提示", {
        type: "warning",
      })
        .then()
        .catch();
    } else {
      const params = {
        taskId: data.taskId,
        catalog: data.catalog,
        jbxxSecs: data.selection,
      };
      batchNoPass(params).then((res) => {
        F_getXmlist();
        ElMessage.success(res.msg);
      });
    }
  }
};

/**
 * 复选框是否禁用
 *
 * @param {*} row
 * @param {*} index
 */
const canSelect = (row, index) => {
  let flag = true;
  //批量移除按钮
  if (F_sfFq() && data.showRemoveBtn) {
    if (
      (data.catalog == "立项阶段" && row.spzt == 1) ||
      (data.catalog == "验收阶段" && row.ysSpzt == 1)
    ) {
      flag = false;
    }
  }
  //批量删除按钮
  if (F_sfFq() && data.showDelBtn) {
    if (
      (data.catalog == "立项阶段" && row.spzt != 0) ||
      (data.catalog == "验收阶段" && row.ysSpzt != 0)
    ) {
      flag = false;
    }
  }
  return flag;
};

/**
 * 批量移除
 */
const F_batchRemove = () => {
  if (data.selection.length == 0) {
    ElMessage.warning("请先勾选项目！");
  } else {
    ElMessageBox.confirm("是否确认移除勾选项目？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        batchRemove({
          jbxxSecs: data.selection,
          catalog: data.catalog,
        }).then((res) => {
          F_init();
          ElMessage.success(res.msg);
        });
      })
      .catch();
  }
};

/**
 * 批量删除
 */
const F_batchDelete = () => {
  if (data.selection.length == 0) {
    ElMessage.warning("请先勾选项目！");
  } else {
    ElMessageBox.confirm("是否确认删除勾选项目？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        batchDelete({
          jbxxSecs: data.selection,
          businessCode: data.businessCode,
        }).then((res) => {
          F_init();
          ElMessage.success(res.msg);
        });
      })
      .catch();
  }
};

/**
 * 【复垦中心验收环节】批量导入模板下载
 */
const F_batchImportSjkjMjTemplate = () => {
  batchImportSjkjMjTemplate(data.flowinstid, data.taskId);
};

/**
 * 【县级确认环节】、【县级填写省厅扣减面积环节】批量导入模板下载
 */
const F_batchImportXjqrMjTemplate = () => {
  batchImportXjqrMjTemplate(data.flowinstid, data.taskId);
};

/**
 * 批量导出意见下载
 */
const F_batchExportYj = () => {
  if (data.selection.length > 0) {
    exportDtOptionList(
      data.flowinstid,
      data.taskId,
      data.businessCode,
      data.catalog,
      data.selection.toString()
    );
  } else {
    exportDtOptionList(
      data.flowinstid,
      data.taskId,
      data.businessCode,
      data.catalog,
      ""
    );
  }
};

/**
 * 批量删除项目附件
 */
const F_batchDeleteFj = () => {
  const row = {
    flowinstid: data.flowinstid,
    taskId: data.taskId,
    catalog: data.catalog,
    businessCode: data.businessCode,
    materialType: "项目材料",
    jbxxSecs:data.selection,
   };
  if (data.selection.length == 0) {
    ElMessageBox.confirm("如不勾选项目，默认删除所有待审核、不通过项目的附件材料，是否确认？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        Selectfj.value.F_init(row);
      })
      .catch();
  } else {
    Selectfj.value.F_init(row);
   }

 

   
};

/**
 * 批量导入项目
 */
const F_batchImport = () => {
  batchImport.value.handleOpen();
};

/**
 * 县级确认填报面积批量导入
 */
const F_batachImportMj = () => {
  mjImport.value.handleOpen();
};

/**
 * 添加立项项目
 */
const F_AddLx = () => {
  //立项-先生成一条项目基本信息
  save(data.flowinstid).then((res) => {
    const newpage = router.resolve({
      name: "tdzz_runtime_main",
      query: {
        flowinstid: data.flowinstid,
        taskId: data.taskId,
        stepIdentity: data.stepIdentity,
        businessCode: data.businessCode,
        businessName: data.businessName,
        disabled: false,
        catalog: data.catalog,
        materialType: "项目材料",
        jbxxSec: res.data,
      },
    });
    window.open(newpage.href, "_blank");
  });
};

/**
 * 批量选择立项已完结项目
 */
const F_batchSelect = () => {
  const row = {
    flowinstid: data.flowinstid,
    taskId: data.taskId,
    catalog: data.catalog,
    businessCode: data.businessCode,
    businessName: data.businessName,
    catalog: data.catalog,
  };
  selectxm.value.F_init(row);
};

/**
 * 双击行（打开流程）
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row, column, event) => {
  let rowFlowAction = params.flowAction;
  if (
    (data.stepIdentity.indexOf("LXJD_XJFQ") > -1 && row.spzt == 1) ||
    (data.stepIdentity.indexOf("YSJD_XJFQ") > -1 && row.ysSpzt == 1)
  ) {
    rowFlowAction = "VIEW";
  }
  const newpage = router.resolve({
    name: "tdzz_runtime_main",
    query: {
      flowinstid: params.flowinstid,
      taskId: params.taskId,
      businessCode: params.businessCode,
      businessName: params.businessName,
      flowAction: rowFlowAction,
      catalog: params.catalog,
      materialType: "项目材料",
      jbxxSec: row.jbxxSec,
    },
  });
  window.open(newpage.href, "_blank");
};

//监听路由变化-相同页面之间路由跳转
watch(route, (newValue, oldValue) => {
  params = newValue.query;
  data.flowinstid = params.flowinstid;
  data.taskId = params.taskId;
  data.flowAction = params.flowAction;
  data.disabled = params.action == "VIEW" ? true : false;
  data.catalog = params.catalog;
  data.businessCode = params.businessCode;
  data.businessName = params.businessName;
  data.stepIdentity = params.stepIdentity;
  data.queryParams = {
    flowinstid: params.flowinstid,
    taskId: params.taskId,
    jbxxXmbh: null,
    jbxxXmmc: null,
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  };
  F_init();
});

//3.入口
onMounted(() => {
  F_init();
  //定义监听事件，刷新待办
  window.addEventListener("message", function (e) {
    if (e.data == "tdzz-daiban-refresh") {
      F_init();
    }
  });
});
</script>