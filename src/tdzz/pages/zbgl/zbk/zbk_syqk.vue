<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：指标库 > 剩余情况"></svg-icon>
    </el-col>
  </el-row>

  <el-row class="tlw-row" :gutter="20">
    <el-col :span="12">
      <el-card class="hjzbCard">
        <template #header>
          <div>行政区当前指标合计</div>
          <!-- <div>指标明细</div> -->
        </template>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_gdsl" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>耕地数量（公顷）</div>
                    <div>{{ Number(total.gdzb + nts.gdzb).toFixed(4) }}</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_stgm" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>水田规模</div>
                    <div>{{ Number(total.stzb + nts.stzb).toFixed(4) }}</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_lscn" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>粮食产能（公斤）</div>
                    <div>{{ Number(total.cnzb + nts.cnzb).toFixed(4) }}</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="dqzbCard">
        <template #header>
          <div>本级行政区当前指标</div>
          <!-- <div>指标明细</div> -->
        </template>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_gdsl" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>耕地数量（公顷）</div>
                    <div>{{ nts.gdzb }}</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_stgm" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>水田规模（公顷）</div>
                    <div>{{ nts.stzb }}</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_lscn" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>粮食产能（公斤）</div>
                    <div>{{ nts.cnzb }}</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="tlw-row" :gutter="20">
    <el-col :span="12">
      <el-card header="累计总借信用指标" class="jyzbCard">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_gdsl_bg" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>耕地数量（公顷）</div>
                    <div>0.0000</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_stgm_bg" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>水田规模（公顷）</div>
                    <div>0.0000</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_lscn_bg" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>粮食产能（公斤）</div>
                    <div>0.0000</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card header="累计需归还信用指标" class="ghzbCard">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_gdsl_bg" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>耕地数量（公顷）</div>
                    <div>0.0000</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_stgm_bg" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>水田规模（公顷）</div>
                    <div>0.0000</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_lscn_bg" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>粮食产能（公斤）</div>
                    <div>0.0000</div>
                  </div>
                </template>
              </svg-icon>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-card header="下级行政区当前指标">
        <div class="chartTitle">
          <div>下级行政区指标</div>
          <div>所有本级下属管理的行政区</div>
        </div>
        <div class="tlw-chart gdslChart" ref="gdsl"></div>
        <div class="chartTitle">
          <div>下级行政区指标</div>
          <div>所有本级下属管理的行政区</div>
        </div>
        <div class="tlw-chart stgmChart" ref="stgm"></div>
        <div class="chartTitle">
          <div>下级行政区指标</div>
          <div>所有本级下属管理的行政区</div>
        </div>
        <div class="tlw-chart lscnChart" ref="lscn"></div>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-card>
        <template #header>
          <div>
            原始行政区指标
            <span style="color: #424243; margin-left: 6px">
              数据更新于{{ data.queryParams.dateTime }}日
            </span>
          </div>
          <div>
            <el-button-group>
              <el-button
                size="small"
                :type="queryParams.yzbGq"
                @click="changeYzbUnit(0)"
                >公顷</el-button
              >
              <el-button
                size="small"
                :type="queryParams.yzbMu"
                @click="changeYzbUnit(1)"
                >亩</el-button
              >
            </el-button-group>
            <el-button @click="exporYzb" style="margin-left: 24px"
              >导出</el-button
            >
          </div>
        </template>
        <el-table
          :data="zbTableList"
          id="yzbTable"
          border
          stripe
          :row-style="zbRowStyle"
        >
          <el-table-column prop="xzq" label="行政区" width="180" />
          <el-table-column
            prop="xzqdm"
            label="行政区代码（账户）"
            width="180"
          />
          <el-table-column prop="gdzb" :label="yszb.gdsl" />
          <el-table-column prop="stzb" :label="yszb.stgm" />
          <el-table-column prop="cnzb" label="粮食产能（万公斤）" />
          <!-- <template #default="scope"> </template> -->
          <!-- <el-table-column label="指标明细" width="100">
          </el-table-column> -->
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-card>
        <template #header>
          <div>新行政区指标</div>
          <div>
            <el-button-group>
              <el-button
                size="small"
                :type="queryParams.xzbGq"
                @click="changeXzbUnit(0)"
                >公顷</el-button
              >
              <el-button
                size="small"
                :type="queryParams.xzbMu"
                @click="changeXzbUnit(1)"
                >亩</el-button
              >
            </el-button-group>
            <el-button @click="exporXzb" style="margin-left: 24px"
              >导出</el-button
            >
          </div>
        </template>
        <el-table
          :data="xzbTableList"
          id="xzbTable"
          border
          stripe
          :row-style="xzbRowStyle"
        >
          <el-table-column prop="xzq" label="行政区" width="180" />
          <el-table-column
            prop="xzqdm"
            label="行政区代码（账户）"
            width="180"
          />
          <el-table-column prop="gdzb" :label="xzb.gdsl" />
          <el-table-column prop="stzb" :label="xzb.stgm" />
          <el-table-column prop="cnzb" label="粮食产能（万公斤）" />
          <!-- <template #default="scope"> </template> -->
          <!-- <el-table-column label="指标明细" width="100">
          </el-table-column> -->
        </el-table>
      </el-card></el-col
    >
  </el-row>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import * as echarts from "echarts";
