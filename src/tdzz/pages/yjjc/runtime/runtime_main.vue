<template>
  <el-container class="tlw-container">
    <el-header class="tlw-header-flow tlw-header-flow-ly">
      <FlowButton
        :flowinstid="flowinstid"
        :taskId="taskId"
        :action="action"
        :formUrl="formUrl"
      ></FlowButton>
    </el-header>
    <el-container class="tlw-main-yjjc">
      <el-main class="tlw-main-left">
        <FwjMap :flowinstid="flowinstid"></FwjMap>
      </el-main>
      <el-main class="tlw-main-right">
        <el-card class="tlw-main-card">
          <template #header>
            <MenuFlow
              mode="horizontal"
              :menuList="menuList"
              :defaultActive="defaultActive"
              :render="openPage"
            >
            </MenuFlow>
          </template>
          <el-scrollbar class="tlw-jbxx">
            <router-view />
          </el-scrollbar>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import FlowButton from "@/common/components/workflow/jcFlowButton";
import MenuFlow from "@/common/components/menu/menuFlow";
import { getMaterialFormList } from "@/common/api/jtap/material";
import { getTask } from "@/common/api/jtap/taskHandle";
import bus from "@/common/utils/bus";
import FwjMap from "@/common/components/map/fwjMap";

//1.定义数据
const router = useRouter();
const route = useRoute();
const iframeMap = ref(null);
const params = route.query;
const data = reactive({
  menuList: [], //获取环节表单材料列表
  defaultActive: "", //默认激活菜单栏
  flowinstid: params.flowinstid, //流程实例ID
  taskId: params.taskId, //环节实例ID
  businessCode: params.businessCode, //业务编码
  tbh: params.tbh, //图斑号
  flowAction: params.flowAction, // 流程操作【待办EDIT、已办VIEW】
  action: params.action == null ? params.flowAction : params.action, //表单操作
  formUrl: "", //基本信息表单url
  entity: {},
});
const {
  businessName,
  menuList,
  defaultActive,
  flowinstid,
  taskId,
  formUrl,
  action,
  fwjUrl,
} = toRefs(data);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getMaterialFormList();
};

/**
 * 获取环节表单材料列表
 */
const F_getMaterialFormList = () => {
  getMaterialFormList(data.flowinstid, data.taskId).then((res) => {
    data.menuList = res.data;
    //默认取第一个表单
    const menu = data.menuList[0];
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
      businessCode: menu.businessCode,
      flowAction: data.flowAction,
      action: data.action == "VIEW" ? "VIEW" : menu.action,
      tbh: data.tbh,
    },
  });
};

//4.入口
onMounted(() => {
  F_init();
});
</script>