<template>
  <el-dialog
    v-model="dialogVisible"
    title="批量操作"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="60%"
    destroy-on-close
  >
    <el-form ref="sendForm" :model="entity" label-width="auto">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="审批结果" prop="spzt" :rules="rules.spzt">
            <el-radio-group v-model="entity.spzt">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">退回</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item
            label="审批意见"
            prop="spOption"
            :rules="rules.spOption"
          >
            <el-input type="textarea" v-model="entity.spOption"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {
  batchSendTask,
  batchWithdrawStandardTask,
} from "@/common/api/jtap/taskHandle";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "batchTask",
  props: {
    render: {
      type: Function,
    },
  },
  emits() {},
  setup(props, ctx) {
    //1.定义数据
    const sendForm = ref(null);
    const data = reactive({
      dialogVisible: false,
      selection: [],
      errorList: [],
      entity: {},
      rules: {
        spzt: [{ required: true, message: "请选择审批结果", trigger: "blur" }],
        spOption: [
          { required: true, message: "请填写审批意见", trigger: "blur" },
        ],
      },
    });

    //2.定义方法

    /**
     * 打开弹窗
     */
    const handleOpen = (val) => {
      val.map((obj) => {
        data.selection.push({
          flowinstid: obj.flowinstid,
          taskId: obj.taskId,
        });
      });
      data.dialogVisible = true;
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
      data.entity = {};
    };

    /**
     * 确认发送
     */
    const confirm = () => {
      F_sendTask();
    };

    /**
     * 发送前校验
     */
    const F_beforeSave = async () => {
      let flag = true;
      //1. 表单判空
      await sendForm.value.validate((valid) => {
        flag = valid;
      });
      return flag;
    };

    /**
     * 发送任务
     */
    const F_sendTask = async () => {
      let flag = await F_beforeSave();
      if (flag) {
        if (data.entity.spzt == 1) {
          F_batchSend();
        } else if (data.entity.spzt == 2) {
          F_batchBack();
        }
      }
    };

    /**
     * 批量通过
     */
    const F_batchSend = () => {
      batchSendTask(data.selection).then((res) => {
        F_btnClose();
      });
    };

    /**
     * 批量退回
     */
    const F_batchBack = () => {
      batchWithdrawStandardTask(data.selection, data.entity.spOption).then(
        (res) => {
          ElMessage.success("批量退回成功");
          F_btnClose();
        }
      );
    };

    /**
     * 关闭刷新
     */
    const F_btnClose = () => {
      //关闭弹窗
      handleClose();
      //刷新
      props.render();
    };

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
      confirm,
      F_beforeSave,
      F_sendTask,
      F_btnClose,
      sendForm,
    };
  },
});
</script>