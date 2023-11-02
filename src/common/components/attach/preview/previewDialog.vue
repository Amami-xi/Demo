<template>
  <el-dialog
    class="tlw-preview-dialog"
    v-model="dialogVisible"
    :title="title"
    :before-close="handleClose"
    fullscreen
    append-to-body
  >
    <iframe :src="url" class="tlw-preview"></iframe>
  </el-dialog>
</template>
  
  <script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
export default defineComponent({
  name: "PreviewDialog",
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      dialogVisible: false,
      title: "",
      url: "",
    });

    //2.定义方法

    /**
     * 打开弹窗
     */
    const handleOpen = (name, url) => {
      data.title = name;
      data.url = url;
      data.dialogVisible = true;
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
      data.title = "";
      data.url = "";
    };

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
    };
  },
});
</script>