<template>
  <el-main class="tlw-home">
    <el-row :gutter="20">
      <el-col :span="7">
        <el-card>
          <template #header>
            <svg-icon name="tdzz-home-xmgm" title="项目规模"></svg-icon>
          </template>
          <div class="tlw-chart lxgmChart" ref="lxgm"></div>
          <el-divider border-style="dashed" />
          <div class="tlw-chart ysgmChart" ref="ysgm"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="mapCard">
          <div class="tlw-select">
            <el-select
              v-model="selectYear"
              filterable
              clearable
              @change="F_init"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="tlw-chart mapChart" ref="map" shadow="never"></div>

          <div class="map-row">
            <div class="map-tabs">
              <div
                class="map-tab"
                v-for="(item, index) in mapTabs"
                :key="index"
                :class="{
                  'is-active': isActive === index,
                }"
                @click="mapChange(item.name, index)"
              >
                <div class="map-title">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <template #header>
            <svg-icon name="tdzz-home-lxxm" title="入库项目"></svg-icon>
          </template>
          <div class="tlw-chart lxxmChart" ref="lxxm"></div>
        </el-card>
        <el-card class="ysxmCard">
          <template #header>
            <svg-icon name="tdzz-home-ysxm" title="验收项目"></svg-icon>
          </template>
          <div class="tlw-chart ysxmChart" ref="ysxm"></div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import "@/assets/css/home.scss";
import * as echarts from "echarts";
import nt_320600 from "@/common/map/320600.json";
import {
  mapJsonByCityCode,
  mapJsonByCityName,
} from "../../../common/utils/constant";
import store from "@/common/store";
import {
  getLxgmData,
  getYsgmData,
  getLxxmCount,
  getYsxmCount,
  getLxxmData,
  getYsxmData,
} from "@/tdzz/api/home/home.js";
import { closestMultiple } from "@/common/utils/nubmer.js";
import { ElMessageBox } from "element-plus";

//1.定义数据
const { proxy } = getCurrentInstance();
const lxgm = ref();
const ysgm = ref();
const map = ref();
const lxxm = ref();
const ysxm = ref();
const data = reactive({
  organizationGrade: store.state.user.organizationGrade,
  regionCode: store.state.user.regionCode,
  grade: store.state.user.organizationGrade,
  xzqdm: store.state.user.regionCode,
  flag: false,
  lxgmList: [], //在建项目规模统计数据
  ysgmList: [], //验收项目规模统计数据
  xmCount: [], //在建项目数-验收项目数
  lxxmList: [], //入库项目统计数据
  lxxmMax: 10, //入库项目最大值
  ysxmList: [], //验收项目统计数据
  ysxmMax: 10, //验收项目最大值
  left: "2%", //柱状图y轴左边距
  yearList: [], //年份查询列表
  selectYear: "", //选择年份
  rotate: store.state.user.organizationGrade == "市局" ? 30 : 45, //柱状图x轴名称倾斜度
  mapJson: mapJsonByCityCode.get(store.state.user.regionCode), //地图JSON
  mapTabs: [
    {
      name: "在建项目",
    },
    {
      name: "验收项目",
    },
  ],
  isActive: 0,
  catalog: "在建项目",
});
const { grade, selectYear, yearList, mapTabs, isActive, catalog } =
  toRefs(data);

//2.定义方法

/**
 * 初始化年份列表
 */
const F_initYearList = () => {
  //每次初始化前置空年份列表
  let nowyear = new Date().getFullYear();
  //默认选择当前年份
  data.selectYear = new Date().getFullYear();
  for (let i = nowyear; i >= nowyear - 4; i--) {
    data.yearList.push(i);
  }
};

/**
 * 在建项目规模
 */
const F_getLxgmData = () => {
  getLxgmData(data.xzqdm, data.selectYear).then((res) => {
    data.lxgmList = res.data;
    getLxgm();
  });
};

/**
 * 验收项目规模
 */
const F_getYsgmData = () => {
  getYsgmData(data.xzqdm, data.selectYear).then((res) => {
    data.ysgmList = res.data;
    getYsgm();
  });
};

/**
 * 地图-在建项目
 */
const F_getLxMapData = () => {
  getLxxmCount(data.xzqdm, data.selectYear).then((res) => {
    data.xmCount = res.data;
    getMap();
  });
};

/**
 * 地图-验收项目
 */
