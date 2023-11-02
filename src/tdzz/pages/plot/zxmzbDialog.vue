<template>
  <el-dialog
    v-model="dialogVisible"
    :title="zxmmc+'项目坐标信息'"
    :before-close="handleClose"
    fullscreen
  >
    <el-row class="tlw-title">
      <el-col :span="24">{{zxmmc}}项目坐标信息</el-col>
    </el-row>
    <PlotList
      :flowinstid="zxmSec"
      :businessCode="businessCode"
      :pType="pType"
      :disabled="disabled"
      v-if="show"
    >
      <template #plot> </template>
    </PlotList>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { useRoute } from "vue-router";
import PlotList from "@/common/components/plot/plotList";

export default defineComponent({
  name: "zxmzbDialog",
  components: { PlotList },
  props: {
    //坐标类型
    pType: {
      type: String,
      default: "",
    },
    //操作
    disabled: {
      type: Boolean,
      default: "",
    },
  },
  setup(props, ctx) {
    //1.定义数据
    const route = useRoute();
    const params = route.query;
    const data = reactive({
      dialogVisible: false,
      zxmSec: null,
      zxmmc: null,
      businessCode: params.businessCode,
      businessName: params.businessName,
      catalog: params.catalog,
      pType: props.pType,
      show: true,
    });
    const { zxmSec, zxmmc, businessCode, businessName, catalog , pType, show } =
      toRefs(data);
    //2.定义方法
    /**
     * 打开弹窗
     */
    const handleOpen = (zxmSec, zxmmc) => {
      data.show = true;
      data.zxmSec = zxmSec;
      data.zxmmc = zxmmc,
      data.dialogVisible = true;
      //获取下一环节路由信息
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.show = false;
      data.dialogVisible = false;
    };

    //3.入口
    onMounted(() => {});
    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
    };
  },
});
</script>