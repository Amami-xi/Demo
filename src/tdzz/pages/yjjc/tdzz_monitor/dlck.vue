<template>
  <el-dialog
    class="tlw-dialog-dk"
    v-model="dialogVisible"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    width="10%"
    :fullscreen="fullscreen"
  >
    <template #header>
      <div>三调和历年的变更对比用地报批批准的数据</div>
    </template>
    <el-scrollbar class="tlw-scrollbar">
      <el-row>
        <el-col :span="24" v-for="(obj, index) in tableData" :key="index">
          <el-card :header="obj.year">
            <el-table :data="obj.list" max-height="600" border>
              <el-table-column prop="tbzmj" label="图斑总面积"></el-table-column>
              <el-table-column label="农用地">
                <el-table-column
                  prop="nyd"
                  label="农用地小计"
                ></el-table-column>
                <el-table-column label="耕地">
                  <el-table-column prop="01" label="耕地小计"></el-table-column>
                  <el-table-column prop="0101" label="水田"></el-table-column>
                  <el-table-column prop="0102" label="水浇地"></el-table-column>
                  <el-table-column prop="0103" label="旱地"></el-table-column>
                </el-table-column>
                <el-table-column prop="02" label="园地"></el-table-column>
                <el-table-column prop="03" label="林地"></el-table-column>
                <el-table-column prop="1006" label="农村道路"></el-table-column>
                <el-table-column
                  prop="1202"
                  label="设施农用地"
                ></el-table-column>
                <el-table-column prop="1107" label="沟渠"></el-table-column>
                <el-table-column prop="1104" label="坑塘水面"></el-table-column>
                <el-table-column
                  prop="qtnyd"
                  label="其他农用地"
                ></el-table-column>
              </el-table-column>
              <el-table-column label="建设用地">
                <el-table-column
                  prop="jsyd"
                  label="建设用地小计"
                ></el-table-column>
                <el-table-column prop="202" label="建制镇"></el-table-column>
                <el-table-column prop="203" label="村庄"></el-table-column>
                <el-table-column prop="1003" label="公路用地"></el-table-column>
                <el-table-column
                  prop="qtjsyd"
                  label="其他建设用地"
                ></el-table-column>
              </el-table-column>
              <el-table-column prop="wlyd" label="未利用用地"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "@vue/runtime-core";
import { FullScreen } from "@element-plus/icons-vue";
import { getHistoryAnalyse } from "@/tdzz/api/yjjc/jc";
export default defineComponent({
  name: "dlck",
  props: {},
  components: { FullScreen },
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      dialogVisible: false,
      fullscreen: true,
      tableData: [],
    });

    //2.定义方法

    /**
     * 打开弹窗
     */
    const handleOpen = (row) => {
      data.tableData = [];
      const obj = { year: "2020", list: [{ type: "耕地", mj: row.tbzmj }] };
      data.tableData = [
        {
          year: "2019",
          list: [
            { type: "水田", mj: 5 },
            { type: "水浇地", mj: 5 },
          ],
        },
        {
          year: "2018",
          list: [
            { type: "林地", mj: 5 },
            { type: "耕地", mj: 3 },
            { type: "园地", mj: 2 },
          ],
        },
        {
          year: "2009",
          list: [
            { type: "林地", mj: 5 },
            { type: "园地", mj: 5 },
          ],
        },
      ];
      data.tableData.unshift(obj);
      data.dialogVisible = true;
      F_getHistoryAnalyse(row);
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
    };

    /**
     * 全屏
     */
    const F_fullscreen = () => {
      data.fullscreen = !data.fullscreen;
    };

    /**
     * 历年图斑分析
     */
    const F_getHistoryAnalyse = (row) => {
      getHistoryAnalyse(row.objectid).then((res) => {
        data.tableData = res.data;
      });
    };

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
      F_fullscreen,
    };
  },
});
</script>