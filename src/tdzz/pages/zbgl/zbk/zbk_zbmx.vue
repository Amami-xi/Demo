<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：指标库 > 指标明细"></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="行政区选择">
          <el-select v-model="queryParams.xzq" @change="xzqChange" clearable>
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="queryParams.startTime"
            type="date"
            placeholder="请选择"
          />
          <span style="margin: 0 10px">至</span>
          <el-date-picker
            v-model="queryParams.endTime"
            type="date"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="项目编号">
          <el-input
            v-model="queryParams.xmbh"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            v-model="queryParams.xmmc"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="rkRow">
      <el-col :span="24">
        <el-form-item>
          <el-checkbox
            @change="checkAllRk"
            v-model="queryParams.rkCheck"
            :indeterminate="rkIndeterminate"
          >
            入库：
          </el-checkbox>
          <el-checkbox-group v-model="queryParams.rkType">
            <el-checkbox
              v-for="item in rkOptions"
              :key="item"
              :label="item.value"
              @change="rkChange"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="ckRow">
      <el-col :span="24">
        <el-form-item>
          <el-checkbox
            @change="checkAllCk"
            v-model="queryParams.ckCheck"
            :indeterminate="ckIndeterminate"
          >
            出库：
          </el-checkbox>
          <el-checkbox-group v-model="queryParams.ckType">
            <el-checkbox
              v-for="item in ckOptions"
              :key="item"
              :label="item.value"
              @change="ckChange"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="F_getTdzzZbmxList">查询</el-button>
          <!-- <el-button type="primary">导出本页</el-button>
          <el-button type="primary">导出全部</el-button>
          <el-button type="primary">帮助</el-button> -->
        </el-form-item>
        <!-- <el-form-item>
          <el-button #="trigger" type="primary" @click="F_handleOpen"
            >计算</el-button
          >
        </el-form-item> -->
        <el-form-item v-if="grade == '市局'">
          <el-upload
            :show-file-list="false"
            :before-upload="F_beforeUpload"
            :http-request="F_calculateOfZb"
            :limit="1"
            ref="upload"
          >
            <el-button #="trigger" type="primary">导入前计算</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="grade == '市局'">
          <el-upload
            :show-file-list="false"
            :before-upload="F_beforeUpload"
            :http-request="F_importZbmx"
            :limit="1"
            ref="upload"
          >
            <el-button #="trigger" type="primary">导入指标明细</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="grade == '市局'">
          <el-upload
            :show-file-list="false"
            :before-upload="F_beforeUpload"
            :http-request="F_importByFull"
            :limit="1"
            ref="upload"
          >
            <el-button #="trigger" type="primary">全量导入</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-checkbox
        label="包含下级行政区指标明细"
        v-model="queryParams.include"
      />
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" />
        <el-table-column prop="dateTime" label="日期" :formatter="formatDate" />
        <el-table-column prop="type" label="类型" />
        <el-table-column
          prop="zy"
          label="摘要"
          show-overflow-tooltip
          width="240"
        />
        <el-table-column prop="zbszxzq" label="指标所在行政区" />
        <el-table-column prop="dzly" label="动作来源" width="180" />
        <el-table-column prop="gdzb" label="耕地数量（公顷）" />
        <el-table-column prop="stzb" label="水田规模（公顷）" />
        <el-table-column prop="cnzb" label="粮食产能（公斤）" />
      </el-table>
      <div class="index-pagination">
        <pagination
          :total="pages.totalRows"
          :pagesize="queryParams.pagination.pageSize"
          :pageIndex="queryParams.pagination.pageIndex"
          :render="render"
        ></pagination>
      </div>
    </el-col>
  </el-row>
  <ZBYL ref="zbyl"></ZBYL>
</template>

<script setup>
import { getCurrentInstance } from "@vue/runtime-core";
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { ElMessage, ElMessageBox } from "element-plus";
import { getTdzzRegionCode } from "@/tdzz/api/zbgl/public";
import {
  getTdzzZbmxList,
  importZbmx,
  importZbmxByFull,
  calculateOfZb,
} from "@/tdzz/api/zbgl/zbk/zbk_zbmx";
import Pagination from "@/common/components/pagination/index";
import ZBYL from "./zbk_zbyl.vue";

