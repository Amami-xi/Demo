<template>
  <el-main class="tlw-home">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <svg-icon name="lysp-xmsyld" title="项目使用林地"></svg-icon>
          </template>
          <div class="tlw-select" style="text-align: center">
            <span>年份：</span>
            <el-select
              v-model="ldStartYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_xmsyldSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            &ensp;&ensp;
            <span>~</span>
            &ensp;&ensp;
            <el-select
              v-model="ldEndYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_xmsyldSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="tlw-chart xmsyld" ref="xmsyld"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <svg-icon name="lysp-sd" title="湿地占用征收"></svg-icon>
          </template>
          <div class="tlw-select" style="text-align: center">
            <span>年份：</span>
            <el-select
              v-model="sdStartYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_sdSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            &ensp;&ensp;
            <span>~</span>
            &ensp;&ensp;
            <el-select
              v-model="sdEndYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_sdSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="tlw-chart gyl" ref="sdzyzs"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <svg-icon name="lysp-gyl" title="公益林"></svg-icon>
          </template>
          <div class="tlw-select" style="text-align: center">
            <span>年份：</span>
            <el-select
              v-model="gylStartYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_gylSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            &ensp;&ensp;
            <span>~</span>
            &ensp;&ensp;
            <el-select
              v-model="gylEndYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_gylSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="tlw-chart gyl" ref="gyl"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="tlw-row">
      <el-col :span="8">
        <el-card>
          <template #header>
            <svg-icon name="lysp-cf" title="林木采伐"></svg-icon>
          </template>
          <el-tabs default-active-key="1" @tab-click="callback">
            <el-tab-pane key="1" tab="Tab 1" label="汇总"></el-tab-pane>
            <el-tab-pane key="2" label="公益林"></el-tab-pane>
            <el-tab-pane key="3" label="商品林"></el-tab-pane>
          </el-tabs>
          <!-- <el-tabs v-model="first" class="demo-tabs">
            <el-tab-pane label="公益林" name="first"></el-tab-pane>
            <el-tab-pane label="商品林" name="second"></el-tab-pane>
          </el-tabs> -->
          <div class="tlw-select tlw-select-cf" style="text-align: center">
            <span>年份：</span>
            <el-select
              v-model="cfStartYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_lmcfSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            &ensp;&ensp;
            <span>~</span>
            &ensp;&ensp;
            <el-select
              v-model="cfEndYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_lmcfSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="tlw-chart cf" ref="lmcf"></div>
          <!-- <el-tabs v-model="rgfyActive" @tab-click="rgfyTabChange">
            <el-tab-pane label="办件量统计" name="first">
              <div
                class="tlw-chart rgfy"
                ref="rgfy"
                v-if="rgfyActive === 'first'"
              ></div>
            </el-tab-pane>
            <el-tab-pane label="物种统计" name="second">
              <div
                class="tlw-chart rgfy"
                ref="rgfy"
                v-if="rgfyActive === 'second'"
              ></div>
            </el-tab-pane>
          </el-tabs> -->
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <svg-icon name="lysp-ysdw" title="野生动物"></svg-icon>
            <!-- <svg-icon name="jyly" title="野外物种"></svg-icon> -->
          </template>
          <div class="tlw-select" style="text-align: center">
            <span>年份：</span>
            <el-select
              v-model="ysStartYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_ysdwSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            &ensp;&ensp;
            <span>~</span>
            &ensp;&ensp;
            <el-select
              v-model="ysEndYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_ysdwSelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="tlw-chart ysdw" ref="ysdw"></div>
          <!-- <el-tabs v-model="jylyActive" @tab-click="jylyTabChange">
            <el-tab-pane label="办件量统计" name="first">
              <div
                class="tlw-chart jyly"
                ref="jyly"
                v-if="jylyActive === 'first'"
              ></div>
            </el-tab-pane>
            <el-tab-pane label="物种统计" name="second">
              <div
                class="tlw-chart jyly"
                ref="jyly"
                v-if="jylyActive === 'second'"
              ></div>
            </el-tab-pane>
          </el-tabs> -->
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <svg-icon name="lysp-zwjy" title="植物检疫"></svg-icon>
          </template>
          <div class="tlw-select" style="text-align: center">
            <span>年份：</span>
            <el-select
              v-model="zwStartYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_zwjySelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            &ensp;&ensp;
            <span>~</span>
            &ensp;&ensp;
            <el-select
              v-model="zwEndYear"
              style="width: 30%"
              filterable
              clearable
              @change="F_zwjySelect"
            >
              <el-option
                v-for="(item, index) in yearList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="tlw-chart gyl" ref="zwjy"></div>
          <!-- <el-tabs v-model="ywblActive" @tab-click="ywblTabChange">
            <el-tab-pane label="办件量统计" name="first">
              <div
                class="tlw-chart ywbl"
                ref="ywbl"
                v-if="ywblActive === 'first'"
              ></div>
            </el-tab-pane>
            <el-tab-pane label="物种统计" name="second">
              <div
                class="tlw-chart ywbl"
                ref="ywbl"
                v-if="ywblActive === 'second'"
              ></div>
            </el-tab-pane>
          </el-tabs> -->
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup>
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import "@/assets/css/ly_home.scss";
import * as echarts from "echarts";
import store from "@/common/store";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDistrictList } from "@/common/api/jtap/district";
import {
  getXmsyldList,
  getSdzyzsList,
  getGylList,
  getLmcfList,
  getYsdwList,
  getZwjyList,
} from "@/ly/api/home/home.js";
import { reduce } from "lodash";

