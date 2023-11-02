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
            style="width: 100%"
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
            style="width: 100%"
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
  <el-row class="tlw-row" v-if="grade == 1 || grade == 2">
    <el-col :span="2">
      <el-button type="primary" size="small" @click="F_sendTask"
        >批量操作</el-button
      >
    </el-col>
    <el-col :span="2" :offset="20">
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
          prop="yjCdmj"
          label="涉及永久基本农田面积"
          :formatter="floatFormatter"
          width="170"
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
        <el-table-column prop="zldwmc" label="位置" show-overflow-tooltip />
        <el-table-column
          prop="lnsjdb"
          label="三调和历年的变更对比用地报批批准的数据"
          width="165"
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
  <BatchTask ref="batchTask" :render="F_search"></BatchTask>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { useRouter } from "vue-router";
import Dlck from "../dlck.vue";
import { getGdlcList } from "@/tdzz/api/yjjc/jc";
import { sendTask } from "@/tdzz/api/yjjc/workflow";
import Pagination from "@/common/components/pagination/index";
import { getDistrictList } from "@/common/api/jtap/district";
import { ElMessage, ElMessageBox } from "element-plus";
import BatchTask from "@/common/components/workflow/batchTask";
import { accMul, accDiv, toDecimal4 } from "@/common/utils/nubmer.js";

//1.定义数据
const router = useRouter();
const dlck = ref(null);
const batchTask = ref(null);
const data = reactive({
  tableData: [],
  niban: null,
  user: store.state.user,
  grade: store.state.user.grade,
  districtOptions: [], //行政区列表
  districtFullOptions: [], //镇列表
  xzqdm: "",
  xzqdmFull: "",
  selection: [],
  queryParams: {
    xzqdm: null, //行政区代码
    zldwmc: null, //村名称
    year: null, //年份
    tbPch: null, //图斑批次号
    sfYjjbnt: 0, //是否基本农田
    tbh: null, //图斑号
    gdlcState: null, //审核状态
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
  niban,
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
    data.action = "VIEW";
    F_getDistrictList();
  } else if (data.grade == 2) {
    F_getCountrySideList(data.user.regionCode);
  }
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
  if (data.grade == 1) {
    //市级审核
    data.queryParams.gdlcState = 4;
  } else if (data.grade == 2) {
    //县级审核
    data.queryParams.gdlcState = 3;
  } else if (data.grade == 3) {
    //镇级上报
    data.queryParams.gdlcState = 2;
  }
  getGdlcList(data.queryParams).then((res) => {
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
  data.selection = selection;
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
    sfYjjbnt: 0, //是否基本农田
    tbh: null, //图斑号
    state: 0, //审核状态
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  };
};

/**
 * 批量操作
 */
const F_sendTask = () => {
  if (data.selection.length == 0) {
    ElMessageBox.alert("请先勾选需要审核的图斑信息！", "提示", {
      type: "warning",
    })
      .then()
      .catch();
  } else {
    batchTask.value.handleOpen(data.selection);
  }
};

/**
 * 打开任务
 *
 * @param {*} row
 * @param {*} column
 * @param {*} event
 */
const openWorkbox = (row, column, event) => {
  const newpage = router.resolve({
    name: "yjjc_runtime_main",
    query: {
      flowinstid: row.flowinstid,
      taskId: row.taskId,
      businessCode: row.businessCode,
      businessName: row.businessName,
      flowAction: "EDIT",
      tbh: row.tbh,
    },
  });
  window.open(newpage.href, "_blank");
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
      if (item.yjCdmj != 0) {
        item.yjCdmj = toDecimal4(accDiv(item.yjCdmj, 15));
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
      if (item.yjCdmj != 0) {
        item.yjCdmj = accMul(item.yjCdmj, 15);
      }
    });
    data.buttonCurrent = 1;
  }
};

//3.入口
onMounted(() => {
  F_init();
  //定义监听事件，刷新待办
  window.addEventListener("message", function (e) {
    if (e.data == "yjjc-daiban-refresh") {
      F_search();
    }
  });
});
</script>