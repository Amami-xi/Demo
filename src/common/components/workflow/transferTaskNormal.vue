<template>
  <el-dialog
    class="tlw-dialog"
    v-model="dialogVisible"
    title="分发"
    width="60%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-scrollbar>
      <el-tree
        :data="tableData"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        @check="handleCheck"
      />
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认分发</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import {
  getTransferTaskParam,
  transferTask,
} from "@/common/api/jtap/taskHandle";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  name: "transferTask",
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
    //定义Tree组件数据格式
    const defaultProps = {
      children: "childList",
      label: "nodeName",
    };
    const router = useRouter();
    const data = reactive({
      dialogVisible: false,
      tableData: [],
      chooseActors: [],
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
    const handleOpen = () => {
      data.dialogVisible = true;
      getTransferTaskParam(props.flowinstid, props.taskId).then((res) => {
        data.tableData = res.data;
      });
    };

    /**
     * 勾选用户
     */
    const handleCheck = (datas, obj) => {
      data.chooseActors = [];
      for (let i = 0; i < obj.checkedNodes.length; i++) {
        const checkNode = obj.checkedNodes[i];
        if (!checkNode.childList) {
          data.chooseActors.push(checkNode.assisId);
        }
      }
    };

    /**
     * 确认发送
     */
    const confirm = () => {
      if (data.chooseActors.length > 0) {
        transferTask(props.flowinstid, props.taskId, data.chooseActors).then(
          (res) => {
            ElMessage.success(res.msg);
            F_btnClose();
          }
        );
      } else {
        ElMessageBox.alert("请勾选分发人", "提示", { type: "warning" })
          .then(() => {})
          .catch(() => {});
      }
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
      defaultProps,
      handleOpen,
      handleClose,
      handleCheck,
      confirm,
      F_btnClose,
    };
  },
});
</script>