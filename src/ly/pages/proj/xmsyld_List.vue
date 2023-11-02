<template>
  <el-form :inline="true" class="tlw-search tlw-search-more">
    <el-row>
      <el-col :span="24">
        <el-form-item label="项目名称">
          <el-input
            v-model="queryParams.xmmc"
            placeholder="请输入项目名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="区域" v-if="xzqQx">
          <el-select v-model="queryParams.qy" filterable clearable>
            <el-option
              v-for="(item, index) in districtOptions"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="终审时间">
          <el-date-picker
            type="date"
            v-model="queryParams.zssjStart"
            placeholder="请选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="--" style="margin-left: -12px">
          <el-date-picker
            type="date"
            v-model="queryParams.zssjEnd"
            placeholder="请选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_init"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-upload
            action=""
            :before-upload="signBeforeUpload"
            :http-request="F_import"
            :limit="1"
            ref="spUpload"
            style="margin-top: 10px"
          >
            <el-button #="trigger" type="primary">批量导入</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_downLoadModel"
            >导入模板下载</el-button
          >
        </el-form-item>
        <el-button @click="F_back" class="tlw-back">
          <el-icon class="el-icon--left"> <Back /> </el-icon>返回
        </el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="province" label="省" width="80" />
        <el-table-column prop="city" label="市" width="80" />
        <el-table-column prop="country" label="县" width="80" />
        <el-table-column prop="yddw" label="用地单位" width="120" />
        <el-table-column prop="xmmc" label="项目名称" width="120" />
        <el-table-column
          prop="zldzmj"
          label="占林地总面积（公顷）"
          width="100"
        />
        <el-table-column prop="gymj" label="国有面积（公顷）" width="100" />
        <el-table-column prop="jtmj" label="集体面积（公顷）" width="100" />
        <el-table-column
          prop="slzbhff"
          label="森林植被恢复费（元）"
          width="100"
        />
        <el-table-column prop="zsh" label="终审号" />
        <el-table-column prop="zdlx" label="占地类型" width="120" />
        <el-table-column prop="xmzw" label="项目准文" width="120" />
        <el-table-column
          prop="zssj"
          label="终审时间"
          width="180"
          :formatter="dateFormat"
        />
        <el-table-column prop="spjb" label="审批级别" width="120" />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="scope">
            <!-- <el-button @click="F_UPDATE(scope.row)" type="primary" size="small"
              >编辑<el-icon class="el-icon--right">
                <Edit />
              </el-icon>
            </el-button> -->
            <el-button @click="F_DELETE(scope.row)" type="danger" size="small"
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
</template>

<script setup>
import { getCurrentInstance, ref } from "@vue/runtime-core";
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Pagination from "@/common/components/pagination/index";
import moment from "moment";
import { onMounted } from "@vue/runtime-core";
import {
  queryPage,
  downLoadModel,
  batchImport,
  deleteLx,
} from "@/ly/api/proj/xmsyldsp";
import { ElMessage, ElMessageBox } from "element-plus";
import { Back, Delete } from "@element-plus/icons-vue";
import { getDistrictList } from "@/common/api/jtap/district";
import store from "@/common/store";

//1.定义路由
const router = useRouter();

//2.定义数据
const data = reactive({
  tableData: [],
  businessList: [],
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00", //行政区代码
  xzqQx: store.state.user.organizationGrade == "市局" ? true : false, //行政区查询按钮权限
  districtOptions: [], //行政区列表
  queryParams: {
    xmmc: "", //项目名称
    qy: "",
    zssjStart: "",
    zssjEnd: "",
    createBy: store.state.user.userId,
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
  tableData,
  pages,
  queryParams,
  businessList,
  xzqdm,
  districtOptions,
  xzqQx,
} = toRefs(data);
const currentInstance = getCurrentInstance();
//3.定义方法
const spUpload = ref(null);
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
      deleteLx(row.spid).then((res) => {
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
    spUpload.value.clearFiles();
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
    if (res.data) {
      ElMessage.success(res.msg);
      F_init();
    } else {
      ElMessage.error(res.msg);
    }
  });
  spUpload.value.clearFiles();
};

/**
 * 导入模板下载
 */
const F_downLoadModel = () => {
  downLoadModel();
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