<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：指标库 > 对账单"></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="指标所在地">
          <el-select
            v-model="queryParams.xzqdm"
            placeholder="请选择"
            style="width: 100%"
            clearable
            @change="changeCode"
            @clear="clearOut"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in districtOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_getTableList">查询</el-button>
          <el-button type="primary">帮助</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-card header="累计总借信用指标" class="jyzbCard">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <svg-icon name="zbgl_gdsl_bg" size="48px">
                <template #icon-title class="icon-title">
                  <div class="icon-title">
                    <div>剩余耕地数量（公顷）</div>
                    <div>{{Number(top.SY_GDZB).toFixed(4)}}</div>
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
                    <div>剩余水田规模（公顷）</div>
                    <div>{{Number(top.SY_STZB).toFixed(4)}}</div>
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
                    <div>剩余粮食产能（公斤）</div>
                    <div>{{Number(top.SY_CNZB).toFixed(4)}}</div>
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
      <el-table
        :data="rkzbTableList"
        border
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column label="入库指标">
          <el-table-column prop="typeName" label="数据类型" width="150" />
          <el-table-column label="耕地（公顷）">
            <el-table-column prop="gdzb" label="指标"></el-table-column>
            <el-table-column prop="gdzbRate" label="比例（%）"></el-table-column>
          </el-table-column>
          <el-table-column label="水田 （公顷）">
            <el-table-column prop="stzb" label="指标"></el-table-column>
            <el-table-column prop="stzbRate" label="比例（%）"></el-table-column>
          </el-table-column>
          <el-table-column label="产能 （公斤）">
            <el-table-column prop="cnzb" label="指标"></el-table-column>
            <el-table-column prop="cnzbRate" label="比例（%）"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12">
      <el-tabs v-model="rkActiveName" @tab-click="rkzbChange" class="tlw-tabs">
        <el-tab-pane label="耕地指标" name="first">
          <div
            class="tlw-chart rkChart"
            ref="rkzb"
            v-if="rkActiveName === 'first'"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="水田指标" name="second">
          <div
            class="tlw-chart rkChart"
            ref="rkzb"
            v-if="rkActiveName === 'second'"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="产能指标" name="third">
          <div
            class="tlw-chart rkChart"
            ref="rkzb"
            v-if="rkActiveName === 'third'"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
  <el-row class="tlw-row" :gutter="20">
    <el-col :span="12">
      <el-table
        :data="ckzbTableList"
        border
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column label="出库指标">
          <el-table-column prop="typeName" label="数据类型" width="150" />
          <el-table-column label="耕地（公顷）">
            <el-table-column prop="gdzb" label="指标"></el-table-column>
            <el-table-column prop="gdzbRate" label="比例（%）"></el-table-column>
          </el-table-column>
          <el-table-column label="水田 （公顷）">
            <el-table-column prop="stzb" label="指标"></el-table-column>
            <el-table-column prop="stzbRate" label="比例（%）"></el-table-column>
          </el-table-column>
          <el-table-column label="产能 （公斤）">
            <el-table-column prop="cnzb" label="指标"></el-table-column>
            <el-table-column prop="cnzbRate" label="比例（%）"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12">
      <el-tabs
        type="card"
        v-model="ckActiveName"
        @tab-click="ckzbChange"
        class="tlw-tabs"
      >
        <el-tab-pane label="耕地指标" name="first">
          <div
            class="tlw-chart ckChart"
            ref="ckzb"
            v-if="ckActiveName === 'first'"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="水田指标" name="second">
          <div
            class="tlw-chart ckChart"
            ref="ckzb"
            v-if="ckActiveName === 'second'"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="产能指标" name="third">
          <div
            class="tlw-chart ckChart"
            ref="ckzb"
            v-if="ckActiveName === 'third'"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import * as echarts from "echarts";
import { getTdzzRegionCode } from "@/tdzz/api/zbgl/public";
import { getTdzzLszbkdzdList } from "@/tdzz/api/zbgl/zbk/zbk_lszbkdzd";
import store from "@/common/store";
import { getDistrictList } from "@/common/api/jtap/district";

//1.定义数据
const rkzb = ref();
const ckzb = ref();
const rkActiveName = ref("first");
const ckActiveName = ref("first");
const data = reactive({
  districtOptions: [], //行政区列表
  queryParams: {
    xzqdm: "", //行政区代码
  },
  top:{},
  rkzbTableList: [],
  ckzbTableList: [],
  rkzbChartList: [
    { name: "2017年后新增指标", value: 15 },
    { name: "2017年前新增指标", value: 15 },
    { name: "调入指标", value: 15 },
    { name: "授入指标", value: 15 },
    { name: "提改授入指标", value: 15 },
    { name: "其它指标", value: 15 },
    { name: "解挂迁移指标", value: 15 },
  ],
  ckzbChartList: [
    { name: "挂钩指标新", value: 15 },
    { name: "挂钩指标老", value: 15 },
    { name: "调出指标", value: 15 },
    { name: "授出指标", value: 15 },
    { name: "挂钩提改指标", value: 15 },
    { name: "授出提改指标", value: 15 },
    { name: "承诺核销指标", value: 15 },
    { name: "冻结指标", value: 15 },
    { name: "历史挂钩指标", value: 15 },
    { name: "已用于统筹指标", value: 15 },
  ],
});

