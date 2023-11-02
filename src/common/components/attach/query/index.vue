<template>
  <el-table
    v-if="attachList != undefined && attachList.length > 0"
    :data="attachList"
    :header-cell-style="{ align: 'left' }"
  >
    <el-table-column label="文件名" prop="name"> </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <AttachOperate
          :attach="scope.row"
          :material="material"
          :disabled="disabled"
        ></AttachOperate>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { uploadAttach } from "@/common/api/jtap/attach";
import { UploadFilled } from "@element-plus/icons-vue";
import AttachOperate from "@/common/components/attach/index";
import { getAttachList } from "@/common/api/jtap/attach";
export default defineComponent({
  name: "attachContentList",
  components: { UploadFilled, AttachOperate },
  props: {
    //流程标识
    flowinstid: {
      type: String,
      default: "",
    },
    //项目阶段
    catalog: {
      type: String,
      default: "",
    },
    //关联材料标识
    referenceId: {
      type: String,
      default: "",
    },
    //关联材料
    material: {
      type: Object,
      default: {},
    },
    //操作
    disabled: {
      type: Boolean,
      default: "",
    },
  },
  emits: ["refresh"],
  setup(props, ctx) {
    //1.定义数据

    const data = reactive({
      attachList: [],
    });

    //2.定义方法
    const F_getAttachList = () => {
      getAttachList(props.flowinstid, props.material.code).then((res) => {
        data.attachList = res.data;
      });
    };

    //3.入口
    onMounted(() => {
      F_getAttachList();
    });

    return { ...toRefs(data) };
  },
});
</script>