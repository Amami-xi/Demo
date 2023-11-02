<!-- 新增耕地坐标 -->
<template>
  <PlotList
    :flowinstid="flowinstid"
    :stepIdentity="stepIdentity"
    :businessName="businessName"
    :businessCode="businessCode"
    :catalog="catalog"
    :disabled="disabled"
    :flowAction="flowAction"
    :pType="code"
    :name="name"
  >
    <template #plot>
      <!-- <el-table-column
        label="地类"
        prop="landtype"
        width="120"
      ></el-table-column> -->
      <!-- <el-table-column
        label="图斑类型"
        prop="patchtype"
        width="120"
      ></el-table-column>
      <el-table-column
        label="耕地质量等别"
        prop="avggrade1"
        width="120"
      ></el-table-column> -->
    </template>
  </PlotList>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import PlotList from "@/common/components/plot/plotList";
//1.定义数据
const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.jbxxSec ? params.jbxxSec : params.flowinstid,
  stepIdentity: params.stepIdentity,
  businessName: params.businessName,
  businessCode: params.businessCode,
  catalog: params.catalog,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  code: params.code,
  name: params.name,
});
const {
  flowinstid,
  stepIdentity,
  businessName,
  businessCode,
  catalog,
  disabled,
  flowAction,
  code,
  name,
} = toRefs(data);

//2.定义方法

//3.入口
onMounted(() => {});
</script>