const { top, districtOptions, queryParams, rkzbTableList, ckzbTableList } =
  toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getTdzzRegionCode();
  F_getTableList();
  // F_getRkzbTableList();
  // F_getRkzbChartList();
  // F_getCkzbTableList();
  // F_getCkzbChartList();
};

const F_getTableList = () => {
  getTdzzLszbkdzdList(data.queryParams).then((res) => {
    data.rkzbTableList = res.data.RK_DATA;
    data.ckzbTableList = res.data.CK_DATA;
    data.top = res.data.TOP;
    data.rkzbChartList = res.data.rkzbChartList;
    data.ckzbChartList = res.data.ckzbChartList;
  });
};

/**
 * 查询行政区代码
 */
 const F_getTdzzRegionCode = () => {
  getTdzzRegionCode().then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 行政区变更
 */
const changeCode = (val) => {
  data.queryParams.xzqdm = val;
};

/**
 * 清空行政区
 */
const clearOut = () => {
  data.queryParams.xzqdm = "";
};


/**
 * 获取入库指标表格数据
 */
const F_getRkzbTableList = () => {};

/**
 * 获取出库指标表格数据
 */
const F_getCkzbTableList = () => {};

/**
 * 合计
 */
const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "合计";
      return;
    }
    const values = data.map((item) => Number(item[column.property]));
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `${values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!Number.isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0)}`;
    } else {
      sums[index] = "N/A";
    }
  });

  return sums;
};

/**
 * 获取入库指标统计数据
 */
const F_getRkzbChartList = () => {
  getRkzbChart();
};

/**
 * 入库指标tab切换
 */
const rkzbChange = () => {
  nextTick(() => {
    getRkzbChart();
  });
};

/**
 * 入库指标图表
 */
const getRkzbChart = () => {
  const rkzbChart = echarts.init(rkzb.value, null, {});
  const option = {
    legend: {
      textStyle: {
        fontSize: 12,
      },
      top: "center",
      right: "6%",
      orient: "vertical",
      itemHeight: "12",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        data: data.rkzbChartList,
        label: {
          show: true,
          formatter: "{b}" + "\n\r" + "{d}%",
          textStyle: {
            fontSize: 12,
          },
        },
        roseType: "area",
        center: ["40%", "50%"], // 这个属性调整图像的位置！！！！！
      },
    ],
  };
  rkzbChart.setOption(option);
};

/**
 * 获取出库指标统计数据
 */
const F_getCkzbChartList = () => {
  getCkzbChart();
};

/**
 * 出库指标tab切换
 */
const ckzbChange = () => {
  nextTick(() => {
    getCkzbChart();
  });
};

/**
 * 出库指标图表
 */
const getCkzbChart = () => {
  const ckzbChart = echarts.init(ckzb.value, null, {});
  const option = {
    legend: {
      textStyle: {
        fontSize: 12,
      },
      top: "center",
      right: "6%",
      orient: "vertical",
      itemHeight: "12",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        data: data.ckzbChartList,
        label: {
          show: true,
          formatter: "{b}" + "\n\r" + "{d}%",
          textStyle: {
            fontSize: 12,
          },
        },
        roseType: "area",
        center: ["40%", "50%"], // 这个属性调整图像的位置！！！！！
      },
    ],
  };
  ckzbChart.setOption(option);
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
<style lang="scss" scoped>
.jyzbCard {
  .el-row {
    .el-col:nth-child(1) {
      .el-card {
        background: rgba(0, 128, 0, 0.1);
        border: .0625rem solid #008000;
        color: #008000;
      }
    }

    .el-col:nth-child(2) {
      .el-card {
        background: rgba(69, 150, 222, 0.1);
        border: .0625rem solid #145fb4;
        color: #145fb4;
      }
    }

    .el-col:nth-child(3) {
      .el-card {
        background: rgba(163, 180, 20, 0.1);
        border: .0625rem solid #a3b414;
        color: #a3b414;
      }
    }
  }
}
.rkChart {
  height: 30vh;
}
.ckChart {
  height: 30vh;
}
.icon-title {
  margin-left: .625rem;
}
</style>