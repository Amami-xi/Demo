<template>
  <div class="tlw-header-btn">
    <div
      v-for="obj in btnList"
      :key="obj.id"
      @click="operateBtn(obj.value)"
      class="flow-btn-box"
      :class="obj.value"
      v-show="obj.value != 'btnSign' || (obj.value == 'btnSign' && !task.signed)"
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
    <ErrMsg
      :tableData="errMsgList"
      :businessCode="businessCode"
      :materialType="materialType"
      ref="errMsg"
    ></ErrMsg>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import SendTask from "@/common/components/workflow/sendTask";
import BackTask from "@/common/components/workflow/backTask";
import TransferTask from "@/common/components/workflow/transferTask";
import ErrMsg from "@/common/components/msg/errMsg";
import bus from "@/common/utils/bus";
import {
  getTask,
  getFlowId,
  signTask,
  handlingProcess,
  withdrawStandardTask,
  drawbackTask,
} from "@/common/api/jtap/taskHandle";
import { getBtnList } from "@/common/api/jtap/material";
import { getTxUrl } from "@/common/api/plot/plotTx";
import { beforeSendDataCheck } from "@/tdzz/api/check/dataCheck";
import { getBjb } from "@/common/api/jtap/bjb";
import { updateTimeStartByFlowinstid } from "@/tdzz/api/proj/proj-jbxx";
export default defineComponent({
  name: "flowButton",
  components: { SendTask, TransferTask, ErrMsg, BackTask },
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //流程实例ID
    jbxxSec: {
      type: String,
      default: "",
    },
    //材料类型【批次材料、项目材料】
    materialType: {
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
    //项目阶段
    catalog: {
      type: String,
      default: "",
    },
    //填报表单url
    formUrl: {
      type: String,
      default: "",
    },
    //填报表单code
    code: {
      type: String,
      default: "",
    },
    //当前激活表单url
    currentUrl: {
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
    const sendTask = ref(null);
    const backTask = ref(null);
    const transferTask = ref(null);
    const errMsg = ref(null);
    const data = reactive({
      btnList: [], // 按钮列表
      task: {}, //当前任务
      errMsgList: [], //错误信息列表
      currentButton: "", //当前操作按钮
      saveCallBack: () => {},
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
      getBtnList(
        props.flowinstid,
        props.taskId,
        props.businessCode,
        props.materialType,
        props.action
      ).then((res) => {
        data.btnList = res.data;
      });
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
          F_btnTransfer();
          break;
        //图形查看
        case "btnViewGeometry":
          F_btnViewGeometry();
          break;
        //数据检查
        case "dataCheck":
          F_btnDataCheck();
          break;
        //删除
        case "btnDelFlow":
          F_btnDelFlow();
          break;
        //退回
        case "btnWithdrew":
          F_btnWithdrew();
          break;
        //流程信息/办理过程
        case "btnShowFlow":
          F_btnShowFlow();
          break;
        //关闭
        case "btnClose":
          F_btnClose();
          break;
        //撤回
        case "btnWithdrawx":
          F_btnWithdrawx();
          break;
      }
    };

    /**
     * 保存
     */
    const F_btnSave = () => {
      //1. 当前激活菜单为基本信息表
      if (F_sfForm()) {
        //发起人、验收阶段【县级确认环节】、验收阶段【县级填写省级扣减面积环节】
        if (F_sfFQ() || F_sfXjqr() || F_sfstkj()) {
          F_saveForm();
        }
        //立项阶段【复垦中心审核环节】
        else if (F_sfFksh()) {
          F_saveSpyj();
        }
        //验收阶段【复垦中心验收环节】
        else if (F_sfFkys()) {
          F_saveFormAndSpyj();
        }
      }
      //2.当前激活菜单为审批意见
      else if (F_sfSpyj()) {
        F_saveSpyj();
      }
      //3. 当前激活页面为其他
      else {
        //切换菜单回调
        if (data.saveCallBack) {
          data.saveCallBack(true);
        }
      }
    };

    /**
     * 保存表单
     */
    const F_saveForm = () => {
      bus.emit(props.formUrl + "_save", (val) => {
        if (!val) {
          F_saveFormErrmsg();
        } else {
          ElMessage.success("保存成功");
        }
        //切换菜单回调
        if (data.saveCallBack) {
          data.saveCallBack(val);
        }
      });
    };

    const F_saveFormErrmsg = () => {
      if (F_sfXjqr()) {
        ElMessage.error("请填写县级确认面积！");
      } else if (F_sfstkj()) {
        ElMessage.error("请填写省厅扣减面积！");
      } else {
        ElMessage.error("表单验证不通过！请检查填写内容！");
      }
    };

    /**
     * 保存审批意见
     */
    const F_saveSpyj = () => {
      bus.emit("spyj_save", (val) => {
        if (!val) {
          ElMessage.error("请填写审批意见！");
        } else {
          ElMessage.success("保存成功");
        }
        //切换菜单回调
        if (data.saveCallBack) {
          data.saveCallBack(val);
        }
      });
    };

    /**
     * 保存表单和审批意见
     */
    const F_saveFormAndSpyj = () => {
      bus.emit(props.formUrl + "_save", (val) => {
        if (!val) {
          ElMessage.error("请填写市级验收扣减面积！");
        } else {
          bus.emit("spyj_save", (val) => {
            if (!val) {
              ElMessage.error("请填写审批意见！");
            } else {
              ElMessage.success("保存成功");
            }
          });
        }
        //切换菜单回调
        if (data.saveCallBack) {
          data.saveCallBack(val);
        }
      });
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

            if (data.task.stepIdentity) {
              if (
                data.task.stepIdentity.indexOf("LXJD_FWKSH") > -1 ||
                data.task.stepIdentity.indexOf("YSJD_JSKSH") > -1
              ) {
                updateTimeStartByFlowinstid(
                  props.flowinstid,
                  props.taskId,
                  props.catalog
                )
                  .then((res1) => {})
                  .catch((res1) => {});
              }
            }

            ElMessage.success(res.msg);
          });
        });
      }
    };

    /**
     * 发送
     */
    const F_btnSendFlow = () => {
      if (data.task.needSign && !data.task.signed) {
        ElMessageBox.alert("当前事项还未签收，请先确认签收！", "提示", {
          type: "warning",
        })
          .then((res) => {})
          .catch((res) => {});
      } else {
        F_beforeSend();
      }
      // F_beforeSend();
    };

    /**
     * 发送前事件
     */
    const F_beforeSend = () => {
      //1.当前激活页面是基本信息表
      if (F_sfForm()) {
        bus.emit(props.formUrl + "_save", (val) => {
          //保存是否成功
          if (!val) {
            ElMessage.error("表单验证不通过！请检查填写内容！");
          } else {
            F_beforeSendDataCheck();
          }
        });
      }
      //2.当前激活页面是审批意见
      else if (F_sfSpyj()) {
        bus.emit("spyj_save", (val) => {
          if (!val) {
            ElMessage.error("请填写审批意见！");
          } else {
            F_beforeSendDataCheck();
          }
        });
      }
      //3.当前激活页面是项目列表、坐标、附件
      else {
        F_beforeSendDataCheck();
      }
    };

    /**
     * 当前环节是否是填报环节
     */
    const F_sfFQ = () => {
      let stepIdentity = data.task.stepIdentity;
      //特殊环节，全域实施变更和验收变更
      if (
        stepIdentity.indexOf("SBJD_XJFQ") != -1 ||
        stepIdentity.indexOf("LXJD_XJFQ") != -1 ||
        stepIdentity.indexOf("SSJD_XJFQ") != -1 ||
        stepIdentity.indexOf("YSJD_XJFQ") != -1 ||
        stepIdentity.indexOf("QYZZ_SSJD_BGSQ") != -1 ||
        stepIdentity.indexOf("QYZZ_YSJD_ZG") != -1
      ) {
        return true;
      } else {
        return false;
      }
    };

    /**
     * 当前激活页面是否是基本信息表
     */
    const F_sfForm = () => {
      if (
        props.currentUrl.indexOf("_sbxx") != -1 ||
        props.currentUrl.indexOf("_lxxx") != -1 ||
        props.currentUrl.indexOf("_ssxx") != -1 ||
        props.currentUrl.indexOf("_ysxx") != -1
      ) {
        return true;
      } else {
        return false;
      }
    };

    /**
     * 当前激活页面是否是附件
     */
    const F_sfSpyj = () => {
      if (props.currentUrl.indexOf("spyjList") != -1) {
        return true;
      } else {
        return false;
      }
    };

    /**
     * 立项阶段【复垦中心审核环节】
     *
     */
    const F_sfFksh = () => {
      let stepIdentity = data.task.stepIdentity;
      if (stepIdentity.indexOf("LXJD_FKZXSH") > -1) {
        return true;
      } else {
        return false;
      }
    };

    /**
     *验收阶段【复垦中心验收环节】
     *
     */
    const F_sfFkys = () => {
      let stepIdentity = data.task.stepIdentity;
      if (stepIdentity.indexOf("YSJD_FKZXYS") > -1) {
        return true;
      } else {
        return false;
      }
    };

    /**
     * 验收阶段【县级确认环节】
     *
     */
    const F_sfXjqr = () => {
      let stepIdentity = data.task.stepIdentity;
      if (stepIdentity.indexOf("YSJD_XJQR") > -1) {
        return true;
      } else {
        return false;
      }
    };

    /**
     * 验收阶段【县级填写省级面积环节】
     *
     */
    const F_sfstkj = () => {
      let stepIdentity = data.task.stepIdentity;
      if (stepIdentity.indexOf("YSJD_XJTX") > -1) {
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
      let guid = props.jbxxSec ? props.jbxxSec : props.flowinstid;
      let projectType = "jstdzz";
      if (props.materialType != undefined && props.materialType != "项目材料") {
        guid = props.flowinstid;
        projectType = "jstdzz_pc";
      }
      getTxUrl(guid, props.businessCode, projectType).then((res) => {
        window.open(res.data, "_blank");
      });
    };

    /**
     * 发送前数据检查
     */
    const F_beforeSendDataCheck = () => {
      const params = {
        flowinstid: props.flowinstid,
        jbxxSec: props.jbxxSec,
        taskId: props.taskId,
        businessCode: props.businessCode,
        catalog: props.catalog,
        stepIdentity: data.task.stepIdentity,
        materialType: props.materialType,
      };
      beforeSendDataCheck(params).then((res) => {
        data.errMsgList = res.data;
        if (data.errMsgList != null && data.errMsgList.length > 0) {
          errMsg.value.handleOpen();
        } else {
          sendTask.value.handleOpen();
        }
      });
    };

    /**
     * 数据检查按钮
     */
    const F_btnDataCheck = () => {
      const params = {
        flowinstid: props.flowinstid,
        jbxxSec: props.jbxxSec,
        taskId: props.taskId,
        businessCode: props.businessCode,
        catalog: props.catalog,
        stepIdentity: data.task.stepIdentity,
        materialType: props.materialType,
      };
      beforeSendDataCheck(params).then((res) => {
        data.errMsgList = res.data;
        if (data.errMsgList.length > 0) {
          errMsg.value.handleOpen();
        } else {
          ElMessage.success("检查成功");
        }
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
     * 退回前事件
     */
    const F_beforeWithdrew = () => {
      if (F_sfSpyj()) {
        bus.emit("spyj_save", (val) => {
          if (!val) {
            ElMessage.error("请填写审批意见！");
          } else {
            backTask.value.handleOpen();
          }
        });
      } else {
        const params = {
          flowinstid: props.flowinstid,
          taskId: props.taskId,
        };
        getBjb(params).then((res) => {
          let bjb = res.data;
          if (bjb.spOption == null || bjb.spOption == "") {
            ElMessage.error("请填写审批意见！");
          } else {
            backTask.value.handleOpen();
          }
        });
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
    const F_btnShowFlow = () => {
      getFlowId(props.flowinstid).then((res) => {
        let flowId = res.data;
        handlingProcess(props.flowinstid, flowId);
      });
      // handlingProcess(props.flowinstid, data.task.flowId);
    };

    /**
     * 关闭
     */
    const F_btnClose = () => {
      if (window.opener != null) {
        window.opener.postMessage("tdzz-daiban-refresh");
      }
      window.close();
    };

    /**
     * 撤回
     */
    const F_btnWithdrawx = () => {
      drawbackTask(props.flowinstid, props.taskId).then((res) => {
        ElMessage.success(res.msg);
        if (window.opener != null) {
          window.opener.postMessage("tdzz-yiban-refresh");
        }
        window.close();
      });
    };

    //3.入口
    onMounted(() => {
      F_init();
    });

    //4.监听事件
    watch(
      () => props.flowinstid,
      (newValue, oldValue) => {
        F_getBtnList();
      }
    );

    return {
      ...toRefs(data),
      F_init,
      operateBtn,
      F_btnSave,
      F_saveForm,
      F_saveSpyj,
      F_signTask,
      F_btnSendFlow,
      F_beforeSend,
      F_sfForm,
      F_sfSpyj,
      F_sfFQ,
      F_sfFksh,
      F_getTask,
      F_btnTransfer,
      F_btnViewGeometry,
      F_beforeSendDataCheck,
      F_btnDataCheck,
      F_btnDelFlow,
      F_delCallback,
      F_btnWithdrew,
      F_beforeWithdrew,
      F_btnShowFlow,
      F_btnClose,
      sendTask,
      transferTask,
      errMsg,
      backTask,
    };
  },
});
</script>