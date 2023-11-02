<template>
  <el-menu class="tlw-menu-left" :default-active="defaultActive" :mode="mode">
    <div class="menuTitle">{{ menuTitle }}</div>
    <template v-for="(parent, index) in menuList" :key="index">
      <el-sub-menu
        :index="index + ''"
        v-if="parent.childList && parent.childList.length > 0"
      >
        <template #title>
          <svg-icon
            :name="parent.cssClass"
            :title="parent.menuName"
            v-if="parent.cssClass"
          ></svg-icon>
          <div v-else class="icon-title">{{ parent.menuName }}</div>
        </template>
        <el-menu-item
          :index="child.menuValue"
          v-for="(child, index2) in parent.childList"
          :key="index2"
          @click="openPage(child)"
        >
          <svg-icon
            :name="child.cssClass"
            :title="child.menuName"
            v-if="child.cssClass"
          ></svg-icon>
          <div v-else class="icon-title">{{ child.menuName }}</div>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="parent.menuValue" v-else @click="openPage(parent)">
        <svg-icon
          :name="parent.cssClass"
          :title="parent.menuName"
          v-if="parent.cssClass"
        ></svg-icon>
        <div v-else class="icon-title">{{ parent.menuName }}</div>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "menuTree",
  props: {
    mode: {
      type: String,
      default: "vertical",
    },
    menuTitle: {
      type: String,
      default: "",
    },
    menuList: {
      type: Array,
      default: [],
    },
    defaultActive: {
      type: String,
      default: "",
    },
    render: {
      type: Function,
    },
  },
  setup(props, context) {
    const openPage = (val) => {
      if (props.render) {
        props.render(val);
      }
    };
    return {
      openPage,
    };
  },
});
</script>