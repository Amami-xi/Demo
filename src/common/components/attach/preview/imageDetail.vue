<template>
  <el-carousel
    :autoplay="false"
    indicator-position="outside"
    :initial-index="currentIndex"
    @change="F_change"
    v-if="fileList.length > 0"
  >
    <el-carousel-item v-for="(item, index) in fileList" :key="index">
      <el-image
        :src="item.filePath"
        fit="cover"
        :preview-src-list="srcList"
        :initial-index="index"
        z-index="1000"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import { downloadFile } from "@/common/utils/file";
import {
  getAttach,
  getAttachList,
  deleteAttach,
} from "@/common/api/jtap/attach";
import bus from "@/common/utils/bus";
export default defineComponent({
  name: "attachUpload",
  components: {},
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //关联标识ID
    referenceId: {
      type: String,
      default: "",
    },
    catalog: {
      type: String,
      default: "",
    },
    projectId: {
      type: String,
      default: "",
    },
    //附件ID
    attachId: {
      type: String,
      default: "",
    },
  },
  emits: ["refresh"],
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      attach: {},
      fileList: [],
      srcList: [],
      currentIndex: 0,
    });

    //2.定义方法

    /**
     * 初始化
     */
    const F_init = () => {
      F_getAttachList();
    };

    /**
     * 获取附件列表
     */
    const F_getAttachList = () => {
      getAttachList(
        props.flowinstid,
        props.referenceId,
        props.catalog,
        props.projectId
      ).then((res) => {
        //1. 构造附件列表
        data.fileList = res.data;
        data.srcList = [];
        for (var i = 0; i < data.fileList.length; i++) {
          const obj = data.fileList[i];
          data.srcList.push(obj.filePath);
          if (obj.id == props.attachId) {
            data.attach = obj;
            data.currentIndex = i;
          }
        }
        //2. 高亮显示方位角箭头
        if (data.attach) {
          bus.emit("fwj_change", data.attach.comments);
        }
      });
    };

    /**
     * 下载附件
     */
    const F_download = () => {
      // downloadAttach(data.attach.id).then((res) => {
      //   downloadFile(res.data, data.attach.name);
      // });
    };

    /**
     * 切换
     */
    const F_change = (val) => {
      //1. 获取当前激活图片
      data.attach = data.fileList[0];
      //2. 高亮显示方位角箭头
      if (data.attach) {
        bus.emit("fwj_change", data.attach.comments);
      }
    };

    //3.入口
    onMounted(() => {
      F_init();
    });

    return {
      ...toRefs(data),
      F_init,
      F_getAttachList,
      F_download,
      F_change,
    };
  },
});
</script>