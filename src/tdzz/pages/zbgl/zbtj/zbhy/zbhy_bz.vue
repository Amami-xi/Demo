<template>
  <el-dialog
    v-model="dialogVisible"
    title="驳回原因"
    width="60%"
    :before-close="handleClose"
  >
    <el-form
      class="tlw-form"
      :model="entity"
      :rules="rules"
      ref="pcform"
      label-width="auto"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" >
            <el-input type="textarea" v-model="remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="F_save" :disabled="disabled"
          >确认{{ title }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
import { ref, reactive, toRefs } from "@vue/reactivity";
import { getRules } from "@/tdzz/verification/tdzzPc";
import { ElMessage } from "element-plus";
import { getCurrentInstance, watch } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { getDetail, saveOrUpdate } from "@/tdzz/api/proj/proj-pcb";
import store from "@/common/store";

//1. 定义数据
const currentInstance = getCurrentInstance();
const pcform = ref(null);
const data = reactive({
  dialogVisible: false,
  remark: "",
});
const { dialogVisible, remark, row } = toRefs(data);

//2.定义方法

/**
 * 关闭弹窗
 */
const handleClose = () => {
  data.dialogVisible = false;
  data.remark = "";
};

/**
 * 打开弹窗-添加
 */
const handleOpen = (row) => {
  data.dialogVisible = true;
};


/**
 * 保存
 */
const F_save = async () => {
  emit("handleOk", data.remark);
  handleClose();
};

const emit = defineEmits(["handleOk"]);
defineExpose({ handleOpen });
</script>