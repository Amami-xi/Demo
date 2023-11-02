<template>
  <el-dialog
    v-model="dialogVisible"
    title="发送短信"
    width="60%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <!-- destroy-on-close -->
    <ryfpList
      :flowinstid="flowinstid"
      :taskId="taskId"
      :selection="selection"
      ref="xmfpList"
    ></ryfpList>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认发送</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";
import { transferTask } from "@/common/api/jtap/taskHandle";
import { ElMessage, ElMessageBox } from "element-plus";
import ryfpList from "./ryfpList.vue";
import { saveOrUpdate } from "@/tdzz/api/proj/proj-xmfp";
import { queryListByPc } from "@/tdzz/api/proj/proj-jbxx";
import bus from "@/common/utils/bus";
export default defineComponent({
  name: "transferTask",
  components: { ryfpList },
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //环节实例ID
    taskId: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    //1.定义数据
    const xmfpList = ref(null);
    const data = reactive({
      dialogVisible: false,
      tableData: [],
      chooseActors: [],
      selection: [],
    });

    //2.定义方法
    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
    };
    /**
     * 打开弹窗
     */
    const handleOpen = (selection) => {
      data.dialogVisible = true;
      data.selection = selection;
    };

    /**
     * 确认发送
     */
    const confirm = () => {
      handleClose();
      bus.emit("send_refresh");
    };

    /**
     * 转件任务
     */
    const F_transferTask = () => {
      transferTask(props.flowinstid, props.taskId, data.chooseActors).then(
        (res) => {
          ElMessage.success(res.msg);
          F_btnClose();
        }
      );
    };

    /**
     * 关闭
     */
    const F_btnClose = () => {
      if (window.opener != null) {
        window.opener.postMessage("tdzz-daiban-refresh");
        window.opener.postMessage("ly-daiban-refresh");
      }
      window.close();
    };

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
      confirm,
      F_btnClose,
      xmfpList,
    };
  },
});
</script>