<template>
  <el-button type="primary" @click="F_Download" size="small">
    下载<el-icon class="el-icon--right">
      <Download />
    </el-icon>
  </el-button>
</template>
  
  <script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { Download } from "@element-plus/icons-vue";
import { downloadFile } from "@/common/utils/file";
import { getAttachList,downloadAttach } from "@/common/api/jtap/attach";
export default defineComponent({
  name: "AttachDownload",
  components: { Download },
  props: {
    //附件Id
    attachId: {
      type: String,
      default: "",
    },
    //附件名称
    name: {
      type: String,
      default: "",
    },
    //附件路径
    filePath: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({});

    //2.定义方法

    /**
     * 下载附件
     */
    const F_Download = () => {
      downloadAttach(props.attachId).then((res) => {
        downloadFile(res.data, props.name);
      });
    };

    return {
      ...toRefs(data),
      F_Download,
    };
  },
});
</script>