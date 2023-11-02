<template>
  <el-dialog
    v-model="dialogVisible"
    title="坐标导入"
    width="40%"
    :before-close="handleClose"
    destroy-on-close
  >
    <el-upload
      action=""
      :before-upload="signBeforeUpload"
      :http-request="signUploadFile"
      :limit="1"
      :accept="accept"
      ref="zbUpload"
    >
      <el-button #="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  ref,
} from "@vue/runtime-core";
import {
  importShapePlot,
  importTxtPlot,
  importExcelPlot,
} from "@/common/api/plot/plotImport";
import { postOneMap } from "@/common/api/plot/plotTx";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  name: "plotImport",
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //坐标类型
    pType: {
      type: String,
      default: "",
    },
    //业务编码
    businessCode: {
      type: String,
      default: "",
    },
    //接受上传的文件类型
    accept: {
      type: String,
      default: ".zip,.txt",
    },
    render: {
      type: Function,
    },
  },
  setup(props, context) {
    //1.定义数据
    const currentInstance = getCurrentInstance();

    const data = reactive({
      dialogVisible: false,
      tableData: [],
      fileType: "",
    });

    const zbUpload = ref(null);
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

    const signBeforeUpload = (file) => {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (extension !== "txt" && extension !== "zip") {
        ElMessageBox.alert("请选择正确的格式", "提示", { type: "warning" })
          .then()
          .catch();
          zbUpload.value.clearFiles();
        return false;
      } else {
        data.fileType = extension;
      }
    };

    const signUploadFile = (param) => {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("flowinstid", props.flowinstid);
      formData.append("pType", props.pType);
      if (data.fileType === "txt") {
        importTxtPlot(formData).then((res) => {
          if (res.success) {
            //上图到图形平台
            postOneMap(props.flowinstid, props.pType, props.businessCode).then(
              (res2) => {
                //关闭弹窗
                handleClose();
                //刷新地块列表
                props.render();
                //上传成功清空文件列表
                zbUpload.value.clearFiles();
                if (res2.success) {
                  ElMessage.success(res.msg);
                } else {
                  ElMessage.error(res2.msg);
                }
              }
            );
          } else {
            ElMessage.error(res.msg);
          }
        });
      }
      // else if (data.fileType === "xlsx" || data.fileType === "xls") {
      //   importExcelPlot(formData).then((res) => {
      //     if (res.success) {
      //       //上图到图形平台
      //       postOneMap(props.flowinstid, props.pType, props.businessCode).then(
      //         (res2) => {
      //           //关闭弹窗
      //           handleClose();
      //           //刷新地块列表
      //           props.render();
      //           //上传成功清空文件列表
      //           currentInstance.ctx.$refs.zbUpload.clearFiles();
      //           if (res2.success) {
      //             ElMessage.success(res.msg);
      //           } else {
      //             ElMessage.error(res2.msg);
      //           }
      //         }
      //       );
      //     }
      //     else {
      //       ElMessage.error(res.msg);
      //     }
      //   });
      // }
      else if (data.fileType === "zip") {
        importShapePlot(formData).then((res) => {
          if (res.success) {
            //上图到图形平台
            postOneMap(props.flowinstid, props.pType, props.businessCode).then(
              (res2) => {
                //关闭弹窗
                handleClose();
                //刷新地块列表
                props.render();
                //上传成功清空文件列表
                zbUpload.value.clearFiles();
                if (res2.success) {
                  ElMessage.success(res.msg);
                } else {
                  ElMessage.error(res2.msg);
                }
              }
            );
          } else {
            ElMessage.error(res.msg);
          }
        });
      }
    };

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
      signBeforeUpload,
      signUploadFile,
    };
  },
});
</script>