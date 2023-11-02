<template>
  <div class="tlw-niban">
    <el-card
      v-for="(val, key, index) in tableData"
      :key="index"
      class="tlw-card-block"
    >
      <template #header>
        <div class="tlw-table-title">{{ key }}</div>
      </template>
      <el-row>
        <el-col v-for="(obj, index) in val" :key="index" :span="4">
          <svg-icon
            @click="open(obj)"
            :name="obj.businessCode"
            :title="obj.businessName"
            titleSeat="down"
            isIconBg
          >
          </svg-icon>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { createFlowInstance } from "@/common/api/jtap/workbox";
import { getNibanList } from "@/tdzz/api/workflow/workflow";

//1.定义数据
const data = reactive({
  tableData: [],
});
const { tableData } = toRefs(data);

//2.定义方法

const router = useRouter(); //获取路由

/**
 * 获取拟办列表
 */
const init = () => {
  getNibanList(import.meta.env.VITE_APP_TDZZ_NAME).then((res) => {
    data.tableData = res.data;
  });
};

/**
 * 打开批次列表页面
 */
const open = (obj) => {
  let businessCode = obj.businessCode;
  if (
    businessCode == "10130801" ||
    businessCode == "10130601" ||
    businessCode == "10130901" ||
    businessCode == "10130501"
  ) {
    openWorkBox(obj);
  } else {
    F_openPcList(obj);
  }
};

/**
 * 打开拟办（）
 */
const openWorkBox = (obj) => {
  //1.创建流程实例
  createFlowInstance(obj.flowId).then((res) => {
    const flowInstance = res.data;
    const currentTask = flowInstance.currentTasks[0];
    //2.打开拟办
    const newpage = router.resolve({
      name: "tdzz_runtime_main",
      query: {
        flowinstid: flowInstance.flowInstanceId,
        taskId: currentTask.id,
        buisnessId: obj.buisnessId,
        businessCode: obj.businessCode,
        businessName: obj.businessName,
        flowId: obj.flowId,
        action: "EDIT",
      },
    });
    window.open(newpage.href, "_blank");
  });
};

/**
 * 打开批次列表（占补平衡、旱改水、增减挂钩、工矿废弃地、进出平衡）
 */
const F_openPcList = (obj) => {
  router.push({
    name: "tdzz_xmlr_pcList",
    query: { flowId: obj.flowId, businessCode: obj.businessCode },
  });
};

//3.入口
onMounted(() => {
  init();
});
</script>