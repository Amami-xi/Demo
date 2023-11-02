<template>
  <el-container class="tlw-main">
    <el-aside class="tlw-main-left">
      <MenuTree
        :menuList="menuList"
        :defaultActive="defaultActive"
        :render="render"
        :menuTitle="parentMenuName"
      ></MenuTree>
    </el-aside>
    <el-main class="tlw-main-right">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import store from "@/common/store";
import MenuTree from "@/common/components/menu/menuTree";
import { getChildMenuList } from "@/common/api/jtap/menu";
import { getDistrictList } from "@/common/api/jtap/district";

//1.定义数据
const router = useRouter();
const route = useRoute();
const params = route.query;
const data = reactive({
  parentMenuId: params.menuId || localStorage.getItem("activeTopMenuId"), //父级菜单ID
  parentMenuName: params.menuName || localStorage.getItem("activeTopMenuName"),//父级菜单名称
  menuList: [], //左侧菜单列表
  defaultActive: "", //激活左侧菜单
});

const { parentMenuName, menuList, defaultActive} = toRefs(data);

//2.定义方法

/**
 * 获取菜单列表
 */
const F_getMenuList = () => {
  getChildMenuList(import.meta.env.VITE_APP_LYSP_NAME, data.parentMenuId).then(
    (res) => {
      //1.获取菜单列表
      data.menuList = res.data;
    }
  );
};

/**
 * 菜单点击事件回调
 */
const render = (val) => {
  if (data.defaultActive != val.menuValue) {
    data.defaultActive = val.menuValue;
    router.push({ name: data.defaultActive });
  }
};

//3.入口
onMounted(() => {
  F_getMenuList();
});
</script>