const F_getYsMapData = () => {
  getYsxmCount(data.xzqdm, data.selectYear).then((res) => {
    data.xmCount = res.data;
    getMap();
  });
};

/**
 * 入库项目
 */
const F_getLxxmData = () => {
  getLxxmData(data.xzqdm, data.selectYear).then((res) => {
    data.lxxmList = res.data;
    data.lxxmList.map((obj) => {
      let max = Math.max(
        ...[obj["占补平衡"], obj["旱改水"], obj["增减挂钩"], obj["工矿废弃地"]]
      );
      if (Number.isNaN(max)) {
        max = 0;
      }
      if (max > data.lxxmMax) {
        data.lxxmMax = max;
      }
    });
    //取整
    data.lxxmMax = closestMultiple(data.lxxmMax, 5);
    getLxxm();
  });
};

/**
 * 验收项目
 */
const F_getYsxmData = () => {
  getYsxmData(data.xzqdm, data.selectYear).then((res) => {
    data.ysxmList = res.data;
    data.ysxmList.map((obj) => {
      let max = Math.max(
        ...[obj["占补平衡"], obj["旱改水"], obj["增减挂钩"], obj["工矿废弃地"]]
      );
      if (Number.isNaN(max)) {
        max = 0;
      }
      if (max > data.ysxmMax) {
        data.ysxmMax = max;
      }
    });
    //取整
    data.ysxmMax = closestMultiple(data.ysxmMax, 5);
    getYsxm();
  });
};

const getLxgm = () => {
  const lxgmChart = echarts.init(lxgm.value, null, {});
  const option = {
    title: {
      text: "在建项目规模",
      textStyle: {
        fontSize: 13,
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        data: data.lxgmList,
        label: {
          show: true,
          formatter: "{b}" + "\n\r" + "{d}%",
        },

        roseType: "area",
      },
    ],
  };
  lxgmChart.setOption(option);
  proxy.$echartsResize(lxgmChart);
};

const getYsgm = () => {
  const ysgmChart = echarts.init(ysgm.value, null, {});
  const option = {
    title: {
      text: "验收项目规模",
      textStyle: {
        fontSize: 13,
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        data: data.ysgmList,
        label: {
          show: true,
          formatter: "{b}" + "\n\r" + "{d}%",
        },

        roseType: "area",
      },
    ],
  };
  ysgmChart.setOption(option);
  proxy.$echartsResize(ysgmChart);
};

const getMap = () => {
  const mapChart = echarts.init(map.value, null, {});
  if (data.organizationGrade == "镇局") {
    data.mapJson = mapJsonByCityCode.get(data.xzqdm.substring(0, 6));
  }
  echarts.registerMap("nt", data.mapJson);
  const option = {
    // layoutCenter: ['50%', '42%'],//位置
    // layoutSize:'80%',//大小
    // 背景颜色
    // backgroundColor: "#ecf5ff",
    // 渐变图例
    visualMap: {
      // type: "continuous", // 连续型：continuous； 分段型：piecewise
      // min: 0,
      // max: 10000,
      // inRange: {
      //   color: ["#87D3FF", "#6eb8ef", "#4f97dc", "#357bcc", "#1A5EBB"],
      // },
      pieces: [
        {
          gte: 0,
          lte: 0,
          color: "#ecf5ff",
        },
        {
          gte: 1,
          lt: 500,
          color: "#87D3FF",
        },
        {
          gte: 500,
          lte: 1000,
          color: "#6eb8ef",
        },
        {
          gte: 1000,
          lt: 5000,
          color: "#4f97dc",
        },
        {
          gte: 5000,
          lt: 10000,
          color: "#357bcc",
        },
        {
          gte: 10000,
          color: "#1A5EBB",
        },
      ],
      bottom: 0,
    },
    // 提示浮窗样式
    tooltip: {
      trigger: "item",
      show: true,
      // borderColor: "#4596DE", //设置边框颜色
      formatter: (params) => {
        let value = isNaN(params.value) ? 0 : params.value;
        return (
          "<div style='font-weight:bold'>" +
          data.catalog +
          "<div><div style='font-weight:normal'>" +
          params.name +
          ":  " +
          value +
          " 个</div>"
        );
      },
    },
    series: [
      {
        type: "map",
        map: "nt",
        zoom: 1.1,
        // silent: true, //禁用地图的hover事件
        // roam: true, //是否开启鼠标缩放和平移漫游。默认不开启
        selectedMode: false, //关闭点击选择地图区域时，被选中区域显示黄色的问题
        // 通常状态下的样式
        itemStyle: {
          borderColor: "#79bbff", //图形的描边颜色
          borderWidth: 1, //描边线宽。为 0 时无描边。
          borderType: "solid", //柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
          // areaColor: "rgba(0, 186, 0, 0.8)", //图形的颜色 #eee
          // shadowBlur: 1, //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
          // shadowColor: "#002900", //阴影色
          // shadowOffsetX: 2, //X轴阴影
          // shadowOffsetY: -2, //Y轴阴影
        },
        // 鼠标放上去高亮的样式
        emphasis: {
          itemStyle: {
            areaColor: "#0984e3",
            borderWidth: 0,
          },
        },
        //名称显示 label
        label: {
          show: true,
          formatter: (params) => {
            return params.name + "\n" + "o";
          },
          fontWeight: "bold",
          fontSize: "12",
        },
        data: data.xmCount,
      },
    ],
  };
  mapChart.setOption(option);
  mapChartEvent(mapChart);
  proxy.$echartsResize(mapChart);
};

