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
        <el-form-item label="是否基本农田">
          <el-select v-model="queryParams.sfYjjbnt" clearable>
            <el-option
              v-for="(item, index) in sfOptions"
              :key="index"
              :label="item.codeName"
              :value="parseInt(item.codeValue)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图斑号">
          <el-input
            v-model="queryParams.tbh"
            placeholder="请输入图斑号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="下发状态" v-if="grade == 1 || grade == 2">
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
          <el-select v-model="queryParams.sfSend" filterable clearable>
            <el-option
              v-for="(item, index) in sbOptions"
              :key="index"
              :label="item.codeName"
              :value="parseInt(item.codeValue)"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="审核状态">
          <el-select
            v-model="queryParams.state"
            filterable
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="(item, index) in sfOptions"
              :key="index"
              :label="item.codeName"
              :value="parseInt(item.codeValue)"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_search"
            >搜索
          </el-button>
          <el-button id="btnSearch" type="primary" @click="F_reset"
            >重置
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-upload
            :show-file-list="false"
            :before-upload="F_beforeUpload"
            :http-request="F_importByJc"
            :limit="1"
            ref="upload"
            v-if="data.user.userName == '顾博聪'"
          >
            <el-button #="trigger" type="primary">导入</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-upload
            :show-file-list="false"
            :before-upload="F_beforeUpload"
            :http-request="F_batchImportByJc"
            :limit="1"
            ref="batchUpload"
            v-if="data.user.userName == '顾博聪'"
          >
            <el-button #="trigger" type="primary">批量导入</el-button>
          </el-upload>
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
        <el-table-column label="下发状态" width="120" v-if="grade == 1">
          <template #default="scope">
            <el-tag
              type="warning"
              v-if="scope.row.gdlcState == 0 && scope.row.ynlcState == 0"
              >未下发</el-tag
            >
            <el-tag type="success" v-else>已下发</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下发状态" width="120" v-if="grade == 2">
          <template #default="scope">
            <el-tag
              type="warning"
              v-if="scope.row.gdlcState == 1 || scope.row.ynlcState == 1"
              >未下发</el-tag
            >
            <el-tag
              type="success"
              v-if="scope.row.gdlcState >= 2 || scope.row.ynlcState >= 2"
              >已下发</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="上报状态" width="120" v-if="grade == 3">
          <template #default="scope">
            <el-tag
              type="warning"
              v-if="scope.row.gdlcState == 2 || scope.row.ynlcState == 2"
              >未上报</el-tag
            >
            <el-tag
              type="success"
              v-if="scope.row.gdlcState >= 3 || scope.row.ynlcState >= 3"
              >已上报</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="当前环节" width="140" />
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
  <el-form
    :inline="true"
    class="tlw-search tlw-search-more"
    label-width="100px"
  >
    <el-row>
      <el-col :span="24">
        <el-form-item label="年份">
          <el-select
            v-model="statisticsQuery.year"
            placeholder="请选年份"
            @change="F_getPcListByYear"
            filterable
            clearable
          >
            <el-option
              v-for="(item, index) in yearList"
              :label="item"
              :value="item"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次号">
          <el-select
            v-model="statisticsQuery.tbPch"
            placeholder="请输入批次号"
            filterable
            clearable
          >
            <el-option
              v-for="(item, index) in pcList"
              :label="item"
              :value="item"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_statistics">搜索 </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_exportTable">导出 </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row type="flex" justify="end" style="margin-bottom: -10px">
    <el-col :span="2">
      <el-button-group>
        <el-button size="small" :type="gqType2" @click="changeUnit2(0)"
          >公顷</el-button
        >
        <el-button size="small" :type="muType2" @click="changeUnit2(1)"
          >亩</el-button
        >
      </el-button-group>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableSendData" id="sendTable">
        <el-table-column prop="xzq" label="行政区"></el-table-column>
        <el-table-column label="下发情况">
          <el-table-column prop="xfzgs" label="下发总个数"></el-table-column>
          <el-table-column prop="xfzmj" label="下发总面积"></el-table-column>
          <el-table-column label="涉及永久基本农田">
            <el-table-column prop="xfyngs" label="个数"></el-table-column>
            <el-table-column prop="xfynmj" label="面积"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="县级下发核实情况">
          <el-table-column label="县级下发情况">
            <el-table-column label="已下发耕地面积">
              <el-table-column prop="xjxfgdgs" label="个数"></el-table-column>
              <el-table-column prop="xjxfgdmj" label="面积"></el-table-column>
            </el-table-column>
            <el-table-column label="已下发永久基本农田">
              <el-table-column prop="xjxfyngs" label="个数"></el-table-column>
              <el-table-column prop="xjxfynmj" label="面积"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="县级核实情况">
            <el-table-column label="已核实上报耕地面积">
              <el-table-column prop="xjhsgdgs" label="个数"></el-table-column>
              <el-table-column prop="xjhsgdmj" label="面积"></el-table-column>
            </el-table-column>
            <el-table-column label="已核实上报永久基本农田">
              <el-table-column prop="xjhsyngs" label="个数"></el-table-column>
              <el-table-column prop="xjhsynmj" label="面积"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <!-- <el-form
    :inline="true"
    class="tlw-search tlw-search-more"
    label-width="100px"
  >
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="F_exporTableZg">导出 </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form> -->
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableZgData" id="zgTable">
        <el-table-column
          prop="xzq"
          label="行政区"
          fixed="left"
        ></el-table-column>
        <el-table-column label="整改情况统计">
          <el-table-column label="地类未变化（未流出）">
            <el-table-column label="耕地面积">
              <el-table-column prop="dlwbhgdgs" label="个数"></el-table-column>
              <el-table-column prop="dlwbhgdmj" label="面积"></el-table-column>
            </el-table-column>
            <el-table-column label="永久基本农田面积">
              <el-table-column prop="dlwbhyngs" label="个数"></el-table-column>
              <el-table-column prop="dlwbhynmj" label="面积"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="举证无问题（合法流出）">
            <el-table-column label="耕地面积">
              <el-table-column prop="jzwwtgdgs" label="个数"></el-table-column>
              <el-table-column prop="jzwwtgdmj" label="面积"></el-table-column>
            </el-table-column>
            <el-table-column label="永久基本农田面积">
              <el-table-column prop="jzwwtyngs" label="个数"></el-table-column>
              <el-table-column prop="jzwwtynmj" label="面积"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="现场整改">
            <el-table-column label="已整改">
              <el-table-column label="耕地面积">
                <el-table-column prop="yzggdgs" label="个数"></el-table-column>
                <el-table-column prop="yzggdmj" label="面积"></el-table-column>
              </el-table-column>
              <el-table-column label="永久基本">
                <el-table-column prop="yzgyngs" label="个数"></el-table-column>
                <el-table-column prop="yzgynmj" label="面积"></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="待整改">
              <el-table-column label="耕地面积">
                <el-table-column prop="dzggdgs" label="个数"></el-table-column>
                <el-table-column prop="dzggdmj" label="面积"></el-table-column>
              </el-table-column>
              <el-table-column label="永久基本农">
                <el-table-column prop="dzgyngs" label="个数"></el-table-column>
                <el-table-column prop="dzgynmj" label="面积"></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="核减占补平衡指标整改">
            <el-table-column label="耕地面积">
              <el-table-column prop="zbphzggdgs" label="个数"></el-table-column>
              <el-table-column prop="zbphzggdmj" label="面积"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="进出平衡整改">
            <el-table-column label="耕地面积">
              <el-table-column prop="jcphzggdgs" label="个数"></el-table-column>
              <el-table-column prop="jcphzggdmj" label="面积"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <!-- <el-form
    :inline="true"
    class="tlw-search tlw-search-more"
    label-width="100px"
  >
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="F_exporTableRate">导出 </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form> -->

  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableRateData" id="rateTable">
        <el-table-column prop="xzq" label="行政区"></el-table-column>
        <el-table-column label="核实填报率">
          <el-table-column label="耕地面积">
            <el-table-column
              prop="hstblgdgs"
              label="个数"
              :formatter="ChangeDecimalToPercentage"
            ></el-table-column>
            <el-table-column
              prop="hstblgdmj"
              label="面积"
              :formatter="ChangeDecimalToPercentage"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="永久基本农田面积">
            <el-table-column
              prop="hstblyngs"
              label="个数"
              :formatter="ChangeDecimalToPercentage"
            ></el-table-column>
            <el-table-column
              prop="hstblynmj"
              label="面积"
              :formatter="ChangeDecimalToPercentage"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="整改完成率">
          <el-table-column label="耕地面积">
            <el-table-column
              prop="zgwclgdmj"
              label="面积"
              :formatter="ChangeDecimalToPercentage"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="永久基本农田面积">
            <el-table-column
              prop="zgwclynmj"
              label="面积"
              :formatter="ChangeDecimalToPercentage"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <Dlck ref="dlck"></Dlck>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { useRouter } from "vue-router";