//1.定义数据
const { proxy } = getCurrentInstance();
const xmsyld = ref(); //项目使用林地
const sdzyzs = ref(); //湿地占用征收
const gyl = ref(); //公益林
const lmcf = ref(); //林木采伐
const ysdw = ref(); //野生动物
const zwjy = ref(); //植物检疫

const rgfy = ref();
const jyly = ref();
const ywbl = ref();

const sdzyzsActive = ref("first");
const rgfyActive = ref("first");
const jylyActive = ref("first");
const ywblActive = ref("first");
const data = reactive({
  organizationGrade: store.state.user.organizationGrade,
  regionCode: store.state.user.regionCode,
  grade: store.state.user.organizationGrade,
  xzqdm: store.state.user.regionCode,
  districtList: [], //行政区列表
  commonList: [
    { year: "2019", 办件量: 90 },
    { year: "2020", 办件量: 108 },
    { year: "2021", 办件量: 52 },
    { year: "2022", 办件量: 79 },
  ],
  xmsyldList: [
    { 区县: "崇川区", 项目数量: 198, 累计面积: 500 },
    { 区县: "经济技术开发区", 项目数量: 80, 累计面积: 720 },
    { 区县: "通州区", 项目数量: 207, 累计面积: 360 },
    { 区县: "如东县", 项目数量: 90, 累计面积: 500 },
    { 区县: "启东市", 项目数量: 80, 累计面积: 666 },
    { 区县: "如皋市", 项目数量: 201, 累计面积: 777 },
    { 区县: "海门区", 项目数量: 190, 累计面积: 555 },
    { 区县: "高新区", 项目数量: 177, 累计面积: 600 },
    { 区县: "苏锡通园区", 项目数量: 150, 累计面积: 606 },
    { 区县: "通州湾示范区", 项目数量: 137, 累计面积: 566 },
  ], //项目使用林地统计数据
  sdzyzsList: [
    { 区县: "崇川区", 项目数量: 198, 累计面积: 500 },
    { 区县: "经济技术开发区", 项目数量: 80, 累计面积: 720 },
    { 区县: "通州区", 项目数量: 207, 累计面积: 360 },
    { 区县: "如东县", 项目数量: 90, 累计面积: 500 },
    { 区县: "启东市", 项目数量: 80, 累计面积: 666 },
    { 区县: "如皋市", 项目数量: 201, 累计面积: 777 },
    { 区县: "海门区", 项目数量: 190, 累计面积: 555 },
    { 区县: "高新区", 项目数量: 177, 累计面积: 600 },
    { 区县: "苏锡通园区", 项目数量: 150, 累计面积: 606 },
    { 区县: "通州湾示范区", 项目数量: 137, 累计面积: 566 },
  ], //湿地占用征收统计数据
  gylList: [
    { 区县: "崇川区", 项目数量: 137, 累计面积: 566 },
    { 区县: "经济技术开发区", 项目数量: 80, 累计面积: 500 },
    { 区县: "通州区", 项目数量: 198, 累计面积: 360 },
    { 区县: "如东县", 项目数量: 177, 累计面积: 500 },
    { 区县: "启东市", 项目数量: 280, 累计面积: 666 },
    { 区县: "如皋市", 项目数量: 150, 累计面积: 777 },
    { 区县: "海门区", 项目数量: 190, 累计面积: 100 },
    { 区县: "高新区", 项目数量: 20, 累计面积: 94 },
    { 区县: "苏锡通园区", 项目数量: 30, 累计面积: 32 },
    { 区县: "通州湾示范区", 项目数量: 10, 累计面积: 16 },
  ], //公益林统计数据
  lmcfList: [
    { 区县: "崇川区", 项目数量: 150, 累计面积: 566 },
    { 区县: "经济技术开发区", 项目数量: 80, 累计面积: 500 },
    { 区县: "通州区", 项目数量: 111, 累计面积: 360 },
    { 区县: "如东县", 项目数量: 70, 累计面积: 500 },
    { 区县: "启东市", 项目数量: 60, 累计面积: 666 },
    { 区县: "如皋市", 项目数量: 25, 累计面积: 777 },
    { 区县: "海门区", 项目数量: 120, 累计面积: 100 },
    { 区县: "高新区", 项目数量: 24, 累计面积: 94 },
    { 区县: "苏锡通园区", 项目数量: 31, 累计面积: 32 },
    { 区县: "通州湾示范区", 项目数量: 12, 累计面积: 16 },
  ], //林木采伐统计数据
  cfGylList: [
    { 区县: "崇川区", 项目数量: 3, 累计面积: 566 },
    { 区县: "经济技术开发区", 项目数量: 300, 累计面积: 500 },
    { 区县: "通州区", 项目数量: 198, 累计面积: 360 },
    { 区县: "如东县", 项目数量: 177, 累计面积: 500 },
    { 区县: "启东市", 项目数量: 121, 累计面积: 666 },
    { 区县: "如皋市", 项目数量: 55, 累计面积: 777 },
    { 区县: "海门区", 项目数量: 99, 累计面积: 100 },
    { 区县: "高新区", 项目数量: 198, 累计面积: 94 },
    { 区县: "苏锡通园区", 项目数量: 198, 累计面积: 32 },
    { 区县: "通州湾示范区", 项目数量: 198, 累计面积: 16 },
  ], //公益林
  cfSplList: [
    { 区县: "崇川区", 项目数量: 199, 累计面积: 566 },
    { 区县: "经济技术开发区", 项目数量: 80, 累计面积: 500 },
    { 区县: "通州区", 项目数量: 198, 累计面积: 360 },
    { 区县: "如东县", 项目数量: 177, 累计面积: 500 },
    { 区县: "启东市", 项目数量: 108, 累计面积: 666 },
    { 区县: "如皋市", 项目数量: 71, 累计面积: 777 },
    { 区县: "海门区", 项目数量: 21, 累计面积: 100 },
    { 区县: "高新区", 项目数量: 20, 累计面积: 94 },
    { 区县: "苏锡通园区", 项目数量: 12, 累计面积: 32 },
    { 区县: "通州湾示范区", 项目数量: 11, 累计面积: 16 },
  ], //商品林
  ysdwList: [
    // { year: "2018", 经营利用: 98, 人工繁育: 12, 野外猎捕: 86 },
    { year: "2019", 经营利用: 260, 人工繁育: 12, 野外猎捕: 86 },
    { year: "2020", 经营利用: 107, 人工繁育: 12, 野外猎捕: 86 },
    { year: "2021", 经营利用: 62, 人工繁育: 12, 野外猎捕: 86 },
    { year: "2022", 经营利用: 80, 人工繁育: 12, 野外猎捕: 86 },
  ], //野生动物统计数据
  zwjyList: [
    // { year: "2018", 办件数量: 40 },
    { year: "2019", 办件数量: 99 },
    { year: "2020", 办件数量: 140 },
    { year: "2021", 办件数量: 100 },
    { year: "2022", 办件数量: 90 },
  ], //植物检疫统计数据

  rgfyList: [], //人工繁育统计数据
  jylyList: [], //经营利用统计数据
  ywblList: [], //野外捕猎统计数据
  yearList: [], //年份查询列表
  ldStartYear: "", //项目使用林地开始年份
  ldEndYear: "", //项目使用林地结束年份
  sdStartYear: "", //湿地占用征收开始年份
  sdEndYear: "", //湿地占用征收结束年份
  gylStartYear: "", //公益林开始年份
  gylEndYear: "", //公益林结束年份
  cfStartYear: "", //采伐开始年份
  cfEndYear: "", //采伐结束年份
  ysStartYear: "", //野生动物开始年份
  ysEndYear: "", //野生动物结束年份
  zwStartYear: "", //植物检疫开始年份
  zwEndYear: "", //植物检疫结束年份
  startYear: "", //开始年份
  endYear: "", //结束年份
  cfType: 0, //采伐类型,0:全部 1:公益林 2:商品林
  test: 2000,
  ldAmount: "", //林地项目总数
  ldArea: "", //林地项目总面积
  sdAmount: "", //湿地项目总数
  sdArea: "", //湿地项目总面积
  gylAmount: "", //公益林项目总数
  gylArea: "", //公益林项目总面积
  cfAmount: "", //采伐项目总数
  cfArea: "", //采伐项目总面积
});

