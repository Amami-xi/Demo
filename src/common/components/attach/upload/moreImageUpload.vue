<template>
  <div class="tlw-more-image-upload">
    <div :class="{ 'is-disabled': disabled }">
      <el-upload
        :file-list="fileList"
        action=""
        :http-request="customUpload"
        :list-type="listType"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :accept="accept"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-image-viewer
        :url-list="srcList"
        @close="F_close"
        :initial-index="initialIndex"
        v-if="dialogVisible"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadAttach, downloadAttach } from "@/common/api/jtap/attach";
import { downloadFile } from "@/common/utils/file";
import { Plus, Close } from "@element-plus/icons-vue";
import { getAttachList, deleteAttach } from "@/common/api/jtap/attach";
export default defineComponent({
  name: "attachUpload",
  components: {
    Plus,
    Close,
  },
  props: {
    //流程标识
    flowinstid: {
      type: String,
      default: "",
    },
    taskId: {
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
   //关联材料标识
   projectId: {
      type: String,
      default: "",
    },
    //操作
    disabled: {
      type: Boolean,
      default: "",
    },
    listType: {
      type: String,
      default: "picture-card",
    },
    accept: {
      type: String,
      default: ".jpg,.png,.jpeg,JPG,JPEG",
    },
    render: {
      type: Function,
    },
  },
  emits: ["refresh"],
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      fileList: [],
      srcList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      initialIndex: 0, //初始预览图像索引，小于 url-list 的长度
    });

    //2.定义方法

    /**
     * 初始化
     */
    const F_init = () => {
      F_getAttach();
    };

    /**
     * 附件上传
     * @param {Object} param
     */
    const customUpload = (param) => {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("flowinstid", props.flowinstid);
      formData.append("referenceId", props.referenceId);
      formData.append("catalog", props.catalog);
      //文件上传
      uploadAttach(formData).then((res) => {
        F_getAttach();
        ElMessage.success("上传成功");
      });
    };

    /**
     * 获取附件内容
     */
    const F_getAttach = () => {
      getAttachList(props.flowinstid, props.referenceId, props.catalog,props.projectId).then(
        (res) => {
          data.fileList = [];
          data.srcList = [];
          const list = res.data;
          list.map((obj) => {
            data.fileList.push({
              id: obj.id,
              name: obj.name,
              url: obj.filePath,
            });
            data.srcList.push(obj.filePath);
          });
        }
      );
    };

    /**
     * 下载附件
     */
    const F_download = () => {};

    /**
     * 删除前事件
     */
    const beforeRemove = () => {
      if (props.disabled) {
        return false;
      } else {
        return true;
      }
    };

    /**
     * 删除
     *
     * @param {*} uploadFile
     */
    const handleRemove = (uploadFile) => {
      F_deleteAttach(uploadFile.id);
    };

    /**
     * 预览
     *
     * @param {*} uploadFile
     */
    const handlePreview = (uploadFile) => {
      if (props.render) {
        props.render(uploadFile);
      } else {
        data.initialIndex = data.srcList.indexOf(uploadFile.url);
        if (data.initialIndex < 0) {
          data.initialIndex = 0;
        }
        data.dialogImageUrl = uploadFile.url;
        data.dialogVisible = true;
      }
    };

    /**
     * 关闭预览
     */
    const F_close = () => {
      data.dialogVisible = false;
    };

    /**
     * 删除
     */
    const F_deleteAttach = (id) => {
      deleteAttach(id).then((res) => {
        ElMessage.success("删除成功");
        F_init();
      });
    };

    //3.入口
    onMounted(() => {
      F_init();
    });

    return {
      ...toRefs(data),
      customUpload,
      F_init,
      F_getAttach,
      F_download,
      F_deleteAttach,
      beforeRemove,
      handleRemove,
      handlePreview,
      F_close,
    };
  },
});
</script>