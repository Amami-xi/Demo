<template>
  <el-card shadow="never" class="tlw-cardPanel">
    <template #header>
      <div class="title">
        {{ title }}
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "cardPanel",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.tlw-cardPanel {
  border: none;
  ::v-deep(.el-card__header) {
    padding: 0;
    height: 2rem;
    border: none;
    border-top: 0.0625rem solid $divider-color;
    background: none;
    .title {
      padding-left: 0.625rem;
      display: flex;
      align-items: center;
      width: 18.75rem;
      height: 2rem;
      background: linear-gradient(
        -45deg,
        transparent var(--card-header-height),
        $themeColor 0
      );
    }
  }
}
</style>
