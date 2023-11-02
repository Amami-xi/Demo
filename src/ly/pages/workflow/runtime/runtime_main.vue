<template>
  <el-container class="tlw-container">
    <el-header class="tlw-header-flow tlw-header-flow-ly">
      <FlowButton
        :flowinstid="flowinstid"
        :taskId="taskId"
        :action="flowAction"
        :businessCode="businessCode"
        :formUrl="formUrl"
      ></FlowButton>
    </el-header>
    <el-container class="tlw-main">
      <el-main class="tlw-main-right">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import FlowButton from "@/common/components/workflow/lyFlowButton";
import Menu from "@/common/components/menu/menu";
import { getMaterialFormList } from "@/common/api/jtap/material";
import { getTask } from "@/common/api/jtap/taskHandle";
import bus from "@/common/utils/bus";

//1.定义数据
const router = useRouter();
const route = useRoute();
const params = route.query;
const data = reactive({
  materialFormList: {}, //获取环节表单材料列表
  defaultActive: "", //默认激活菜单栏
  flowinstid: params.flowinstid, //流程实例ID
  taskId: params.taskId, //环节实例ID
  businessCode: params.businessCode, //业务编码
  businessName: params.businessName, //业务名称
  currentStepName: params.currentStepName, //当前环节名称
  flowAction: params.flowAction, // 流程操作【待办EDIT、已办VIEW】
  action: params.action == null ? params.flowAction : params.action, //表单操作
  formUrl: "", //基本信息表单url
});
const {
  materialFormList,
  defaultActive,
  flowinstid,
  taskId,
  flowAction,
  businessCode,
  action,
  formUrl,
} = toRefs(data);

//2.定义方法

/**
 * 获取环节表单材料列表
 */
const F_getMaterialFormList = () => {
  getMaterialFormList(data.flowinstid, data.taskId).then((res) => {
    data.materialFormList = res.data;
    //默认取第一个表单
    const menu = data.materialFormList[0];
    data.formUrl = menu.formUrl;
    openPage(menu);
  });
};

/**
 * 打开页面
 *
 * @param {object} menu 菜单
 */
const openPage = (menu) => {
  data.defaultActive = menu.formUrl;
  router.replace({
    name: data.defaultActive,
    query: {
      flowinstid: data.flowinstid,
      taskId: data.taskId,
      flowAction: data.flowAction,
      businessCode: data.businessCode,
      action: data.flowAction == "VIEW" ? "VIEW" : menu.action,
    },
  });
};

//4.入口
onMounted(() => {
  F_getMaterialFormList();
});
</script>