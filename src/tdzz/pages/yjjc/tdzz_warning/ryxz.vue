<template>
  <el-dialog
    v-model="dialogVisible"
    title="发送短信"
    width="60%"
    :before-close="handleClose"
  >
    <el-scrollbar>
      <el-card header="人员选择">
        <el-row justify="center">
          <el-button-group>
            <el-button
              type="primary"
              :icon="ArrowLeft"
              :disabled="previousStatus"
              @click="previousStep"
              >上一步</el-button
            >
            <el-button type="primary" :disabled="nextStatus" @click="nextStep">
              下一步<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </el-button-group>
        </el-row>
        <el-row class="tlw-row">
          <el-col :span="24">
            <el-steps :active="active" finish-status="success">
              <el-step title="县级" />
              <el-step title="镇级" />
              <el-step title="确认" />
            </el-steps>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              show-checkbox
              default-expand-all
              :default-checked-keys="defaultKeys"
            />
          </el-col>
        </el-row>
      </el-card>
      <el-card header="短信内容" v-if="data.active != 3" style="margin-top:20px">
        <el-row class="tlw-row">
          <el-col :span="24">
            <el-input
              v-model="msgData"
              maxlength="30"
              placeholder="Please input"
              show-word-limit
              type="textarea"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-scrollbar>
    <el-row justify="center" style="margin-top: 24px" v-if="active == 3">
      <el-button type="primary" round @click="confirm">确认发送</el-button>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { onMounted, nextTick, reactive, ref, toRefs } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  Edit,
  Share,
} from "@element-plus/icons-vue";
import bus from "@/common/utils/bus";
import { findByType, findDefaultKeys } from "@/tdzz/api/yjjc/yjjcJbntlxr";

//1.定义数据
const data = reactive({
  tableList: [],
  dialogVisible: false,
  active: 1,
  defaultProps: {
    id: "id",
    label: "label",
    children: "children",
    disabled: "disabled",
  },
  previousStatus: false,
  nextStatus: false,
  treeData: [],
  defaultKeys: [],
  isRouterAlive: true,
  msgData: "县级短信模板",
  params: {
    grade: "",
    xzqdm: "",
    childrenXzqdm: "",
  },
});

const {
  tableList,
  dialogVisible,
  active,
  defaultProps,
  previousStatus,
  nextStatus,
  treeData,
  defaultKeys,
  isRouterAlive,
  msgData,
  params,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {};

/**
 * 打开弹窗
 */
const handleOpen = (row) => {
  data.params.xzqdm = row.zldwdm.substring(0, 6);
  data.params.childrenXzqdm = row.zldwdm.substring(0, 9);
  data.params.grade = 1;
  findByType(data.params).then((res) => {
    data.treeData = res.data;
  });
  findDefaultKeys(data.params).then((res) => {
    data.defaultKeys = res.data;
  });
  data.dialogVisible = true;
};

/**
 * 关闭弹窗
 */
const handleClose = () => {
  data.active = 1;
  data.nextStatus = false;
  data.dialogVisible = false;
};

/**
 * 上一步
 */
const previousStep = () => {
  active.value--;
  data.nextStatus = false;
  if (data.active == 1) {
    data.params.grade = 1;
    data.previousStatus = true;
    data.msgData = "县级短信模板";
  }
  if (data.active == 2) {
    data.params.grade = 2;
  }
  findByType(data.params).then((res) => {
    data.treeData = res.data;
  });
  findDefaultKeys(data.params).then((res) => {
    data.defaultKeys = res.data;
  });
};

/**
 * 下一步
 */
const nextStep = () => {
  active.value++;
  data.previousStatus = false;
  if (data.active == 2) {
    data.params.grade = 2;
    data.msgData = "镇级短信模板";
  }
  if (data.active == 3) {
    data.params.grade = 0;
    data.nextStatus = true;
  }
  findByType(data.params).then((res) => {
    data.treeData = res.data;
  });
  findDefaultKeys(data.params).then((res) => {
    data.defaultKeys = res.data;
  });
};

/**
 * 确认发送
 */
const confirm = () => {
  handleClose();
  data.active = 1;
  data.nextStatus = false;
  bus.emit("send_refresh");
};

/**
 * 刷新组件
 */
const reload = () => {
  data.isRouterAlive = false;
  nextTick(function () {
    data.isRouterAlive = true;
  });
};

defineExpose({ handleOpen });
</script>