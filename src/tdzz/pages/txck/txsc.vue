<template>
  <el-container class="tlw-main">
    <el-main class="tlw-main-right">
      <iframe class="txsc" ref="iframe"  :src="txscUrl"></iframe>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive, toRefs,ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { nextTick, onMounted } from "@vue/runtime-core";
import store from "@/common/store";
import { ElLoading, ElMessage } from "element-plus";
// import SecurityService from '@/common/security/SecurityService';


//1.定义数据
const router = useRouter();
const route = useRoute();
const params = route.query;
const data = reactive({
  txscUrl: import.meta.env.VITE_TXSC_URL, //看所有
});
const iframe = ref(null);

const { txscUrl } = toRefs(data);

//3.入口
onMounted(() => {
  let loading = ElLoading.service({
    lock: true,
    text: "数据加载中",
    background: "rgba(255, 255, 255, 0.5)",
  });
  // let mgr = new SecurityService();  
  // mgr.getAccessToken().then((value) => { 
  //   data.txscUrl = import.meta.env.VITE_TXSC_URL+"?access_token="+value+"&token_type=bearer";
  // });
  setTimeout(() => {
    loading.close();
  }, 3000);
});
</script>
<style lang="scss" scoped>
.el-main {
  padding: 0;

  .txsc {
    border: none;
    width: 100%;
    height: 100%;

    .content-nav {
      background: red !important;
    }
  }
}
</style>