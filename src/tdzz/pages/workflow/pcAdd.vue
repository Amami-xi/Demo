<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title + '批次'"
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
        <el-col :span="6" :offset="4">
          <el-form-item label="申请文件号" prop="pcNo" :rules="rules.pcNo">
            <el-input v-model="entity.pcNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="申请文件名称"
            prop="pcName"
            :rules="rules.pcName"
          >
            <el-input v-model="entity.pcName"></el-input>
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
  title: "",
  dialogVisible: false,
  flowinstid: "",
  entity: {},
  oldEntity: {},
  disabled: false,
  rules: getRules(),
});
const { title, dialogVisible, entity, disabled, rules } = toRefs(data);

//2.定义方法

/**
 * 关闭弹窗
 */
const handleClose = () => {
  data.dialogVisible = false;
  data.entity = {};
};

/**
 * 打开弹窗-添加
 */
const F_ADD = (flowId, businessCode) => {
  data.title = "添加";
  data.entity.flowId = flowId;
  data.entity.businessCode = businessCode;
  data.dialogVisible = true;
};

/**
 * 打开弹窗-添加
 */
const F_UPDATE = (flowinstid) => {
  data.title = "编辑";
  data.flowinstid = flowinstid;
  F_getDetail();
  data.dialogVisible = true;
};

/**
 * 获取详情
 */
const F_getDetail = () => {
  getDetail(data.flowinstid).then((res) => {
    data.entity = res.data;
    data.oldEntity.pcNo = res.data.pcNo;
    data.oldEntity.pcName = res.data.pcName;
  });
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await pcform.value.validate((valid) => {
    flag = valid;
  });
  return flag;
};

/**
 * 保存
 */
const F_save = async () => {
  let flag = await F_beforeSave();
  if (flag) {
    await saveOrUpdate(data.entity)
      .then((res) => {
        data.entity = res.data;
        emit("refresh");
        ElMessage.success(res.msg);
        handleClose();
      })
      .catch((res) => {});
  }
};

/**
 * 删除
 */
const F_delete = () => {};

//3.监听
watch(
  [() => data.entity.pcNo, () => data.entity.pcName],
  (newValue, oldVlaue) => {
    if (
      newValue[0] == data.oldEntity.pcNo &&
      newValue[1] == data.oldEntity.pcName
    ) {
      data.disabled = true;
    } else {
      data.disabled = false;
    }
  },
  { deep: true }
);

const emit = defineEmits(["refresh"]);
defineExpose({ F_ADD, F_UPDATE });
</script>