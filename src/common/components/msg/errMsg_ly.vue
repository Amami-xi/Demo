<template>
  <el-dialog
    v-model="dialogVisible"
    title="错误信息"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    width="60%"
  >
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="errMsg" label="错误信息" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
export default defineComponent({
  name: "errMsgPc",
  props: {
    //流程实例ID
    tableData: {
      type: Array,
      default: [],
    },
  },
  emits() {},
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      dialogVisible: false,
    });

    //2.定义方法

    /**
     * 打开弹窗
     */
    const handleOpen = () => {
      data.dialogVisible = true;
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
    };

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
    };
  },
});
</script>