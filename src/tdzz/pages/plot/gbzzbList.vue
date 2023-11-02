<!-- 高标准坐标 -->
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
  guid,
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