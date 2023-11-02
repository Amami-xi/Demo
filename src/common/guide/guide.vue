<template></template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { getAppCode } from "@/common/api/jtap/user";

//1.定义数据
const router = useRouter();
const data = reactive({});

//2.定义方法

/**
 * 获取入口菜单列表
 */
const F_getAppCode = () => {
  getAppCode().then((res) => {
    let appCode = res.data;
    if (appCode == import.meta.env.VITE_APP_TDZZ_NAME) {
      router.push({ name: "tdzz_main" });
    } else if (appCode == import.meta.env.VITE_APP_LYSP_NAME) {
      router.push({ name: "ly_main" });
    } else {
      window.open(import.meta.env.VITE_LZZ_URL, "_self");
    }
  });
};

onMounted(() => {
  F_getAppCode();
});
</script>