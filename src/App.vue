<template>
  <el-config-provider :locale="locale">
    <router-view v-if="isRouterActive" />
  </el-config-provider>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SecurityService from "./common/security/SecurityService";
import { useStore } from "vuex";
import { ref, provide, nextTick, reactive, onMounted, toRefs } from "vue";
//中文包
import zhCn from "element-plus/es/locale/lang/zh-cn";

//1.定义数据
const store = useStore();
const securityService = new SecurityService();
const isRouterActive = ref(true);
const data = reactive({
  locale: zhCn,
});

const { locale } = toRefs(data);

/**
 * 页面刷新
 */
provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});

/**
 * 登录校验
 */
const init = () => {
  securityService.getSignedIn().then(
    (res) => {
      if (res.user) {
        store.commit("setUser", res.user);
      }
    },
    (err) => {
      throw err;
    }
  );
};

//入口
onMounted(() => {
  init();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5faff;
}
</style>
