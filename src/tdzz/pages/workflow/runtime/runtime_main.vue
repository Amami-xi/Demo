<template>
  <el-container class="tlw-container">
    <el-header class="tlw-header-flow">
      <FlowButton
        :flowinstid="flowinstid"
        :taskId="taskId"
        :formUrl="formUrl"
        :code="code"
        :currentUrl="defaultActive"
        :businessCode="businessCode"
        :catalog="catalog"
        :action="flowAction"
        :materialType="materialType"
        :jbxxSec="jbxxSec"
        ref="flowButton"
      ></FlowButton>
      <Steps
        :stepList="stepList"
        @stepChange="stepChange"
        :isActive="catalog"
      ></Steps>
    </el-header>
    <el-container class="tlw-main">
      <el-aside class="tlw-main-left" v-if="catalog != '后期管护'">
        <MenuFlow
          :menuTitle="catalog"
          :menuList="menuList"
          :defaultActive="defaultActive"
          :render="openPage"
        >
        </MenuFlow>
      </el-aside>
      <el-main class="tlw-main-right">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { nextTick, onMounted } from "@vue/runtime-core";
import FlowButton from "@/common/components/workflow/flowButton";
import Steps from "@/common/components/steps/index";
import MenuFlow from "@/common/components/menu/menuFlow";
import { getMaterialFormMap } from "@/common/api/jtap/material";
import { getTask } from "@/common/api/jtap/taskHandle";
import bus from "@/common/utils/bus";

//1.定义数据
const router = useRouter();
const route = useRoute();
const params = route.query;
const flowButton = ref(null);
const data = reactive({
  flowinstid: params.flowinstid, //流程实例ID
  taskId: params.taskId, //环节实例ID
  stepIdentity: params.stepIdentity, //环节编码
  businessCode: params.businessCode, //业务编码
  businessName: params.businessName, //业务名称
  flowAction: params.flowAction, // 流程操作【待办EDIT、已办VIEW】
  action: params.action == null ? params.flowAction : params.action, //表单操作
  catalog: params.catalog, //当前阶段 value: 立项阶段，实施阶段，验收阶段
  materialType: params.materialType, //环节材料类型 【批次材料、项目材料】
  jbxxSec: params.jbxxSec, //项目主键
  materialFormList: {}, //获取环节表单材料列表
  menuList: [], //当前菜单列表
  openMenu: {}, //当前激活菜单
  stepList: {}, //环节阶段列表
  defaultActive: "", //默认激活菜单栏
  formUrl: "", //基本信息表单url
  code: "",
});
const {
  materialFormList,
  menuList,
  stepList,
  defaultActive,
  materialType,
  flowinstid,
  taskId,
  businessCode,
  catalog,
  flowAction,
  action,
  formUrl,
  code,
  jbxxSec,
} = toRefs(data);

//2.定义方法

/**
 * 获取环节表单材料列表
 */
const F_getMaterialFormList = () => {
  getMaterialFormMap(
    data.flowinstid,
    data.taskId,
    data.businessCode,
    data.materialType,
    data.jbxxSec,
  ).then((res) => {
    data.materialFormList = new Map(Object.entries(res.data));
    data.stepList = res.data;
    getCurrentMenuList();
  });
};

/**
 * 切换阶段
 * @param {string} val
 */
const stepChange = (val) => {
  if (data.catalog != val) {
    data.catalog = val;
    if (data.catalog == "后期管护") {
      const menu = data.materialFormList.get(data.catalog);
      router.replace({
        name: "tdzz_hqgh",
        query: {
          materialType: data.materialType,
          flowinstid: menu[0].flowinstid,
          taskId: menu[0].taskId,
          businessCode: data.businessCode,
          businessName: data.businessName,
          action: data.action == "VIEW" ? "VIEW" : menu.action,
          catalog: data.catalog,
          jbxxSec: data.jbxxSec,
        },
      });
    } else {
      getCurrentMenuList();
    }
  }
};

/**
 * 获取当前激活阶段菜单信息
 *
 * @param {string}
 */
const getCurrentMenuList = () => {
  //未获取到项目阶段待办是拟办进入
  if (data.catalog == undefined) {
    data.catalog = data.materialFormList.keys().next().value;
  }
  data.menuList = data.materialFormList.get(data.catalog);
  //默认取第一个表单
  data.openMenu = data.menuList[0];
  data.formUrl = data.openMenu.formUrl;
  page(data.openMenu);
};

/**
 * 切换菜单
 *
 * @param {object} menu 菜单
 */
const openPage = (menu) => {
  if (data.action == "EDIT" && F_sfForm()) {
    data.openMenu = menu;
    flowButton.value.saveCallBack = openPageCallback;
    flowButton.value.F_btnSave();
  } else {
    page(menu);
  }
};

/**
 * 当前激活页面是否是基本信息表
 */
const F_sfForm = () => {
  if (
    data.defaultActive.indexOf("_sbxx") > -1 ||
    data.defaultActive.indexOf("_lxxx") > -1 ||
    data.defaultActive.indexOf("_ssxx") > -1 ||
    data.defaultActive.indexOf("_ysxx") > -1
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * 切换菜单前保存回调
 *
 * @param {Boolean} val
 */
const openPageCallback = (val) => {
  let currentActive = data.defaultActive;
  data.defaultActive = data.openMenu.formUrl;
  if (val) {
    page(data.openMenu);
  } else {
    nextTick(() => {
      data.defaultActive = currentActive;
    });
  }
};

/**
 * 打开页面
 *
 * @param {object} menu 菜单
 */
const page = (menu) => {
  if (flowButton.value.saveCallBack) {
    flowButton.value.saveCallBack = () => {};
  }
  data.defaultActive = menu.formUrl;
  data.flowinstid = menu.flowinstid;
  data.taskId = menu.taskId;
  data.stepIdentity = menu.stepIdentity,
  data.businessCode = menu.businessCode;
  data.businessName = menu.businessName;
  data.action = data.flowAction == "VIEW" ? "VIEW" : menu.action;
  data.code = menu.code;
  router.replace({
    name: menu.formUrl,
    query: {
      materialType: data.materialType,
      flowinstid: data.flowinstid,
      taskId: data.taskId,
      stepIdentity: data.stepIdentity,
      businessCode: data.businessCode,
      businessName: data.businessName,
      flowAction: data.flowAction,
      action: data.action,
      catalog: data.catalog,
      code: data.code,
      name: menu.name,
      jbxxSec: data.jbxxSec,
    },
  });
};

//4.入口
onMounted(() => {
  F_getMaterialFormList();
});
</script>