import { getTdzzSyqkList } from "@/tdzz/api/zbgl/zbk/zbk_syqk";
import { getList } from "@/tdzz/api/zbgl/zbtj/zbhy/zbk";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

//1.定义数据
const gdsl = ref();
const stgm = ref();
const lscn = ref();
const data = reactive({
  gdzbChartList: [
    // { name: "崇川区", value: 15 },
    // { name: "通州区", value: 16 },
    // { name: "海门区", value: 17 },
    // { name: "如东县", value: 18 },
    // { name: "如皋市", value: 19 },
    // { name: "启东市", value: 20 },
  ],
  stzbChartList: [],
  cnzbChartList: [],
  zbTableList: [],
  xzbTableList: [],
  nts: {},
  total: {},
  yszb: {
    gdsl: "耕地数量（公顷）",
    stgm: "水田规模（公顷）",
  },
  xzb: {
    gdsl: "耕地数量（公顷）",
    stgm: "水田规模（公顷）",
  },
  queryParams: {
    xzqdm: "3206",
    dateTime: "",
    yzbUnit: 0,
    yzbGq: "success",
    yzbMu: "",
    xzbUnit: 0,
    xzbGq: "success",
    xzbMu: "",
  },
});

const {
  gdzbChartList,
  stzbChartList,
  cnzbChartList,
  nts,
  total,
  yszb,
  xzb,
  zbTableList,
  xzbTableList,
  queryParams,
  pages,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getTdzzSyqkList();
  F_getTdzzZbk();
};

/**
 * 下级行政区当前指标-图表数据
 */
const F_getZbChartList = () => {
  getGdslChart();
  getStgmChart();
  getLscnChart();
};

/**
 * 耕地数量图表
 */
const getGdslChart = () => {
  const gdslChart = echarts.init(gdsl.value, null, {});
  const option = {
    legend: {
      formatter: () => {
        return "耕地数量（公顷）";
      },
    },
    grid: {
      top: "14%",
      bottom: "1%",
      left: "4%",
      right: "4%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    dataset: {
      source: data.gdzbChartList,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      name: "面积(公顷)",
    },
    series: [
      {
        type: "bar",
        color: "#1DC5B1",
        barWidth: "10%",
      },
    ],
  };
  gdslChart.setOption(option);
};

/**
 * 水田规模图表
 */
const getStgmChart = () => {
  const stgmChart = echarts.init(stgm.value, null, {});
  const option = {
    legend: {
      formatter: () => {
        return "水田规模（公顷）";
      },
    },
    grid: {
      top: "14%",
      bottom: "1%",
      left: "4%",
      right: "1%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    dataset: {
      source: data.stzbChartList,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      name: "面积(公顷)",
    },
    series: [
      {
        type: "bar",
        color: "#69bffe",
        barWidth: "10%",
      },
    ],
  };
  stgmChart.setOption(option);
};

/**
 * 粮食产能图表
 */
