<template>
  <el-button type="danger" @click="F_deleteAttach" size="small">
    删除<el-icon class="el-icon--right">
      <Delete />
    </el-icon>
  </el-button>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { Delete } from "@element-plus/icons-vue";
import { deleteAttach } from "@/common/api/jtap/attach";
import { ElMessage, ElMessageBox } from "element-plus";
import bus from "@/common/utils/bus";
import AttachOperate from "@/common/components/attach/index";
export default defineComponent({
  name: "AttachDelete",
  components: { Delete },
  props: {
    //附件ID
    attachId: {
      type: String,
      default: "",
    },
    //材料
    material: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({});

    //2.定义方法
    /**
     * 删除附件
     *
     * @param {object} parentRow 材料行
     * @param {string} attachId 附件ID
     */
    const F_deleteAttach = () => {
      ElMessageBox.confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          deleteAttach(props.attachId).then((res) => {
            bus.emit("attach_refresh", props.material);
            ElMessage.success(res.msg);
          });
        })
        .catch((res) => {});
    };

    return {
      ...toRefs(data),
      F_deleteAttach,
    };
  },
});
</script>