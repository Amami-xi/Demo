<template>
  <el-form
    :inline="true"
    class="tlw-search tlw-search-more"
    label-width="6.25rem"
  >
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
        <!-- <el-form-item label="年份">
          <el-date-picker
            type="year"
            value-format="YYYY"
            v-model="year"
            placeholder="请选择日期"
            style="width: 100%"
            @change="F_yearChange"
          ></el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="批次号">
          <el-select
            v-model="queryParams.tbPch"
            placeholder="请选择批次号"
            filterable
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.code"
              v-for="(item, index) in pcOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="图斑号">
          <el-input
            v-model="queryParams.tbh"
            placeholder="请输入图斑号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="下发状态" v-if="grade == 1">
          <el-select v-model="queryParams.sfSend" filterable clearable>
            <el-option
              v-for="(item, index) in sendOptions"
              :key="index"
              :label="item.codeName"
              :value="parseInt(item.codeValue)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上报状态" v-if="grade == 3">
          <el-select v-model="queryParams.sendState" filterable clearable>
            <el-option
              v-for="(item, index) in sbOptions"
              :key="index"
              :label="item.codeName"
              :value="parseInt(item.codeValue)"
            />
          </el-select>
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
        <el-table-column label="是否在进出平衡方案流出地块范围" width="140">
          <template #default="scope">
            <el-tag type="success">是</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="部分面积"
          :formatter="floatFormatter"
          width="160"
        /> -->
        <el-table-column
          prop="sfydbppzsj"
          label="是否用地报批批准的数据"
          width="120"
        >
          <template #default="scope">
            <el-tag type="success">是</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="ydbpbfmj"
          label="部分面积"
          :formatter="floatFormatter"
          width="160"
        /> -->
        <el-table-column prop="tblx" label="类型" width="120" />
        <el-table-column
          prop="zldwmc"
          label="位置"
          width="250"
          show-overflow-tooltip
        />
        <el-table-column label="下发状态" width="120" v-if="grade == 1">
          <template #default="scope">
            <el-tag type="warning" v-if="scope.row.tzxmState == 0"
              >未下发</el-tag
            >
            <el-tag type="success" v-else>已下发</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下发状态" width="120" v-if="grade == 2">
          <template #default="scope">
            <el-tag type="warning" v-if="scope.row.tzxmState == 1"
              >未下发</el-tag
            >
            <el-tag type="success" v-if="scope.row.tzxmState >= 2"
              >已下发</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="上报状态" width="120" v-if="grade == 3">
          <template #default="scope">
            <el-tag type="warning" v-if="scope.row.tzxmState == 2"
              >未上报</el-tag
            >
            <el-tag type="success" v-if="scope.row.tzxmState >= 3"
              >已上报</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="当前环节" width="140" />
        <el-table-column
          prop="lnsjdb"
          label="三调和历年的变更对比用地报批批准的数据"
          width="170"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="F_dataView(scope.row)"
              >查看</el-button
            >
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
  <Dlck ref="dlck"></Dlck>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { useRouter } from "vue-router";
import Dlck from "../dlck.vue";
import { getTdzzYsXmList, getPcList } from "@/tdzz/api/yjjc/jc";
import Pagination from "@/common/components/pagination/index";
import { getDistrictList } from "@/common/api/jtap/district";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDictList } from "@/common/api/jtap/dict";
import { accMul, accDiv, toDecimal4 } from "@/common/utils/nubmer.js";

//1.定义数据
const router = useRouter();
const dlck = ref(null);
const data = reactive({
  tableData: [],
  user: store.state.user,
  grade: store.state.user.grade,
  districtOptions: [], //行政区列表
  districtFullOptions: [], //镇列表
  pcOptions: [], //批次列表
  sfOptions: [], //是否
  sendOptions: [
    {
      codeName: "未下发",
      codeValue: 0,
    },
    {
      codeName: "已下发",
      codeValue: 1,
    },
  ],
  sbOptions: [
    {
      codeName: "未上报",
      codeValue: 1,
    },
    {
      codeName: "已上报",
      codeValue: 2,
    },
  ],
  shOptions: [
    {
      codeName: "未审核",
      codeValue: 0,
    },
    {
      codeName: "审核中",
      codeValue: 6,
    },
    {
      codeName: "已通过",
      codeValue: 128,
    },
  ],
  xzqdm: "",
  xzqdmFull: "",
  year: Number.toString(new Date().getFullYear),
  selection: [],
  queryParams: {
    grade: null, //用户等级
    xzqdm: null, //行政区代码
    zldwmc: null, //村名称
    year: null, //年份
    tbPch: null, //图斑批次号
    sfSend: null, //是否下发
    tbh: null, //图斑号
    state: null, //流程状态
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
  pcOptions,
  sfOptions,
  sendOptions,
  sbOptions,
  year,
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
 * 查看三调和历年的变更对比用地报批批准的数据
 */
const F_dataView = (row) => {
  dlck.value.handleOpen(row);
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
    xzqdm: null, //行政区代码
    zldwmc: null, //村名称
    year: null, //年份
    tbPch: null, //图斑批次号
    sfjbnt: null, //是否基本农田
    tbh: null, //图斑号
    sendState: null, //下发状态
    state: null, //审核状态
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
        tbh: row.tbh,
      },
    });
    window.open(newpage.href, "_blank");
  }
};

/**
 * 公顷、亩的单位切换
 */
 const changeUnit = (unit) => {
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