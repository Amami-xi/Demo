<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增耕地来源地类"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    center
  >
    <el-form
      class="tlw-form"
      :model="entity"
      :rules="rules"
      ref="ruleFormRef"
      label-width="auto"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item
            label="地类编码"
            prop="codeValue"
            :rules="rules.codeValue"
          >
            <el-input
              v-model="entity.codeValue"
              placeholder="请输入地类编码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item
            label="地类名称"
            prop="codeName"
            :rules="rules.codeName"
          >
            <el-input
              v-model="entity.codeName"
              placeholder="请输入地类名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="备注" prop="remark" :rules="rules.remark">
            <el-input
              type="textarea"
              v-model="entity.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="排序" prop="codeOrder" :rules="rules.codeOrder">
            <el-input
              type="number"
              v-model="entity.codeOrder"
              placeholder="请输入排序"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="F_confirm"> 确定 </el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import Pagination from "@/common/components/pagination/index";
import { editPass } from "@/common/api/jtap/user";
import { addDictionaryEntry } from "@/common/api/jtap/dict";
export default defineComponent({
  name: "EditPass",
  props: {
    render: {
      type: Function,
    },
  },
  setup(props) {
    //1.定义数据
    const ruleFormRef = ref(null);
    const data = reactive({
      entity: {},
      dialogVisible: false,
      rules: {
        codeValue: [
          { required: true, message: "请输入地类编码", trigger: "blur" },
        ],
        codeName: [
          { required: true, message: "请输入地类名称", trigger: "blur" },
        ],
      },
    });

    //2.定义方法
    /**
     * 打开弹窗
     */
    const handleOpen = (typeName) => {
      data.entity.typeName = typeName;
      data.dialogVisible = true;
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
      data.entity = {};
    };

    /**
     * 确定
     */
    const F_confirm = () => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          addDictionaryEntry(data.entity).then((res) => {
            ElMessage.success("新增成功");
            props.render();
            handleClose();
          });
        }
      });
    };

    return {
      ...toRefs(data),
      ruleFormRef,
      handleOpen,
      handleClose,
      F_confirm,
    };
  },
});
</script>