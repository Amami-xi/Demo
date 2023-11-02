<template>
  <div class="tlw-svgIcon icon-disabled" :class="titleSeat">
    <div class="icon-bg" :class="isIconBg ? 'icon-bg-true' : 'icon-bg-false'">
      <SvgIcon
        :name="name"
        :size="size"
        :width="width"
        :height="height"
        :fill="color"
      ></SvgIcon>
      <!-- <SvgIcon
        name="btnDisabled"
        :size="20"
        class="icon-disabled"
        v-if="showIconDisabled"
      ></SvgIcon> -->
    </div>
    <div class="icon-title" v-if="title.length > 0">
      {{ title }}
    </div>
    <slot name="icon-title"></slot>
  </div>
</template>
 
<script setup>
import { computed } from "vue";
import SvgIcon from "./svgIcon";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "1em",
  },
  width: {
    type: String,
    default: "1em",
  },
  height: {
    type: String,
    default: "1em",
  },
  //标题
  title: {
    type: String,
    default: "",
  },
  //标题位置
  titleSeat: {
    type: String,
    default: "right", //右:right,下:down,中:middle,
  },
  //是否加背景色
  isIconBg: {
    type: Boolean,
    default: false,
  },
  showIconDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped>
.tlw-svgIcon {
  .icon-bg {
    position: relative;
    .icon-disabled {
      position: absolute;
    }
  }
  .icon-bg-true {
    border-radius: 50%;
    background: $themeColor;
    display: flex;
    align-items: center;
    justify-content: center;

    &.is-active {
      background: $themeBg-hover;
    }

    svg {
      margin: 0.5rem;
    }
  }

  .icon-bg-false {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.right {
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon-title {
    margin-left: 0.625rem;
  }
}

.down {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon-title {
    margin-top: 0.125rem;
  }
}

.middle {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  color: #ffffff;

  .icon-title {
    position: absolute;
    left: 0.6875rem;
    top: 0.25rem;
  }
}
</style>