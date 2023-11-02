<template>
  <el-menu :default-active="defaultActive" :mode="mode">
    <template v-for="(menu, index) in menuList" :key="index">
      <el-menu-item :index="menu.menuValue" @click="openPage(menu)">
        <svg-icon
          :name="menu.cssClass"
          :title="menu.menuName"
          v-if="menu.cssClass"
        ></svg-icon>
        <div class="icon-title" v-else>{{ menu.menuName }}</div>
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
      default: "horizontal",
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
    //1.定义数据

    //2.定义方法

    /**
     * 菜单点击事件
     *
     * @param {string} menuId
     * @param {string} menuValue
     */
    const openPage = (menu) => {
      if (props.render) {
        props.render(menu);
      }
    };
    return {
      openPage,
    };
  },
});
</script>