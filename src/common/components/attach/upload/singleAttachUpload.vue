<template>
  <div :class="fileList.length == 0 ? 'tlw-ly-upload' : 'tlw-ly-down'">
    <div :class="material.required ? 'requireCol' : ''" class="title">
      {{ btnText }}
    </div>
    <div
      class="tlw-upload-list"
      :class="!disabled && material.action == 'EDIT' ? 'is-edit' : 'is-view'"
    >
      <el-icon class="tlw-icon-view" @click="F_handlePreview"><View /></el-icon>
      <el-upload
        ref="upload"
        :file-list="fileList"
        action=""
        :http-request="customUpload"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-preview="F_download"
        :accept="accept"
      >
        <el-icon
          color="#4596DE"
          :size="20"
          v-if="!disabled && material.action == 'EDIT' && fileList.length == 0"
        >
          <UploadFilled />
        </el-icon>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadAttach, downloadAttach } from "@/common/api/jtap/attach";
import { downloadFile } from "@/common/utils/file";
import AttachPreview from "@/common/components/attach/preview/index";
import { UploadFilled, View } from "@element-plus/icons-vue";
import {
  getAttachList,
  deleteAttach,
  getMaterialAttach,
} from "@/common/api/jtap/attach";
import { Base64 } from "js-base64";
export default defineComponent({
  name: "attachUpload",
  components: { UploadFilled, View, AttachPreview },
  props: {
    flowinstid: {
      type: String,
      default: "",
    }, //流程标识
    taskId: {
      type: String,
      default: "",
    },
    //关联材料标识
    referenceId: {
      type: String,
      default: "",
    },
    //标识
    catalog: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "",
    },
    accept: {
      type: String,
      default: "",
    },
    //操作
    disabled: {
      type: Boolean,
      default: "",
    },
  },
  emits: ["refresh"],
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      fileList: [],
      material: [], //材料
    });

    //2.定义方法

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
      
      uploadAttach(formData).then((res) => {
        F_getAttach();
        ctx.emit("refresh");
        ElMessage.success(res.msg);
      });
    };

    /**
     * 获取材料
     */
    const F_getMaterial = () => {
      getMaterialAttach(props.flowinstid, props.taskId, props.referenceId).then(
        (res) => {
          data.material = res.data;
        }
      );
    };

    /**
     * 获取附件内容
     */
    const F_getAttach = () => {
      getAttachList(props.flowinstid, props.referenceId, props.catalog).then(
        (res) => {
          data.fileList = [];
          if (res.data) {
            res.data.map((obj) => {
              data.fileList.push({
                id: obj.id,
                name: obj.name,
                url: obj.filePath,
              });
            });
          }
        }
      );
    };

    /**
     * 预览
     */
    const F_handlePreview = () => {
      const file = data.fileList[0];
      let filePath = file.url + "?fullfilename=" + file.name;
      let url =
        import.meta.env.VITE_PREVIEW_SERVER_URL +
        "?url=" +
        encodeURIComponent(Base64.encode(filePath));
      window.open(url, "_blank"); // 新窗口打开
    };

    /**
     * 下载
     */
    const F_download = (uploadFile) => {
      downloadAttach(uploadFile.id).then((res) => {
        downloadFile(res.data, uploadFile.name);
      });
    };
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
     * 删除附件
     */
    const F_deleteAttach = (val) => {
      deleteAttach(val).then((res) => {
        ElMessage.success(res.msg);
        F_getAttach();
      });
    };

    //3.入口
    onMounted(() => {
      F_getAttach();
      F_getMaterial();
    });

    return {
      ...toRefs(data),
      customUpload,
      F_getAttach,
      F_handlePreview,
      F_download,
      F_deleteAttach,
      beforeRemove,
      handleRemove,
    };
  },
});
</script>
<style lang="scss" scoped>
.tlw-ly-upload {
  justify-content: space-between;
  .title {
    width: 85%;
  }
  display: flex;
  .tlw-icon-view {
    display: none;
  }
}
.tlw-ly-down {
  .tlw-upload-list {
    position: relative;
    .tlw-icon-view {
      display: block;
      position: absolute;
      top: 0.8125rem;
      left: 0.25rem;
      z-index: 1000;
      &:hover {
        cursor: pointer;
        color: green;
      }
    }
  }

  .is-view {
    ::v-deep(.el-icon--close) {
      display: none !important;
    }
  }
}
</style>