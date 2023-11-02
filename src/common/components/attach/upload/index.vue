<template>
  <el-upload
    class="tlw-upload"
    ref="upload"
    :multiple="false"
    action=""
    :http-request="customUpload"
    :auto-upload="true"
    :show-file-list="false"
  >
    <el-icon color="#4596DE" :size="24">
      <UploadFilled />
    </el-icon>
  </el-upload>
</template>
  
  <script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { uploadAttach } from "@/common/api/jtap/attach";
import { UploadFilled } from "@element-plus/icons-vue";
export default defineComponent({
  name: "AttachUpload",
  components: { UploadFilled },
  props: {
     //流程标识
    flowinstid: {
      type: String,
      default: "",
    },
    //项目阶段
    catalog: {
      type: String,
      default: "",
    }, 
    //关联材料标识
    referenceId: {
      type: String,
      default: "",
    },
  },
  emits: ["refresh"],
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({});

    //2.定义方法

    /**
     * 附件上传
     * @param {Object} param
     */
    const customUpload = (param) => {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("flowinstid", props.flowinstid);
      formData.append("catalog", props.catalog);
      formData.append("referenceId", props.referenceId);
      uploadAttach(formData).then((res) => {
        ctx.emit("refresh");
        ElMessage.success(res.msg);
      });
    };

    //3.入口
    onMounted(() => {});

    return { ...toRefs(data), customUpload};
  },
});
</script>