const {
  grade,
  yearList,
  ldStartYear,
  ldEndYear,
  sdStartYear,
  sdEndYear,
  gylStartYear,
  gylEndYear,
  cfStartYear,
  cfEndYear,
  ysStartYear,
  ysEndYear,
  zwStartYear,
  zwEndYear,
  startYear,
  endYear,
  cfType,
  test,
  ldAmount,
  ldArea,
  sdAmount,
  sdArea,
  gylAmount,
  gylArea,
  cfAmount,
  cfArea,
} = toRefs(data);

//2.定义方法

/**
 * 初始化年份列表
 */
const F_initYearList = () => {
  //每次初始化前置空年份列表
  let nowyear = new Date().getFullYear();
  //默认选择当前年份
  data.startYear = new Date().getFullYear();
  data.endYear = new Date().getFullYear();
  data.yearList.clearable;
  for (let i = nowyear; i >= 2019; i--) {
    data.yearList.push(i);
  }
  if (data.grade == "市局") {
    data.ldStartYear = data.yearList[0];
    data.sdStartYear = data.yearList[0];
    data.gylStartYear = data.yearList[0];
    data.cfStartYear = data.yearList[0];
  } else {
    data.ldStartYear = data.yearList[3];
    data.sdStartYear = data.yearList[3];
    data.gylStartYear = data.yearList[3];
    data.cfStartYear = data.yearList[3];
  }
  data.ldEndYear = data.yearList[0];
  data.sdEndYear = data.yearList[0];
  data.gylEndYear = data.yearList[0];
  data.cfEndYear = data.yearList[0];
  data.ysStartYear = data.yearList[3];
  data.ysEndYear = data.yearList[0];
  data.zwStartYear = data.yearList[3];
  data.zwEndYear = data.yearList[0];
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  getDistrictList(data.xzqdm).then((res) => {
    let arr = res.data
      .filter((item) => item.name != "港闸区")
      .map((item) => {
        return item.name;
      });
    data.districtList = arr;
  });
};

