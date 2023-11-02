<template>
  <div class="tlw-more-attach-upload">
    <div :class="{ 'is-disabled': disabled }">
      <el-upload
        :show-file-list="false"
        action=""
        :http-request="customUpload"
        :accept="accept"
      >
        <el-button type="primary" size="small">选择文件</el-button>
      </el-upload>
      <el-row
        v-for="(item, index) in fileList"
        :key="index"
        class="tlw-upload-list"
      >
        <el-col :span="1" class="tlw-upload-list__item-view">
          <el-icon class="tlw-icon-view" @click="F_handlePreview(item)"
            ><View
          /></el-icon>
        </el-col>
        <el-col :span="21" class="tlw-upload-list__item-name">
          <span @click="F_download(item)">{{ item.name }}</span>
        </el-col>
        <el-col :span="2" class="tlw-upload-list__item-close">
          <el-icon
            v-if="!disabled"
            class="tlw-icon-close"
            @click="F_handleRemove(item)"
            ><Close
          /></el-icon>
          <el-icon class="tlw-icon-success"><CircleCheck /></el-icon>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadAttach, downloadAttach } from "@/common/api/jtap/attach";
import { downloadFile } from "@/common/utils/file";
import {
  Plus,
  Close,
  View,
  CircleCheck,
  Checked,
} from "@element-plus/icons-vue";
import { getAttachList, deleteAttach } from "@/common/api/jtap/attach";
import { Base64 } from "js-base64";
export default defineComponent({
  name: "attachUpload",
  components: {
    Plus,
    Close,
    View,
    Close,
    CircleCheck,
    Checked,
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
    //操作
    disabled: {
      type: Boolean,
      default: "",
    },
    listType: {
      type: String,
      default: "text",
    },
    accept: {
      type: String,
      default: "",
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
      test: true,
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
      getAttachList(props.flowinstid, props.referenceId, props.catalog).then(
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
     * 预览
     */
    const F_handlePreview = (item) => {
      const file = item;
      let filePath = file.url + "?fullfilename=" + file.name;
      let url =
        import.meta.env.VITE_PREVIEW_SERVER_URL +
        "?url=" +
        encodeURIComponent(Base64.encode(filePath));
      window.open(url, "_blank"); // 新窗口打开
    };

    /**
     * 下载附件
     */
    const F_download = (uploadFile) => {
      downloadAttach(uploadFile.id).then((res) => {
        downloadFile(res.data, uploadFile.name);
      });
    };

    /**
     * 删除
     *
     * @param {*} uploadFile
     */
    const F_handleRemove = (row) => {
      ElMessageBox.confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          F_deleteAttach(row.id);
        })
        .catch();
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
      F_handlePreview,
      F_handleRemove,
    };
  },
});
</script>