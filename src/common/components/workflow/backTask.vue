<template>
  <el-dialog
    v-model="dialogVisible"
    title="退回环节办理人信息"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="60%"
  >
    <el-table :data="tableData" :row-class-name="getRowClassName">
      <el-table-column type="expand">
        <template #default="scope">
          <el-table :data="scope.row.actors">
            <el-table-column label="用户名" prop="actorName"> </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="stepName" label="审核环节" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认退回</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {
  getBackTaskParam,
  withdrawStandardTask,
} from "@/common/api/jtap/taskHandle";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "backTask",
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
  emits() {},
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      dialogVisible: false,
      tableData: [],
      selectNode: "",
      nextNodeList: [],
      errorList: [],
    });

    //2.定义方法

    /**
     * 打开弹窗
     */
    const handleOpen = () => {
      data.dialogVisible = true;
      //获取下一环节路由信息
      getBackTaskParam(props.flowinstid, props.taskId).then((res) => {
        data.tableData = res.data;
      });
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
    };

    /**
     * 确认发送
     */
    const confirm = () => {
      F_sendTask();
    };

    /**
     * 退回任务
     */
    const F_sendTask = () => {
      //1.退回前校验
      checkActor();
      //2.退回
      if (data.errorList.length == 0) {
        withdrawStandardTask(props.flowinstid, props.taskId, "").then((res) => {
          ElMessage.success(res.msg);
          F_btnClose();
        });
      }
    };

    /**
     * 退回后任务
     */
    const F_AftersendTask = () => {
      //1.批次流程退回后要改变项目状态

    };


    /**
     * 校验退回环节下是否配置用户信息
     */
    const checkActor = () => {
      for (var i = 0; i < data.tableData.length; i++) {
        const actors = data.tableData[i].actors;
        if (actors == null || actors.length == 0) {
          flag = false;
          data.errorList.push({
            name: node.nodeName,
            errMsg: "用户信息配置不完整，请联系系统管理员",
          });
        }
      }
    };

    const getRowClassName = ({ row }, rowIndex) => {
      if (row.stepName.indexOf("结束") != -1) {
        return "row-expand-hidden";
      } else {
        if (row.actors == undefined || row.actors.length == 0) {
          return "row-expand-hidden";
        } else {
          return "row-expand-show";
        }
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
      handleOpen,
      handleClose,
      confirm,
      F_sendTask,
      getRowClassName,
      F_btnClose,
    };
  },
});
</script>