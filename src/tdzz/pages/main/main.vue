<template>
  <el-container class="tlw-container">
    <el-header class="tlw-header">
      <div class="tlw-header-top">
        <div class="tlw-header-logo">
          <div class="logo-cn">
            南通市自然资源和规划局土地整治及林业资源管理系统<span
              >土地整治</span
            >
          </div>
          <div class="logo-en">
            Land Consolidation and Forestry Resource Management system of
            Nantong Natural Resources and Planning Bureau
          </div>
        </div>
        <UserInfo></UserInfo>
      </div>
      <Menu
        class="tlw-header-menu"
        :menuList="menuList"
        :defaultActive="defaultActive"
        :render="render"
      ></Menu>
    </el-header>
    <router-view />
  </el-container>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import Menu from "@/common/components/menu/menu";
import { getTopMenuList } from "@/common/api/jtap/menu";
import UserInfo from "@/common/components/user/index";

//1.定义数据
const router = useRouter();
const route = useRoute();
const params = route.query;
const data = reactive({
  menuList: [], //菜单列表
  defaultActive: params.menuValue, //需要激活的菜单路由
});

const { menuList, defaultActive } = toRefs(data);

//2.定义方法

/**
 * 获取菜单列表
 */
const F_getTopMenuList = () => {
  getTopMenuList(import.meta.env.VITE_APP_TDZZ_NAME).then((res) => {
    //1.获取菜单列表
    data.menuList = res.data;
    //2.菜单激活
    render(data.menuList[0]);
  });
};

/**
 * 菜单点击事件回调
 */
const render = (val) => {
  if (data.defaultActive != val.menuValue) {
    localStorage.setItem("activeTopMenuId", val.menuId);
    localStorage.setItem("activeTopMenuName", val.menuName);
    data.defaultActive = val.menuValue;
    router.push({
      name: data.defaultActive,
      query: { menuId: val.menuId, menuName: val.menuName },
    });
  }
};

//3.入口
onMounted(() => {
  F_getTopMenuList();
});
</script>