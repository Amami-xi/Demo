<template>
  <el-form :inline="true" class="tlw-search tlw-search-more">
    <el-row>
      <el-col :span="24">
        <el-form-item label="汇总类型：">
          <el-select v-model="queryParams.hzType" @change="hzTypeChange">
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="项目年度">
          <el-date-picker
            v-model="queryParams.startYear"
            type="year"
            format="YYYY"
            value-format="YYYY"
            placeholder="请选择"
            @change="pickStartChange"
          />
          至
          <el-date-picker
            v-model="queryParams.endYear"
            type="year"
            format="YYYY"
            value-format="YYYY"
            placeholder="请选择"
            @change="pickEndChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_init"
            >搜索</el-button
          >
          <el-button type="primary" @click="exporExcel">导出</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-title tlw-row">
    <el-col :span="24">{{ tableTitle }}</el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table
        :data="tableData"
        border
        stripe
        v-if="queryParams.hzType === 1"
        id="table"
      >
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="220" />
        <el-table-column
          prop="xmCount"
          label="项目个数"
          width="220"
          :formatter="stringToInt"
        />
        <el-table-column
          prop="jsgm"
          label="建设规模"
          width="220"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="nxzgdmj"
          label="拟新增耕地面积（公顷）"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="nxznydmj"
          label="拟新增农用地面积（公顷）"
          :formatter="stringToFloat"
        />
      </el-table>
      <el-table
        :data="tableData"
        border
        stripe
        v-if="queryParams.hzType === 2"
        id="table"
      >
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="220" />
        <el-table-column
          prop="jsgm"
          label="建设规模"
          width="220"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="xmCount"
          label="项目个数"
          width="220"
          :formatter="stringToInt"
        />
        <el-table-column
          prop="rknxzgdmj"
          label="入库拟新增耕地面积（公顷）"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="rknxznydmj"
          label="入库拟新增农用地面积（公顷）"
          :formatter="stringToFloat"
        />
      </el-table>
      <el-table
        :data="tableData"
        border
        stripe
        v-if="queryParams.hzType === 3"
        id="table"
      >
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="220" />
        <el-table-column
          prop="jsgm"
          label="建设规模"
          width="220"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="allxmCount"
          label="项目个数"
          width="220"
          :formatter="stringToInt"
        />
        <el-table-column
          prop="xmCount"
          label="已验收项目个数"
          width="220"
          :formatter="stringToInt"
        />
        <el-table-column
          prop="sqysxzgdmj"
          label="申请验收新增耕地面积（公顷）"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="sqysxznydmj"
          label="申请验收新增农用地面积（公顷）"
          :formatter="stringToFloat"
        />
      </el-table>
      <el-table
        :data="tableData"
        border
        stripe
        v-if="queryParams.hzType === 4"
        id="table"
      >
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="180" />
        <el-table-column
          prop="jsgm"
          label="建设规模"
          width="240"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="xmCount"
          label="项目个数"
          width="240"
          :formatter="stringToInt"
        />
        <el-table-column
          prop="noxmCount"
          label="不合格项目个数"
          :formatter="stringToInt"
        />
        <el-table-column
          prop="qrxzgdmj"
          label="确认新增耕地面积（公顷）"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="sdkjxzgdmj"
          label="市级核减新增耕地面积（公顷）"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="qrxznydmj"
          label="确认新增农用地面积（公顷）"
          :formatter="stringToFloat"
        />
        <el-table-column
          prop="sdkjxznydmj"
          label="市级核减新增农用地面积（公顷）"
          :formatter="stringToFloat"
        />
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import store from "@/common/store";
import { getTjcxGkfqd } from "@/tdzz/api/xtcx/tjcx";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

//1.定义数据
const data = reactive({
  options: [
    {
      label: "入库立项汇总",
      options: [
        {
          value: 1,
          label: "入库立项",
        },
      ],
    },
    {
      label: "验收汇总",
      options: [
        {
          value: 4,
          label: "已验收，已发文",
        },
        {
          value: 3,
          label: "已验收，未发文",
        },
        {
          value: 2,
          label: "未验收，未发文",
        },
      ],
    },
  ],
  businessName: "工矿废弃地",
  htTypeName: "入库情况表",
  tableData: [],
  queryParams: {
    hzType: 1, //汇总类型
    jbxxXzqdm: store.state.user.regionCode, //行政区代码
    startTime: null, //项目起始时间
    endTime: null, //项目结束时间
    startYear: null, //项目起始年度
    endYear: null, //项目结束年度
  },
});
const { options, tableData, queryParams } = toRefs(data);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  getTjcxGkfqd(data.queryParams).then((res) => {
    data.tableData = res.data;
  });
};

/**
 * 汇总类型
 *
 * @param {number} val
 */
const hzTypeChange = (val) => {
  if (val == 1) {
    data.htTypeName = "入库情况表";
  } else {
    data.htTypeName = "验收情况表";
  }
  F_init();
};

const tableTitle = computed(() => {
  return data.businessName + data.htTypeName;
});

const stringToInt = (row, column) => {
  return Number(row[column["property"]] || 0);
};

const stringToFloat = (row, column) => {
  return Number(row[column["property"]] || 0).toFixed(4);
};

/**
 * 开始年度
 * 
 * @param {*} val 
 */
 const pickStartChange = (val)=> {
  if(Number.parseInt(val) > Number.parseInt(data.queryParams.endYear)) {
    data.queryParams.startYear = data.queryParams.endYear;
  }
}

/**
 * 结束年度
 * 
 * @param {*} val 
 */
const pickEndChange = (val)=> {
  if(Number.parseInt(val) < Number.parseInt(data.queryParams.startYear)) {
    data.queryParams.endYear = data.queryParams.startYear;
  }
}

/**
 * 导出
 */
const exporExcel = () => {
  let wb = XLSX.utils.table_to_book(document.getElementById("table"), {
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
      tableTitle.value + ".xlsx"
    );
  } catch (e) {
    console.error(e, wbout, "----->>>");
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>