<template>
  <div class="attach-btn">
    <AttachPreview :attach="attach"></AttachPreview>
    <AttachDownload
      :attachId="attach.id"
      :name="attach.name"
      :filePath="attach.filePath"
    ></AttachDownload>
    <AttachDelete
      :attachId="attach.id"
      :material="material"
      v-if="!disabled && material.action === 'EDIT'"
    ></AttachDelete>
  </div>
</template>
  
<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import AttachPreview from "./preview/index";
import AttachDownload from "./download/index";
import AttachDelete from "./delete/index";
export default defineComponent({
  name: "AttachOperate",
  components: { AttachPreview, AttachDownload, AttachDelete },
  props: {
    //附件
    attach: {
      type: Object,
      default: {},
    },
    //材料
    material: {
      type: Object,
      default: {},
    },
    //操作
    disabled: {
      type: String,
      default: {},
    },
  },
  emits() {},
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({});

    //2.定义方法

    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped lang="scss">
.attach-btn {
  display: flex;
  justify-content: center;
}
</style>