<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：指标调剂 > 指标还原"></svg-icon>
    </el-col>
  </el-row>

  <el-row class="tlw-row">
    <el-col :span="24">
      <el-tabs
        v-model="activeName"
        type="border-card"
        style="height: calc(100vh - 210px)"
      >
        <el-tab-pane :label="hydbTitle" name="first" :key="'first'">
          <zbhydbsq v-if="activeName == 'first'"></zbhydbsq>
        </el-tab-pane>
        <!-- <el-tab-pane
      v-if="this.grade == '市局'"
      :label="'指标还原待办（' + hydbTime + '）'"
      name="first"
      :key="'first'"
    >
    </el-tab-pane>
    <el-tab-pane v-else :label="'指标还原申请（' + hydbTime + '）'" name="first">
    </el-tab-pane> -->
        <el-tab-pane label="指标还原" name="second" :key="'second'">
          <zbhy v-if="activeName == 'second'"></zbhy>
        </el-tab-pane>

        <el-tab-pane label="指标还原明细" name="third" :key="'third'">
          <zbhymx v-if="activeName == 'third'"></zbhymx>
        </el-tab-pane>

        <el-tab-pane :label="hzdbTitle" name="fourth" :key="'fourth'">
          <zbhzdb v-if="activeName == 'fourth'"></zbhzdb>
        </el-tab-pane>

        <el-tab-pane label="指标划转" name="fifth" :key="'fifth'">
          <zbhz v-if="activeName == 'fifth'"></zbhz>
        </el-tab-pane>

        <el-tab-pane label="指标划转明细" name="sixth" :key="'sixth'">
          <zbhzmx v-if="activeName == 'sixth'"></zbhzmx>
        </el-tab-pane>

        <el-tab-pane label="指标归还待办" name="seventh" :key="'seventh'">
          <zbghdb v-if="activeName == 'seventh'"></zbghdb>
        </el-tab-pane>

        <el-tab-pane label="指标归还" name="eighth" :key="'eighth'">
          <zbgh v-if="activeName == 'eighth'"></zbgh>
        </el-tab-pane>

        <el-tab-pane label="指标归还明细" name="ninth" :key="'ninth'">
          <zbghmx v-if="activeName == 'ninth'"></zbghmx>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import store from "@/common/store";
import zbhydbsq from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbhydbsq.vue";
import zbhy from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbhy.vue";
import zbhymx from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbhymx.vue";
import zbhzdb from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbhzdb.vue";
import zbhz from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbhz.vue";
import zbhzmx from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbhzmx.vue";
import zbghdb from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbghdb.vue";
import zbgh from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbgh.vue";
import zbghmx from "@/tdzz/pages/zbgl/zbtj/zbhy/zbhy_zbghmx.vue";
import { getHyCountWait } from "@/tdzz/api/zbgl/zbtj/zbhy/zbhymx";
import { getHzCountWait } from "@/tdzz/api/zbgl/zbtj/zbhy/zbhzmx";

export default {
  name: "index",
  components: {
    zbhydbsq: zbhydbsq,
    zbhy: zbhy,
    zbhymx: zbhymx,
    zbhzdb: zbhzdb,
    zbhz: zbhz,
    zbhzmx: zbhzmx,
    zbghdb: zbghdb,
    zbgh: zbgh,
    zbghmx: zbghmx,
  },
  data() {
    return {
      grade: store.state.user.organizationGrade,
      hydbTitle: "",
      hzdbTitle: "",
      //默认第一个选项卡
      activeName: "first",
      hydbTime: 0,
      hzdbTime: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getHyCountWait().then((res) => {
        this.hydbTime = res.data;
        this.$nextTick(() => {
          if (this.hydbTime == 0) {
            this.activeName = "second";
          }
          getHzCountWait().then((res) => {
            this.hzdbTime = res.data;
            this.$nextTick(() => {
              this.showTitle();
            });
          });
        });
      });
    },
    showTitle() {
      if (this.grade == "市局") {
        this.hydbTitle = "指标还原待办";
        this.hzdbTitle = "指标划转待办";
        // if (this.hydbTime == 0) {
        //   this.hydbTitle = "指标还原待办";
        // } else {
        //   this.hydbTitle = "指标还原待办（" + this.hydbTime + "）";
        // }
        // if (this.hzdbTime == 0) {
        //   this.hzdbTitle = "指标划转待办";
        // } else {
        //   this.hzdbTitle = "指标划转待办（" + this.hzdbTime + "）";
        // }
      } else {
        this.hydbTitle = "指标还原申请";
        this.hzdbTitle = "指标划转待办";
        // if (this.hydbTime == 0) {
        //   this.hydbTitle = "指标还原申请";
        // } else {
        //   this.hydbTitle = "指标还原申请（" + this.hydbTime + "）";
        // }
        // if (this.hzdbTime == 0) {
        //   this.hzdbTitle = "指标划转待办";
        // } else {
        //   this.hzdbTitle = "指标划转待办（" + this.hzdbTime + "）";
        // }
      }
    },
    getCount() {},
  },
  mounted() {
    // this.getCount();
    // this.showTitle();
  },
};
</script>


