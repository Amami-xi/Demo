<template>
  <el-upload
    v-if="!disabled && attach == null"
    action=""
    :http-request="customUpload"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    accept="image/jpg,image/jpeg,image/png"
    :limit="limit"
  >
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>
  <div v-else class="tlw-image-content">
    <el-image
      class="tlw-single-image el-upload--picture-card"
      :src="url"
      :preview-src-list="srcList"
      :initial-index="index"
      fit="fill"
    >
    </el-image>
    <el-icon class="icon-delete" v-if="!disabled" @click="F_deleteAttach"
      ><Close
    /></el-icon>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadAttach, downloadAttach } from "@/common/api/jtap/attach";
import { downloadFile } from "@/common/utils/file";
import { Plus, Close, Delete } from "@element-plus/icons-vue";
import {
  getAttachList,
  deleteAttach,
} from "@/common/api/jtap/attach";
export default defineComponent({
  name: "attachUpload",
  components: {
    Plus,
    Close,
    Delete,
  },
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
    accept: {
      type: String,
      default: ".jpg,.png,.jpeg,JPG,JPEG",
    },
    //标识
    limit: {
      type: Number,
      default: 1,
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
      attach: null,
      url: "",
      index: 0,
      fileList: [],
      srcList: [],
      dialogImageUrl: "",
      dialogVisible: false,
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
      getAttachList(props.flowinstid, props.referenceId, props.catalog).then(
        (res) => {
          data.attach = null;
          data.fileList = [];
          const list = res.data;
          if (list != null && list.length > 0) {
            data.attach = list[0];
            data.url = data.attach.filePath;
            list.map((obj) => {
              data.fileList.push({
                id: obj.id,
                name: obj.name,
                url: obj.filePath,
              });
            });
            getAttachList(props.flowinstid, null, props.catalog).then((res) => {
              data.fileList = [];
              const list = res.data;
              if (list != null && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                  const obj = list[i];
                  if (obj.id == data.attach.id) {
                    data.index = i;
                  }
                  data.srcList.push(obj.filePath);
                }
              }
            });
          }
        }
      );
    };

    /**
     * 下载附件
     */
    const F_download = () => {
      // downloadAttach(data.attach.id).then((res) => {
      //   downloadFile(res.data, data.attach.name);
      // });
    };

    const F_beforeRemove = () => {
      return false;
    };

    const handleRemove = (uploadFile) => {
      F_deleteAttach(uploadFile.id);
    };

    /**
     * 点击图片预览
     * @param {*} uploadFile
     */
    const handlePictureCardPreview = (uploadFile) => {
      data.dialogVisible = true;
      data.dialogImageUrl = uploadFile.url;
    };

    /**
     * 删除附件
     */
    const F_deleteAttach = () => {
      ElMessageBox.confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          deleteAttach(data.attach.id).then((res) => {
            ElMessage.success(res.msg);
            F_getAttach();
          });
        })
        .catch((res) => { });
        F_getAttach();
    };

    //3.入口
    onMounted(() => {
      F_getAttach();
    });

    return {
      ...toRefs(data),
      customUpload,
      F_getAttach,
      F_download,
      F_deleteAttach,
      F_beforeRemove,
      handleRemove,
      handlePictureCardPreview,
    };
  },
});
</script>
<style lang="scss" scoped>
.tlw-image-content {
  position: relative;
  .icon-delete {
    position: absolute;
    top: 3px;
    // left: 260px;
    &:hover {
      background: red;
    }
  }
}
</style>