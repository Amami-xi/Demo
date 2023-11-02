<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="4" v-if="xzqQx">
        <el-form-item label="区域">
          <el-select v-model="queryParams.qy" filterable clearable>
            <el-option
              v-for="(item, index) in districtOptions"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="时间">
          <el-date-picker
            type="year"
            value-format="YYYY"
            v-model="queryParams.zssjStart"
            placeholder="请选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="--" style="margin-left: -12px">
          <el-date-picker
            type="year"
            value-format="YYYY"
            v-model="queryParams.zssjEnd"
            placeholder="请选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_init" size="small"
            >查询</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row
    class="tlw-row"
    v-if="store.state.user.organizationGrade == '市局' ? true : false"
  >
    <el-col :span="24">
      <el-button id="btnSearch" type="primary" size="small" @click="F_ADD"
        >添加<el-icon class="el-icon--right">
          <Plus />
        </el-icon>
      </el-button>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column
          prop="xzqhdm"
          label="行政区"
          width="120"
          :formatter="xzqFormatter"
        />
        <el-table-column
          prop="year"
          label="年"
          :formatter="dateFormat"
          width="220"
        />
        <el-table-column prop="amount" label="办件数" />
        <el-table-column prop="mj" label="面积" />
        <el-table-column
          label="操作"
          width="220"
          v-if="store.state.user.organizationGrade == '市局' ? true : false"
        >
          <template #default="scope">
            <el-button @click="F_UPDATE(scope.row)" type="primary" size="small"
              >编辑<el-icon class="el-icon--right">
                <Edit />
              </el-icon>
            </el-button>
            <el-button @click="F_DELETE(scope.row)" type="primary" size="small"
              >删除<el-icon class="el-icon--right">
                <Delete />
              </el-icon>
            </el-button>
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
  <XmsyldTjAdd ref="xmsyldTjAdd" @refresh="F_refresh"></XmsyldTjAdd>
</template>

<script setup>
import { getCurrentInstance } from "@vue/runtime-core";
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import Pagination from "@/common/components/pagination/index";
import moment from "moment";
import { onMounted } from "@vue/runtime-core";
import { downLoadModel, ggDownLoadModel } from "@/common/api/jtap/download";
import { queryPageTj, deleteTj } from "@/ly/api/proj/xmsyldsp";
import { ElMessage, ElMessageBox } from "element-plus";
import XmsyldTjAdd from "@/ly/pages/xtwh/xmsyldTjAdd";
import { getDistrictList } from "@/common/api/jtap/district";
import store from "@/common/store";

//1.定义路由
const router = useRouter();
const route = useRoute();

//2.定义数据
const params = route.query;
const xmsyldTjAdd = ref(null);
const data = reactive({
  flowId: params.flowId, //流程定义ID
  businessCode: params.businessCode, //业务编码
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00", //行政区代码
  tableData: [],
  businessList: [],
  districtOptions: [], //行政区列表
  queryParams: {
    qy:
      store.state.user.organizationGrade == "市局"
        ? ""
        : store.state.user.regionCode,
    zssjStart: "",
    zssjEnd: "",
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  xzqQx: store.state.user.organizationGrade == "市局" ? true : false, //行政区查询按钮权限
  pages: {
    totalRows: 0,
  },
});
const {
  xzqdm,
  tableData,
  pages,
  queryParams,
  businessList,
  districtOptions,
  xzqQx,
} = toRefs(data);
const currentInstance = getCurrentInstance();
//3.定义方法

/**
 * 分页查询列表
 */
const F_init = () => {
  F_getDistrictList();
  queryPageTj(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

const F_refresh = () => {
  queryPageTj(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 新增
 */
const F_ADD = () => {
  xmsyldTjAdd.value.F_ADD(data.flowId, data.businessCode);
};

/**
 * 编辑
 *
 * @param {Object} row
 */
const F_UPDATE = (row) => {
  xmsyldTjAdd.value.F_UPDATE(row.syId);
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
      deleteTj(row.syId).then((res) => {
        ElMessage.success(res.msg);
        F_init();
      });
    })
    .catch();
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
 * 导入前检查
 */
const signBeforeUpload = (file) => {
  let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
  if (extension !== "xlsx" && extension !== "xls") {
    ElMessageBox.alert("请选择正确的格式", "提示", { type: "warning" })
      .then()
      .catch();
    currentInstance.ctx.$refs.spUpload.clearFiles();
    return false;
  }
};

/**
 * 导入
 */
const F_import = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  formData.append("userId", store.state.user.userId);
  batchImport(formData).then((res) => {
    if (res.success) {
      ElMessage.success(res.msg);
      F_init();
      currentInstance.ctx.$refs.spUpload.clearFiles();
    } else {
      ElMessage.error(res.msg);
      currentInstance.ctx.$refs.spUpload.clearFiles();
    }
  });
};

/**
 * 导入模板下载
 */
const F_downLoadModel = () => {
  let path = "/usr/tdzzly/files/api-ly/templateFilePath/植物检疫导入模板.xlsx";
  downLoadModel("项目使用林地统计导入模板.xlsx", "ly");
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
 * 返回
 */
const F_back = () => {
  router.back();
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_init();
};

//4.入口
onMounted(() => {
  F_init();
});
</script>