/**
 * 项目使用林地选择年份区间
 */
const F_xmsyldSelect = () => {
  if (data.ldStartYear != "" && data.ldEndYear != "") {
    if (data.ldStartYear > data.ldEndYear) {
      ElMessage.error("选择错误,开始年份大于结束年份");
      return;
    }
    F_getXmsyldList();
  }
};

/**
 * 获取项目使用林地统计数据
 */
const F_getXmsyldList = () => {
  getXmsyldList("", data.xzqdm, data.ldStartYear, data.ldEndYear).then(
    (res) => {
      if (data.grade == "市局") {
        data.xmsyldList = res.data.slice(0, -1);
        let map = res.data.at(-1);
        data.ldAmount = map["总数量"];
        data.ldArea = map["总面积"];
        getXmsyldChart();
      } else {
        data.xmsyldList = res.data;
        getCommonChart(xmsyld, data.xmsyldList);
      }
    }
  );
};

/**
 * 湿地占用征收选择年份区间
 */
const F_sdSelect = () => {
  if (data.sdStartYear != "" && data.sdEndYear != "") {
    if (data.sdStartYear > data.sdEndYear) {
      ElMessage.error("选择错误,开始年份大于结束年份");
      return;
    }
    F_getSdzyzsList();
  }
};

/**
 * 获取湿地占用征收统计数据
 */
const F_getSdzyzsList = () => {
  getSdzyzsList("", data.xzqdm, data.sdStartYear, data.sdEndYear).then(
    (res) => {
      if (data.grade == "市局") {
        data.sdzyzsList = res.data.slice(0, -1);
        let map = res.data.at(-1);
        data.sdAmount = map["总数量"];
        data.sdArea = map["总面积"];
        getSdzyzsChart();
      } else {
        data.sdzyzsList = res.data;
        getCommonChart(sdzyzs, data.sdzyzsList);
      }
    }
  );
};

/**
 * 公益林选择年份区间
 */
const F_gylSelect = () => {
  if (data.gylStartYear != "" && data.gylEndYear != "") {
    if (data.gylStartYear > data.gylEndYear) {
      ElMessage.error("选择错误,开始年份大于结束年份");
      return;
    }
    F_getGylList();
  }
};

/**
 * 获取公益林统计数据
 */
const F_getGylList = () => {
  getGylList("", data.xzqdm, data.gylStartYear, data.gylEndYear).then((res) => {
    if (data.grade == "市局") {
      data.gylList = res.data.slice(0, -1);
      let map = res.data.at(-1);
      data.gylAmount = map["总数量"];
      data.gylArea = map["总面积"];
      getGylChart();
    } else {
      data.gylList = res.data;
      getCommonChart(gyl, data.gylList);
    }
  });
};

/**
 * 林木采伐切换
 */
const callback = (item) => {
  console.log(item);
  data.cfType = item.index;
  F_getLmcfList();
};

/**
 * 林木采伐选择年份区间
 */
const F_lmcfSelect = () => {
  if (data.cfStartYear != "" && data.cfEndYear != "") {
    if (data.cfStartYear > data.cfEndYear) {
      ElMessage.error("选择错误,开始年份大于结束年份");
      return;
    }
    F_getLmcfList();
  }
};

/**
 * 获取林木采伐统计数据
 */