import Dlck from "../dlck.vue";
import {
  getGdlcList,
  getPcList,
  statistics,
  exportStatistics,
} from "@/tdzz/api/yjjc/jc";
import Pagination from "@/common/components/pagination/index";
import { getDistrictList } from "@/common/api/jtap/district";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDictList } from "@/common/api/jtap/dict";
import {
  importShapePlotByJc,
  importBatchShapePlotByJc,
} from "@/common/api/plot/plotTx";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import { accMul, accDiv, toDecimal4 } from "@/common/utils/nubmer.js";

//1.定义数据
const router = useRouter();
const dlck = ref(null);
const upload = ref();
const batchUpload = ref();
const data = reactive({
  tableData: [],
  tableSendData: [],
  tableZgData: [],
  tableRateData: [],
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
      codeValue: 0,
    },
    {
      codeName: "已上报",
      codeValue: 1,
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
  yearList: [],
  pcList: [],
  queryParams: {
    grade: null, //用户等级
    xzqdm: null, //行政区代码
    zldwmc: null, //村名称
    year: null, //年份
    tbPch: null, //图斑批次号
    sfYjjbnt: null, //是否基本农田
    sfSend: null, //是否下发
    tbh: null, //图斑号
    state: null, //流程状态
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  statisticsQuery: {
    year: "", //年份
    tbPch: null, //图斑批次号
  },
  gqType: "success", //公顷按钮类型
  muType: "", //亩按钮类型
  buttonCurrent: "0", //0：当前是公顷 1：当前是亩
  gqType2: "success", //公顷按钮类型
  muType2: "", //亩按钮类型
  buttonCurrent2: "0", //0：当前是公顷 1：当前是亩
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
  tableSendData,
  tableZgData,
  tableRateData,
  yearList,
  pcList,
  queryParams,
  statisticsQuery,
  pages,
  gqType,
  muType,
  buttonCurrent,
  gqType2,
  muType2,
  buttonCurrent2,
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
  F_getRecentYear();
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
 * 获取最近年份
 */
const F_getRecentYear = () => {
  let nowyear = new Date().getFullYear();
  for (let i = nowyear; i >= 2022; i--) {
    data.yearList.push(i);
  }
};

/**
 * 获取批次列表
 */
const F_getPcListByYear = (val) => {
  getPcList(val).then((res) => {
    data.pcList = res.data;
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
 * 上传前检查
 * @param {*} file
 */
const F_beforeUpload = (file) => {
  let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
  if (extension !== "zip") {
    ElMessageBox.alert("暂只支持zip格式的文件", "提示", { type: "warning" })
      .then()
      .catch();
    upload.value.clearFiles();
    return false;
  }
};

/**
 * 导入
 */
const F_importByJc = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  // formData.append("userId", store.state.user.userId);
  importShapePlotByJc(formData)
    .then((res) => {
      F_init();
    })
    .catch(() => {});
  upload.value.clearFiles();
};

/**
 * 批量导入
 */
const F_batchImportByJc = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  // formData.append("userId", store.state.user.userId);
  importBatchShapePlotByJc(formData)
    .then((res) => {
      F_init();
    })
    .catch(() => {});
  batchUpload.value.clearFiles();
};

/**
 * 统计
 */
const F_statistics = () => {
  //下发情况统计
  statistics(data.statisticsQuery).then((res) => {
    data.tableSendData = res.data;
    data.tableZgData = res.data;
    data.tableRateData = res.data;
  });
};

/**
 * 导出情况统计表
 */
const F_exportTable = () => {
  exportStatistics(data.statisticsQuery.tbPch);
};

/**
 * 导出下发情况表
 */
const F_exporTableSend = () => {
  let wb = XLSX.utils.table_to_book(document.getElementById("sendTable"), {
    raw: true,
  });
  let wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "下发情况表.xlsx"
    );
  } catch (e) {
    console.error(e, wbout, "----->>>");
  }
};

/**
 * 导出整改情况表
 */
const F_exporTableZg = () => {
  let wb = XLSX.utils.table_to_book(document.getElementById("zgTable"), {
    raw: true,
  });
  let wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "整改情况表.xlsx"
    );
  } catch (e) {
    console.error(e, wbout, "----->>>");
  }
};

