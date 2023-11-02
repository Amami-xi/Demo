<template>
  <ul class="tlw-steps">
    <li
      v-for="(val, key, index) of stepList"
      :key="index"
      class="tlw-step"
      :class="{
        'is-active': isActive == key,
        'is-no': val == null,
      }"
    >
      <svg-icon
        :name="key"
        :title="key == '后期管护' ? key : key.substring(0, 2)"
        titleSeat="right"
        size="1.25rem"
        isIconBg
        @click="val == null ? '' : stepChange(key)"
      ></svg-icon>
      <div
        class="step-divider"
        v-if="index >= 0 && index < Object.values(stepList).length - 1"
      ></div>
      <el-icon
        size="0.625rem"
        class="step-arrow"
        v-if="index >= 0 && index < Object.values(stepList).length - 1"
      >
        <CaretRight />
      </el-icon>
    </li>
  </ul>
</template>
 
<script>
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";
import { CaretRight } from "@element-plus/icons-vue";
export default defineComponent({
  name: "Steps",
  components: { CaretRight },
  props: {
    mode: {
      type: String,
      default: "horizontal",
    },
    stepList: {
      type: Object,
      default: {},
    },
    width: {
      type: String,
      default: "2.0625rem",
    },
    height: {
      type: String,
      default: "22px",
    },
    isActive: {
      type: String,
      default: "",
    },
    render: {
      type: Function,
    },
  },
  emits: ["stepChange"],
  setup(props, ctx) {
    //1.定义数据
    const iconBg = ref();
    const data = reactive({});

    //2.定义方法
    const stepChange = (key) => {
      ctx.emit("stepChange", key);
    };

    return { ...toRefs(data), stepChange };
  },
});
</script>
<style lang="scss" scoped>
.tlw-steps {
  height: var(--flow-header-menu-height);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: $themeColor-header-flow;
  border-bottom: 0.0625rem solid $divider-color;

  .tlw-step {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: $themeColor;
    margin-left: 0.9375rem;

    .step-divider {
      width: 10rem;
      height: 0.0625rem;
      background: $themeColor;
      margin-left: 0.5rem;
    }

    .step-arrow {
      margin-left: -0.25rem;
      margin-right: 0.25rem;
    }
  }
  .is-active {
    color: $themeColor-hover;
    font-weight: bold;
    ::v-deep(.icon-bg-true) {
      background: $themeBg-hover;
    }
  }
  .is-no {
    color: rgba($themeColor, 0.5);
    ::v-deep(.icon-bg-true) {
      background: rgba($themeColor, 0.5);
    }
  }
}
</style>