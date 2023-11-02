<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：系统管理 > 用户管理"></svg-icon>
    </el-col>
  </el-row>
  <userList :appCode="appCode"></userList>
</template>
    
<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "@/common/store";
import userList from "@/common/components/user/userList";

//1.定义数据
const data = reactive({
  appCode: import.meta.env.VITE_APP_TDZZ_NAME,
});

const {appCode} = toRefs(data);


//3.入口
onMounted(() => {
});
</script>