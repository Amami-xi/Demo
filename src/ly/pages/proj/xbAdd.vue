<template>
  <el-dialog
    v-model="dialogVisible"
    title="小班详情"
    :before-close="handleClose"
  >
    <el-form
      class="tlw-form-xb"
      ref="xbform"
      label-width="auto"
      :model="entity"
      :inline-message="true"
      :rules="rules"
    >
      <el-row>
        <el-col colspan="12" :offset="2">
          <el-button
            class="xb-add"
            type="primary"
            @click="F_Add"
            v-if="disabled == false"
            >添加</el-button
          >
        </el-col>
      </el-row>
      <template v-for="(item, index) in entity.xbList" :key="index">
        <el-row>
          <el-col :span="4" :offset="1">
            <el-form-item
              :prop="`xbList.${index}.zhen`"
              :rules="rules.requiredChange"
            >
              <el-select
                v-model="item.zhen"
                :disabled="disabled"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  :label="itemdict.name"
                  :value="itemdict.code"
                  v-for="(itemdict, index) in districtOptions"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item
              :prop="`xbList.${index}.country`"
              :rules="rules.requiredField"
            >
              <el-input v-model="item.country" :disabled="disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <span>村</span>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button
              v-if="index > 0 && disabled == false"
              type="danger"
              @click="F_delete(index)"
              >删除</el-button
            >
          </el-col>
        </el-row>
        <el-divider v-if="index < entity.xbList.length - 1" />
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="F_save" :disabled="disabled"
          >确认保存</el-button
        >
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { getCurrentInstance, watch } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import store from "@/common/store";
import { getZhen } from "@/common/api/jtap/district";

//1. 定义数据
const currentInstance = getCurrentInstance();
const xbform = ref(null);
const data = reactive({
  dialogVisible: false,
  districtOptions: [],
  xzqdm: "",
  guid: "",
  entity: {
    xbList: [],
  },

  disabled: false,
  rules: {
    requiredChange: [
      { required: true, message: "请选择镇！", trigger: "change" },
    ],
    requiredField: [
      { required: true, message: "请填写村内容！", trigger: "blur" },
    ],
  },
});
const { dialogVisible, xzqdm, districtOptions, guid, entity, disabled, rules } =
  toRefs(data);

//2.定义方法

/**
 * 获取行政区列表
 */
const F_getDistrictListXb = (xzqdm) => {
  data.xzqdm = xzqdm;
  getZhen(data.xzqdm).then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 打开弹窗-添加
 */
const F_Init = (list, disabled) => {
  data.disabled = disabled;
  data.dialogVisible = true;
  if (
    list == null ||
    list == undefined ||
    (list.length == 0 && !data.disabled)
  ) {
    data.entity.xbList = [{}];
  } else {
    data.entity.xbList = list;
  }
};

/**
 * 添加
 */
const F_Add = () => {
  data.entity.xbList.push({});
};

/**
 * 删除
 */
const F_delete = (index) => {
  data.entity.xbList.splice(index, 1);
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空

  await xbform.value.validate((valid) => {
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
    emit("refreshXb", data.entity.xbList);
    handleClose();
  } else {
    ElMessage.error("表单验证不通过！请检查填写内容！");
  }
};

/**
 * 关闭弹窗
 */
const handleClose = () => {
  data.dialogVisible = false;
  data.entity.xbList = {};
};

const emit = defineEmits(["refreshXb"]);
defineExpose({
  F_getDistrictListXb,
  F_Init,
  F_getDistrictListXb,
  F_Add,
  F_delete,
  F_save,
});
</script>
<style>
.tlw-form-xb {
  padding: 0 50px;
  box-sizing: border-box;
}
.xb-add {
  margin-left: -20px;
  margin-bottom: 20px;
}
</style>