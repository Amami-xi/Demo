<template>
  <el-menu :default-active="defaultActive" :mode="mode">
    <div class="menuTitle" v-if="menuTitle">{{ menuTitle }}</div>
    <template v-for="(menu, index) in menuList" :key="index">
      <el-menu-item :index="menu.formUrl" @click="openPage(menu)">
        <svg-icon
          :name="getIconName(menu.formUrl)"
          :title="menu.name"
          titleSeat="right"
          :width="width"
          :height="height"
        ></svg-icon>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
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
    width: {
      type: String,
      default: "16px",
    },
    height: {
      type: String,
      default: "19px",
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
        if (menu.formUrl != props.defaultActive) {
          props.render(menu);
        }
      }
    };

    /**
     * 动态设置图标
     */
    const getIconName = (formUrl) => {
      if (formUrl === "attachList" || formUrl === "tbfjList") {
        return "attach";
      } else if (formUrl === "zpList") {
        return "picture";
      } else if (formUrl == "spyjListpc") {
        return "file";
      } else if (formUrl.indexOf("zbList") > -1) {
        return "location";
      } else {
        return "file";
      }
    };

    return {
      openPage,
      getIconName,
    };
  },
});
</script>