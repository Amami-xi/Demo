<template>
  <el-dialog
    v-model="dialogVisible"
    title="分发"
    width="60%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    fullscreen
  >
  <!-- destroy-on-close -->
    <XmfpList
      :flowinstid="flowinstid"
      :taskId="taskId"
      ref="xmfpList"
    ></XmfpList>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认分发</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";
import { transferTask } from "@/common/api/jtap/taskHandle";
import { ElMessage, ElMessageBox } from "element-plus";
import XmfpList from "./xmfpList.vue";
import { saveOrUpdate } from "@/tdzz/api/proj/proj-xmfp";
import { queryListByPc } from "@/tdzz/api/proj/proj-jbxx";
export default defineComponent({
  name: "transferTask",
  components: { XmfpList },
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
    };

    /**
     * 确认发送
     */
    const confirm = () => {
      F_queryListByPc();
    };

    /**
     * 获取项目查询列表
     */
    const F_queryListByPc = () => {
      const params = {
        flowinstid: props.flowinstid,
        taskId: props.taskId,
      };
      queryListByPc(params).then((res) => {
        let list = res.data;
        data.chooseActors = [];
        var errList = "";
        list.forEach((obj) => {
          if (!obj.userId) {
            errList += obj.jbxxXmbh + ",";
          } else {
            if (data.chooseActors.indexOf(obj.userId) == -1) {
              data.chooseActors.push(obj.userId);
            }
          }
        });
        if (errList.length > 0) {
          errList = errList.substring(0, errList.length - 1) + "还未分配人员";
          ElMessageBox.alert(errList, "提示", { type: "warning" })
            .then(() => {})
            .catch(() => {});
        } else {
          F_transferTask();
        }
      });
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