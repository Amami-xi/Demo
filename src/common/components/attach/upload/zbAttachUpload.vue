<template>
  <div class="tlw-more-attach-upload">
    <div :class="{ 'is-disabled': disabled }">
      <el-row
        style="
          background: #ecf5ff;
          padding: 0.125rem 0.375rem;
          font-weight: bold;
          border-radius: 0.125rem;
        "
      >
        <el-col :span="22">
          <span :class="material.required ? 'requireCol' : ''">{{
            btnText
          }}</span>
        </el-col>
        <el-col :span="2">
          <el-upload
            :show-file-list="false"
            action=""
            :http-request="customUpload"
            :accept="accept"
          >
            <el-icon
              color="#4596DE"
              :size="20"
              v-if="
                !disabled && material.action == 'EDIT' && fileList.length == 0
              "
            >
              <UploadFilled />
            </el-icon>
          </el-upload>
        </el-col>
      </el-row>
      <el-row
        :gutter="10"
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
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadAttach, downloadAttach } from "@/common/api/jtap/attach";
import { downloadFile } from "@/common/utils/file";
import { deleteAll_ly } from "@/common/api/plot/plotZb";
import AttachPreview from "@/common/components/attach/preview/index";
import {
  importShapePlot_Ly,
  importTxtPlot,
  importExcelPlot,
} from "@/common/api/plot/plotImport";
import { postOneMapLy, checkJbxx } from "@/common/api/plot/plotTx";
import {
  UploadFilled,
  Close,
  View,
  CircleCheck,
  Checked,
} from "@element-plus/icons-vue";
import {
  getAttachList,
  deleteAttach,
  getMaterialAttach,
} from "@/common/api/jtap/attach";
import { Base64 } from "js-base64";
export default defineComponent({
  name: "attachUpload",
  components: {
    UploadFilled,
    View,
    Close,
    Checked,
    CircleCheck,
    AttachPreview,
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
    //关联材料标识
    businessCode: {
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
    pType: {
      type: String,
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
    const upload = ref(null);
    /**
     * 附件上传
     * @param {Object} param
     */
    const customUpload = (param) => {
      //1.坐标上图
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("flowinstid", props.flowinstid);
      formData.append("referenceId", props.referenceId);
      formData.append("catalog", props.catalog);
      let businessCode = "";
      if (
        props.referenceId.indexOf("sdzyzs_slsj") > -1 ||
        props.referenceId.indexOf("sdzyzs_sdslsj") > -1
      ) {
        businessCode = "10140101";
      } else if (props.referenceId.indexOf("gyl_slsj") > -1) {
        businessCode = "10140301";
      }
      checkJbxx(props.flowinstid, props.businessCode).then((res3) => {
        if (res3.success) {
          F_zbUpload(param, businessCode, formData);
          F_getAttach();
        } else {
          ElMessage.error(res3.msg);
          F_getAttach();
        }
      });
    };

    /**
     * 坐标导入及上传，文件上传操作
     */

    const F_zbUpload = (param, businessCode, formData) => {
      const formData2 = new FormData();
      const pType = props.pType;
      formData2.append("file", param.file);
      formData2.append("flowinstid", props.flowinstid);
      formData2.append("pType",pType);
      let extension = param.file.name.substring(
        param.file.name.lastIndexOf(".") + 1
      );
      if (extension === "zip") {
        importShapePlot_Ly(formData2).then((res) => {
          if (res.success) {
            uploadAttach(formData).then((res) => {
              ctx.emit("refresh");
              ElMessage.success(res.msg);
              F_getAttach();
            });
          } else {
            F_getAttach();
            ElMessage.error(res.msg);
          }
        });
      } else {
        ElMessage.error("请上传符合要求的shp文件压缩包！");
      }
      F_getAttach();
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
    const F_handleRemove = (uploadFile) => {
      F_deleteAttach(uploadFile.id);
    };

    /**
     * 删除附件
     */
    const F_deleteAttach = (val) => {
      //1.删除上图数据
      const pType = props.pType;
      deleteAll_ly(props.flowinstid, pType).then((res) => {
        if (res.success) {
          //2.删除附件
          deleteAttach(val).then((res) => {
            ElMessage.success(res.msg);
            F_getAttach();
          });
        } else {
          ElMessage.error(res.msg);
        }
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
      F_handleRemove,
    };
  },
});
</script>
<!-- <style lang="scss" scoped>
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
</style> -->