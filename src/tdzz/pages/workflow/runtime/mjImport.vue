<template>
  <el-dialog
    v-model="dialogVisible"
    title="批量导入"
    :before-close="handleClose"
    destroy-on-close
  >
    <el-upload
      action=""
      :before-upload="signBeforeUpload"
      :http-request="signUploadFile"
      :limit="1"
      ref="xmUpload"
      v-if="!flag"
    >
      <el-button #="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
    <template v-if="flag && errList != null && errList.length > 0">
      <el-row>
        <el-col :span="24">
          <el-tag type="warning">导入失败信息见下方列表！</el-tag>
        </el-col>
      </el-row>
      <el-row class="tlw-row">
        <el-col :span="24">
          <el-table :data="errList" max-height="600" border>
            <el-table-column prop="xmbh" label="检查项目" width="180" />
            <el-table-column prop="errMsg" label="错误信息" />
          </el-table>
        </el-col>
      </el-row>
    </template>
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
import { batchImportMj } from "@/tdzz/api/workflow/batchImport";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "@/common/store";
export default defineComponent({
  name: "mjImport",
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //业务编码
    businessCode: {
      type: String,
      default: "",
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
      fileType: null,
      userId: store.state.user.userId,
      successList: [],
      errList: [],
      flag: false,
    });
    const xmUpload = ref(null);
    //2.定义方法

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
      if (data.flag) {
        data.flag = false;
        data.errList = [];
        data.fileType = null;
        //刷新项目列表
        // props.render();
      }
    };

    /**
     * 打开弹窗
     */
    const handleOpen = () => {
      data.dialogVisible = true;
    };

    const signBeforeUpload = (file) => {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (extension != "xlsx" && extension != "xls") {
        data.fileType = null;
       currentInstance.ctx.$refs.xmUpload.clearFiles();
       // xmUpload.value.clearFiles();
        ElMessageBox.alert("请下载模板导入", "提示", { type: "warning" })
          .then()
          .catch();
          return false;
      } else {
        data.fileType = extension;
      }
    };

    const signUploadFile = (param) => {
      if (data.fileType == "xlsx" || extension == "xls") {
        const formData = new FormData();
        formData.append("file", param.file);
        formData.append("flowinstid", props.flowinstid);
        formData.append("businessCode", props.businessCode);
        batchImportMj(formData).then((res) => {
          data.flag = true;
          data.errList = res.data;
          if (data.errList != null && data.errList.length == 0) {
            ElMessage.success("导入成功");
            handleClose();
          }
          xmUpload.value.clearFiles();
        });
        xmUpload.value.clearFiles();
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

<style scoped>
</style>