const getLscnChart = () => {
  const lscnChart = echarts.init(lscn.value, null, {});
  const option = {
    legend: {
      formatter: () => {
        return "粮食产能（万公斤）";
      },
    },
    grid: {
      top: "14%",
      bottom: "1%",
      left: "4%",
      right: "1%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    dataset: {
      source: data.cnzbChartList,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      name: "产能(万公斤)",
    },
    series: [
      {
        type: "bar",
        color: "#7dad05",
        barWidth: "10%",
      },
    ],
  };
  lscnChart.setOption(option);
};

/**
 * 下级行政区当前指标-表格数据
 */
const F_getTdzzSyqkList = () => {
  getTdzzSyqkList(data.queryParams).then((res) => {
    data.zbTableList = res.data.list;
    //更新日期显示
    if (data.zbTableList.length > 0) {
      data.queryParams.dateTime = dateFormat(data.zbTableList[0].updateTime);
    }
    data.zbTableList
      .filter((item) => item.xzqdm == "320600")
      .forEach((item) => {
        data.nts.gdzb = item.gdzb;
        data.nts.stzb = item.stzb;
        data.nts.cnzb = item.cnzb;
      });

    data.zbTableList
      .filter((item) => item.xzq == "合计")
      .forEach((item) => {
        data.total.gdzb = item.gdzb;
        data.total.stzb = item.stzb;
        data.total.cnzb = item.cnzb;
      });

    data.gdzbChartList = res.data.gdzbChartList;
    data.stzbChartList = res.data.stzbChartList;
    data.cnzbChartList = res.data.cnzbChartList;
    F_getZbChartList();
  });
};

/**
 * 新指标库
 */
const F_getTdzzZbk = () => {
  getList(data.queryParams).then((res) => {
    data.xzbTableList = res.data;
  });
};

/**
 * 原指标库单位切换
 */
const changeYzbUnit = (unit) => {
  //
  if (unit == 0 && data.queryParams.yzbUnit == 1) {
    data.queryParams.yzbGq = "success";
    data.queryParams.yzbMu = "";
    data.zbTableList.forEach((item) => {
      if (item.gdzb != 0) {
        item.gdzb = toDecimal4(accDiv(item.gdzb, 15));
        let gdsl = data.yszb.gdsl.replace("亩", "公顷");
        data.yszb.gdsl = gdsl;
      }
      if (item.stzb != 0) {
        item.stzb = toDecimal4(accDiv(item.stzb, 15));
        let stgm = data.yszb.stgm.replace("亩", "公顷");
        data.yszb.stgm = stgm;
      }
    });
    data.queryParams.yzbUnit = 0;
  } else if (unit == 1 && data.queryParams.yzbUnit == 0) {
    data.queryParams.yzbGq = "";
    data.queryParams.yzbMu = "success";
    data.zbTableList.forEach((item) => {
      if (item.gdzb != 0) {
        item.gdzb = accMul(item.gdzb, 15);
        let gdsl = data.yszb.gdsl.replace("公顷", "亩");
        data.yszb.gdsl = gdsl;
      }
      if (item.stzb != 0) {
        item.stzb = accMul(item.stzb, 15);
        let stgm = data.yszb.stgm.replace("公顷", "亩");
        data.yszb.stgm = stgm;
      }
    });
    data.queryParams.yzbUnit = 1;
  }
};

/**
 * 新指标库单位切换
 */
const changeXzbUnit = (unit) => {
  //
  if (unit == 0 && data.queryParams.xzbUnit == 1) {
    data.queryParams.xzbGq = "success";
    data.queryParams.xzbMu = "";
    data.xzbTableList.forEach((item) => {
      if (item.gdzb != 0) {
        item.gdzb = toDecimal4(accDiv(item.gdzb, 15));
        let gdsl = data.xzb.gdsl.replace("亩", "公顷");
        data.xzb.gdsl = gdsl;
      }
      if (item.stzb != 0) {
        item.stzb = toDecimal4(accDiv(item.stzb, 15));
        let stgm = data.xzb.stgm.replace("亩", "公顷");
        data.xzb.stgm = stgm;
      }
    });
    data.queryParams.xzbUnit = 0;
  } else if (unit == 1 && data.queryParams.xzbUnit == 0) {
    data.queryParams.xzbGq = "";
    data.queryParams.xzbMu = "success";
    data.xzbTableList.forEach((item) => {
      if (item.gdzb != 0) {
        item.gdzb = accMul(item.gdzb, 15);
        let gdsl = data.xzb.gdsl.replace("公顷", "亩");
        data.xzb.gdsl = gdsl;
      }
      if (item.stzb != 0) {
        item.stzb = accMul(item.stzb, 15);
        let stgm = data.xzb.stgm.replace("公顷", "亩");
        data.xzb.stgm = stgm;
      }
    });
    data.queryParams.xzbUnit = 1;
  }
};

