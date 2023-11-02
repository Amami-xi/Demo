<template>
  <panel title="附件信息">
    <AttachUpload
      :flowinstid="flowinstid"
      :referenceId="referenceId"
      catalog="2"
      :disabled="disabled"
    ></AttachUpload>
  </panel>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { getRules } from "@/tdzz/verification/yjjcGdlc";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import store from "@/common/store";
import { Plus, Minus } from "@element-plus/icons-vue";
import AttachUpload from "@/common/components/attach/upload/moreAttachUpload";
import { gdlcDetail } from "@/tdzz/api/yjjc/workflow";

//1. 定义数据
//定义路由
const router = useRouter();
const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid, //流程实例ID
  taskId: params.taskId, //环节实例ID
  businessCode: params.businessCode, //业务编码
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  referenceId: params.tbh,
});
const { flowinstid, taskId, disabled, referenceId } = toRefs(data);
//2.定义方法

/**
 * 初始化
 */

//3.入口
onMounted(() => {});

//4.销毁监听事件
onBeforeUnmount(() => {});
</script>