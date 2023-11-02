<template>
  <el-dialog
    v-model="dialogVisible"
    title="批量发送"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-tree-select
      v-model="selectUser"
      :props="defaultProps"
      :data="userList"
      default-expand-all
      filterable
    />
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
export default defineComponent({
  name: "userSelect",
  components: {},
  props: {
    //下一环节用户列表
    userList: {
      type: Array,
      default: [],
    },
    render: {
      type: Function,
    },
  },
  setup(props, context) {
    //1.定义数据
    //定义Tree组件数据格式
    const defaultProps = {
      children: "childList",
      label: "nodeName",
      value: "assisId",
    };
    const data = reactive({
      dialogVisible: false,
      tableData: [],
      selectUser: "",
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
      props.render(data.selectUser);
      handleClose();
    };

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
      confirm,
      defaultProps,
    };
  },
});
</script>