//1.定义数据
const upload = ref();
const zbyl = ref(null);
const data = reactive({
  tableData: [],
  grade: store.state.user.organizationGrade,
  districtOptions: [], //行政区列表
  options: [],
  codeValue: "",
  rkOptions: [
    { name: "项目入库指标", value: 0 },
    { name: "调入指标", value: 1 },
    { name: "解挂入库指标", value: 2 },
    { name: "迁移入库指标", value: 3 },
    { name: "指标基库", value: 4 },
    { name: "部解锁指标", value: 5 },
    { name: "已借用指标", value: 6 },
    { name: "解冻指标", value: 7 },
  ],
  ckOptions: [
    { name: "挂钩指标", value: 8 },
    { name: "调出指标", value: 9 },
    { name: "冻结指标", value: 10 },
    { name: "核减指标", value: 11 },
    { name: "承诺兑现指标", value: 12 },
    { name: "部锁定指标", value: 13 },
    { name: "历史挂钩指标", value: 14 },
    { name: "核查指标", value: 15 },
    { name: "已归还指标", value: 16 },
    { name: "部监管扣除", value: 17 },
    { name: "已用于国家统筹", value: 18 },
  ],
  rkIndeterminate: false,
  ckIndeterminate: false,
  queryParams: {
    xzq: "",
    xzqdm: "", //行政区代码
    startTime: "", //开始时间
    endTime: "", //结束时间
    xmbh: "", //项目编号
    xmmc: "", //项目名称
    rk: [], //入库,
    rkType: [],
    rkCheck: false,
    ck: [], //出库
    ckType: [],
    ckCheck: false,
    include: false,
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
  tableData,
  grade,
  districtOptions,
  codeValue,
  options,
  rkOptions,
  ckOptions,
  rkIndeterminate,
  ckIndeterminate,
  queryParams,
  pages,
} = toRefs(data);

const currentInstance = getCurrentInstance();

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getTdzzRegionCode();
  F_getTdzzZbmxList();
};

/**
 * 获取指标明细查询列表
 */
const F_getTdzzZbmxList = () => {
  getTdzzZbmxList(data.queryParams).then((res) => {
    data.tableData = res.data.content;
    data.pages.totalPages = res.data.totalPages;
    data.pages.totalRows = res.data.totalElements;
  });
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_init();
};

/**
 * 上传前检查
 * @param {*} file
 */
const F_beforeUpload = (file) => {
  let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
  if (extension !== "xlsx") {
    ElMessageBox.alert("暂只支持xlsx格式的文件", "提示", { type: "warning" })
      .then()
      .catch();
    upload.value.clearFiles();
    return false;
  }
};

/**
 * 打开弹窗
 */
const F_handleOpen = () => {
  zbyl.value.handleOpen();
};

/**
 * 指标计算
 */
const F_calculateOfZb = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  // formData.append("userId", store.state.user.userId);
  calculateOfZb(formData)
    .then((res) => {
      zbyl.value.handleOpen(res.data);
    })
    .catch((res) => {
      ElMessageBox.alert("计算失败", "提示", { type: "warning" });
    });
};

/**
 * 导入指标明细
 */
const F_importZbmx = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  // formData.append("userId", store.state.user.userId);
  importZbmx(formData)
    .then((res) => {
      F_init();
    })
    .catch(() => {});
  upload.value.clearFiles();
};

/**
 * 全量导入
 */
const F_importByFull = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  // formData.append("userId", store.state.user.userId);
  importZbmxByFull(formData)
    .then((res) => {
      F_init();
    })
    .catch(() => {});
};

/**
 * 查询行政区代码
 */
const F_getTdzzRegionCode = () => {
  getTdzzRegionCode().then((res) => {
    data.options = res.data;
  });
};

/**
 * 行政区变更
 */
const xzqChange = (val) => {
  let map = data.options;
  for (var key in map) {
    if (map[key] != val) {
      data.queryParams.include = true;
    } else {
      data.queryParams.include = false;
    }
    break;
  }
};

const clearOut = () => {
  data.queryParams.xzqdm = "";
};

/**
 * 入库全选
 */
const checkAllRk = () => {
  data.rkIndeterminate = false;
  if (data.queryParams.rkCheck) {
    data.queryParams.rkType = data.rkOptions.map((item) => {
      return item.value;
    });
  } else {
    data.queryParams.rkCheck = false;
    data.queryParams.rkType = [];
  }
};

/**
 * 入库单选
 */
const rkChange = () => {
  if (data.queryParams.rkType.length == data.rkOptions.length) {
    data.rkIndeterminate = false;
    data.queryParams.rkCheck = true;
  } else if (data.queryParams.rkType.length == 0) {
    data.rkIndeterminate = false;
    data.queryParams.rkCheck = false;
  } else {
    data.rkIndeterminate = true;
  }
};

/**
 * 出库全选
 */
const checkAllCk = () => {
  data.ckIndeterminate = false;
  if (data.queryParams.ckCheck) {
    data.queryParams.ckType = data.ckOptions.map((item) => {
      return item.value;
    });
  } else {
    data.queryParams.ckCheck = false;
    data.queryParams.ckType = [];
  }
};

/**
 * 出库单选
 */
const ckChange = () => {
  if (data.queryParams.ckType.length == data.ckOptions.length) {
    data.ckIndeterminate = false;
    data.queryParams.ckCheck = true;
  } else if (data.queryParams.ckType.length == 0) {
    data.ckIndeterminate = false;
    data.queryParams.ckCheck = false;
  } else {
    data.ckIndeterminate = true;
  }
};

/**
 * 日期转换
 */
const formatDate = (row, column) => {
  // 获取单元格数据
  let data = row[column.property];
  if (data == null) {
    return null;
  }
  let dt = new Date(data);
  return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
<style lang="scss" scoped>
.tlw-search {
  .rkRow {
    padding-left: 0.625rem;
    background: #e3f2fc;
  }
  .ckRow {
    padding-left: 0.625rem;
    background: #d2e0f8;
  }
}
</style>