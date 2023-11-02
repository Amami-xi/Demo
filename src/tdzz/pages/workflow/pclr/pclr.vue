<template>
  <div class="tlw-niban">
    <el-card
      v-for="(val, key, index) in tableData"
      :key="index"
      class="tlw-card-block"
      v-show="key != '其他流程'"
    >
      <template #header>
        <div class="tlw-table-title">{{ key }}</div>
      </template>
      <el-row>
        <el-col v-for="(obj, index) in val" :key="index" :span="4">
          <svg-icon
            @click="openPcsb(obj)"
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
import { getNibanList } from "@/tdzz/api/workflow/workflow";
import panel from "@/common/components/card/cardPanel";

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
const openPcsb = (obj) => {
  router.push({
    name: "tdzz_pclr_pcList",
    query: { flowId: obj.flowId, businessCode: obj.businessCode },
  });
};

//3.入口
onMounted(() => {
  init();
});
</script>