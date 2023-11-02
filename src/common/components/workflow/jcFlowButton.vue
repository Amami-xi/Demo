<template>
  <div class="tlw-header-btn">
    <div
      v-for="obj in btnList"
      :key="obj.id"
      @click="operateBtn(obj.value)"
      class="flow-btn-box"
      :class="obj.value"
    >
      <svg-icon :name="obj.value" :title="obj.name" titleSeat="down"></svg-icon>
    </div>
    <SendTask
      :flowinstid="flowinstid"
      :taskId="taskId"
      ref="sendTask"
    ></SendTask>
    <BackTask
      :flowinstid="flowinstid"
      :taskId="taskId"
      ref="backTask"
    ></BackTask>
    <TransferTask
      :flowinstid="flowinstid"
      :taskId="taskId"
      ref="transferTask"
    ></TransferTask>
    <ErrMsg :tableData="errMsgList" ref="errMsg"></ErrMsg>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import SendTask from "@/common/components/workflow/sendTask";
import BackTask from "@/common/components/workflow/backTask";
import TransferTask from "@/common/components/workflow/transferTaskNormal";
import ErrMsg from "@/common/components/msg/errMsg";
import bus from "@/common/utils/bus";
import store from "@/common/store";
import {
  getTask,
  signTask,
  handlingProcess,
  withdrawStandardTask,
} from "@/common/api/jtap/taskHandle";
import { getBtnList } from "@/common/api/jtap/material";
// import { flowBtnList } from "@/common/api/jtap/constant";
import { getTxUrl } from "../../api/plot/plotTx";
export default defineComponent({
  name: "jcflowButton",
  components: { SendTask, TransferTask, ErrMsg, BackTask },
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
    //填报表单url
    formUrl: {
      type: String,
      default: "",
    },
    //操作
    action: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    //1.定义数据
    const router = useRouter();
    const sendTask = ref(null);
    const backTask = ref(null);
    const transferTask = ref(null);
    const errMsg = ref(null);
    const data = reactive({
      btnList: [], // 按钮列表
      task: {}, //当前任务
      currentButton: "",
      errMsgList: [], //错误信息列表
    });
    //2.定义方法

    /**
     * 初始化
     */
    const F_init = () => {
      //1.获取当前环节按钮
      F_getBtnList();
      //2.获取当前任务
      F_getTask();
    };

    /**
     * 获取操作按钮列表
     */
    const F_getBtnList = () => {
      getBtnList(props.flowinstid, props.taskId, "", "", props.action).then(
        (res) => {
          data.btnList = res.data;
          F_getTask();
        }
      );
    };

    /**
     * 获取当前任务
     */
    const F_getTask = () => {
      getTask(props.flowinstid, props.taskId).then((res) => {
        data.task = res.data;
      });
    };

    /**
     * 按钮点击事件
     *
     * @param {string} val
     */
    const operateBtn = (val) => {
      data.currentButton = val;
      switch (val) {
        //保存
        case "btnSave":
          F_btnSave();
          break;
        //发送
        case "btnSendFlow":
          F_btnSendFlow();
          break;
        //图形查看
        case "btnViewGeometry":
          F_btnViewGeometry();
          break;
        //删除
        case "btnDelFlow":
          F_btnDelFlow();
          break;
        //退回
        case "btnWithdrew":
          F_btnWithdrew();
          break;
        //流程信息
        case "btnShowFlow":
          F_btnShowFlow();
          break;
        //关闭
        case "btnClose":
          F_btnClose();
          break;
      }
    };

    /**
     * 保存
     */
    const F_btnSave = () => {
      bus.emit(props.formUrl + "_save", {
        callback: F_saveCallback,
        val: true,
      });
    };

    /**
     * 保存回调
     *
     * @param {*} flag
     */
    const F_saveCallback = (flag) => {
      if (!flag) {
        ElMessage.error("表单验证不通过！请检查填写内容！");
      } else {
        ElMessage.success("保存成功");
      }
    };

    /**
     * 打开发送弹窗
     */
    const F_handleOpen = () => {
      sendTask.value.handleOpen();
    };

    /**
     * 发起人填报-发送前事件
     */
    const F_beforeSend = () => {
      bus.emit(props.formUrl + "_save", {
        callback: F_beforeSendCallback_form,
        val: true,
      });
    };

    /**
     * 发送前事件回调
     */
    const F_beforeSendCallback_form = (val) => {
      //保存是否成功
      let flag = val;
      if (!flag) {
        ElMessage.error("表单验证不通过！请检查填写内容！");
      } else {
        F_handleOpen();
      }
    };

    /**
     * 发送
     */
    const F_btnSendFlow = () => {
      F_beforeSend();
    };

    /**
     * 转件
     */
    const F_btnTransfer = () => {
      transferTask.value.handleOpen();
    };

    /**
     * 图形查看
     */
    const F_btnViewGeometry = () => {
      getTxUrl(props.flowinstid,props.businessCode,"jstdzz").then((res) => {
        window.open(res.data, "_blank");
      });
    };

    /**
     * 删除
     */
    const F_btnDelFlow = () => {
      bus.emit(props.formUrl + "_delete", F_delCallback);
    };

    /**
     * 删除回调
     */
    const F_delCallback = () => {
      F_btnClose();
    };

    /**
     * 审核人审批-退回前事件（校验附件、审批意见）
     */
    const F_beforeWithdrew = () => {
      bus.emit(props.formUrl + "_save", {
        callback: F_beforeWithdrew_spyj,
        val: false,
      });
    };

    /**
     * 发送前事件回调
     */
    const F_beforeWithdrew_spyj = (val) => {
      //保存是否成功
      let flag = val;
      if (!flag) {
        ElMessage.error("请填写审查意见！");
      } else {
        backTask.value.handleOpen();
      }
    };

    /**
     * 退回
     */
    const F_btnWithdrew = () => {
      backTask.value.handleOpen();
    };

    /**
     * 流程信息
     */
    const F_btnShowFlow = () => {
      handlingProcess(props.flowinstid, data.task.flowId);
    };

    /**
     * 关闭
     */
    const F_btnClose = () => {
      if (window.opener != null) {
        window.opener.postMessage("yjjc-daiban-refresh");
      }
      window.close();
    };

    //3.入口
    onMounted(() => {
      F_init();
    });

    return {
      ...toRefs(data),
      F_init,
      operateBtn,
      F_btnSave,
      F_saveCallback,
      F_btnSendFlow,
      F_beforeSendCallback_form,
      F_handleOpen,
      F_getTask,
      F_btnTransfer,
      F_btnViewGeometry,
      F_btnDelFlow,
      F_delCallback,
      F_beforeWithdrew,
      F_beforeWithdrew_spyj,
      F_btnWithdrew,
      F_btnShowFlow,
      F_btnClose,
      sendTask,
      backTask,
      transferTask,
      errMsg,
    };
  },
});
</script>