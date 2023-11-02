<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：预警 > 新增耕地改变用途预警"></svg-icon>
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
      <el-table
        max-height="400"
        :data="tableData"
        border
        @row-dblclick="openWorkbox"
        @selection-change="F_handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="tbPch" label="批次号" width="120" />
        <el-table-column prop="tbh" label="图斑号" width="140" />
        <el-table-column
          prop="shapeArea"
          label="图斑总面积"
          :formatter="floatFormatter"
          width="160"
        />
        <el-table-column
          prop="tzCdmj"
          label="土地整治项目面积"
          :formatter="floatFormatter"
          width="160"
        />
        <el-table-column
          prop="shapeArea"
          label="待整改面积"
          :formatter="floatFormatter"
          width="160"
        />
        <el-table-column prop="zldwmc" label="位置" show-overflow-tooltip />
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
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { useRouter } from "vue-router";
import { getTdzzYsXmList, getPcList } from "@/tdzz/api/yjjc/jc";
import Pagination from "@/common/components/pagination/index";
import { getDistrictList } from "@/common/api/jtap/district";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDictList } from "@/common/api/jtap/dict";
import { accMul, accDiv, toDecimal4 } from "@/common/utils/nubmer.js";

//1.定义数据
const router = useRouter();
const data = reactive({
  tableData: [],
  user: store.state.user,
  grade: store.state.user.grade,
  districtOptions: [], //行政区列表
  districtFullOptions: [], //镇列表
  pcOptions: [], //批次列表
  sfOptions: [], //是否
  xzqdm: "",
  xzqdmFull: "",
  year: Number.toString(new Date().getFullYear),
  selection: [],
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
  F_getTableData();
  if (data.grade == 1) {
    F_getDistrictList();
  } else if (data.grade == 2) {
    F_getCountrySideList(data.user.regionCode);
  }
  F_getPcList(new Date().getFullYear());
  F_getDict();
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
 * 年份change事件
 *
 * @param {*} val
 */
const F_yearChange = (val) => {
  F_getPcList(val);
};

/**
 * 获取批次列表
 */
const F_getPcList = (val) => {
  getPcList(val).then((res) => {
    data.pcOptions = res.data;
  });
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  getDictList("是否").then((res) => {
    data.sfOptions = res.data;
  });
};

/**
 * 获取监测图斑数据
 */
const F_getTableData = () => {
  data.queryParams.grade = data.grade;
  if (data.xzqdmFull) {
    data.queryParams.xzqdm = data.xzqdmFull;
  } else {
    data.queryParams.xzqdm = data.xzqdm;
  }
  if (data.grade == 2) {
    data.queryParams.state = 1;
  } else if (data.grade == 3) {
    data.queryParams.state = 2;
  }
  getTdzzYsXmList(data.queryParams).then((res) => {
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
 * 复选框勾选事件
 *
 * @param {*} selection
 */
const F_handleSelectionChange = (selection) => {
  data.selection = [];
  selection.map((obj) => {
    const param = {
      tbh: obj.tbh,
      xzqdm: obj.zldwdm.substring(0, 9),
      xzqmc: obj.zldwmc,
    };
    data.selection.push(param);
  });
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
 * 搜索
 */
const F_search = () => {
  F_getTableData();
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
 * 打开任务
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row, column, event) => {
  if (row.tzxmState > 0) {
    const newpage = router.resolve({
      name: "yjjc_runtime_main",
      query: {
        flowinstid: row.flowinstid,
        taskId: row.taskId,
        businessCode: row.businessCode,
        businessName: row.businessName,
        flowAction: "VIEW",
      },
    });
    window.open(newpage.href, "_blank");
  }
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
      if (item.tzCdmj != 0) {
        item.tzCdmj = toDecimal4(accDiv(item.tzCdmj, 15));
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
      if (item.tzCdmj != 0) {
        item.tzCdmj = accMul(item.tzCdmj, 15);
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