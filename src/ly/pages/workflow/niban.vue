<template>
  <el-row class="ly-niban">
    <el-col :span="5" v-for="(item, index) in tableData" :key="index">
      <el-card>
        <template #header>
          <div>{{ item.businessName }}</div>
        </template>
        <svg-icon
          @click="openWorkBox(item)"
          :name="item.businessCode"
          isIconBg
        ></svg-icon>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { createFlowInstance, getNibanList } from "@/common/api/jtap/workbox";
import { onMounted } from "@vue/runtime-core";
import { getDaibanList } from "@/ly/api/workflow/workflow";
import store from "@/common/store";
import { getWwjCf } from "@/ly/api/proj/cf";
import { ElMessage } from "element-plus";
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
  getNibanList(import.meta.env.VITE_APP_LYSP_NAME).then((res) => {
    data.tableData = res.data;
  });
};

/**
 * 打开拟办
 */
const openWorkBox = (obj) => {
  if (obj.businessCode == "10140901") {
    router.push({
      name: "xmsyld_List",
      query: { flowId: obj.flowId, businessCode: obj.businessCode },
    });
  } else if (obj.businessCode == "10141001") {
    router.push({
      name: "zwjy_List",
      query: { flowId: obj.flowId, businessCode: obj.businessCode },
    });
  } else {
    if (obj.businessCode == "10140201") {
      let xzqdm = store.state.user.regionCode;
      getWwjCf(xzqdm).then((res) => {
        let actors = [];
        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            actors.push(res.data[i].actorName);
          }
          ElMessage.error(
            "当前行政区下已存在处于审批中的林木采伐流程(创建人:" +
              actors.toString() +
              ")，请待该流程完结后再发起新流程！"
          );
          return;
        } else {
          F_createFlowInstance(obj);
        }
      });
    } else {
      F_createFlowInstance(obj);
    }
  }
};

const F_createFlowInstance = (obj) => {
  //1.创建流程实例
  createFlowInstance(obj.flowId).then((res) => {
    const flowInstance = res.data;
    const currentTask = flowInstance.currentTasks[0];
    //2.打开拟办
    const newpage = router.resolve({
      name: "ly_runtime_main",
      query: {
        flowinstid: flowInstance.flowInstanceId,
        taskId: currentTask.id,
        businessCode: obj.businessCode,
        flowAction: "EDIT",
      },
    });
    window.open(newpage.href, "_blank");
  });
};
//3.入口
onMounted(() => {
  init();
});
</script>