const F_getLmcfList = () => {
  getLmcfList(
    "",
    data.xzqdm,
    data.cfStartYear,
    data.cfEndYear,
    data.cfType
  ).then((res) => {
    //

    //临时赋数据
    // if (data.cfType == 1) {
    //   data.lmcfList = data.cfGylList;
    // } else if (data.cfType == 2) {
    //   data.lmcfList = data.cfSplList;
    // }

    if (data.grade == "市局") {
      data.lmcfList = res.data.slice(0, -1);
      let map = res.data.at(-1);
      data.cfAmount = map["总数量"];
      data.cfArea = map["总面积"];
      getLmcfChart(data.lmcfList);
    } else {
      data.lmcfList = res.data;
      getlmcfChart(lmcf, data.lmcfList);
    }
  });
};

/**
 * 野生动物选择年份区间
 */
const F_ysdwSelect = () => {
  if (data.ysStartYear != "" && data.ysEndYear != "") {
    if (data.ysStartYear > data.ysEndYear) {
      ElMessage.error("选择错误,开始年份大于结束年份");
      return;
    }
    F_getYsdwList();
  }
};

/**
 * 获取野生动物统计数据
 */
const F_getYsdwList = () => {
  getYsdwList("", data.xzqdm, data.ysStartYear, data.ysEndYear).then((res) => {
    data.ysdwList = res.data;
    getYsdwChart();
  });
};

/**
 * 植物检疫选择年份区间
 */
const F_zwjySelect = () => {
  if (data.zwStartYear != "" && data.zwEndYear != "") {
    if (data.zwStartYear > data.zwEndYear) {
      ElMessage.error("选择错误,开始年份大于结束年份");
      return;
    }
    F_getZwjyList();
  }
};

/**
 * 获取植物检疫统计数据
 */
const F_getZwjyList = () => {
  getZwjyList("", data.xzqdm, data.zwStartYear, data.zwEndYear).then((res) => {
    data.zwjyList = res.data;
    getZwjyChart();
  });
};

/**
 * 临时公用图表
 * @param {*} ref
 */
const getCommonChart = (ref, list) => {
  const xmsyldChart = echarts.init(ref.value, null, {});
  const option = {
    legend: {
      right: "10%",
      icon: "circle",
    },
    grid: {
      top: "16%",
      bottom: "1%",
      left: "5%",
      right: "1%",
      containLabel: true,
    },
    tooltip: {},
    dataset: {
      source: list,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      name: "办件量(件)",
    },
    series: [
      {
        type: "line",
        color: "#59AF87",
        lineStyle: {
          color: "#59AF87",
        },
      },
    ],
  };
  xmsyldChart.setOption(option);
};

/**
 * 林木采伐折线图
 * @param {*} ref
 */
const getlmcfChart = (ref, list) => {
  const xmsyldChart = echarts.init(ref.value, null, {});
  const option = {
    legend: {
      right: "10%",
      icon: "circle",
    },
    grid: {
      top: "18%",
      bottom: "1%",
      left: "5%",
      right: "1%",
      containLabel: true,
    },
    tooltip: {},
    dataset: {
      source: list,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      name: "办件量(件)",
    },
    series: [
      {
        type: "line",
        color: "#59AF87",
        lineStyle: {
          color: "#59AF87",
        },
      },
    ],
  };
  xmsyldChart.setOption(option);
};

/**
 * 项目使用林地图表
 */
const getXmsyldChart = () => {
  const xmsyldChart = echarts.init(xmsyld.value, null, {});
  const option = {
    color: ["rgba(50, 229, 255, 1)", "rgba(250, 207, 18, 1)"],
    dataset: {
      source: data.xmsyldList,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      top: "16%",
      bottom: "1%",
      left: "1%",
      right: "1%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        // data: ["2018", "2019", "2020", "2021", "2022"],
        // data: data.districtList,
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
        axisLine: {
          show: true,
          lineStyle: {
            // color: "#7B68EE",
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "blue",
            width: 1,
            type: "solid",
          },
        },
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name:
          `                                      {legend|}  {value|项目数量} {amount|(` +
          `全市项目总数 : ` +
          data.ldAmount +
          `)}`,
        axisLabel: {
          color: "rgba(50, 229, 255, 1)",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#FFDEAD",
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "blue",
            width: 1,
            type: "solid",
          },
        },
        nameTextStyle: {
          rich: {
            legend: {
              width: 12,
              height: 4,
              // backgroundColor: "#EE82EE",
              backgroundColor: "rgba(50, 229, 255, 1)",
            },
            value: {
              color: "#CD853F",
            },
            amount: {
              color: "red",
            },
          },
        },
      },
      {
        type: "value",
        name:
          `(全市累计面积 : ` +
          data.ldArea +
          `)` +
          ` {legend|}  {value|累计面积(公顷)}                                            `,
        axisLabel: {
          color: "rgba(183, 75, 238)",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#66CDAA",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#E6E6FA",
            width: 1,
            type: "solid",
          },
        },
        nameTextStyle: {
          rich: {
            legend: {
              width: 12,
              height: 4,
              backgroundColor: "rgba(183, 75, 238)",
            },
            value: {
              color: "#FF8C00",
            },
          },
        },
      },
    ],
    series: [
      {
        name: "项目数量",
        type: "bar",
        // data: data.sdzyzsList,
        barWidth: 14, // 柱状图的宽度
        itemStyle: {
          borderRadius: 8,
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: "rgba(50, 229, 255, 1)" },
            { offset: 1, color: "rgba(50, 229, 255, 0.8)" },
          ]),
        },
      },
      {
        name: "累计面积",
        type: "line",
        yAxisIndex: 1,
        // data: [
        //   12, 11, 13, 12, 200, 240, 300, 129, 129, 209, 230, 340, 420, 416, 429,
        // ],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "rgba(183, 75, 238)",
            },
            {
              offset: 1,
              color: "rgba(250, 207, 18)",
            },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "rgba(183, 75, 238,0.2)",
            },
            {
              offset: 1,
              color: "rgba(250, 207, 18)",
            },
          ]),
        },
        showSymbol: false,
      },
    ],
  };
  xmsyldChart.setOption(option);
};

