<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon
        name="wz"
        title="位置：预警 > 违规占用永久基本农田预警"
      ></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search tlw-search-more">
    <el-row>
      <el-col :span="24">
        <el-form-item label="所属区" v-if="grade == 1">
          <el-select
            v-model="xzqdm"
            placeholder="请选择区"
            filterable
            clearable
            @change="F_xzqChange"
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
        <el-form-item label="所属镇" v-if="grade == 1 || grade == 2">
          <el-select
            v-model="xzqdmFull"
            placeholder="请选择镇"
            filterable
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.code"
              v-for="(item, index) in districtFullOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属村">
          <el-input
            v-model="queryParams.zldwmc"
            placeholder="请输入村"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="图斑号">
          <el-input
            v-model="queryParams.tbh"
            placeholder="请输入图斑号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_search"
            >搜索
          </el-button>
          <el-button id="btnSearch" type="primary" @click="F_reset"
            >重置
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row type="flex" justify="end" style="margin-bottom: -10px">
    <el-col :span="2">
      <el-button-group>
        <el-button size="small" :type="gqType" @click="changeUnit(0)"
          >公顷</el-button
        >
        <el-button size="small" :type="muType" @click="changeUnit(1)"
          >亩</el-button
        >
      </el-button-group>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border max-height="400">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="tbPch" label="批次号" width="120" />
        <el-table-column prop="tbh" label="图斑号" width="180" />
        <el-table-column
          prop="shapeArea"
          label="图斑总面积"
          :formatter="floatFormatter"
          width="160"
        />
        <el-table-column
          prop="ynCdmj"
          label="涉及永久基本农田面积"
          :formatter="floatFormatter"
          width="170"
        />
        <el-table-column
          prop="shapeArea"
          label="待整改面积"
          :formatter="floatFormatter"
          width="160"
        />
        <el-table-column prop="zldwmc" label="位置" />
        <el-table-column label="预警" width="100">
          <template #default="scope">
            <el-tag
              type="danger"
              effect="dark"
              round
              size="small"
              class="tlw-point"
            ></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button size="small" type="primary" @click="F_sendMsg(scope.row)"
              >发送短信
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
  <RYXZ ref="ryxz"></RYXZ>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { getGdlcYjList } from "@/tdzz/api/yjjc/yj";
import Pagination from "@/common/components/pagination/index";
import { getDistrictList } from "@/common/api/jtap/district";
import { getNibanList } from "@/tdzz/api/workflow/workflow";
import { ElMessage } from "element-plus";
import RYXZ from "./ryxz.vue";
import { accMul, accDiv, toDecimal4 } from "@/common/utils/nubmer.js";

//1.定义数据
const dlck = ref(null);
const ryxz = ref(null);
const data = reactive({
  tableData: [],
  user: store.state.user,
  grade: store.state.user.grade,
  districtOptions: [], //行政区列表
  districtFullOptions: [], //镇列表
  selection: [],
  xzqdm: "",
  xzqdmFull: "",
  queryParams: {
    xzqdm: "", //行政区代码
    tbh: "", //图斑号
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  gqType: "success", //公顷按钮类型
  muType: "", //亩按钮类型
  buttonCurrent: "0", //0：当前是公顷 1：当前是亩
  pages: {
    totalRows: 0,
  },
});

const {
  grade,
  xzqdm,
  xzqdmFull,
  districtOptions,
  districtFullOptions,
  tableData,
  queryParams,
  pages,
  gqType,
  muType,
  buttonCurrent,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  if (data.grade == 1) {
    F_getDistrictList();
  } else if (data.grade == 2) {
    F_getCountrySideList(data.user.regionCode);
  }
  F_getTableData();
  F_getDistrictList();
};

/**
 * 行政区change事件
 *
 * @param {*} val
 */
const F_xzqChange = (val) => {
  if (val.length > 0) {
    F_getCountrySideList(val);
  } else {
    data.xzqdmFull = null;
    data.districtFullOptions = [];
  }
};

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  getDistrictList(data.user.regionCode).then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 获取镇列表
 */
const F_getCountrySideList = (val) => {
  getDistrictList(val).then((res) => {
    data.districtFullOptions = res.data;
  });
};

/**
 * 获取监测图斑数据
 */
const F_getTableData = () => {
  if (data.xzqdmFull) {
    data.queryParams.xzqdm = data.xzqdmFull;
  } else {
    data.queryParams.xzqdm = data.xzqdm;
  }
  getGdlcYjList(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_getTableData();
};

/**
 * 面积格式化（保留4位小数）
 * @param {*} row
 * @param {*} column
 */
const floatFormatter = (row, column) => {
  var mj = row[column.property];
  if (mj === undefined || mj == null) {
    mj = 0;
  }
  return Number.parseFloat(mj).toFixed(4);
};

/**
 * 重置
 */
const F_reset = () => {
  data.queryParams = {
    xzqdm: "", //行政区代码
    tbh: "", //图斑号
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  };
};

/**
 * 搜索
 */
const F_search = () => {
  F_getTableData();
};

/**
 * 发送短信
 * @param {*} row
 */
const F_sendMsg = (row) => {
  ryxz.value.handleOpen(row);
};

/**
 * 公顷、亩的单位切换
 */
const changeUnit = (unit) => {
  //
  if (unit == 0 && data.buttonCurrent == 1) {
    data.gqType = "success";
    data.muType = "";
    data.tableData.forEach((item) => {
      if (item.shapeArea != 0) {
        item.shapeArea = toDecimal4(accDiv(item.shapeArea, 15));
      }
      if (item.ynCdmj != 0) {
        item.ynCdmj = toDecimal4(accDiv(item.ynCdmj, 15));
      }
    });
    data.buttonCurrent = 0;
  } else if (unit == 1 && data.buttonCurrent == 0) {
    data.gqType = "";
    data.muType = "success";
    data.tableData.forEach((item) => {
      if (item.shapeArea != 0) {
        item.shapeArea = accMul(item.shapeArea, 15);
      }
      if (item.ynCdmj != 0) {
        item.ynCdmj = accMul(item.ynCdmj, 15);
      }
    });
    data.buttonCurrent = 1;
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>