/**
 * 导出两率统计表
 */
const F_exporTableRate = () => {
  let wb = XLSX.utils.table_to_book(document.getElementById("rateTable"), {
    raw: true,
  });
  let wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "填报率与整改率统计表.xlsx"
    );
  } catch (e) {
    console.error(e, wbout, "----->>>");
  }
};

/**
 * 复选框勾选事件
 *
 * @param {*} selection
 */
const F_handleSelectionChange = (selection) => {};

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

const ChangeDecimalToPercentage = (row, column) => {
  var result = row[column.property] * 100 + "%";
  return result;
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
  if (row.gdlcState > 0 || row.ynlcState > 0) {
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
  //
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

/**
 * 公顷、亩的单位切换
 */
const changeUnit2 = (unit) => {
  if (unit == 0 && data.buttonCurrent2 == 1) {
    data.gqType2 = "success";
    data.muType2 = "";
    data.tableSendData.forEach((item) => {
      if (item.xfynmj != 0) {
        item.xfynmj = toDecimal4(accDiv(item.xfynmj, 15));
      }
      if (item.xfynmj != 0) {
        item.xfynmj = toDecimal4(accDiv(item.xfynmj, 15));
      }
      if (item.xjxfgdmj != 0) {
        item.xjxfgdmj = toDecimal4(accDiv(item.xjxfgdmj, 15));
      }
      if (item.xjxfynmj != 0) {
        item.xjxfynmj = toDecimal4(accDiv(item.xjxfynmj, 15));
      }
      if (item.xjhsgdmj != 0) {
        item.xjhsgdmj = toDecimal4(accDiv(item.xjhsgdmj, 15));
      }
      if (item.xjhsynmj != 0) {
        item.xjhsynmj = toDecimal4(accDiv(item.xjhsynmj, 15));
      }
    });
    data.tableZgData.forEach((item) => {
      if (item.dlwbhgdmj != 0) {
        item.dlwbhgdmj = toDecimal4(accDiv(item.dlwbhgdmj, 15));
      }
      if (item.dlwbhynmj != 0) {
        item.dlwbhynmj = toDecimal4(accDiv(item.dlwbhynmj, 15));
      }
      if (item.jzwwtgdmj != 0) {
        item.jzwwtgdmj = toDecimal4(accDiv(item.jzwwtgdmj, 15));
      }
      if (item.jzwwtynmj != 0) {
        item.jzwwtynmj = toDecimal4(accDiv(item.jzwwtynmj, 15));
      }
      if (item.yzggdmj != 0) {
        item.yzggdmj = toDecimal4(accDiv(item.yzggdmj, 15));
      }
      if (item.yzgynmj != 0) {
        item.yzgynmj = toDecimal4(accDiv(item.yzgynmj, 15));
      }
      if (item.dzggdmj != 0) {
        item.dzggdmj = toDecimal4(accDiv(item.dzggdmj, 15));
      }
      if (item.dzgynmj != 0) {
        item.dzgynmj = toDecimal4(accDiv(item.dzgynmj, 15));
      }
      if (item.zbphzggdmj != 0) {
        item.zbphzggdmj = toDecimal4(accDiv(item.zbphzggdmj, 15));
      }
      if (item.jcphzggdmj != 0) {
        item.jcphzggdmj = toDecimal4(accDiv(item.jcphzggdmj, 15));
      }
    });
    data.buttonCurrent2 = 0;
  } else if (unit == 1 && data.buttonCurrent2 == 0) {
    data.gqType2 = "";
    data.muType2 = "success";
    data.tableSendData.forEach((item) => {
      if (item.shapeArea != 0) {
        item.shapeArea = accMul(item.shapeArea, 15);
      }
      if (item.ynCdmj != 0) {
        item.ynCdmj = accMul(item.ynCdmj, 15);
      }
      if (item.xfynmj != 0) {
        item.xfynmj = accMul(item.xfynmj, 15);
      }
      if (item.xfynmj != 0) {
        item.xfynmj =accMul(item.xfynmj, 15);
      }
      if (item.xjxfgdmj != 0) {
        item.xjxfgdmj = accMul(item.xjxfgdmj, 15);
      }
      if (item.xjxfynmj != 0) {
        item.xjxfynmj = accMul(item.xjxfynmj, 15);
      }
      if (item.xjhsgdmj != 0) {
        item.xjhsgdmj = accMul(item.xjhsgdmj, 15);
      }
      if (item.xjhsynmj != 0) {
        item.xjhsynmj = accMul(item.xjhsynmj, 15);
      }
    });
    data.tableZgData.forEach((item) => {
      if (item.dlwbhgdmj != 0) {
        item.dlwbhgdmj = accMul(item.dlwbhgdmj, 15);
      }
      if (item.dlwbhynmj != 0) {
        item.dlwbhynmj = accMul(item.dlwbhynmj, 15);
      }
      if (item.jzwwtgdmj != 0) {
        item.jzwwtgdmj = accMul(item.jzwwtgdmj, 15);
      }
      if (item.jzwwtynmj != 0) {
        item.jzwwtynmj = accMul(item.jzwwtynmj, 15);
      }
      if (item.yzggdmj != 0) {
        item.yzggdmj = accMul(item.yzggdmj, 15);
      }
      if (item.yzgynmj != 0) {
        item.yzgynmj = accMul(item.yzgynmj, 15);
      }
      if (item.dzggdmj != 0) {
        item.dzggdmj = accMul(item.dzggdmj, 15);
      }
      if (item.dzgynmj != 0) {
        item.dzgynmj = accMul(item.dzgynmj, 15);
      }
      if (item.zbphzggdmj != 0) {
        item.zbphzggdmj = accMul(item.zbphzggdmj, 15);
      }
      if (item.jcphzggdmj != 0) {
        item.jcphzggdmj = accMul(item.jcphzggdmj, 15);
      }
    });
    data.buttonCurrent2 = 1;
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>