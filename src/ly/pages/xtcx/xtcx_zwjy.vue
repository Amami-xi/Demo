<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="4">
        <el-form-item label="项目编号">
          <el-input
            v-model="queryParams.xmbh"
            placeholder="请输入项目名称"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
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
            type="month"
            v-model="queryParams.sjStart"
            placeholder="请选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="--" style="margin-left: -12px">
          <el-date-picker
            type="month"
            v-model="queryParams.sjEnd"
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
        <!-- <el-form-item>
          <el-upload
            :before-upload="signBeforeUpload"
            :http-request="F_import"
            :limit="1"
            ref="spUpload"
            style="margin-top: 8px"
          >
            <el-button #="trigger" size="small" type="primary">导入</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            id="btnSearch"
            type="primary"
            @click="F_downLoadModel"
            size="small"
            >导入模板下载</el-button
          >
        </el-form-item> -->
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xmbh" label="项目编号" />
        <el-table-column
          prop="xzqhdm"
          label="行政区"
          width="120"
          :formatter="xzqFormatter"
        />
        <el-table-column prop="year" label="年" width="120" />
        <el-table-column prop="month" label="月" width="120" />
        <el-table-column prop="amountIn" label="省内办件量" />
        <el-table-column prop="amountOut" label="省外办件量" />
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
import { getCurrentInstance } from "@vue/runtime-core";
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Pagination from "@/common/components/pagination/index";
import moment from "moment";
import { onMounted } from "@vue/runtime-core";
import { downLoadModel, ggDownLoadModel } from "@/common/api/jtap/download";
import { queryPage, batchImport } from "@/ly/api/proj/zwjy";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDistrictList } from "@/common/api/jtap/district";
import store from "@/common/store";

//1.定义路由
const router = useRouter();

//2.定义数据
const data = reactive({
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00", //行政区代码
  tableData: [],
  businessList: [],
  districtOptions: [], //行政区列表
  xzqQx: store.state.user.organizationGrade == "市局" ? true : false, //行政区查询按钮权限
  queryParams: {
    xmbh: "", //项目名称
    qy:
      store.state.user.organizationGrade == "市局"
        ? ""
        : store.state.user.regionCode, //行政区代码,
    sjStart: "",
    sjEnd: "",
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
  queryPage(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
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
 * 导入前检查
 */
// const signBeforeUpload = (file) => {
//   let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
//   if (extension !== "xlsx" && extension !== "xls") {
//     ElMessageBox.alert("请选择正确的格式", "提示", { type: "warning" })
//       .then()
//       .catch();
//     currentInstance.ctx.$refs.spUpload.clearFiles();
//      return false;
//   }
// };

// /**
//  * 导入
//  */
// const F_import = (param) => {
//   const formData = new FormData();
//   formData.append("file", param.file);
//   formData.append("userId", store.state.user.userId);
//   batchImport(formData).then((res) => {
//     if (res.success) {
//       ElMessage.success(res.msg);
//       F_init();
//       currentInstance.ctx.$refs.spUpload.clearFiles();
//     } else {
//       ElMessage.error(res.msg);
//       currentInstance.ctx.$refs.spUpload.clearFiles();
//     }
//   });
// };

/**
 * 导入模板下载
 */
// const F_downLoadModel = () => {
//   let path = "/usr/tdzzly/files/api-ly/templateFilePath/植物检疫导入模板.xlsx";
//   downLoadModel("植物检疫导入模板.xlsx", "ly");
// };

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