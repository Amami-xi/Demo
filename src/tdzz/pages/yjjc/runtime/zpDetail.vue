<template>
  <el-card class="tlw-card-zp zpDetail" shadow="never">
    <template #header>
      <el-button @click="F_back" type="primary" size="small">
        <el-icon class="el-icon--left"> <Back /> </el-icon>返回
      </el-button>
    </template>
    <ImageDetail
      :flowinst="flowinstid"
      :referenceId="tbh"
      :attachId="attachId"
      catalog="1"
    ></ImageDetail>
  </el-card>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import store from "@/common/store";
import { Back } from "@element-plus/icons-vue";
import ImageDetail from "@/common/components/attach/preview/imageDetail";

//1. 定义数据
//定义路由
const router = useRouter();
const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid, //流程实例ID
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  tbh: params.tbh,
  attachId: params.attachId,
});
const { flowinstid, tbh, disabled, attachId } = toRefs(data);
//2.定义方法

/**
 * 初始化
 */
const F_init = () => {};

/**
 * 返回
 */
const F_back = () => {
  router.back();
};

//3.入口
onMounted(() => {});
</script>