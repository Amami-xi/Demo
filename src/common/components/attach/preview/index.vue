<template>
  <el-dropdown
    size="small"
    type="primary"
    @command="F_Preview"
    v-show="showPreview"
  >
    <el-button type="primary" size="small">
      预览<el-icon class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="_owner">本窗口打开</el-dropdown-item>
        <el-dropdown-item command="_blank">新窗口打开</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-tooltip
    class="item"
    effect="dark"
    content="暂时不支持此类型预览"
    placement="top-start"
  >
    <el-link type="primary" disabled icon="el-icon-view" v-show="!showPreview"
      >预览
    </el-link>
  </el-tooltip>
  <PreViewDialog ref="preview"></PreViewDialog>
</template>
  
<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { ArrowDown } from "@element-plus/icons-vue";
import PreViewDialog from "./previewDialog";
import { Base64 } from "js-base64";
export default defineComponent({
  name: "AttachPreview",
  components: { ArrowDown, PreViewDialog },
  props: {
    //附件
    attach: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    //1.定义数据

    const preview = ref(null);

    //2.定义方法

    /**
     * 是否显示预览
     *
     * @param {*} row
     */
    const showPreview = (row) => {
      if (
        row.name.toLowerCase().indexOf(".doc") > -1 ||
        row.name.toLowerCase().indexOf(".pdf") > -1 ||
        row.name.toLowerCase().indexOf(".xls") > -1 ||
        row.name.toLowerCase().indexOf(".png") > -1 ||
        row.name.toLowerCase().indexOf(".jpg") > -1 ||
        row.name.toLowerCase().indexOf(".jpeg") > -1 ||
        row.name.toLowerCase().indexOf(".txt") > -1
      ) {
        return true;
      }
      return false;
    };

    /**
     * 预览
     *
     * @param {String} command 下拉指令
     */
    const F_Preview = (command) => {
      //公司预览
      // let url =
      //   "http://10.0.4.159:8080/fileservice/preview/attach/" + props.attach.id;
      // if (command == "_owner") {
      //   preview.value.handleOpen(props.attach.name, url);
      // } else {
      //   window.open(url, "_blank"); // 新窗口打开
      // }
      //自定义预览
      let filePath =
        props.attach.filePath + "?fullfilename=" + props.attach.filePath.substring(props.attach.filePath.lastIndexOf("/") + 1) + props.attach.name;
      let url =
        import.meta.env.VITE_PREVIEW_SERVER_URL +
        "?url=" +
        encodeURIComponent(Base64.encode(filePath));
      if (command == "_owner") {
        preview.value.handleOpen(props.attach.name, url);
      } else {
        window.open(url, "_blank"); // 新窗口打开
      }
    };

    return {
      showPreview,
      F_Preview,
      preview,
    };
  },
});
</script>