/**
 * 湿地占用征收图表
 */
const getSdzyzsChart = () => {
  const sdzyzsChart = echarts.init(sdzyzs.value, null, {});
  // const option = {
  //   legend: {
  //     top: "center",
  //     right: 0,
  //     orient: "vertical",
  //   },
  //   tooltip: {
  //     trigger: "item",
  //   },
  //   series: [
  //     {
  //       type: "pie",
  //       data: data.sdzyzsList,
  //       label: {
  //         show: true,
  //         formatter: "{b}" + "\n\r" + "{d}%",
  //       },
  //       roseType: "area",
  //       center: ["40%", "50%"], // 这个属性调整图像的位置！！！！！
  //     },
  //   ],
  // };
  const option = {
    color: ["rgba(50, 229, 255, 1)", "rgba(250, 207, 18, 1)"],
    dataset: {
      source: data.sdzyzsList,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      top: "16%",
      bottom: "1%",
      left: "1%",
      right: "1%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        // data: ["2018", "2019", "2020", "2021", "2022"],
        // data: data.districtList,
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
        axisLine: {
          show: true,
          lineStyle: {
            // color: "#7B68EE",
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "blue",
            width: 1,
            type: "solid",
          },
        },
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name:
          `                                      {legend|}  {value|项目数量} {amount|(` +
          `全市项目总数 : ` +
          data.sdAmount +
          `)}`,
        axisLabel: {
          color: "rgba(50, 229, 255, 1)",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#FFDEAD",
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "blue",
            width: 1,
            type: "solid",
          },
        },
        nameTextStyle: {
          rich: {
            legend: {
              width: 12,
              height: 4,
              // backgroundColor: "#EE82EE",
              backgroundColor: "rgba(50, 229, 255, 1)",
            },
            value: {
              color: "#CD853F",
            },
            amount: {
              color: "red",
            },
          },
        },
      },
      {
        type: "value",
        name:
          `(全市累计面积 : ` +
          data.sdArea +
          `)` +
          ` {legend|}  {value|累计面积(公顷)}                                            `,
        axisLabel: {
          color: "rgba(183, 75, 238)",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#66CDAA",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#E6E6FA",
            width: 1,
            type: "solid",
          },
        },
        nameTextStyle: {
          rich: {
            legend: {
              width: 12,
              height: 4,
              backgroundColor: "rgba(183, 75, 238)",
            },
            value: {
              color: "#FF8C00",
            },
          },
        },
      },
    ],
    series: [
      {
        name: "项目数量",
        type: "bar",
        // data: data.sdzyzsList,
        barWidth: 14, // 柱状图的宽度
        itemStyle: {
          borderRadius: 8,
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: "rgba(50, 229, 255, 1)" },
            { offset: 1, color: "rgba(50, 229, 255, 0.8)" },
          ]),
        },
      },
      {
        name: "累计面积",
        type: "line",
        yAxisIndex: 1,
        // data: [
        //   12, 11, 13, 12, 200, 240, 300, 129, 129, 209, 230, 340, 420, 416, 429,
        // ],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "rgba(183, 75, 238)",
            },
            {
              offset: 1,
              color: "rgba(250, 207, 18)",
            },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "rgba(183, 75, 238,0.2)",
            },
            {
              offset: 1,
              color: "rgba(250, 207, 18)",
            },
          ]),
        },
        showSymbol: false,
      },
    ],
  };
  sdzyzsChart.setOption(option);
};

/**
 * 公益林图表
 */
