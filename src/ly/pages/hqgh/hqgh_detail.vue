<template>
  <el-dialog
    v-model="dialogVisible"
    title="后期管护"
    width="60%"
    :before-close="handleClose"
    class="tlw-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <el-scrollbar>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="F_save"> 保存 </el-button>
        </el-col>
      </el-row>
      <el-form
        class="tlw-form"
        :model="entity"
        :rules="rules"
        ref="ghform"
        label-width="auto"
        :inline-message="true"
      >
        <panel title="基本信息">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="信息填报人">
                <el-input v-model="entity.userName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="审批情况" prop="spqk" :rules="rules.spqk">
                <el-input
                  v-model="entity.spqk"
                  type="textarea"
                  placeholder="内容限制在300个汉字/600个英文字符内"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="完成情况" prop="wcqk" :rules="rules.wcqk">
                <el-input
                  type="textarea"
                  placeholder="内容限制在300个汉字/600个英文字符内"
                  v-model="entity.wcqk"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </panel>
        <panel
          title="上传附件"
          v-if="entity.hqSec"
        >
          <AttachUpload
            :flowinstid="entity.hqSec"
            :disabled="disabled"
          ></AttachUpload>
        </panel>
      </el-form>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { getRules } from "@/ly/verification/lyHqgh";
import { ElMessage } from "element-plus";
import { getDetail, saveOrUpdate } from "@/ly/api/proj/proj-hqgh";
import store from "@/common/store";
import AttachUpload from "@/common/components/attach/upload/moreAttachUpload";

//1. 定义数据
const ghform = ref(null);
const data = reactive({
  dialogVisible: false,
  guid: "",
  user: store.state.user,
  entity: {
    hqSec: "",
  },
  disabled: false,
  rules: getRules(),
  showFj: false,
  sfRefresh: false,
});
const { dialogVisible, guid, entity, disabled, rules, showFj } = toRefs(data);

//2.定义方法

/**
 * 关闭弹窗
 */
const handleClose = () => {
  data.dialogVisible = false;
  data.entity = {};
  if (data.sfRefresh) {
    emit("refresh");
  }
};

/**
 * 打开弹窗-添加
 */
const F_ADD = (val) => {
  data.dialogVisible = true;
  data.guid = val.guid;
  data.entity.guid = val.guid;
  data.entity.userName = data.user.userName;
};

/**
 * 打开弹窗-编辑
 */
const F_UPDATE = (val) => {
  data.dialogVisible = true;
  data.guid = val.guid;
  data.entity.hqSec = val.hqSec;
  F_getDetail();
};

/**
 * 获取详情
 */
const F_getDetail = () => {
  getDetail(data.entity.hqSec).then((res) => {
    data.entity = res.data;
  });
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await ghform.value.validate((valid) => {
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
        ElMessage.success(res.msg);
        data.sfRefresh = true;
      })
      .catch((res) => {});
  }
};

const emit = defineEmits(["refresh"]);
defineExpose({ F_ADD, F_UPDATE });
</script>