/**
 * 导出原指标
 */
const exporYzb = () => {
  let wb = XLSX.utils.table_to_book(document.getElementById("yzbTable"), {
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
      "原始行政区指标.xlsx"
    );
  } catch (e) {
    console.error(e, wbout, "----->>>");
  }
};

/**
 * 导出新指标
 */
const exporXzb = () => {
  let wb = XLSX.utils.table_to_book(document.getElementById("xzbTable"), {
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
      "新行政区指标.xlsx"
    );
  } catch (e) {
    console.error(e, wbout, "----->>>");
  }
};

/**
 * 原指标库首尾样式修改
 * @param {*} row
 */
const zbRowStyle = (row) => {
  if (row.rowIndex == 0 || row.rowIndex == data.zbTableList.length - 1) {
    return { "font-weight": "700" };
  }
};

/**
 * 新指标库首尾样式修改
 * @param {*} row
 */
const xzbRowStyle = (row) => {
  if (row.rowIndex == 0 || row.rowIndex == data.xzbTableList.length - 1) {
    return { "font-weight": "700" };
  }
};

/**
 * 日期格式转换
 */
const dateFormat = (daterc) => {
  if (daterc != null) {
    var date = new Date(daterc);
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始，11结束，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return (
      year + "-" + month + "-" + day
      // " " +
      // hours +
      // ":" +
      // minutes +
      // ":" +
      // seconds
    );
  }
};

/**
 * 乘法
 * @param {*} arg1
 * @param {*} arg2
 */
const accMul = (arg1, arg2) => {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};

/**
 * 除法
 * @param {*} arg1
 * @param {*} arg2
 */
const accDiv = (arg1, arg2) => {
  let t1 = 0;
  let t2 = 0;
  let r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  let intDiv = r1 / r2;
  let pow = Math.pow(10, t2 - t1);
  return accMul(intDiv, pow); // 这里用上面定义好的乘法运算
};

/**
 * 保留四位小数
 * @param {*} x
 */
const toDecimal4 = (x) => {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 10000) / 10000;
  var s = f.toString();
  var rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + 4) {
    s += "0";
  }
  return s;
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
<style lang="scss" scoped>
.hjzbCard,
.dqzbCard {
  .el-row {
    .el-col:nth-child(1) {
      .el-card {
        background: #008000;
        color: #ffffff;
      }
    }

    .el-col:nth-child(2) {
      .el-card {
        background: #145fb4;
        color: #ffffff;
      }
    }

    .el-col:nth-child(3) {
      .el-card {
        background: #a3b414;
        color: #ffffff;
      }
    }
  }
}

.jyzbCard,
.ghzbCard {
  .el-row {
    .el-col:nth-child(1) {
      .el-card {
        background: rgba(0, 128, 0, 0.1);
        border: 0.0625rem solid #008000;
        color: #008000;
      }
    }

    .el-col:nth-child(2) {
      .el-card {
        background: rgba(69, 150, 222, 0.1);
        border: 0.0625rem solid #145fb4;
        color: #145fb4;
      }
    }

    .el-col:nth-child(3) {
      .el-card {
        background: rgba(163, 180, 20, 0.1);
        border: 0.0625rem solid #a3b414;
        color: #a3b414;
      }
    }
  }
}

.tlw-chart {
  height: 40.2vh;
  border: 0.0625rem solid #cccccc;
  margin-bottom: 1.25rem;
  padding: 0.625rem 0;

  &:last-child {
    margin-bottom: 0;
  }
}

.icon-title {
  margin-left: 10px;
}
</style>