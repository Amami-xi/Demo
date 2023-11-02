<template>
  <panel title="照片信息">
    <ImageUpload
      :flowinstid="flowinstid"
      :referenceId="referenceId"
      catalog="1"
      :taskId="taskId"
      :disabled="disabled"
      :render="render"
    ></ImageUpload>
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
import ImageUpload from "@/common/components/attach/upload/moreImageUpload";
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
  action: params.action,
  disabled: true,
  referenceId: params.tbh,
});
const { flowinstid, taskId, disabled, referenceId } = toRefs(data);
//2.定义方法

/**
 * 初始化
 */

const render = (file) => {
  router.push({
    name: "zpDetail",
    query: {
      flowinstid: data.flowinstid,
      taskId: data.taskId,
      businessCode: data.businessCode,
      flowAction: data.flowAction,
      action: data.action,
      tbh: params.tbh,
      attachId: file.id,
    },
  });
};

//3.入口
onMounted(() => {});

//4.销毁监听事件
onBeforeUnmount(() => {});
</script>