/**
 * 地图钻取
 * @param {*} mapChart
 */
const mapChartEvent = (mapChart) => {
  if (!data.flag) {
    if (data.organizationGrade === "市局") {
      //点击地图空白区域返回上一层
      mapChart.getZr().on("click", (params) => {
        if (!params.target) {
          if (data.grade == "县局") {
            data.grade = "市局";
            data.xzqdm = data.regionCode;
            data.rotate = 30;
            data.mapJson = nt_320600;
            data.left = "2%";
            F_init();
          }
        }
      });
      //地图钻取绑定事件
      mapChart.on("click", (params) => {
        if (data.grade == "市局") {
          //这三个区目前没有镇
          if (
            params.data.code == "320687" ||
            params.data.code == "320688" ||
            params.data.code == "320699"
          ) {
            data.left = "7%";
            ElMessageBox.alert(
              params.data.name + "无下级乡镇无法钻取！",
              "提示",
              {
                type: "warning",
              }
            )
              .then()
              .catch();
          } else {
            data.grade = "县局";
            data.xzqdm = params.data.code;
            data.rotate = 45;
            data.mapJson = mapJsonByCityName.get(params.name);
            F_init();
          }
        }
      });
    }
    data.flag = true;
  }
};

const mapChange = (name, index) => {
  data.isActive = index;
  data.catalog = name;
  if (index == 0) {
    F_getLxMapData();
  } else {
    F_getYsMapData();
  }
};

//入库项目
const getLxxm = () => {
  const lxxmChart = echarts.init(lxxm.value, null, {});
  const option = {
    legend: {
      right: 0,
    },
    grid: {
      top: "18%",
      bottom: "0",
      left: data.left,
      right: "1%",
      containLabel: true,
    },
    tooltip: {},
    dataset: {
      source: data.lxxmList,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        interval: 0,
        rotate: data.rotate,
      },
    },
    yAxis: {
      name: "单位：个",
      max: data.lxxmMax,
    },
    series: [
      {
        type: "bar",
      },
      {
        type: "bar",
      },
      {
        type: "bar",
      },
      {
        type: "bar",
      },
    ],
  };
  lxxmChart.setOption(option);
  proxy.$echartsResize(lxxmChart);
};

//验收项目
const getYsxm = () => {
  const ysxmChart = echarts.init(ysxm.value, null, {});
  const option = {
    legend: {
      right: 0,
    },
    grid: {
      top: "18%",
      bottom: "1%",
      left: data.left,
      right: "0",
      containLabel: true,
    },
    tooltip: {},
    dataset: {
      source: data.ysxmList,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        interval: 0,
        rotate: data.rotate,
      },
    },
    yAxis: {
      name: "单位：个",
      max: data.ysxmMax,
    },
    series: [
      {
        type: "bar",
      },
      {
        type: "bar",
      },
      {
        type: "bar",
      },
      {
        type: "bar",
      },
    ],
  };
  ysxmChart.setOption(option);
  proxy.$echartsResize(ysxmChart);
};

/**
 * 页面初始化
 */
const F_init = () => {
  F_getLxgmData();
  F_getYsgmData();
  if (data.isActive == 0) {
    F_getLxMapData();
  } else {
    F_getYsMapData();
  }
  F_getLxxmData();
  F_getYsxmData();
};

//3.入口
onMounted(() => {
  F_initYearList();
  F_init();
});
</script>
