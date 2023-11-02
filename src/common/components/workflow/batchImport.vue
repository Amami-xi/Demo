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
      :accept="accept"
      v-if="!flag"
    >
      <el-button #="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
    <template
      v-if="
        flag && errList != undefined && errList != null && errList.length > 0
      "
    >
      <el-row>
        <el-col :span="24">
          <el-tag type="warning"
            >成功导入{{ successCount }}条项目，导入失败信息见下方列表！</el-tag
          >
        </el-col>
      </el-row>
      <el-row class="tlw-row">
        <el-col :span="24">
          <el-table :data="errList" max-height="600" border>
            <el-table-column prop="xmbh" label="检查项目" width="180" />
            <el-table-column prop="name" label="检查内容" width="200" />
            <el-table-column prop="errMsg" label="错误信息" />
          </el-table>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { batchImport } from "@/tdzz/api/workflow/batchImport";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "@/common/store";
export default defineComponent({
  name: "batchImport",
  props: {
    //流程定义ID
    flowId: {
      type: String,
      default: "",
    },
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //任务ID
    taskId: {
      type: String,
      default: "",
    },
    //业务编码
    businessCode: {
      type: String,
      default: "",
    },
    //导入类型 1：全量导入 2：覆盖导入 3: 增量导入
    type: {
      type: Number,
      default: 1,
    },
    //接受上传的文件类型
    accept: {
      type: String,
      default: ".zip",
    },
    render: {
      type: Function,
    },
  },
  setup(props, context) {
    //1.定义数据
    const data = reactive({
      dialogVisible: false,
      userId: store.state.user.userId,
      successList: [],
      errList: [],
      flag: false,
      successCount: 0,
    });
    //2.定义方法

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
      if (data.flag) {
        data.flag = false;
        data.successList = [];
        data.errList = [];
        //刷新项目列表
        props.render();
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
      if (extension != "zip" && extension != "xls" && extension != "xlsx") {
        ElMessageBox.alert("请选择zip、xls、xlsx格式", "提示", {
          type: "warning",
        })
          .then()
          .catch();
        return false;
      } else if (file.size / 1024 / 1024 / 1024 > 10) {
        ElMessageBox.alert("文件大小请限制在10G内！", "提示", {
          type: "warning",
        })
          .then()
          .catch();
        return false;
      } else {
        return true;
      }
    };

    const signUploadFile = (param) => {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("userId", data.userId);
      formData.append("flowId", props.flowId);
      formData.append("flowinstid", props.flowinstid);
      formData.append("taskId", props.taskId);
      formData.append("type", props.type);
      formData.append("businessCode", props.businessCode);
      batchImport(formData).then((res) => {
        data.flag = true;
        data.errList = res.data.errList;
        data.successList = res.data.successList;
        if (data.successList != undefined && data.successList != null) {
          data.successCount = data.successList.length;
        }
        if (
          data.errList == undefined ||
          data.errList == null ||
          data.errList.length == 0
        ) {
          ElMessage.success("导入成功");
          handleClose();
        }
      });
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