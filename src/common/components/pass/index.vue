<!-- 修改密码 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    title="修改密码"
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
        <el-col :span="12" :offset="6">
          <el-form-item label="旧密码" prop="oldPass" :rules="rules.oldPass">
            <el-input
              type="password"
              v-model="entity.oldPass"
              placeholder="请输入旧密码"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="新密码" prop="newPass" :rules="rules.newPass">
            <el-input
              type="password"
              v-model="entity.newPass"
              placeholder="请输入新密码"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item
            label="确认密码"
            prop="confirmPass"
            :rules="rules.confirmPass"
          >
            <el-input
              type="password"
              v-model="entity.confirmPass"
              placeholder="请输入确认密码"
              show-password
              autocomplete="off"
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
export default defineComponent({
  name: "EditPass",
  components: {},
  setup(props) {
    //1.定义数据
    const ruleFormRef = ref(null);
    const data = reactive({
      entity: {},
      dialogVisible: false,
      rules: {
        oldPass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPass: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    });

    //2.定义方法
    /**
     * 打开弹窗
     */
    const handleOpen = () => {
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
     * 新密码校验
     *
     * @param {*} rule
     * @param {*} value
     * @param {*} callback
     */
    function validatePass(rule, value, callback) {
      var regex = new RegExp(
        "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^(a-zA-Z0-9)]).{8,16}"
      );
      if (value === "" || value == undefined) {
        callback(new Error("请输入新密码"));
      } else if (
        data.entity.newPass.length < 8 ||
        data.entity.newPass.length > 16
      ) {
        callback();
      } else if (!regex.test(data.entity.newPass)) {
        callback("密码必须同时包含字母、数字和特殊字符其中三项");
      } else {
        callback();
      }
    }

    /**
     * 确认密码校验
     *
     * @param {*} rule
     * @param {*} value
     * @param {*} callback
     */
    function validatePass2(rule, value, callback) {
      if (value === "" || value == undefined) {
        callback(new Error("请输入确认密码"));
      } else if (value !== data.entity.newPass) {
        callback(new Error("两次新密码输入不一致！"));
      } else {
        callback();
      }
    }

    /**
     * 确定
     */
    const F_confirm = () => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          editPass(data.entity).then((res) => {
            ElMessage.success(res.msg);
            location.href = import.meta.env.VITE_APP_LOGOUT_URL;
          });
        }
      });
    };

    return {
      ...toRefs(data),
      ruleFormRef,
      handleOpen,
      handleClose,
      validatePass,
      validatePass2,
      F_confirm,
    };
  },
});
</script>