const getGylChart = () => {
  const gylChart = echarts.init(gyl.value, null, {});
  // const option = {
  //   legend: {
  //     right: "10%",
  //     icon: "circle",
  //   },
  //   grid: {
  //     top: "16%",
  //     bottom: "1%",
  //     left: "5%",
  //     right: "1%",
  //     containLabel: true,
  //   },
  //   tooltip: {},
  //   dataset: {
  //     source: data.gylList,
  //   },
  //   xAxis: {
  //     type: "category",
  //   },
  //   yAxis: {
  //     name: "面积(km2)",
  //   },
  //   series: [
  //     {
  //       type: "line",
  //       color: "#59AF87",
  //       lineStyle: {
  //         color: "#59AF87",
  //       },
  //     },
  //     {
  //       type: "line",
  //       color: "#1A5EBB",
  //       lineStyle: {
  //         color: "#1A5EBB",
  //       },
  //     },
  //   ],
  // };
  const option = {
    color: ["rgba(50, 229, 255, 1)", "rgba(250, 207, 18, 1)"],
    dataset: {
      source: data.gylList,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      top: "16%",
      bottom: "1%",
      left: "1%",
      right: "1%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        // data: ["2018", "2019", "2020", "2021", "2022"],
        // data: data.districtList,
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
        axisLine: {
          show: true,
          lineStyle: {
            // color: "#7B68EE",
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "blue",
            width: 1,
            type: "solid",
          },
        },
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name:
          `                                             {legend|}  {value|调整依据} {amount|(` +
          `全市调整依据总数 : ` +
          data.gylAmount +
          `)}`,
        axisLabel: {
          color: "rgba(50, 229, 255, 1)",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#FFDEAD",
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "blue",
            width: 1,
            type: "solid",
          },
        },
        nameTextStyle: {
          rich: {
            legend: {
              width: 12,
              height: 4,
              backgroundColor: "rgba(50, 229, 255, 1)",
            },
            value: {
              color: "#CD853F",
            },
            amount: {
              color: "red",
            },
          },
        },
      },
      {
        type: "value",
        name:
          `(全市累计面积 : ` +
          data.gylArea +
          `)` +
          ` {legend|}  {value|累计面积(公顷)}                                             `,
        axisLabel: {
          color: "rgba(183, 75, 238)",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#66CDAA",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#E6E6FA",
            width: 1,
            type: "solid",
          },
        },
        nameTextStyle: {
          rich: {
            legend: {
              width: 12,
              height: 4,
              backgroundColor: "rgba(183, 75, 238)",
            },
            value: {
              color: "#FF8C00",
            },
          },
        },
      },
    ],
    series: [
      {
        name: "项目数量",
        type: "bar",
        // data: [
        //   80, 120, 110, 130, 120, 110, 110, 110, 110, 110, 110, 110, 110, 110,
        //   110, 110,
        // ],
        barWidth: 14, // 柱状图的宽度
        itemStyle: {
          borderRadius: 8,
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: "rgba(50, 229, 255, 1)" },
            { offset: 1, color: "rgba(50, 229, 255, 0.8)" },
          ]),
        },
      },
      {
        name: "累计面积",
        type: "line",
        yAxisIndex: 1,
        // data: [
        //   12, 11, 13, 12, 200, 240, 300, 129, 129, 209, 230, 340, 420, 416, 429,
        // ],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "rgba(183, 75, 238)",
            },
            {
              offset: 1,
              color: "rgba(250, 207, 18)",
            },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "rgba(183, 75, 238,0.2)",
            },
            {
              offset: 1,
              color: "rgba(250, 207, 18)",
            },
          ]),
        },
        showSymbol: false,
      },
    ],
  };
  gylChart.setOption(option);
};

/**
 * 林木采伐图表
 */
