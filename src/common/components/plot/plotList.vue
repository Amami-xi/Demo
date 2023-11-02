<template>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}{{ name }}</el-col>
  </el-row>
  <Tac :tac="tac"></Tac>
  <el-row class="tlw-row">
    <el-col :span="24">
      <PlotButton
        :flowinstid="flowinstid"
        :pType="pType"
        :businessCode="businessCode"
        :plotList="plotList"
        :disabled="disabled"
        :render="F_init"
      >
      </PlotButton>
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px">
    <el-col :span="24">
      <span style="color: red"
        >注：若单个地块含多个地类，shp文件中地类编码请用","隔开；立项时地类为复垦前地类；验收时地类为复垦后地类；</span
      >
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px" v-if="dlListTip.length > 0">
    <el-col :span="24">
      <span style="color: red">复垦前允许地类:{{ dlListTip }}</span>
    </el-col>
  </el-row>
  <el-row class="tlw-row" :gutter="20">
    <el-col :span="12">
      <el-table
        class="tlw-clear-rowstyle"
        :data="plotList"
        border
        :row-style="F_rowStyle"
        @row-click="F_initCoord"
        @row-dblclick="F_openDetail"
        :row-class-name="F_getRowClass"
      >
        <el-table-column type="expand">
          <template #default="scope">
            <el-table
              v-if="
                scope.row.plotList != undefined && scope.row.plotList.length > 1
              "
              @row-click="F_initCoord"
              @row-dblclick="F_openDetail"
              :data="scope.row.plotList"
              :header-cell-style="{ align: 'left' }"
            >
              <el-table-column label="序号" width="80px">
                <template #="scope2">
                  <el-button
                    v-if="scope2.row.plSec == currentSelectPlot && !disabled"
                    size="small"
                    @click="F_deleteOne(scope2.row.plSec)"
                    circle
                    ><el-icon><Minus /></el-icon
                  ></el-button>
                  <div v-else>
                    {{ scope2.$index + 1 }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="地块号"
                prop="dikuaiNo"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column label="地块名称" prop="plName"></el-table-column> -->
              <el-table-column
                label="图层面积"
                prop="dikuaiArea"
                :formatter="floatFormatter"
              >
                <template #default="scope">
                  <div
                    v-if="
                      (businessCode == '10132201' ||
                        businessCode == '10136201') &&
                      pType.indexOf('_G') > -1 &&
                      scope.row.dikuaiArea >= 0.015 &&
                      scope.row.dikuaiArea < 0.04
                    "
                  >
                    <el-tooltip
                      content="警告:当前地块面积在150-400平方米范围！"
                      placement="bottom"
                      effect="light"
                    >
                      <svg-icon
                        class="plotMjSvg"
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        "
                        name="gth"
                      >
                        <template #icon-title class="icon-title">
                          <div style="color: #eec211">
                            {{ scope.row.dikuaiArea }}
                          </div>
                        </template>
                      </svg-icon>
                    </el-tooltip>
                  </div>
                  <div v-else>{{ scope.row.dikuaiArea }}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="坐标计算面积"
                prop="txArea"
                :formatter="floatFormatter"
              >
                <template #default="scope">
                  <div
                    v-if="
                      (businessCode == '10132201' ||
                        businessCode == '10136201') &&
                      pType.indexOf('_G') > -1 &&
                      scope.row.txArea >= 0.015 &&
                      scope.row.txArea < 0.04
                    "
                  >
                    <el-tooltip
                      content="警告:当前地块面积在150-400平方米范围,地块面积:22年及之前应不小于150，23年及之后应不小于200！"
                      placement="bottom"
                      effect="light"
                    >
                      <svg-icon
                        class="plotMjSvg"
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        "
                        name="gth"
                      >
                        <template #icon-title class="icon-title">
                          <div style="color: #eec211">
                            {{ scope.row.txArea }}
                          </div>
                        </template>
                      </svg-icon>
                    </el-tooltip>
                  </div>
                  <div v-else>{{ scope.row.txArea }}</div>
                </template>
              </el-table-column>
              <el-table-column label="地类" prop="landtype" width="120">
                <template #default="scope">
                  <div
                    v-if="
                      pType.indexOf('_G') > -1 &&scope.row.landtype!=null&&
                      (scope.row.landtype.indexOf('02') == 0 ||
                        scope.row.landtype.indexOf('03') == 0)
                    "
                  >
                    <el-tooltip
                      content="警告:当前地类为园地、林地！"
                      placement="bottom"
                      effect="light"
                    >
                      <svg-icon
                        class="plotMjSvg"
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        "
                        name="gthred"
                      >
                        <template #icon-title class="icon-title">
                          <div style="color: #ff0000">
                            {{ scope.row.landtype }}
                          </div>
                        </template>
                      </svg-icon>
                    </el-tooltip>
                  </div>
                  <div v-else>{{ scope.row.landtype }}</div>
                </template>
              </el-table-column>
              <!-- 各类坐标独有属性放于插槽slot里 -->
              <slot name="plot"></slot>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="序号" width="80px">
          <template #="scope">
            <el-button
              v-if="
                scope.row.plSec == currentSelectPlot &&
                !disabled &&
                (scope.row.plotList == null || scope.row.plotList.length == 1)
              "
              size="small"
              @click="F_deleteOne(scope.row.plSec)"
              circle
              ><el-icon><Minus /></el-icon
            ></el-button>
            <div v-else>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="地块号"
          prop="dikuaiNo"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column label="地块名称" prop="plName"></el-table-column> -->
        <el-table-column
          label="图层面积"
          prop="dikuaiArea"
          :formatter="floatFormatter"
        >
          <template #default="scope">
            <div
              v-if="
                (businessCode == '10132201' || businessCode == '10136201') &&
                pType.indexOf('_G') > -1 &&
                scope.row.dikuaiArea >= 0.015 &&
                scope.row.dikuaiArea < 0.04
              "
            >
              <el-tooltip
                content="警告:当前地块面积在150-400平方米范围！"
                placement="bottom"
                effect="light"
              >
                <svg-icon
                  class="plotMjSvg"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  name="gth"
                >
                  <template #icon-title class="icon-title">
                    <div style="color: #eec211">
                      {{ scope.row.dikuaiArea }}
                    </div>
                  </template>
                </svg-icon>
              </el-tooltip>
            </div>
            <div v-else>{{ scope.row.dikuaiArea }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="坐标计算面积"
          prop="txArea"
          :formatter="floatFormatter"
        >
          <template #default="scope">
            <div
              v-if="
                (businessCode == '10132201' || businessCode == '10136201') &&
                pType.indexOf('_G') > -1 &&
                scope.row.txArea >= 0.015 &&
                scope.row.txArea < 0.04
              "
            >
              <el-tooltip
                content="警告:当前地块面积在150-400平方米范围,地块面积:22年及之前应不小于150，23年及之后应不小于200！"
                placement="bottom"
                effect="light"
              >
                <svg-icon
                  class="plotMjSvg"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  name="gth"
                >
                  <template #icon-title class="icon-title">
                    <div style="color: #eec211">
                      {{ scope.row.txArea }}
                    </div>
                  </template>
                </svg-icon>
              </el-tooltip>
            </div>
            <div v-else>{{ scope.row.txArea }}</div>
          </template>
        </el-table-column>
        <el-table-column label="地类" prop="landtype" width="120">
          <template #default="scope">
            <div
              v-if="
                pType.indexOf('_G') > -1 &&scope.row.landtype!=null&&
                (scope.row.landtype.indexOf('02') == 0 ||
                  scope.row.landtype.indexOf('03') == 0)
              "
            >
              <el-tooltip
                content="警告:当前地类为园地、林地！"
                placement="bottom"
                effect="light"
              >
                <svg-icon
                  class="plotMjSvg"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                  name="gthred"
                >
                  <template #icon-title class="icon-title">
                    <div style="color: #ff0000">
                      {{ scope.row.landtype }}
                    </div>
                  </template>
                </svg-icon>
              </el-tooltip>
            </div>
            <div v-else>{{ scope.row.landtype }}</div>
          </template>
        </el-table-column>
        <!-- 各类坐标独有属性放于插槽slot里 -->
        <slot name="plot"></slot>
      </el-table>
      <pagination
        :total="plotPages.totalRows"
        :pagesize="plotPages.pageSize"
        :page-sizes="[20, 30, 40]"
        :pageIndex="plotPages.pageIndex"
        :render="plotChangePage"
      ></pagination>
    </el-col>
    <el-col :span="12">
      <el-table :data="pntCoordList" border>
        <el-table-column
          label="序号"
          width="60px"
          type="index"
        ></el-table-column>
        <el-table-column label="圈号" width="80px" prop="shapeGroup">
        </el-table-column>
        <el-table-column
          label="拐点号"
          width="80px"
          prop="pntNo"
        ></el-table-column>
        <el-table-column label="X坐标" prop="xcoord"> </el-table-column>
        <el-table-column label="Y坐标" prop="ycoord"> </el-table-column>
        <el-table-column label="反算边长" prop="borderLength"></el-table-column>
        <slot name="coord"></slot>
      </el-table>
      <Pagination
        :total="coordPages.totalRows"
        :pagesize="coordPages.pageSize"
        :pageIndex="coordPages.pageIndex"
        :render="coordChangePage"
      ></Pagination>
    </el-col>
  </el-row>
  <PlotDetail
    ref="plotDetail"
    :flowinstid="flowinstid"
    :disabled="flowAction == 'VIEW' || stepIdentity.indexOf('YSJD_FKZXYS') < 0"
  ></PlotDetail>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PlotButton from "@/common/components/plot/plotButton";
import Tac from "@/common/components/plot/tac";
import Pagination from "@/common/components/pagination";
import {
  init,
  deleteAll,
  deleteOne,
  queryPageCoordList,
  getYxDlList,
} from "@/common/api/plot/plotZb";
import PlotDetail from "./plotDetail.vue";
import { Minus } from "@element-plus/icons-vue";
export default defineComponent({
  name: "plotList",
  components: { PlotButton, Tac, Pagination, PlotDetail, Minus },
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //环节实例代码
    stepIdentity: {
      type: String,
      default: "",
    },
    //业务类型
    businessName: {
      type: String,
      default: "",
    },
    //业务类型
    businessCode: {
      type: String,
      default: "",
    },
    //项目阶段
    catalog: {
      type: String,
      default: "",
    },
    //坐标类型
    pType: {
      type: String,
      default: "",
    },
    //坐标名称
    name: {
      type: String,
      default: "",
    },
    //流程操作
    flowAction: {
      type: String,
      default: "",
    },
    //操作
    disabled: {
      type: Boolean,
      default: "",
    },
  },
  setup(props, ctx) {
    //1.定义数据
    const plotDetail = ref(null);
    const data = reactive({
      tac: {},
      plSecs: [],
      plotList: [],
      pntCoordList: [],
      plotPages: {
        pageIndex: 1,
        pageSize: 20,
        totalRows: 0,
      },
      coordPages: {
        pageIndex: 1,
        pageSize: 10,
        totalRows: 0,
      },
      //当前点击地块
      currentSelectPlot: "",
      dlListTip: "",
    });

    /**
     * 页面初始化
     */
    const F_init = () => {
      data.coordPages.pageIndex = 1;
      data.coordPages.pageSize = 10;
      const params = {
        flowinstid: props.flowinstid,
        plotType: props.pType,
        plotPages: data.plotPages,
        coordPages: data.coordPages,
      };
      init(params).then((res) => {
        data.tac = res.data.tac;
        data.plotList = res.data.plotList.items;
        if (data.plotList.length > 0) {
          data.currentSelectPlot = data.plotList[0].plSec;
        }
        data.plotPages.totalRows = res.data.plotList.total;
        data.pntCoordList = res.data.pntCoordList.items;
        data.coordPages.totalRows = res.data.pntCoordList.total;
      });
    };

    /**
     * 单击行获取坐标列表
     */
    const F_initCoord = (row) => {
      data.currentSelectPlot = row.plSec;
      data.currentPlSecs = row.plSecs;
      if (
        data.pntCoordList.length > 0 &&
        row.plSec != data.pntCoordList[0].plSec
      ) {
        F_queryPageCoordList(row.plSec, row.plSecs);
      }
    };

    /**
     * 双击行打开地块详情
     */
    const F_openDetail = (row) => {
      if (F_pcsbFlow() && props.catalog == "验收阶段") {
        plotDetail.value.handleOpen(row);
      }
    };

    /**
     * 表格行样式
     *
     * @param {Object} param0
     */
    const F_rowStyle = ({ row }) => {
      if (data.currentSelectPlot == row.plSec) {
        return { backgroundColor: "#ecf5ff" };
      }
    };

    /**
     * 动态隐藏表格展开
     *
     * @param {Object} param
     */
    const F_getRowClass = (row, rowIndex) => {
      // children 是你子项的数组 key
      if (row.row.plotList.length === 1) {
        return "row-expand-cover";
      }
    };

    /**
     * 判断是否是批次上报流程
     */
    const F_pcsbFlow = () => {
      if (
        props.businessCode == "10130801" ||
        props.businessCode == "10130601" ||
        props.businessCode == "10130901" ||
        props.businessCode == "10130501"
      ) {
        return false;
      } else {
        if (props.materialType == "项目材料") {
          return false;
        } else {
          return true;
        }
      }
    };

    /**
     * 删除单个地块
     *
     * @param {String} plSec
     */
    const F_deleteOne = (plSec) => {
      ElMessageBox.confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (data.plotPages.totalRows == 1) {
            deleteAll(props.flowinstid, props.pType).then((res) => {
              F_init();
              ElMessage.success(res.msg);
            });
          } else {
            deleteOne(plSec).then((res) => {
              F_init();
              ElMessage.success(res.msg);
            });
          }
        })
        .catch();
    };

    /**
     * 地块分页
     * @param {Object} val
     */
    const plotChangePage = (val) => {
      if (val.pageIndex) {
        data.plotPages.pageIndex = val.pageIndex;
      }
      data.plotPages.pageSize = val.pageSize;
      F_init();
    };

    /**
     * 坐标分页
     * @param {Object} val
     */
    const coordChangePage = (val) => {
      if (val.pageIndex) {
        data.coordPages.pageIndex = val.pageIndex;
      }
      data.coordPages.pageSize = val.pageSize;
      F_queryPageCoordList(data.currentSelectPlot, data.currentPlSecs);
    };

    /**
     * 获取坐标分页列表
     *
     * @param {*} plSec
     */
    const F_queryPageCoordList = (plSec, plSecs) => {
      queryPageCoordList(
        plSec,
        data.coordPages.pageIndex,
        data.coordPages.pageSize,
        plSecs
      ).then((res) => {
        data.pntCoordList = res.data.items;
        data.coordPages.totalRows = res.data.total;
      });
    };

    const floatFormatter = (row, column) => {
      var mj = row[column.property];
      if (mj === undefined || mj == null) {
        return "0.0000";
      }
      return parseFloat(mj).toFixed(4);
    };

    const F_getYxDlList = () => {
      getYxDlList(props.businessCode).then((res) => {
        data.dlListTip = res.data;
      });
    };

    //3.入口
    onMounted(() => {
      F_init();
      F_getYxDlList();
    });

    return {
      ...toRefs(data),
      F_init,
      F_initCoord,
      F_openDetail,
      F_rowStyle,
      F_getRowClass,
      F_deleteOne,
      plotChangePage,
      coordChangePage,
      floatFormatter,
      F_queryPageCoordList,
      F_getYxDlList,
      plotDetail,
    };
  },
});
</script>

<style scoped>
/deep/ .el-table .row-expand-cover .cell .el-table__expand-icon {
  display: none;
}
</style>