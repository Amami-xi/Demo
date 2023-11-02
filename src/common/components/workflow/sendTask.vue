<template>
  <el-dialog
    v-model="dialogVisible"
    title="下一环节办理人信息"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    width="60%"
  >
    <el-table :data="tableData" :row-class-name="getRowClassName" max-height="450">
      <el-table-column type="expand">
        <template #default="scope">
          <el-table v-if="scope.row.actorList" :data="scope.row.actorList">
            <el-table-column label="用户名" prop="actorName"> </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label width="35">
        <template #default="scope">
          <el-radio
            :label="scope.row.nodeId"
            v-model="selectNode"
            v-if="scope.row.relation === 'XOR'"
            >&nbsp;</el-radio
          >
          <el-checkbox v-if="scope.row.relation === 'OR'" disabled checked
            >&nbsp;</el-checkbox
          >
        </template>
      </el-table-column>
      <!-- <el-table-column label="序号" type="index" width="80" /> -->
      <el-table-column prop="nodeName" label="审核环节" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认发送</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { getSendTaskParam, sendTask } from "@/common/api/jtap/taskHandle";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "sendTask",
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
      getSendTaskParam(props.flowinstid, props.taskId).then((res) => {
        data.tableData = res.data;
        if (data.tableData) {
          data.selectNode = data.tableData[0].nodeId;
        }
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
      data.nextNodeList = [];
      if (data.tableData.length > 1) {
        const node = data.tableData[0];
        let relation = node.relation;
        //单选网关
        if (relation === "XOR") {
          if (!data.selectNode) {
            ElMessage.error("请选择需要发送的环节");
          } else {
            data.nextNodeList.push({
              nodeId: data.selectNode,
              actorList: [],
            });
            F_sendTask();
          }
        } else {
          F_sendTask();
        }
      } else {
        F_sendTask();
      }
    };

    /**
     * 发送任务
     */
    const F_sendTask = () => {
      //1.发送前校验
      data.errorList = [];
      if (data.selectNode) {
        const node = data.tableData.find(
          (node) => node.nodeId == data.selectNode
        );
        checkActor(node);
      } else {
        data.tableData.forEach((node) => {
          checkActor(node);
        });
      }
      //2.发送
      if (data.errorList.length == 0) {
        sendTask(props.flowinstid, props.taskId, data.nextNodeList).then(
          (res) => {
            ElMessage.success(res.msg);
            F_btnClose();
          }
        );
      }
    };

    /**
     * 校验发送环节下是否配置用户信息
     */
    const checkActor = (node) => {
      const actors = node.actorList;
      if (actors == null || actors.length == 0) {
        flag = false;
        data.errorList.push({
          name: node.nodeName,
          errMsg: "未配置用户信息，请联系系统管理员",
        });
      }
    };

    const getRowClassName = ({ row }, rowIndex) => {
      if (row.nodeName.indexOf("结束") != -1) {
        return "row-expand-hidden";
      } else {
        if (row.actorList == undefined || row.actorList.length == 0) {
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
        window.opener.postMessage("yjjc-daiban-refresh");
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