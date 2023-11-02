<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：指标库 > 历史指标明细"></svg-icon>
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
    <el-row class="newZbRow">
      <el-col :span="24">
        <el-form-item>
          <el-checkbox
            @change="checkAllNew"
            v-model="queryParams.newCheck"
            :indeterminate="newIndeterminate"
          >
            新系统：
          </el-checkbox>
          <el-checkbox-group v-model="queryParams.newZbType">
            <el-checkbox
              v-for="item in newZbOptions"
              :key="item"
              :label="item.value"
              @change="newChange"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="oldZbRow">
      <el-col :span="24">
        <el-form-item>
          <el-checkbox
            @change="checkAllOld"
            v-model="queryParams.oldCheck"
            :indeterminate="oldIndeterminate"
          >
            老系统：
          </el-checkbox>
          <el-checkbox-group v-model="queryParams.oldZbType">
            <el-checkbox
              v-for="item in oldZbOptions"
              :key="item"
              :label="item.value"
              @change="oldChange"
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
          <el-button type="primary" @click="F_getTdzzLszbmxList"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item v-if="grade == '市局'">
          <el-upload
            :show-file-list="false"
            :before-upload="F_beforeUpload"
            :http-request="F_import"
            :limit="1"
            ref="upload"
          >
            <el-button #="trigger" type="primary">导入</el-button>
          </el-upload>
        </el-form-item>
        <!-- <el-button type="primary">导出本页</el-button>
        <el-button type="primary">导出全部</el-button>
        <el-button type="primary">帮助</el-button> -->
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
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="dateTime" label="日期" :formatter="formatDate" />
        <el-table-column prop="type" label="类型" />
        <el-table-column
          prop="zy"
          label="摘要"
          show-overflow-tooltip
          width="240"
        />
        <el-table-column prop="zbszxzq" label="指标所在行政区" />
        <el-table-column prop="gdzb" label="耕地数量（公顷）" />
        <el-table-column prop="stzb" label="水田规模（公顷）" />
        <el-table-column prop="cnzb" label="粮食产能（公斤）" />
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
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "@/common/store";
import { getTdzzRegionCode } from "@/tdzz/api/zbgl/public";
import {
  getTdzzLszbmxList,
  importLszbmx,
} from "@/tdzz/api/zbgl/zbk/zbk_lszbmx";
import Pagination from "@/common/components/pagination/index";

//1.定义数据
const upload = ref();
const data = reactive({
  tableData: [],
  grade: store.state.user.organizationGrade,
  districtOptions: [], //行政区列表
  options: [],
  codeValue: "",
  newZbOptions: [
    { name: "2017年后新增指标", value: 0 },
    { name: "其它指标", value: 1 },
    { name: "调入指标", value: 2 },
    { name: "新挂钩指标", value: 3 },
    { name: "调出指标", value: 4 },
    { name: "承诺核销指标", value: 5 },
    { name: "冻结指标", value: 6 },
  ],
  oldZbOptions: [
    { name: "2017年前新增指标", value: 7 },
    { name: "授入指标", value: 8 },
    { name: "授入提改指标", value: 9 },
    { name: "老挂钩指标", value: 10 },
    { name: "挂钩提改指标", value: 11 },
    { name: "授出指标", value: 12 },
    { name: "授出提改指标", value: 13 },
    { name: "已用于统筹指标", value: 14 },
  ],
  newIndeterminate: false,
  oldIndeterminate: false,
  queryParams: {
    xzq: "",
    xzqdm: "", //行政区代码
    startTime: "", //开始时间
    endTime: "", //结束时间
    xmbh: "", //项目编号
    xmmc: "", //项目名称
    newZb: [], //新系统指标,
    newZbType: [],
    newCheck: false,
    oldZb: [], //老系统指标
    oldZbType: [],
    oldCheck: false,
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
  options,
  codeValue,
  newZbOptions,
  oldZbOptions,
  newIndeterminate,
  oldIndeterminate,
  queryParams,
  pages,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getTdzzRegionCode();
  F_getTdzzLszbmxList();
};

/**
 * 获取指标明细查询列表
 */
const F_getTdzzLszbmxList = () => {
  getTdzzLszbmxList(data.queryParams).then((res) => {
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

/**
 * 新系统全选
 */
const checkAllNew = () => {
  data.newIndeterminate = false;
  if (data.queryParams.newCheck) {
    data.queryParams.newZbType = data.newZbOptions.map((item) => {
      return item.value;
    });
  } else {
    data.queryParams.newCheck = false;
    data.queryParams.newZbType = [];
  }
};

/**
 * 新系统单选
 */
const newChange = () => {
  if (data.queryParams.newZbType.length == data.newZbOptions.length) {
    data.newIndeterminate = false;
    data.queryParams.newCheck = true;
  } else if (data.queryParams.newZbType.length == 0) {
    data.newIndeterminate = false;
    data.queryParams.newZbType = false;
  } else {
    data.newIndeterminate = true;
  }
};

/**
 * 老系统全选
 */
const checkAllOld = () => {
  data.oldIndeterminate = false;
  if (data.queryParams.oldCheck) {
    data.queryParams.oldZbType = data.oldZbOptions.map((item) => {
      return item.value;
    });
  } else {
    data.queryParams.oldCheck = false;
    data.queryParams.oldZbType = [];
  }
};

/**
 * 老系统单选
 */
const oldChange = () => {
  if (data.queryParams.oldZbType.length == data.oldZbOptions.length) {
    data.oldIndeterminate = false;
    data.queryParams.oldCheck = true;
  } else if (data.queryParams.oldZbType.length == 0) {
    data.oldIndeterminate = false;
    data.queryParams.oldZbType = false;
  } else {
    data.oldIndeterminate = true;
  }
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
 * 导入
 */
const F_import = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  // formData.append("userId", store.state.user.userId);
  importLszbmx(formData)
    .then((res) => {
      F_init();
    })
    .catch(() => { });
    upload.value.clearFiles();
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
  .newZbRow {
    padding-left: 0.625rem;
    background: #e3f2fc;
  }
  .oldZbRow {
    padding-left: 0.625rem;
    background: #d2e0f8;
  }
}
</style>