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
import ErrMsg from "@/common/components/msg/errMsg_ly";
import bus from "@/common/utils/bus";
import store from "@/common/store";
import {
  getTask,
  getFlowId,
  signTask,
  handlingProcess,
  withdrawStandardTask,
} from "@/common/api/jtap/taskHandle";
import { getBtnList } from "@/common/api/jtap/material";
import { beforeSendDataCheck } from "@/ly/api/check/dataCheck";
import { getTxUrl_Ly } from "../../api/plot/plotTx";
export default defineComponent({
  name: "lyflowButton",
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
    //业务编码
    businessCode: {
      type: String,
      default: "",
    },
    //填报表单url
    formUrl: {
      type: String,
      default: "",
    },
    //流程实例ID
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
      currentButton: "", //当前操作按钮
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
      if (props.action != "VIEW") {
        getBtnList(props.flowinstid, props.taskId).then((res) => {
          data.btnList = res.data;
          F_getTask();
          let stepIdentity = data.task.stepIdentity;
          //湿地征收受理环节，市级用户用分发不用发送，县级用户用发送不用分发
          if (stepIdentity == "SDZYZSSP_SL") {
            if (store.state.user.organizationGrade == "市局") {
              data.btnList = data.btnList.filter(
                (val) => val.value != "btnSendFlow"
              );
            } else {
              data.btnList = data.btnList.filter(
                (val) => val.value != "btnTransfer"
              );
            }
          }
        });
      } else {
        if (data.btnList.length == 0) {
          data.btnList.push({
            id: "1",
            name: "办理过程",
            value: "btnShowFlow",
            orderno: 1,
          });
          data.btnList.push({
            id: "2",
            name: "图形查看",
            value: "btnViewGeometry",
            orderno: 2,
          });
          data.btnList.push({
            id: "3",
            name: "关闭",
            value: "btnClose",
            orderno: 3,
          });
        }
      }
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
        //签收
        case "btnSign":
          F_signTask();
          break;
        //发送
        case "btnSendFlow":
          F_btnSendFlow();
          break;
        //转件
        case "btnTransfer":
          F_btnSendFlow();
          // F_btnTransfer();
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
          // F_btnSendFlow();
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

    const F_saveCallback = (flag) => {
      if (!flag) {
        ElMessage.error("表单验证不通过！请检查填写内容！");
      } else {
        ElMessage.success("保存成功");
      }
    };

    /**
     * 签收
     */
    const F_signTask = () => {
      if (data.task.signed) {
        ElMessageBox.confirm("当前事项已被签收，请勿重复签收！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then((res) => {})
          .catch((res) => {});
      } else {
        ElMessageBox.confirm("是否确认签收？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then((res) => {
          signTask(props.flowinstid, props.taskId).then((res) => {
            data.task = res.data;
            ElMessage.success(res.msg);
          });
        });
      }
    };
    /**
     * 打开发送弹窗
     */
    const F_handleOpen = () => {
      if (data.task.needSign && !data.task.signed) {
        ElMessageBox.alert("当前事项还未签收，请先确认签收！", "提示", {
          type: "warning",
        })
          .then((res) => {})
          .catch((res) => {});
      } else {
        sendTask.value.handleOpen();
      }
    };

    /**
     * 发起人填报-发送前事件
     */
    const F_beforeSend_FQ = () => {
      bus.emit(props.formUrl + "_save", {
        callback: F_beforeSendCallback_form,
        val: true,
      });
    };

    /**
     * 发送前数据检查
     */
    const F_beforeSendDataCheck = () => {
      let checkType = "1";
      if (data.currentButton == "btnWithdrew") {
        checkType = "2";
      }
      const params = {
        flowinstid: props.flowinstid,
        taskId: props.taskId,
        businessCode: props.businessCode,
        stepIdentity: data.task.stepIdentity,
        checkType: checkType,
      };
      beforeSendDataCheck(params).then((res) => {
        data.errMsgList = res.data;
        if (data.errMsgList != null && data.errMsgList.length > 0) {
          errMsg.value.handleOpen();
        } else {
          if (data.currentButton == "btnSendFlow") {
            F_handleOpen();
          } else if (data.currentButton == "btnTransfer") {
            F_btnTransfer();
          } else if (data.currentButton == "btnWithdrew") {
            backTask.value.handleOpen();
          }
        }
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
        F_beforeSendDataCheck();
      }
    };

    /**
     * 发送
     */
    const F_btnSendFlow = () => {
      F_beforeSend_FQ();
    };

    /**
     * 当前环节是否是填报环节
     */
    const sfFQ = () => {
      let stepIdentity = data.task.stepIdentity;

      if (
        stepIdentity.indexOf("SDZYZSSP_SL") > -1 ||
        stepIdentity.indexOf("STGYLTZSP_XJLYCS") > -1 ||
        stepIdentity.indexOf("LYCFXKSP_XJLYCS") > -1 ||
        stepIdentity.indexOf("_XJSL") > -1 ||
        stepIdentity.indexOf("YSDWYWLB_BA") > -1 ||
        stepIdentity.indexOf("YSDWJJLY_BA") > -1
      ) {
        return true;
      } else {
        return false;
      }
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
      getTxUrl_Ly(props.flowinstid, props.businessCode).then((res) => {
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
     * 退回前事件回调
     */
    const F_beforeWithdrew_spyj = (val) => {
      //保存是否成功
      let flag = val;
      if (!flag) {
        ElMessage.error("请填写审查意见！");
      } else {
        F_beforeSendDataCheck();
      }
    };

    /**
     * 退回
     */
    const F_btnWithdrew = () => {
      F_beforeWithdrew();
    };

    /**
     * 流程信息
     */
    const F_btnShowFlow = async () => {
      getFlowId(props.flowinstid).then((res) => {
        let flowId = res.data;
        handlingProcess(props.flowinstid, flowId);
      });
    };

    /**
     * 关闭
     */
    const F_btnClose = () => {
      if (window.opener != null) {
        window.opener.postMessage("ly-daiban-refresh");
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
      F_signTask,
      F_btnSendFlow,
      sfFQ,
      F_beforeSend_FQ,
      // F_beforeSend_SP,
      F_beforeSendCallback_form,
      // F_beforeSendCallback_spyj,
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