const getLmcfChart = (dataset) => {
  const cfChart = echarts.init(lmcf.value, null, {});
  // const option = {
  //   tooltip: {},
  //   grid: {
  //     top: "16%",
  //     bottom: "1%",
  //     left: "4%",
  //     right: "1%",
  //     containLabel: true,
  //   },
  //   dataset: {
  //     source: data.lmcfList,
  //   },
  //   xAxis: {
  //     type: "category",
  //   },
  //   yAxis: {
  //     name: "面积(km2)",
  //   },
  //   series: [
  //     {
  //       type: "line",
  //       color: "#1DC5B1",
  //       lineStyle: {
  //         color: "#1DC5B1",
  //       },
  //       areaStyle: {
  //         color: "#1DC5B1",
  //         opacity: "0.2",
  //       },
  //     },
  //   ],
  // };
  const option = {
    color: ["rgba(50, 229, 255, 1)", "rgba(250, 207, 18, 1)"],
    dataset: {
      source: dataset,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      top: "20%",
      bottom: "0%",
      left: "1%",
      right: "1%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        // data: ["2018", "2019", "2020", "2021", "2022"],
        // data: data.districtList,
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
        axisLine: {
          show: true,
          lineStyle: {
            // color: "#7B68EE",
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "blue",
            width: 1,
            type: "solid",
          },
        },
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name:
          `                                      {legend|}  {value|项目数量} {amount|(` +
          `全市项目总数 : ` +
          data.cfAmount +
          `)}`,
        axisLabel: {
          color: "#00BFFF",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#66CDAA",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#E6E6FA",
            width: 1,
            type: "solid",
          },
        },
        nameTextStyle: {
          rich: {
            legend: {
              width: 12,
              height: 4,
              backgroundColor: "rgba(50, 229, 255, 1)",
            },
            value: {
              color: "#CD853F",
            },
            amount: {
              color: "red",
            },
          },
        },
      },
      {
        type: "value",
        name:
          `(全市累计面积 : ` +
          data.cfArea +
          `)` +
          ` {legend|}  {value|累计面积(公顷)}                                                 `,
        axisLabel: {
          color: "rgba(183, 75, 238)",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#66CDAA",
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "blue",
            width: 1,
            type: "solid",
          },
        },
        nameTextStyle: {
          rich: {
            legend: {
              width: 12,
              height: 4,
              backgroundColor: "rgba(183, 75, 238)",
            },
            value: {
              color: "#FF8C00",
            },
          },
        },
      },
    ],
    series: [
      {
        name: "项目数量",
        type: "bar",
        // data: [
        //   80, 120, 110, 130, 120, 110, 110, 110, 110, 110, 110, 110, 110, 110,
        //   110, 110,
        // ],
        barWidth: 14, // 柱状图的宽度
        itemStyle: {
          borderRadius: 8,
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: "rgba(50, 229, 255, 1)" },
            { offset: 1, color: "rgba(50, 229, 255, 0.8)" },
          ]),
        },
      },
      {
        name: "累计面积",
        type: "line",
        yAxisIndex: 1,
        // data: [
        //   12, 11, 13, 12, 200, 240, 300, 129, 129, 209, 230, 340, 420, 416, 429,
        // ],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "rgba(183, 75, 238)",
            },
            {
              offset: 1,
              color: "rgba(250, 207, 18)",
            },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: "rgba(183, 75, 238,0.2)",
            },
            {
              offset: 1,
              color: "rgba(250, 207, 18)",
            },
          ]),
        },
        showSymbol: false,
      },
    ],
  };
  cfChart.setOption(option);
};

/**
 * 野生动物图表
 */
const getYsdwChart = () => {
  const ysdwChart = echarts.init(ysdw.value, null, {});
  const option = {
    legend: {
      data: ["经营利用", "人工繁育", "野外猎捕"],
      right: "10%",
      icon: "circle",
    },
    grid: {
      top: "16%",
      bottom: "1%",
      left: "5%",
      right: "1%",
      containLabel: true,
    },
    tooltip: {},
    dataset: {
      source: data.ysdwList,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      name: "办件量(件)",
    },
    series: [
      {
        name: "经营利用",
        type: "line",
        color: "#1A5EBB",
        lineStyle: {
          color: "#1A5EBB",
        },
      },
      {
        name: "人工繁育",
        type: "line",
        color: "#59AF87",
        lineStyle: {
          color: "#59AF87",
        },
      },
      {
        name: "野外猎捕",
        type: "line",
        color: "red",
        lineStyle: {
          color: "red",
        },
      },
    ],
  };
  ysdwChart.setOption(option);
};

/**
 * 植物检疫图表
 */
const getZwjyChart = () => {
  const zwjyChart = echarts.init(zwjy.value, null, {});
  const option = {
    legend: {
      right: "10%",
      icon: "circle",
    },
    grid: {
      top: "16%",
      bottom: "1%",
      left: "5%",
      right: "1%",
      containLabel: true,
    },
    tooltip: {},
    dataset: {
      source: data.zwjyList,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      name: "办件量(件)",
    },
    series: [
      {
        type: "line",
        color: "#59AF87",
        lineStyle: {
          color: "#59AF87",
        },
      },
      {
        type: "line",
        color: "#f78989",
        lineStyle: {
          color: "#f78989",
        },
      },
    ],
  };
  zwjyChart.setOption(option);
};

/**
 * 页面初始化
 */
const F_init = () => {
  F_initYearList(); //获取年份
  F_getDict(); //数据字典

  F_getXmsyldList(); //项目使用林地
  F_getSdzyzsList(); //湿地占用征收
  F_getGylList(); //公益林
  F_getLmcfList(); //林木采伐
  F_getYsdwList(); //野生动物
  F_getZwjyList(); //植物检疫
};

//3.入口
onMounted(async () => {
  F_init();
});
</script>
