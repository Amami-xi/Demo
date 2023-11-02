<template>
  <iframe
    ref="iframeMap"
    style="width: 100%; height: 98%; border: 0"
    :src="fwjUrl"
  ></iframe>
</template>

<script>
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import { Delete } from "@element-plus/icons-vue";
import { getAttachList } from "@/common/api/jtap/attach";
import bus from "@/common/utils/bus";
export default defineComponent({
  name: "fwjMap",
  components: { Delete },
  props: {
    //附件ID
    flowinstid: {
      type: String,
      default: "",
    },
    //关联材料标识
    referenceId: {
      type: String,
      default: "",
    },
    //其他标识
    catalog: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    //1.定义数据
    const iframeMap = ref(null);
    const data = reactive({
      fwjUrl: import.meta.env.VITE_OMEMAP_FWJ_URL,
    });
    var list = [];
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
      getAttachList(props.flowinstid, props.referenceId, props.catalog).then(
        (res) => {
          if (res.data) {
            //获取图片坐标点和方位角
            list = [];
            res.data.map((obj) => {
              if (obj.comments) {
                let zbArr = obj.comments.split(";");
                const point = { x: zbArr[1], y: zbArr[2], fwj: zbArr[0] };
                list.push(point);
              }
            });
            //动态显示方位角箭头
            setTimeout(() => {
              iframeMap.value.contentWindow.postMessage(
                { cmd: "setfwjs", params: { list } },
                "*"
              );
            }, 10);
          }
        }
      );
    };

    //3.入口
    onMounted(() => {
      //1.初始化
      F_init();
      //2.定义监听事件
      bus.on("fwj_change", (val) => {
        if (val != null) {
          let zbArr = val.split(";");
          var list = { x: zbArr[1], y: zbArr[2], fwj: zbArr[0] };
          setTimeout(() => {
            iframeMap.value.contentWindow.postMessage(
              { cmd: "setfwj", params: { list } },
              "*"
            );
          }, 10);
        }
      });
    });

    //4.销毁监听事件
    onBeforeUnmount(() => {
      bus.off("fwj_change");
    });

    return {
      ...toRefs(data),
      F_init,
      F_getAttachList,
      iframeMap,
    };
  },
});
</script>