<template>
  <el-button
    type="primary"
    size="small"
    @click="downLoadXm"
    v-if="!disabled"
    ><el-icon class="el-icon--left">
      <Download />
    </el-icon>坐标模板下载
  </el-button>
  <el-button
    type="primary"
    size="small"
    @click="importZb"
    v-if="!disabled"
    ><el-icon class="el-icon--left">
      <UploadFilled />
    </el-icon>选择坐标文件
  </el-button>
  <el-button
    type="primary"
    size="small"
    @click="F_deleteAll"
    v-if="!disabled"
    ><el-icon class="el-icon--left">
      <Delete />
    </el-icon>清空坐标
  </el-button>
  <el-dropdown size="small" type="primary" @command="exportZb">
    <el-button type="primary" size="small">
      导出坐标<el-icon class="el-icon--right" size="small">
        <ArrowDown />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="0">导出TXT坐标</el-dropdown-item>
        <el-dropdown-item command="1">导出Shape坐标</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- <el-button
    type="primary"
    size="small"
    @click="gisMethod"
    v-if="!disabled"
    >坐标上图<el-icon class="el-icon--right"><MapLocation /></el-icon
  ></el-button> -->
  <PlotImport
    :flowinstid="flowinstid"
    :businessCode="businessCode"
    :pType="pType"
    ref="plotImport"
    :render="render"
  >
  </PlotImport>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import PlotImport from "@/common/components/plot/plotImport";
import { ElMessage, ElMessageBox } from "element-plus";
import { deleteAll } from "@/common/api/plot/plotZb";
import {
  postOneMap,
  exportShapePlot,
  exportTxtPlot,
} from "@/common/api/plot/plotTx";
import { downLoadModel } from "@/common/api/plot/plotDownloadModel";
import {
  Download,
  UploadFilled,
  Delete,
  ArrowDown,
  MapLocation,
} from "@element-plus/icons-vue";
export default defineComponent({
  name: "flowButton",
  components: {
    Download,
    UploadFilled,
    Delete,
    ArrowDown,
    MapLocation,
    PlotImport,
  },
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //业务编码
    businessCode: {
      type: String,
      default: "",
    },
    //坐标类型
    pType: {
      type: String,
      default: "",
    },
    //地块列表
    plotList: {
      type: Array,
      default: [],
    },
    //操作
    disabled: {
      type: Boolean,
      default: "",
    },
    render: {
      type: Function,
    },
  },
  setup(props, ctx) {
    const data = reactive();
    //1.定义数据
    const plotImport = ref(null);

    //2.定义方法

    /**
     * 导入坐标
     */
    const importZb = async () => {
      if (props.plotList.length > 0) {
        ElMessageBox.alert("请先清空坐标，再导入新的坐标！", "提示", {
          type: "warning",
        })
          .then()
          .catch();
      } else {
        plotImport.value.handleOpen();
      }
    };

    /**
     * 导出坐标
     */
    const exportZb = (command) => {
      if (props.plotList.length == 0) {
        ElMessageBox.alert("当前页面无坐标可导出！", "提示", {
          type: "warning",
        })
          .then()
          .catch();
      } else {
        if (command === "1") {
          exportShapePlot(props.flowinstid, props.businessCode, props.pType);
        } else {
          exportTxtPlot(props.flowinstid, props.businessCode, props.pType);
        }
      }
    };

    /**
     * 清空坐标
     *
     */
    const F_deleteAll = () => {
      if (props.plotList.length == 0) {
        ElMessageBox.alert("当前没有可清空的坐标！", "提示", {
          type: "warning",
        })
          .then()
          .catch();
      } else {
        ElMessageBox.confirm("是否确认清空坐标？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then((res) => {
            deleteAll(props.flowinstid, props.pType).then((res) => {
              ElMessage.success(res.msg);
              render();
            });
          })
          .catch((res) => {});
      }
    };

    /**
     * 坐标上图
     */
    const gisMethod = () => {
      if (props.plotList.length == 0) {
        ElMessageBox.alert("请先上传坐标信息！", "提示", {
          type: "warning",
        })
          .then()
          .catch();
      } else {
        postOneMap(props.flowinstid, props.pType, props.businessCode).then(
          (res) => {
            ElMessage.success(res.msg);
            render();
          }
        );
      }
    };

    /**
     *  坐标模板txt模板下载
     */
    const downLoadXm = () => {
      downLoadModel(props.pType);
    };

    /**
     * 刷新
     */
    const render = () => {
      props.render();
    };

    return {
      importZb,
      exportZb,
      F_deleteAll,
      gisMethod,
      downLoadXm,
      plotImport,
      render,
    };
  },
});
</script>