<template>
  <el-form :inline="true" class="tlw-search tlw-search-more">
    <el-row>
      <el-col :span="24">
        <el-form-item label="汇总类型：">
          <el-select v-model="queryParams.hzType" @change="hzTypeChange">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
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
          <el-button id="btnSearch" type="primary" @click="F_init">搜索</el-button>
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
      <el-table :data="tableData" border stripe v-if="queryParams.hzType === 1" id="table">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="220" />
        <el-table-column prop="xmCount" label="项目个数" width="220" :formatter="stringToInt" />
        <el-table-column prop="jsgm" label="建设规模" width="220" :formatter="stringToFloat" />
        <el-table-column prop="nxzgdmj" label="拟新增耕地面积（公顷）" :formatter="stringToFloat" />
      </el-table>
      <el-table :data="tableData" border stripe v-if="queryParams.hzType === 2" id="table">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="220" />
        <el-table-column prop="jsgm" label="建设规模" width="220" :formatter="stringToFloat" />
        <el-table-column prop="xmCount" label="项目个数" width="220" :formatter="stringToInt" />
        <el-table-column prop="rknxzgdmj" label="入库拟新增耕地面积（公顷）" :formatter="stringToFloat" />
      </el-table>
      <el-table :data="tableData" border stripe v-if="queryParams.hzType === 3" id="table">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="220" />
        <el-table-column prop="jsgm" label="建设规模" width="220" :formatter="stringToFloat" />
        <el-table-column prop="allxmCount" label="项目个数" width="220" :formatter="stringToInt" />
        <el-table-column prop="xmCount" label="已验收项目个数" width="220" :formatter="stringToInt" />
        <el-table-column prop="sqysxzgdmj" label="申请验收新增耕地面积（公顷）" :formatter="stringToFloat"/>
      </el-table>
      <el-table :data="tableData" border stripe v-if="queryParams.hzType === 4" id="table">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="180" />
        <el-table-column prop="jsgm" label="建设规模" width="240" :formatter="stringToFloat" />
        <el-table-column prop="xmCount" label="项目个数" width="240" :formatter="stringToInt" />
        <el-table-column prop="noxmCount" label="不合格项目个数" :formatter="stringToInt" />
        <el-table-column prop="qrxzgdmj" label="确认新增耕地面积（公顷）" :formatter="stringToFloat" />
        <el-table-column prop="sjkjxzgdmj" label="市级核减新增耕地面积（公顷）" :formatter="stringToFloat" />
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import store from "@/common/store";
import { getTjcxZbph } from "@/tdzz/api/xtcx/tjcx";
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
  businessName: "占补平衡",
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
  getTjcxZbph(data.queryParams).then((res) => {
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
  let wb = XLSX.utils.table_to_book(document.getElementById("table"), { raw: true, });
  // wb.Sheets.Sheet1 = this.delRepeat(wb.Sheets.Sheet1) // 去掉wb.Sheets.Sheet1对象中重复的value的属性
  let wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  // console.log(wbout, 'wbout----->>>')
  try {
    FileSaver.saveAs(
      //Blob 对象表示一个不可变、原始数据的类文件对象、不一定是JavaScript原生格式的数据
      //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      new Blob([wbout], { type: "application/octet-stream" }),
      //设置导出文件名称
      tableTitle.value + ".xlsx"
    );
  } catch (e) {
    console.error(e, wbout, "----->>>");
  }
};

const ExportXlsx = () => {
  // 创建工作表
  const data = XLSX.utils.json_to_sheet(props.table.tableData);
  // 创建工作簿
  const wb = XLSX.utils.book_new();
  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, data, 'data');
  // 生成文件并下载
  XLSX.writeFile(wb, 'test.xlsx');
}

/**
 * 获取当前时间
 */
const getDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var monuth = date.getMonth() + 1;
  var day = date.getDate();
  let today = year + "-" + monuth + "-" + day + "-";
  return today;
};

//3.入口
onMounted(() => {
  F_init();
});
</script>